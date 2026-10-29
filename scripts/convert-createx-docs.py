"""Lossless content conversion for the ten local recruitment documents.

Reads the original OOXML package directly; never rewrites the DOCX/PDF files.
Markdown outputs and source materials stay local, outside public Git commits.
"""
from pathlib import Path
import hashlib
import json
import re
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'documents/资料包/已解压'
OUTPUT = ROOT / 'documents/markdown'
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'}
W = '{' + NS['w'] + '}'
R = '{' + NS['r'] + '}'
OUTPUT.mkdir(parents=True, exist_ok=True)
(OUTPUT / 'assets').mkdir(exist_ok=True)
inventory = []

def plain(node):
    values = []
    for child in node.iter():
        if child.tag == W+'t': values.append(child.text or '')
        elif child.tag in (W+'br', W+'cr'): values.append('\n')
        elif child.tag == W+'tab': values.append('  ')
    return ''.join(values)

def fingerprint(text):
    return ''.join(c for c in text if c.isalnum())

for source in sorted(SOURCE.rglob('*.docx')):
    code = source.stem[:2]
    if code not in [f'{i:02d}' for i in range(10)]: continue
    package = zipfile.ZipFile(source)
    document = ET.fromstring(package.read('word/document.xml'))
    body = document.find('w:body', NS)
    rels = {}
    if 'word/_rels/document.xml.rels' in package.namelist():
        for rel in ET.fromstring(package.read('word/_rels/document.xml.rels')):
            rels[rel.get('Id')] = rel.attrib
    image_counter = [0]
    retained_images = []

    def inline(node):
        content = []
        for child in node:
            kind = child.tag.split('}')[-1]
            if kind == 'r':
                content.append(plain(child))
                for image in child.findall('.//a:blip', NS):
                    rid = image.get(R+'embed')
                    rel = rels.get(rid, {})
                    target = rel.get('Target', '')
                    if not target: continue
                    internal = 'word/' + target.removeprefix('/')
                    if internal not in package.namelist():
                        raise RuntimeError(f'Missing image: {source.name} {internal}')
                    data = package.read(internal)
                    image_counter[0] += 1
                    name = f'{code}-figure-{image_counter[0]:02d}' + Path(target).suffix
                    (OUTPUT/'assets'/name).write_bytes(data)
                    content.append(f'\n\n![原文图示 {image_counter[0]}](assets/{name})\n\n')
                    retained_images.append({'file':name,'sha256':hashlib.sha256(data).hexdigest()})
            elif kind == 'hyperlink':
                label = plain(child)
                target = rels.get(child.get(R+'id'), {}).get('Target')
                if target and target.startswith(('https://','http://')):
                    content.append(f'[{label}]({target.replace(" ","%20")})')
                else: content.append(label)
            elif kind in ('ins','sdt','smartTag'):
                content.append(inline(child))
        return ''.join(content).strip()

    chunks = []
    table_count = 0
    seen_major = False
    heading_count = 0
    for element in body:
        kind = element.tag.split('}')[-1]
        if kind == 'p':
            text = inline(element)
            if not text: continue
            style = element.find('w:pPr/w:pStyle', NS)
            style = style.get(W+'val') if style is not None else ''
            if style == 'Title':
                chunks.append('# ' + text)
            elif style == 'Subtitle':
                chunks.append(text)
            elif style == 'Heading1':
                chunks.append('## ' + text); seen_major = True; heading_count += 1
            elif style.startswith('Heading'):
                chunks.append(('### ' if seen_major else '## ') + text); heading_count += 1
            else:
                clause = re.match(r'^([一二三四五六七八九十]+\s+[^\n]{1,25}?)\s{2,}(.+)$', text, re.S)
                if code in ['02','03','04','05','06'] and clause:
                    chunks.append('## ' + clause.group(1).strip())
                    chunks.append(clause.group(2).strip()); heading_count += 1
                elif text.lstrip().startswith('•'):
                    chunks.append('- ' + text.lstrip().lstrip('•').strip())
                else: chunks.append(text)
        elif kind == 'tbl':
            rows = []
            for row in element.findall('w:tr',NS):
                values = []
                for cell in row.findall('w:tc',NS):
                    paragraphs = [inline(p) for p in cell.findall('w:p',NS)]
                    value = '<br>'.join(t for t in paragraphs if t)
                    values.append(value.replace('|',r'\|').replace('\n','<br>'))
                    span = cell.find('w:tcPr/w:gridSpan',NS)
                    if span is not None: values.extend(['']*(int(span.get(W+'val'))-1))
                rows.append(values)
            if not rows: continue
            width = max(map(len,rows))
            rows = [r + ['']*(width-len(r)) for r in rows]
            lines = ['| ' + ' | '.join(r) + ' |' for r in rows]
            lines.insert(1,'| '+' | '.join(['---']*width)+' |')
            chunks.append('\n'.join(lines)); table_count += 1

    source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
    metadata = '\n'.join([
        '---',f'document_id: "{code}"','source_version: "V0.1"',
        'markdown_revision: "V0.2"','converted_at: "2026-10-29"',
        'status: "待迭代草稿"',f'source_file: "{source.name}"',
        f'source_sha256: "{source_hash}"','---','',
    ])
    markdown = metadata + '\n\n'.join(chunks).strip() + '\n'
    dest = OUTPUT/(source.stem+'.md')
    dest.write_text(markdown,encoding='utf-8')
    # Compare every non-empty original text run after removing formatting syntax.
    normalized = fingerprint(markdown)
    missing = []
    for text in body.findall('.//w:t',NS):
        value = fingerprint(text.text or '')
        if value and value not in normalized: missing.append(text.text)
    if missing: raise RuntimeError(f'Content omitted in {source.name}: {missing[:3]}')
    inventory.append({'id':code,'file':dest.name,'source':str(source.relative_to(ROOT)),
                      'source_sha256':source_hash,'markdown_sha256':hashlib.sha256(markdown.encode()).hexdigest(),
                      'tables':table_count,'section_headings':heading_count,
                      'images':retained_images,'source_text_runs_missing':0})

assert len(inventory)==10, f'Expected ten documents, found {len(inventory)}'
(OUTPUT/'conversion-verification.json').write_text(json.dumps({'documents':inventory,'count':len(inventory)},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'count':len(inventory),'tables':sum(x['tables'] for x in inventory),
                  'images':sum(len(x['images']) for x in inventory),
                  'source_text_runs_missing':0,'output':str(OUTPUT)},ensure_ascii=False))

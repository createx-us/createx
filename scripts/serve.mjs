import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
const base = resolve(import.meta.dirname, "../apps/website/dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (pathname === "/") {
      res.writeHead(302, { Location: "/en/" });
      res.end();
      return;
    }
    let file = resolve(base, "." + pathname);
    if (!file.startsWith(base + "/")) throw Error("path");
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    } catch {
      /* Missing paths are handled by the custom 404 below. */
    }
    let status = 200;
    let bytes;
    try {
      bytes = await readFile(file);
    } catch {
      file = resolve(base, "404.html");
      bytes = await readFile(file);
      status = 404;
    }
    res.writeHead(status, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    res.end(bytes);
  } catch {
    res.writeHead(400);
    res.end("Bad request");
  }
}).listen(4173, "127.0.0.1", () =>
  console.log("CreateX preview: http://127.0.0.1:4173"),
);

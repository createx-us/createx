import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { parseArgs } from "node:util";
const { values } = parseArgs({
  options: {
    host: { type: "string", default: "127.0.0.1" },
    port: { type: "string", default: "4173" },
  },
});
const host = values.host;
const port = Number(values.port);
if (
  !["127.0.0.1", "localhost", "0.0.0.0", "::1"].includes(host) ||
  !Number.isInteger(port) ||
  port < 1 ||
  port > 65535
)
  throw Error("Invalid preview host or port");
const base = resolve(import.meta.dirname, "../apps/website/dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".json": "application/json; charset=utf-8",
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
}).listen(port, host, () =>
  console.log(
    `CreateX preview: http://${host === "::1" ? "[::1]" : host}:${port}`,
  ),
);

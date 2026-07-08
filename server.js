const { createServer } = require("https");
const { readFileSync, existsSync, mkdirSync } = require("fs");
const { execSync } = require("child_process");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3001", 10);

const app = next({ dev: false });
const handle = app.getRequestHandler();

const KEY = "./certificates/localhost-key.pem";
const CERT = "./certificates/localhost.pem";

if (!existsSync(KEY) || !existsSync(CERT)) {
  mkdirSync("./certificates", { recursive: true });
  execSync(
    `mkcert -key-file ${KEY} -cert-file ${CERT} localhost`,
    { stdio: "inherit" },
  );
}

const httpsOptions = {
  key: readFileSync(KEY),
  cert: readFileSync(CERT),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on https://localhost:${port}`);
  });
});

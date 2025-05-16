import http from "node:http";
import { configDotenv } from "dotenv";
import path from "node:path";
import querystring from "node:querystring";
import pug from "pug";
import { studentsData } from "./data/students.js";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

configDotenv();

const { APP_HOST, APP_PORT, APP_ENV } = process.env;

const users = [...studentsData];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewPath = path.join(__dirname, "view");
const assetsPath = path.join(__dirname, "assets");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === "/favicon.ico") {
    res.writeHead(200, {
      "content-type": "image/x-icon",
    });
    res.end();
    return;
  }

  if (url === "/css/style.css") {
    const stylesheet = fs.readFileSync(path.join(assetsPath, "css/style.css"));

    res.writeHead(200, {
      "content-type": "text/css",
    });
    res.end(stylesheet);
    return;
  }

  if (url === "/") {
    const html = pug.renderFile(path.join(viewPath, "home.pug"));

    res.writeHead(200, { "content-Type": "text/html" });
    res.end(html);
  } else if (url === "/add-user" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      const { name, birth } = querystring.parse(body);

      users.push({ id: Date.now(), name, birth });

      res.writeHead(302, { Location: "/users" });

      res.end();
    });
  } else if (url === "/users") {
    const html = pug.renderFile(path.join(viewPath, "users.pug"), {
      users,
    });

    res.writeHead(200, { "content-Type": "text/html" });

    res.end(html);
  } else if (url.startsWith("/delete/") && method === "POST") {
    const name = decodeURIComponent(url.split("/delete/")[1]);
    users.map((user, i) => {
      if (user.name === name) {
        users.splice(i, 1);
      }
    });

    res.writeHead(302, { Location: "/users" });

    res.end();
  } else if (url.startsWith("/edit/") && method === "POST") {
    const oldName = decodeURIComponent(url.split("/edit/")[1]);
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      const { name, birth } = querystring.parse(body);
      const user = users.find((u) => u.name === oldName);

      if (user) {
        user.name = name;
        user.birth = birth;
        console.log("user updated:", user.name, user.birth);
      }
      console.log("userrrr");
      res.writeHead(302, { Location: "/users" });

      res.end();
    });
  } else if (url.startsWith("/edit/")) {
    const name = decodeURIComponent(url.split("/edit/")[1]);
    const user = users.find((u) => u.name === name);

    if (user) {
      const html = pug.renderFile(path.join(viewPath, "edit.pug"), { user });
      res.writeHead(200, { "content-Type": "text/html" });
      res.end(html);
    } else {
      res.writeHead(404);
      res.end("Utilisateur introuvable");
    }
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
});

server.listen(APP_PORT, APP_HOST, () => {
  console.log(`${APP_ENV} server running: http://${APP_HOST}:${APP_PORT}`);
});

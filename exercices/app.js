import http from "node:http";
import { shuffleUsers } from "../src/utils.js";
import fs from "node:fs";
import path from "node:path";
import querystring from "node:querystring";
import { renderUser } from "../exemple-pug.js";

const users = ["Alan", "Sophie", "Bernard", "Elie"];

const dirname = import.meta.dirname;
const pagesPath = path.join(dirname, "pages");
const formPath = path.join(pagesPath, "form.html");

let customUsers = [...users];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

  // const form = fs.readFileSync(formPath, { encoding: "utf8" });

  if (url === "favicon.ico") {
    res.writeHead(200, {
      "Content-type": "image/x-icon",
    });
    res.end();
    return;
  }

  if (url === "users") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    res.end(`
			<!DOCTYPE html>
			<html lang="fr">
				<head>
				 <title>Mon html</title>
				</head>
				<body>
					<ul>
                        ${customUsers
                          .map((user) => `<li>${user}</li>`)
                          .join("")}
                    </ul>
				</body>
			</html>
		`);
    return;
  }

  if (url === "shuffle") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    let shuffledUsers = shuffleUsers([...users]);

    console.log(shuffledUsers);
    res.end(`
			<!DOCTYPE html>
			<html lang="fr">
				<head>
				 <title>Mon html</title>
				</head>
				<body>
					<ul>${shuffledUsers.map((user) => `<li>${user}</li>`).join("")} </ul>
				</body>
			</html>
		`);
  }
  if (url === "add" && req.method === "GET") {
    const page = fs.readFileSync(path.join(pagesPath, "form-add.html"), {
      encoding: "utf8",
    });
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(page);
    return;
  }

  if (url === "add" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = querystring.parse(body);

      if (!data.name || data.name.trim() === "") {
        res.writeHead(401, { "Content-type": "text/plain" });
        res.end("Le champs nom ne peut pas être vide");
        return;
      }

      customUsers.push(data.name);
      res.writeHead(301, {
        Location: "/users",
      });
      res.end();
      return;
    });
    return;
  }

  if (url === "userPug") {
    res.writeHead(200, {
      "Content-type": "text/html; charset=utf-8",
    });

    res.end(renderUser());
  }
});

server.listen(8000, "localhost", () => {
  console.log("Server running on http://localhost:8000");
});

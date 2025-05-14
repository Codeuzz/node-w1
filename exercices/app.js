import http from "node:http";
import { shuffleUsers } from "../src/utils.js";

const users = ["Alan", "Sophie", "Bernard", "Elie"];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");

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
                        ${users.map((user) => `<li>${user}</li>`).join("")}
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
});

server.listen(8000, "localhost", () => {
  console.log("Server running on http://localhost:8000");
});

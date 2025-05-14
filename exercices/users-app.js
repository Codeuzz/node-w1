import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import querystring from "querystring";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersArray = [
  { nom: "Alice", email: "alice.dupont@example.com", role: "admin" },
  { nom: "Jean", email: "jean.martin@example.com", role: "utilisateur" },
  { nom: "Sophie", email: "sophie.lambert@example.com", role: "modérateur" },
  { nom: "Lucas", email: "lucas.moreau@example.com", role: "utilisateur" },
  { nom: "Emma", email: "emma.lefevre@example.com", role: "admin" },
  { nom: "Hugo", email: "hugo.bernard@example.com", role: "utilisateur" },
  { nom: "Chloé", email: "chloe.richard@example.com", role: "modérateur" },
  { nom: "Thomas", email: "thomas.garcia@example.com", role: "utilisateur" },
  { nom: "Manon", email: "manon.petit@example.com", role: "admin" },
  { nom: "Nathan", email: "nathan.robert@example.com", role: "utilisateur" },
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const list = usersArray
      .map(
        (user, index) =>
          `<li><a href="/detail?id=${index}">${user.nom}</a></li>`
      )
      .join("");

    res.end(`
      <h1>Liste des utilisateurs</h1>
      <ul>${list}</ul>
      <a href="/form">Ajouter un utilisateur</a>
    `);
    return;
  }

  if (url.pathname === "/detail") {
    const id = url.searchParams.get("id");
    const user = usersArray[id];
    if (!user) {
      res.writeHead(404);
      res.end("Utilisateur non trouvé");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h1>Détail utilisateur</h1>
      <p>Nom: ${user.nom}</p>
      <p>Email: ${user.email}</p>
      <p>Role: ${user.role}</p>
      <a href="/">Retour</a>
    `);
    return;
  }

  if (url.pathname === "/form" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h1>Ajouter un utilisateur</h1>
      <form method="POST" action="/form">
        <input name="nom" placeholder="Nom" />
        <input name="email" placeholder="Email" />
        <button type="submit">Ajouter</button>
      </form>
    `);
    return;
  }

  if (url.pathname === "/form" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const data = querystring.parse(body);
      usersArray.push({
        nom: data.nom,
        email: data.email,
        role: "utilisateur",
      });
      res.writeHead(301, { Location: "/" });
      res.end();
    });
    return;
  }

  res.writeHead(404);
  res.end("Page non trouvee");
});

server.listen(8000, () => {
  console.log("Serveur actif sur http://localhost:8000");
});

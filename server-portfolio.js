import pug from "pug";
import path from "node:path";
import http from "node:http";
import { fileURLToPath, URLSearchParams } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewPath = path.join(__dirname, "view");
const assetsPath = path.join(__dirname, "assets");

const menuItems = [
  { path: "/", title: "Home", isActive: true },
  { path: "/about-me", title: "About", isActive: false },
  { path: "/references", title: "References", isActive: false },
  { path: "/contact-me", title: "Contact", isActive: false },
];

const server = http.createServer((req, res) => {
  const url = req.url.replace("/", "");
  if (url === "favicon.ico") {
    res.writeHead(200, {
      "content-type": "image/x-icon",
    });
    res.end();
    return;
  }

  if (url === "joe") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(`<h2>JOE</h2>`);
    return;
  }

  if (url === "" || url.startsWith("?")) {
    const hasSuccess = req.url.includes("success=1");

    res.writeHead(200, {
      "content-type": "text/html",
    });

    pug.renderFile(
      path.join(viewPath, "home.pug"),
      { pretty: true, menuItems: menuItems, showToast: hasSuccess },
      (err, data) => {
        if (err) throw err;
        res.end(data);
        // console.log(data);
      }
    );
    return;
  }

  if (req.method === "POST" && url === "contact-me") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const params = new URLSearchParams(body);
      const email = params.get("email");
      const message = params.get("message");

      console.log("Formulaire reçu:", { email, message });

      res.writeHead(302, { Location: "/?success=1" });
      res.end();
    });

    return;
  }

  if (url === "contact-me") {
    res.writeHead(200, { "Content-Type": "text/html" });
    pug.renderFile(
      path.join(viewPath, "contact.pug"),
      { pretty: true, menuItems },
      (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server error");
          return;
        }
        res.end(data);
      }
    );
    return;
  }
});

server.listen(8000, "localhost", () => {
  console.log("running on port 8000");
});

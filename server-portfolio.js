import pug from "pug";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";

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

// pug.renderFile(
//   "view/layout/layout.pug",
//   {
//     menuItems,
//     pretty: true,
//   },
//   (err, data) => {
//     if (err) throw err;
//     console.log("ici : ");
//     console.log(data);
//   }
// );

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

  if (url === "") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    pug.renderFile(
      path.join(viewPath, "home.pug"),
      { pretty: true, menuItems: menuItems },
      (err, data) => {
        if (err) throw err;
        res.end(data);
        console.log(data);
      }
    );
    return;
  }
});

server.listen(8000, "localhost", () => {
  console.log("running on port 8000");
});

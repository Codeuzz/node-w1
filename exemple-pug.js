import pug from "pug";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewPath = path.join(__dirname, "exercices/pages");

const template = `
if age >= 18
    h1 accès autorisé
else 
    h1 accès refusé
`;

// const compileTemplate = pug.compile(template);

// const result = compileTemplate({ age: 17 });

// console.log(result);

// pug.render(template, { age: 19 }, (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// const compileTemplate = pug.compileFile(viewPath);

pug.renderFile(
  path.join(viewPath, "exemple.pug"),
  {
    user: {
      isAdmin: true,
    },
  },
  (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
  }
);

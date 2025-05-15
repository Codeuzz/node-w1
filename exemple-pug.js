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

const userData = {
  name: {
    first: "Jean",
    last: "Dupont",
  },
  age: 36,
  birthdate: new Date("1986-04-18"),
  location: {
    zipcode: "77420",
    city: "Champs-sur-Marne",
  },
  isAdmin: true,
};

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

export const renderUser = () => {
  return pug.renderFile(
    path.join(viewPath, "user-card.pug"),
    {
      pretty: true,
      user: userData,
    },
    (err, data) => {
      if (err) throw err;
      console.log(data);
      return data;
    }
  );
};

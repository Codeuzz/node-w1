const fs = require("fs");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let students = [];
let studentData;

try {
  studentData = fs.readFileSync("./data/student.json", { encoding: "utf8" });
  students = JSON.parse(studentData);
  console.log(students);
} catch (e) {
  console.error(e);
  process.exit();
}

const listOfStudents = [];

students.forEach((student) => {
  listOfStudents.push(student.name);
});

// console.log(listOfStudents);

function prompt() {
  rl.question(
    `\n Que voulez-vous faire ?\n 1- Rechercher des informations sur un élève, tapez "eleve".\n 2- Rechercher des élèves potentiellement talentueux, tapez "talent.\n Votre réponse: "`,
    (answer) => {
      if (answer.toLowerCase() === "eleve") {
        findStudentInfo();
      } else if (answer.toLowerCase() === "talent") {
        return findTalentedStudents();
      } else if (answer.toLowerCase() != "talent") {
        console.log('Veuillez choisir entre "eleve" et "talent" seulement. ');
        prompt();
        return;
      }
    }
  );
}

function findStudentInfo() {
  rl.question(`\nJe veux en savoir plus sur:\n`, (answer) => {
    students.map((student) => {
      if (answer.toLowerCase() === student.name.toLowerCase()) {
        console.log("Voici les informations de cet élève:");
        console.log(answer, ":");
        console.log(student);
        prompt();

        return;
      } else {
        console.log("Aucun élève ne porte ce nom.");
        findStudentInfo();
        return;
      }
    });
  });
}

let talentedStudents = [];
function findTalentedStudents() {
  rl.question(
    `\nQuelle est la note minimale pour filtrer les étudiants ?`,
    (answer) => {
      const wantedNote = Number(answer);
      if (wantedNote > 20) {
        console.log("La note ne peut pas être supérieure à 20.");
        findTalentedStudents();
        return;
      } else {
        students.filter((student) => {
          if (student.notes.some((note) => note >= wantedNote)) {
            talentedStudents.push(student.name);
          }
        });
        console.log("Voici nos futurs talents :");
        talentedStudents.forEach((student) => {
          console.log(student);
        });
        prompt();
      }

      rl.close();
    }
  );
}

prompt();

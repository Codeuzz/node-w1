import { readFileSync } from "fs";

import { createInterface } from "readline";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let students = [];
let studentData;

try {
  studentData = readFileSync("./data/student.json", { encoding: "utf8" });
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
    `\n Que voulez-vous faire ?\n 1- Rechercher des informations sur un élève, tapez "eleve".\n 2- Rechercher des élèves potentiellement talentueux, tapez "talent.\n 3- Ajouter une note à un élève, tapez "note".\n Votre réponse: "`,
    (answer) => {
      if (answer.toLowerCase() === "eleve") {
        findStudentInfo();
      } else if (answer.toLowerCase() === "talent") {
        return findTalentedStudents();
      } else if (answer.toLowerCase() === "note") {
        return addGradeToStudent();
      } else {
        console.log(
          'Veuillez choisir entre "eleve", "talent" et "note" seulement. '
        );
        prompt();
        return;
      }
    }
  );
}

function findStudentInfo() {
  rl.question(`\nJe veux en savoir plus sur:\n`, (answer) => {
    students.map((student) => {
      if (answer.trim().toLowerCase() === student.name.toLowerCase()) {
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
      } else if (!wantedNote) {
        console.log("La note doit être un nombre.");
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

const addGradeToStudent = () => {
  rl.question(
    `\nA quel étudiant voulez-vous ajouter une note ?:\n`,
    (nameAnswer) => {
      const cleanedNameAnswer = nameAnswer.trim().toLowerCase();
      const student = students.find(
        (s) => s.name.toLowerCase() === cleanedNameAnswer
      );

      if (!student) {
        console.log("Aucun élève ne porte ce nom.");
        return addGradeToStudent();
      }

      console.log(`Ajouter une note à ${student.name}`);
      rl.question(
        `\nQuelle note voulez-vous ajouter ? (Entre 0 et 20):\n `,
        (gradeAnswer) => {
          const wantedNote = Number(gradeAnswer);
          if (isNaN(wantedNote)) {
            console.log("La note doit être un nombre.");
            return addGradeToStudent();
          }
          if (wantedNote < 0 || wantedNote > 20) {
            console.log("La note doit être comprise entre 0 et 20.");
            return addGradeToStudent();
          }

          student.notes.push(wantedNote);
          console.log(
            `Vous avez ajouté à ${student.name} la note ${wantedNote}:\n`,
            student
          );
          prompt();
        }
      );
    }
  );
};

prompt();

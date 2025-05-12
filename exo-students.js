const fs = require("fs");

let students = [];
let studentText;

// fs.readFile("./data/student.txt", { encoding: "utf8" }, (err, data) => {
//   if (err) {
//     console.error(err);
//     process.exit();
//   }
//   console.log(data);
// });

try {
  studentText = fs.readFileSync("./data/student.txt", { encoding: "utf8" });
  students = JSON.parse(studentText);
  console.log(students);
} catch (e) {
  console.error(e);
  process.exit();
}

const avgBiggerThan17 = [];

students.forEach((student) => {
  const total = student.notes.reduce((acc, curr) => acc + curr, 0);
  const avg = total / student.notes.length;

  if (avg > 17) {
    avgBiggerThan17.push(student.name);
  }
});

console.log("Moyenne >  17: ", avgBiggerThan17);

let bestStudent;

students.forEach((student) => {
  const total = student.notes.reduce((acc, curr) => acc + curr, 0);
  const avg = total / student.notes.length;

  if (!bestStudent || avg > bestStudent.avg) {
    bestStudent = {
      student,
      avg,
    };
  }
});

console.log("élève à la meilleure moyenne :", bestStudent);

try {
  studentText = fs.readFileSync("./data/student.txt", { encoding: "utf8" });
  const rawData = JSON.parse(studentText);

  rawData.forEach((data) => {
    const student = {
      name: data.name,
      note: data.notes,
      address: data.address,
    };

    students.push(student);
  });

  console.log("étudiants formatés :", students);
} catch (e) {
  console.error(e);
  process.exit();
}

students.sort((a, b) => {
  console.log(a);
  if (
    !a.notes ||
    !Array.isArray(a.notes) ||
    !b.notes ||
    !Array.isArray(b.notes)
  ) {
    console.log(
      "Erreur de données, les notes ne sont pas définies correctement pour un étudiant."
    );
  }

  const avgA = a.notes.reduce((acc, n) => acc + n, 0) / a.notes.length;
  const avgB = b.notes.reduce((acc, n) => acc + n, 0) / b.notes.length;

  return avgB - avgA;
});

console.log("étudiants triés par moyenne :", students);

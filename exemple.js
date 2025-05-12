const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const hiddenNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;

console.log("🎲 Devine le nombre entre 1 et 100 !");
console.log("Tu as 10 tentatives.");

function question() {
  rl.question(
    `\nIl te reste ${attemptsLeft} tentative(s). Ton choix : `,
    (answer) => {
      const guess = Number(answer);

      if (isNaN(guess) || guess < 1 || guess > 100) {
        console.log("❌ Entrée invalide. Il faut un nombre entre 1 et 100.");
        question();
        return;
      }

      if (guess === hiddenNumber) {
        console.log(`✅ Bravo ! Tu as trouvé le nombre ${hiddenNumber} 🎉`);
        rl.close();
      } else {
        attemptsLeft--;
        if (attemptsLeft === 0) {
          console.log(`💀 Raté ! Le nombre était ${hiddenNumber}`);
          rl.close();
        } else {
          console.log(
            guess < hiddenNumber
              ? "🔼 C'est plus grand."
              : "🔽 C'est plus petit."
          );
          question();
        }
      }
    }
  );
}

question();

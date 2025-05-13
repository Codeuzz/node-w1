import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const playerOne = {
  name: null,
  wonGames: 0,
  lostGames: 0,
};

const playerTwo = {
  name: null,
  wonGames: 0,
  lostGames: 0,
};

const chifoumiGame = (firstPlayer, secondPlayer) => {
  const choices = ["pierre", "feuille", "ciseaux"];

  const getRandomChoice = () =>
    choices[Math.floor(Math.random() * choices.length)];

  const choice1 = getRandomChoice();
  const choice2 = getRandomChoice();

  console.log(`${firstPlayer.name} joue : ${choice1}`);
  console.log(`${secondPlayer.name} joue : ${choice2}`);

  if (choice1 === choice2) {
    console.log("Égalité !");
  } else if (
    (choice1 === "pierre" && choice2 === "ciseaux") ||
    (choice1 === "feuille" && choice2 === "pierre") ||
    (choice1 === "ciseaux" && choice2 === "feuille")
  ) {
    console.log(`${firstPlayer.name} gagne !`);
    firstPlayer.wonGames += 1;
    secondPlayer.lostGames += 1;
  } else {
    console.log(`${secondPlayer.name} gagne !`);
    secondPlayer.wonGames += 1;
    firstPlayer.lostGames += 1;
  }
};

const prompt = () => {
  rl.question(`Voulez-vous commencer le jeu chifoumi ?`, (promptAnswer) => {
    if (
      promptAnswer.trim().toLowerCase() === "oui" &&
      playerOne.name === null
    ) {
      rl.question(`\nChoisir nom du premier joueur\n`, (chosenName1) => {
        playerOne.name = chosenName1.trim();

        rl.question(`\nChoisir nom du deuxième joueur\n`, (chosenName2) => {
          playerTwo.name = chosenName2.trim();

          console.log(`Joueurs : ${playerOne.name} vs ${playerTwo.name}`);

          chifoumiGame(playerOne, playerTwo);
          console.log(
            `\n\nSTATS:\n ${playerOne.name}:\n lost games: ${playerOne.lostGames}\n won games: ${playerOne.wonGames}\n\n${playerTwo.name}:\n lost games: ${playerTwo.lostGames}\n won games: ${playerTwo.wonGames}\n`
          );
          prompt();
        });
      });
    } else if (
      promptAnswer.trim().toLowerCase() === "oui" &&
      playerOne.name != null
    ) {
      chifoumiGame(playerOne, playerTwo);
      console.log(
        `\n\nSTATS:\n ${playerOne.name}:\n lost games: ${playerOne.lostGames}\n won games: ${playerOne.wonGames}\n\n${playerTwo.name}:\n lost games: ${playerTwo.lostGames}\n won games: ${playerTwo.wonGames}\n`
      );
      prompt();
    } else {
      prompt();
    }
  });
};

prompt();

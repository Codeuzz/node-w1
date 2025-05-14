export const priceToTTC = (priceNoTax) => {
  return +(priceNoTax * 1.2).toFixed(2);
};

export const returnMention = (avgGrade) => {
  switch (true) {
    case avgGrade > Number(process.env.MENTION_PASSABLE_MAX) &&
      avgGrade <= Number(process.env.MENTION_PASSABLE_MAX):
      console.log("Mention : Passable");
      return "Passable";

    case avgGrade > Number(process.env.MENTION_ASSEZ_BIEN_MIN) &&
      avgGrade <= Number(process.env.MENTION_ASSEZ_BIEN_MAX):
      console.log("Mention : Assez bien");
      return "Assez bien";

    case avgGrade > Number(process.env.MENTION_BIEN_MIN) &&
      avgGrade <= Number(process.env.MENTION_BIEN_MAX):
      console.log("Mention : Bien");
      return "Bien";

    case avgGrade > Number(process.env.MENTION_TRES_BIEN_MIN) &&
      avgGrade <= Number(process.env.MENTION_TRES_BIEN_MAX):
      console.log(
        "Mention : Très bien",
        Number(process.env.MENTION_TRES_BIEN_MAX)
      );
      return "Très bien";

    default:
      console.log("Aucune mention");
      return "Aucune mention";
  }
};

export const shuffleUsers = (users) => {
  for (let i = users.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [users[i], users[j]] = [users[j], users[i]];
  }
  return users;
};

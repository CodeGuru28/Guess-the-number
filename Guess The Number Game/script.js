// TODO: Fix Edge Cases of Not A Number in custom settings input!
// TODO: Fix other errors;

const prompt = require("prompt-sync")();
const menuOptions = [
  ["Start(1)", "1"],
  ["About Dev(2)", "2"],
  ["Settings(3)", "3"],
  ["Exit(q)", "q"],
];

let separator = "----------------------";

let user = {
  name: "player",
  score: 0,
};

let lifeLines = ["isPrime", "isEven", "isMultipleOfTen"];

let settings = {
  difficulty: "",
  hints: undefined,
  lifeLines: undefined,
  min: undefined,
  max: undefined,
  chances: undefined,
};

function input(string, datatype = "str") {
  let inp = prompt(string);
  if (datatype == "int") {
    if (isNaN(inp)) {
      return "err";
    }
    return parseInt(inp);
  }
  return inp;
}

function greet() {
  console.log("Hello Player");
  console.log("Welcome to the game, Guess The Number!");
}

function choose_menu() {
  displayMenu();
  let choice = input("Enter your choice: ");
  let menu = validateMenuChoice(choice);
  return menu;
}

function validateMenuChoice(choice) {
  for (let i = 0; i < menuOptions.length; i++) {
    if (menuOptions[i].includes(choice)) {
      return choice;
    }
  }
  return false;
}

function displayMenu() {
  for (let i = 0; i < menuOptions.length; i++) {
    console.log(menuOptions[i][0]);
  }
}

function displayRules(min, max, chances, lifeLines) {
  console.log("The Rules of the Game are as follows: ");
  console.log(`1. You have to guess a number between ${min} and ${max}`);
  console.log(`2. You have a total of ${chances}`);
  console.log(`3. You will be provided with ${lifeLines.length} lifelines`);
  console.log(`4. You can use the following lifelines:`);
  for (let i = 0; i < lifeLines.length; i++) {
    console.log(`${lifeLines[i]}`);
  }
  console.log(`4. You can use a lifeline only once`);
  console.log(
    `5. You can use a lifeLine by entering "LL: <name>" as your guess`,
  );
}

function getDifficulty() {
  console.log("Choose your difficulty level: ");
  console.log(" Easy(1)");
  console.log(" Medium(2)");
  console.log(" Hard(3)");
  console.log(" Extreme(4)");
  console.log(" Troll(5)");
  console.log(" Custom(6)");
  console.log(separator);
  let difficulty = input("Enter your choice: ");
  console.log(separator);
  if (difficulty == "1") {
    return "easy";
  } else if (difficulty == "2") {
    return "medium";
  } else if (difficulty == "3") {
    return "hard";
  } else if (difficulty == "4") {
    return "extreme";
  } else if (difficulty == "5") {
    return "troll";
  } else if (difficulty == "6") {
    return "custom";
  } else return "err";
}

function getCustomSettings() {
  console.log(separator);
  let min = input("Enter the minimum value: ");
  console.log(separator);
  let max = input("Enter the maximum value: ");
  console.log(separator);
  let chances = input("Enter the number of chances: ");
  console.log(separator);
  if (min > max) {
    console.log("Please put correct minimum and maximum values");
    return "err";
  }
  if (chances > max - min){
    console.log("Please put correct number of chances! It must be less than the range of numbers");
    return "err";
  }
  console.log(separator);
  let hints = input("Do you want hints? (y/n): ");
  if (hints == "y") hints = true;
  else if(hints == "n") hints = false;
  else{
    console.log("Please enter either y or n");
    return "err";
  }
  let lifeLines = input("Do you want to use lifeLines? (y/n): ");
  if (lifeLines == "y") lifeLines = true;
  else if(lifeLines == "n") lifeLines = false;
  else{
    console.log("Please enter either y or n");
    return "err";
  }
  return [min, max, chances, hints, lifeLines];
}

function loadSettings(difficulty) {
  switch (difficulty) {
    case "easy":
      settings.difficulty = "easy";
      settings.hints = true;
      settings.lifeLines = ["isPrime", "isEven", "isMultipleOfTen"];
      settings.min = 1;
      settings.max = 100;
      settings.chances = 10;
      break;

    case "medium":
      settings.difficulty = "medium";
      settings.hints = true;
      settings.lifeLines = ["isPrime", "isEven", "isMultipleOfTen"];
      settings.min = 1;
      settings.max = 400;
      settings.chances = 10;
      break;

    case "hard":
      settings.difficulty = "hard";
      settings.hints = false;
      settings.lifeLines = ["isPrime"];
      settings.min = 1;
      settings.max = 80;
      settings.chances = 8;
      break;

    case "extreme":
      settings.difficulty = "extreme";
      settings.hints = false;
      settings.lifeLines = ["isEven"];
      settings.min = 1;
      settings.max = 40;
      settings.chances = 4;
      break;

    case "troll":
      settings.difficulty = "troll";
      settings.hints = true;
      settings.lifeLines = ["isPrime", "isEven", "isMultipleOfTen"];
      settings.min = 1;
      settings.max = 500;
      settings.chances = 3;
      break;

    case "custom":
      let customSettings = getCustomSettings();
      if(customSettings === "err") return "err";
      settings.difficulty = "custom";
      settings.min = customSettings[0];
      settings.max = customSettings[1];
      settings.chances = customSettings[2];
      settings.hints = customSettings[3];
      settings.lifeLines = customSettings[4];
      break;

    default:
      return "err";
  }
}

function setSettings(difficult) {
  if (difficult == "default") {
    let loaded = loadSettings("easy");
    if(loaded === "err") return "err"
    return "ok"
  }
  let difficulty = getDifficulty();
  let load = loadSettings(difficulty)
  if(load === "err") return "err";
  else return "ok";
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

greet();
let gameWindow = true;
let gameMode = "menu";

while (gameWindow) {
  while (gameMode === "menu") {
    let choice = choose_menu();
    console.log(choice);
    switch (choice) {
      case false:
        console.log(separator);
        console.log("Invalid choice\nTry again");
        console.log(separator);
        break;

      case "1":
        console.log("here1");
        gameMode = "game";
        break;
      case "2":
        console.log("here2");
        gameMode = "about";
        break;
      case "3":
        console.log("here3");
        gameMode = "settings";
        break;
      case "q":
        console.log("here4");
        gameMode = "exit";
        gameWindow = false;
        break;
      default:
        console.log("here5");
        console.log("Some Error Occurred! Try Again");
        continue;
    }
  }
  while (gameMode === "game") {
    let setting = setSettings("default");
    if(setting === "err"){
      console.log("please choose the correct option")
      continue;
    }
    displayRules(settings.min, settings.max, settings.chances, settings.lifeLines)
    break;
  }
  while(gameMode === "settings"){
    console.log(separator)
    let setting = setSettings();
    if(setting === "err"){
      console.log("please choose the correct option")
      continue;
    }
    displayRules(settings.min, settings.max, settings.chances, settings.lifeLines)
    break;
  }
  break;
}

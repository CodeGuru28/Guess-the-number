
const prompt = require("prompt-sync")();

/**
 * Menu Options for the game
 */
const menuOptions = [
  ["Start(1)", "1"],
  ["About Dev(2)", "2"],
  ["Settings(3)", "3"],
  ["Exit(q)", "q"],
];

let separator = "----------------------";

/**
 * Life Lines of the game
 */
let lifeLines = ["isPrime", "isEven", "isMultipleOfTen"];

/**
 * Settings Options of the game
 */
let settings = {
  difficulty: "",
  hints: undefined,
  lifeLine: undefined,
  min: undefined,
  max: undefined,
  chances: undefined,
  usableLifeLines: undefined
};

/**
 * Takes and Returns Prompts
 * @param {string} string: The string that you want to show on the prompt 
 * @param {string} datatype: The datatype that you want to get(string[by default], int)  
 * @returns the input given or err if the datatype is not what it is asked to be
 */
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

/**
 * Basic Greet Function
 */
function greet() {
  console.log("Hello Player");
  console.log("Welcome to the game, Guess The Number!");
}

/**
 * Displays the menu options -> Takes the input from the user -> Validates the input
 * @returns the menu chosen by the user input || err if the menu is not in the menu options
 */
function choose_menu() {
  displayMenu();
  let choice = input("Enter your choice: ");
  let menu = validateMenuChoice(choice);
  return menu;
}

/**
 * Checks/Validates the menu option entered by the user.
 * @param {string} Choice: the menu user chose
 * @returns the user's menu || if the menu is not in the menu options return false
 */
function validateMenuChoice(choice) {
  for (let i = 0; i < menuOptions.length; i++) {
    if (menuOptions[i].includes(choice)) {
      return choice;
    }
  }
  return false;
}

/**
 * Basic for loop to display menu options
 */
function displayMenu() {
  for (let i = 0; i < menuOptions.length; i++) {
    console.log(menuOptions[i][0]);
  }
}

/**
 * 
 * @param {Number} The minimum range value
 * @param {Number} The maximum range value 
 * @param {Number} chances The maximum chances a player gets 
 * @param {Number} lifeLines The number of life lines a user gets 
 */
function displayRules(min, max, chances, lifeLine, usableLifeLine) {
  console.log("The Rules of the Game are as follows: ");
  console.log(`-->You have to guess a number between ${min} and ${max}`);
  console.log(`-->You have a total of ${chances} chances`);
  console.log(separator)
  if(lifeLine){
    console.log(`-->You will be provided with ${usableLifeLine.length} lifelines`);
    console.log(`-->You can use the following lifelines:`);
    for (let i = 0; i < usableLifeLine.length; i++) {
      console.log(`${usableLifeLine[i]}`);
    }
    console.log(separator)
    console.log(`-->You can use a lifeline only once`);
    console.log(`-->You can use a lifeLine by entering "LL: <name>" as your guess`,);
  }
}

/**
 * Lets the user to decide the difficulty level for the game.
 * @returns returns the input given by the user for difficulty level || err if the input is invalid
 */
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

/**
 * Lets the user to select their favorite custom settings
 * @returns an array which contains the desired settings for the game.
 */
function getCustomSettings() {
  console.log(separator);
  let min = input("Enter the minimum value: ", "int");
  console.log(separator);
  let max = input("Enter the maximum value: ", "int");
  console.log(separator);
  
  if(min === "err" || max === "err" || min > max ){
    console.log("Please put correct minimum and maximum values");
    return "err"
  }

  let chances = input("Enter the number of chances: ", "int");
  console.log(separator);

  if (chances > max - min || chances === "err"){
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

/**
 * Takes the difficulty input of the User and assigns the settings object's  key's value
 * @param {string} difficulty: The input of the difficulty given by the user 
 * @returns err if the difficulty is invalid
 */
function loadSettings(difficulty) {
  switch (difficulty) {
    case "easy":
      settings.difficulty = "easy";
      settings.hints = true;
      settings.lifeLine = true;
      settings.usableLifeLines = ["isPrime", "isEven", "isMultipleOfTen"];
      settings.min = 1;
      settings.max = 100;
      settings.chances = 10;
      break;

    case "medium":
      settings.difficulty = "medium";
      settings.hints = true;
      settings.lifeLine = true;
      settings.usableLifeLines = ["isPrime", "isEven", "isMultipleOfTen"];
      settings.min = 1;
      settings.max = 400;
      settings.chances = 10;
      break;

    case "hard":
      settings.difficulty = "hard";
      settings.hints = false;
      settings.lifeLine = true;
      settings.usableLifeLines = ["isPrime"];
      settings.min = 1;
      settings.max = 80;
      settings.chances = 8;
      break;

    case "extreme":
      settings.difficulty = "extreme";
      settings.hints = false;
      settings.lifeLine = true;
      settings.usableLifeLines = ["isEven"];
      settings.min = 1;
      settings.max = 40;
      settings.chances = 4;
      break;

    case "troll":
      settings.difficulty = "troll";
      settings.hints = true;
      settings.lifeLine = true;
      settings.usableLifeLines = ["isPrime", "isEven", "isMultipleOfTen"];
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
      settings.lifeLine = customSettings[4];
      settings.usableLifeLines = ["isPrime", "isEven", "isMultipleOfTen"];
      break;

    default:
      return "err";
  }
}

/**
 * 
 * @param {string} difficult : The difficulty desired by the user
 * @returns ok if everything is good || err if invalid input
 */
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

/**
 * 
 * @param {Number} min: The minimum number range
 * @param {Number} max: The maximum number range
 * @returns a random number between min and max
 */
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

greet();
let gameWindow = true;// If want to exit the game?
let gameMode = "menu";//Different loops to make the program infinite!

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
    displayRules(settings.min, settings.max, settings.chances, settings.lifeLine, settings.usableLifeLines)
    break;
  }
  while(gameMode === "settings"){
    console.log(separator)
    let setting = setSettings();
    if(setting === "err"){
      console.log("please choose the correct option")
      continue;
    }
    displayRules(settings.min, settings.max, settings.chances, settings.lifeLine, settings.usableLifeLines);
    gameMode = "menu";
    console.log(separator)
    break;
  }
}

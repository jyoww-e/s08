const tournament = new Tournament();

// Add trainers to the tournament

// list of pokemons to be assigned
const pokemonList = [
  { name: "Pichu", type: "Electric" },
  { name: "Bulbasaur", type: "Grass" },
  { name: "Charmander", type: "Fire" },
  { name: "Squirtle", type: "Water" },
  { name: "Rattata", type: "Normal" },
  { name: "Jigglypuff", type: "Fairy" },
  { name: "Meowth", type: "Normal" },
  { name: "Psyduck", type: "Water" },
  { name: "Zubat", type: "Flying" },
  { name: "Diglett", type: "Ground" },
  { name: "Poliwag", type: "Water" },
  { name: "Abra", type: "Psychic" },
  { name: "Machop", type: "Fighting" },
  { name: "Geodude", type: "Ground" },
  { name: "Magnemite", type: "Steel" },
  { name: "Krabby", type: "Water" },
  { name: "Exeggcute", type: "Psychic" },
  { name: "Koffing", type: "Poison" },
  { name: "Sandshrew", type: "Ground" },
  { name: "Politoed", type: "Water" },
  { name: "Caterpie", type: "Bug" },
  { name: "Weedle", type: "Bug" },
  { name: "Pidgey", type: "Flying" },
  { name: "Vulpix", type: "Fire" },
  { name: "Eevee", type: "Normal" },
];

document.addEventListener("DOMContentLoaded", function () {
  let loopBool = true;
  let numOfTrainers, numOfPokemons;
  while (loopBool) {
    numOfTrainers = Number(
      prompt("Please enter number of Trainers (Min: 3 | Max: 5): ")
    );

    // error handling
    if (isNaN(numOfTrainers)) {
      loopBool = true;
      alert("Error: Please enter valid information!\nMust be a number");
      continue;
    }

    if (numOfTrainers < 3 || numOfTrainers > 5) {
      loopBool = true;
      alert("Trainer: 3 up to 5\nPokemons: 1 up to 5 per Trainer");
      continue;
    }

    numOfPokemons = Number(
      prompt(`Enter number of Pokemons (Min: 1 | Max: 5) per Trainer: `)
    );
    // error handling
    if (isNaN(numOfPokemons)) {
      loopBool = true;
      alert("Error: Please enter valid information!\nMust be a number");
      continue;
    }

    if (numOfPokemons < 1 || numOfPokemons > 5) {
      loopBool = true;
      alert("Trainer: 3 up to 5\nPokemons: 1 up to 5 per Trainer");
      continue;
    }

    loopBool = false;
  }
  //SET TRAINERS
  for (let i = 0; i < numOfTrainers; i++) {
    let trainerName = prompt(`Enter name of Trainer ${i + 1}: `);

    // assign pokemons to trainers
    let assignedPokemons = [];
    for (let j = 0; j < numOfPokemons; j++) {
      let poke = pokemonList.shift();
      let pokemon = new Pokemon(poke.name, poke.type);
      assignedPokemons.push(pokemon);
    } //assign pokemon loop end

    // add trainers to tournament
    tournament.trainers.push(new Trainer(trainerName, assignedPokemons));
  } // trainers loop end

  // Start Tournament

  // numOfTrainers = 3; directly go to round robin
  if (numOfTrainers == 3) {
    tournament.roundRobinBattle(tournament.trainers);
  } else if (numOfTrainers == 4) {
    tournament.bracketBattles();
    tournament.restPeriod(tournament.bracketWinners);
    tournament.bracketBattles(tournament.bracketWinners);
  } else {
    tournament.bracketBattles();

    tournament.restPeriod(tournament.bracketWinners);

    tournament.roundRobinBattle(tournament.bracketWinners);
  }
}); //event end

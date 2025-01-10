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

let numOfTrainers, numOfPokemons;

document.addEventListener("DOMContentLoaded", function () {
  let loopBool = true;
  while (loopBool) {
    numOfTrainers = Number(
      prompt("Please enter number of Trainers (Min: 3 | Max: 5): ")
    );
    numOfPokemons = Number(
      prompt(`Enter number of Pokemons (Min: 1 | Max: 5) per Trainer: `)
    );

    // error handling
    if (
      isNaN(numOfTrainers) ||
      isNaN(numOfPokemons) ||
      numOfPokemons > 5 ||
      numOfTrainers > 5 ||
      numOfPokemons < 1 ||
      numOfTrainers < 3
    ) {
      loopBool = true;
      alert(
        "Error: Please enter valid information !\nTrainer: 3 up to 5\nPokemons: 1 up to 5 per Trainer"
      );
    } else {
      loopBool = false;
    }
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
  numOfTrainers = 3;
  if (numOfTrainers == 3) {
    tournament.roundRobinBattle(tournament.trainers);
  } else {
    // console.log("pumunta sa else");

    tournament.bracketBattles();

    tournament.restPeriod(tournament.bracketWinners);

    tournament.roundRobinBattle(tournament.bracketWinners);
  }
}); //event end

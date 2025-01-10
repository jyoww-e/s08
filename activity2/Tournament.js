class Tournament {
  constructor() {
    // this.trainers = [];

    //TEST DATA
    this.trainers = [
      new Trainer("Ash", [
        new Pokemon("Pikachu", "Electric"),
        new Pokemon("Bulbasaur", "Grass"),
        new Pokemon("Charmander", "Fire"),
        new Pokemon("Squirtle", "Water"),
        new Pokemon("Rattata", "Normal"),
      ]),
      new Trainer("Misty", [
        new Pokemon("Poliwag", "Water"),
        new Pokemon("Psyduck", "Water"),
        new Pokemon("Krabby", "Water"),
        new Pokemon("Politoed", "Water"),
        new Pokemon("Exeggcute", "Psychic"),
      ]),
      new Trainer("Brock", [
        new Pokemon("Geodude", "Ground"),
        new Pokemon("Diglett", "Ground"),
        new Pokemon("Sandshrew", "Ground"),
        new Pokemon("Zubat", "Flying"),
        new Pokemon("Koffing", "Poison"),
      ]),
      new Trainer("Gary", [
        new Pokemon("Magnemite", "Steel"),
        new Pokemon("Abra", "Psychic"),
        new Pokemon("Vulpix", "Fire"),
        new Pokemon("Caterpie", "Bug"),
        new Pokemon("Pidgey", "Flying"),
      ]),
      new Trainer("Professor Oak", [
        new Pokemon("Bulbasaur", "Grass"),
        new Pokemon("Charmander", "Fire"),
        new Pokemon("Squirtle", "Water"),
        new Pokemon("Eevee", "Normal"),
        new Pokemon("Jigglypuff", "Fairy"),
      ]),
    ];

    this.pairings = [];
    this.bracketWinners = [];

    this.scores = {};
  }

  restPeriod(trainers) {
    // REVIVE DEAD POKEMONS OF WINNERS
    trainers.forEach((trainer) => {
      trainer.revivePokemons();
    });

    //REST POKEMONS
    trainers.forEach((trainer) => {
      trainer.restPokemons();
    });

    // console.log(this.bracketWinners);
  }

  bracketBattles() {
    console.log(
      "%c████████  ██████  ██    ██ ██████  ███    ██  █████  ███    ███ ███████ ███    ██ ████████ ",
      "color:red"
    );
    console.log(
      "%c   ██    ██    ██ ██    ██ ██   ██ ████   ██ ██   ██ ████  ████ ██      ████   ██    ██    ",
      "color:red"
    );
    console.log(
      "%c   ██    ██    ██ ██    ██ ██████  ██ ██  ██ ███████ ██ ████ ██ █████   ██ ██  ██    ██    ",
      "color:red"
    );
    console.log(
      "%c   ██    ██    ██ ██    ██ ██   ██ ██  ██ ██ ██   ██ ██  ██  ██ ██      ██  ██ ██    ██    ",
      "color:red"
    );
    console.log(
      "%c   ██     ██████   ██████  ██   ██ ██   ████ ██   ██ ██      ██ ███████ ██   ████    ██    ",
      "color:red"
    );

    // BRACKET PAIRINGS
    this.bracket();
    let pairs = this.pairings;

    // SHOW PARTICIPANTS
    console.log(
      "\t\t%cPARTICIPANTS",
      "color: purple; font-size: 24px; font-weight: bold;"
    );
    pairs.forEach((pair, index) => {
      pair[0] === pair[1]
        ? console.log(
            `%c${index + 1}. ${pair[0].name}`,
            "color: purple;  font-weight: bold;"
          )
        : console.log(
            `%c${index + 1}. ${pair[0].name} vs ${pair[1].name}`,
            "color: purple;  font-weight: bold;"
          );
    });
    //REVERSE SO THAT THE ANNOUNCEMENT WILL LOG FIRST
    pairs.reverse();

    // LOOP THROUGH EACH PAIR
    pairs.forEach((pair, index) => {
      //CHECK FOR THE FREE PASS TRAINER
      if (pair[0] === pair[1]) {
        console.log(
          `%c${pair[0].name} 🏆 ADVANCES TO THE NEXT ROUND AUTOMATICALLY! 🥳
          %cNo match needed—${pair[0].name} secures his spot in the next stage of the tournament!`,
          "color: lime; font-size: 16px; font-weight: bold",
          "color: lime; font-style: italic; font-size: 16px; font-weight: bold"
        );
        this.bracketWinners.push(pair[0]);
      } else {
        // START BATTLE

        //ADD DESIGN FOR STARTING TOURNAMENT
        console.log(
          `%cMatch ${index}: ${pair[0].name} vs ${pair[1].name} ⚔️`,
          "color: white; font-size: 18px; font-weight: bold; background-color: rgb(255, 99, 71); padding: 5px; border-radius: 5px;"
        );
        const battle = new Battle(pair);
        const winner = battle.doBattle();
        this.bracketWinners.push(winner);
      }
    }); //end for each

    // console.log(this.bracketWinners);
  }

  roundRobinBattle(trainers) {
    console.log("%c ROUND ROBIN BATTLE", "font-size: 30px");

    // let trainers = this.bracketWinners;

    //FORMAT SCORES

    trainers.forEach((trainer) => {
      // scores.push();
      this.scores[trainer.name] = { points: 0 };
    });

    trainers.forEach((trainer) => {
      trainers.forEach((trainer2) => {
        if (trainer !== trainer2) {
          const battle = new Battle([trainer, trainer2]);
          const winner = battle.doBattle();

          //REST POKEMONS AFTER EACH BATTLE
          trainer.restPokemons();
          trainer2.restPokemons();
          this.scores[winner.name].points += 1;
        }
      }); // end inner foreach
    }); // end outer foreach

    /// CHECK FOR TIES
    let max = Math.max(...Object.values(this.scores).map((e) => e.points));

    if (this.isThereATie(max)) {
      //gets the name of the tied trainers
      let tiedTrainers = Object.keys(this.scores).filter(
        (key) => this.scores[key].points === max
      );
      // finds the object based on the name then maps it on to tied
      tiedTrainers = tiedTrainers.map(
        (e) =>
          this.trainers[
            this.trainers.findIndex((trainer) => trainer.name === e)
          ]
      );

      let totalHPs = {};
      // get totalHP of trainers for ties
      tiedTrainers.forEach((trainer) => {
        totalHPs[trainer.name] = 0;
        trainer.pokemons.forEach((pokemon) => {
          totalHPs[trainer.name] += Number(pokemon.hp);
        });
      });

      //gets the highest hp
      let champion = Object.entries(totalHPs).reduce((max, current) => {
        return current[1] > max[1] ? current : max;
      });

      champion = champion[0];

      console.log(
        `%c${champion} is the champion`,
        "color: yellow; font-size: 20px"
      );
    } else {
      let champion = Object.keys(this.scores).find(
        (key) => this.scores[key].points === max
      );

      console.log(
        `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t%c${champion} is the champion 🏆%c\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
        "color: rgb(0, 0, 139); font-size: 30px; font-weight: bold; background-color: rgb(255, 255, 0); padding: 10px; border-radius: 5px;",
        "color: none; font-size: 30px; font-weight: normal; background-color: none; padding: 0; border-radius: 0;"
      );
    }
  }

  isThereATie(max) {
    let countOfHighest = 0;
    for (let e in this.scores) {
      let point = this.scores[e].points;
      // console.log(point);
      countOfHighest += point == max ? 1 : 0;
    }
    // console.log("countOfHighest: " + countOfHighest);
    return countOfHighest > 1 ? true : false;
  }

  bracket() {
    let arrLen = this.trainers.length;

    for (let i = 0; i < arrLen / 2; i++) {
      let arr = [this.trainers[i], this.trainers[arrLen - i - 1]];
      this.pairings.push(arr);
    }
  }
}

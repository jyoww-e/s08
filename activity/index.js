class Trainer {
  constructor(name) {
    this.name = name;
    this.pokemons = [];
  }
  viewPokedex() {
    console.log(this.pokemons);
  }
  addPokemon(pokemon) {
    this.pokemons.push(pokemon);
  }
  selectPokemon(index) {
    return this.pokemons[index];
  }
}

class Battle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
  }

  doBattle(trainers) {
    console.log(
      `\t\t%c${this.pokemon1.name} V.S. ${this.pokemon2.name}`,
      "color: white; font-size: 14px; font-weight: bold; background-color:lime; border-radius: 4px; padding: 10px"
    );
    while (this.pokemon1.hp > 0 && this.pokemon2.hp > 0) {
      // if (Math.random() < 0.5) {
      this.pokemon1.attack(this.pokemon2);
      // } else {
      this.pokemon2.attack(this.pokemon1);
      // }

      if (this.pokemon1.hp <= 0) {
        console.log(
          `%c${trainers[1].name}'s ${this.pokemon2.name} wins!`,
          "color: white; background-color: lime; padding: 8px; border-radius: 4px; font-size:14px; font-weight:bold;"
        );
        return this.pokemon2;
      }
      if (this.pokemon2.hp <= 0) {
        console.log(
          `%c${trainers[0].name}'s ${this.pokemon1.name} wins!`,
          "color: white; background-color: lime; padding: 2px; border-radius: 4px; font-size:14px; font-weight:bold;"
        );
        return this.pokemon1;
      }

      //ACTIVATES HEAL OF POKEMON ON 25% CHANCE
      if (Math.random() < 0.25) {
        this.pokemon1.heal();
      }
      //ACTIVATES HEAL OF POKEMON ON 25% CHANCE
      if (Math.random() < 0.25) {
        this.pokemon2.heal();
      }
    }
  }
}

class Tournament {
  constructor(trainers) {
    this.trainers = trainers;
    this.pairings = [];
    this.battle;
  }

  getTrainers() {
    console.log(this.trainers);
  }

  Pair() {
    let arrLen = this.trainers.length;
    this.pairings = [];

    for (let i = 0; i < arrLen / 2; i++) {
      let arr = [this.trainers[i], this.trainers[arrLen - i - 1]];
      this.pairings.push(arr);
    }

    // console.log(this.trainers, this.pairings);
  }

  startTournament() {
    console.log(
      `\t%c~~ TOURNAMENT START ~~`,
      "color: #FFF; font-weight:bold; font-size:18px; background-color: #FFD700; border-radius:4px; padding: 8px"
    );

    while (this.trainers.length > 1) {
      this.Pair();
      let winners = [];
      // console.log(this.trainers);

      for (let trainerPair of this.pairings) {
        let winner;
        let loser;

        if (trainerPair[0] && trainerPair[1]) {
          if (trainerPair[0].name == trainerPair[1].name) {
            winner = trainerPair[0];
          } else {
            console.log(
              `\t%cMatch between ${trainerPair[0].name} and ${trainerPair[1].name}`,
              "color: white; font-weight: bold; font-size: 14px; background-color: limegreen; padding: 4px; border-radius: 4px;"
            );

            // check if both trainers have Pokemon left
            if (trainerPair[0].pokemons.length === 0) {
              winner = trainerPair[1];
              loser = trainerPair[0];
              console.log(
                `${trainerPair[0].name} has no Pokemon left and loses the match.`
              );
            } else if (trainerPair[1].pokemons.length === 0) {
              winner = trainerPair[0];
              loser = trainerPair[1];
              console.log(
                `${trainerPair[1].name} has no Pokemon left and loses the match.`
              );
            } else {
              // select one pokemon randomly
              let rand1 = Math.floor(
                Math.random() * trainerPair[0].pokemons.length
              );
              let rand2 = Math.floor(
                Math.random() * trainerPair[1].pokemons.length
              );
              let randomPokemon1 = trainerPair[0].pokemons[rand1];
              let randomPokemon2 = trainerPair[1].pokemons[rand2];

              console.log(
                `%c${trainerPair[0].name} has chosen ${randomPokemon1.name}!`,
                "color: white; background-color:rgb(9, 192, 192); padding: 2px; border-radius:4px"
              );
              console.log(
                `%c${trainerPair[1].name} has chosen ${randomPokemon2.name}!`,
                "color: white; background-color:rgb(9, 192, 192); padding: 2px; border-radius:4px"
              );

              // trainerPair[0].pokemons.splice(rand1, 1);
              // trainerPair[1].pokemons.splice(rand2, 1);

              this.battle = new Battle(randomPokemon1, randomPokemon2);
              winner = this.battle.doBattle(trainerPair);
              if (winner.name == randomPokemon1.name) {
                winner = trainerPair[0];
              } else {
                winner = trainerPair[1];
              }
              loser =
                winner === trainerPair[0] ? trainerPair[1] : trainerPair[0];
            }
          }
        } else {
          winner = trainerPair[0] ? trainerPair[0] : trainerPair[1];
          loser = winner === trainerPair[0] ? trainerPair[1] : trainerPair[0];
          console.log(
            `One trainer is missing. ${winner.name} automatically advances.`
          );
        }

        // const loserIndex = this.trainers.indexOf(loser);
        // if (loserIndex !== -1) {
        //   this.trainers.splice(loserIndex, 1);
        // }

        winners.push(winner);
        // console.log(winners, "ASDSADS");
      }
      // console.log(winners);
      this.trainers = winners;
    }

    console.log(
      `\n%cTournament Winner: Trainer ${this.trainers[0].name}`,
      "color: white; background-color: rgb(238, 238, 83); padding: 12px; border-radius: 4px; font-size: 16px; font-weight:bold;"
    );
    // return this.trainers[0];
  }
}

class Pokemon {
  constructor(name, type, level, hp) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.hp = hp;
    this.initialHP = hp;
    this.defense = false;
    this.hasFainted = false;
  }

  attack(opponent) {
    //prevent attacking when dead
    if (opponent.hasFainted === true) {
      return;
    } else {
      console.log(
        `\n\t\t%c${this.name}'s attack`,
        "color: black; background-color: white; padding: 2px; border-radius: 4px"
      );
      console.log(`\t${this.name} attacks ${opponent.name}!!`);
      let damage = this.level * 3;
      this.calculateDamage(opponent, damage);
    }
  }
  calculateDamage(opponent, damage) {
    // WHEN DAMAGE IS CRITICAL MULTIPLY DAMAGE BY 2
    if (Math.random() < 0.3) {
      damage *= 8;
      console.log(
        `\t%c${damage} ~CRITICAL~ `,
        "color: white; background-color: red; padding: 2px; border-radius: 4px"
      );
    }
    // WHEN DEFENSE IS ACTIVATED REDUCE DAMAGE TAKEN
    if (opponent.defense === true) {
      damage -= opponent.level * 2;
      opponent.defense = false;
      console.log(
        `\t%c${opponent.name} has BLOCKED (reduced damage)`,
        "color: black; background-color: rgb(238, 238, 83); padding: 2px; border-radius: 4px"
      );
    }
    //WHEN POKEMON DODGES DAMAGE IS REDUCED TO 0 (15% chance of dodging)
    if (Math.random() < 0.15) {
      damage = 0;
      console.log(
        `\t%c${opponent.name} has DODGED!`,
        "color: white; background-color: limegreen; padding: 2px; border-radius: 4px "
      );
    }

    this.receivedDamage(opponent, damage);
  }
  receivedDamage(opponent, damage) {
    opponent.hp -= damage;
    console.log(`\t${opponent.name} takes -${damage}HP damage...`);

    //if opponent dies
    if (opponent.hp <= 0) {
      console.log(`\t${opponent.name} has fainted...`);
      this.powerUp(opponent);
      this.hasFainted = true;
    } else {
      console.log(`\t${opponent.name} has ${opponent.hp}HP left...`);
    }
  }

  powerUp(opponent) {
    this.initialHP += opponent.initialHP * 0.5;
    this.hp += opponent.initialHP * 0.5;
    console.log(
      `\t${this.name} has powered up! +${opponent.initialHP * 0.2} HP`
    );
  }

  heal() {
    const heal = 10;
    console.log(`%c\t${this.name} is using potion +10 HP...`, "color: #f8f87c");
    this.hp += heal;
    console.log(`\t${this.name} now has ${this.hp} HP...`);
    // 40% chance to activate defense when healing
    if (Math.random() < 0.4) {
      console.log(
        `\t%c${this.name} has activated DEFENSE!`,
        "color: black; background-color: rgb(238, 238, 83); padding: 2px; border-radius: 4px"
      );
      this.defense = true;
    }
  }
}

class FirePokemon extends Pokemon {
  constructor(name, level, hp) {
    super(name, "Fire", level, hp);
  }
  attack(opponent) {
    //prevent attacking when dead
    if (opponent.hasFainted === true) {
      return;
    } else {
      console.log(
        `\n\t\t%c${this.name}'s attack`,
        "color: white; background-color: red; padding: 2px; border-radius: 4px"
      );
      let attacks = ["Flaming tail whip", "Flamethrower", "Fire punch"];
      let rand = Math.floor(Math.random() * attacks.length);
      console.log(
        `%c\t${this.name} uses ${attacks[rand]} on ${opponent.name}!!`,
        "color: red"
      );
      let damage = this.level * 5;

      this.calculateDamage(opponent, damage);
    }
  }
  heal() {
    const heal = 15;
    console.log(`%c\t${this.name} is using FLASH FIRE!!`, "color: #f8f87c");
    this.hp += heal;
    console.log(`\t${this.name} now has ${this.hp} HP (+${heal})...`);
    // 40% chance to activate defense when healing
    if (Math.random() < 0.4) {
      console.log(
        `\t%c${this.name} has activated DEFENSE!`,
        "color: black; background-color: rgb(238, 238, 83); padding: 2px; border-radius: 4px"
      );
      this.defense = true;
    }
  }
}

class ElectricPokemon extends Pokemon {
  constructor(name, level, hp) {
    super(name, "Electric", level, hp);
  }
  attack(opponent) {
    //prevent attacking when dead
    if (opponent.hasFainted === true) {
      return;
    } else {
      let attacks = [
        "Electro Ball",
        "Thunder Fang",
        "Thunderbolt",
        "Bolt Strike",
      ];
      let rand = Math.floor(Math.random() * attacks.length);
      console.log(
        `\n\t\t%c${this.name}'s attack`,
        "color: black; background-color: yellow; padding: 2px; border-radius: 4px"
      );
      console.log(
        `%c\t${this.name} uses ${attacks[rand]} on ${opponent.name}!!`,
        "color: yellow"
      );
      let damage = this.level * 5;

      this.calculateDamage(opponent, damage);
    }
  }
  heal() {
    const heal = 15;
    console.log(`%c\t${this.name} is using HEAL PULSE!!`, "color: #f8f87c");
    this.hp += heal;
    console.log(`\t${this.name} now has ${this.hp} HP (+${heal})...`);
    // 40% chance to activate defense when healing
    if (Math.random() < 0.4) {
      console.log(
        `\t%c${this.name} has activated DEFENSE!`,
        "color: black; background-color: rgb(238, 238, 83); padding: 2px; border-radius: 4px"
      );
      this.defense = true;
    }
  }
}

class WaterPokemon extends Pokemon {
  constructor(name, level, hp) {
    super(name, "Water", level, hp);
  }
  attack(opponent) {
    //prevent attacking when dead
    if (opponent.hasFainted === true) {
      return;
    } else {
      let attacks = ["Aqua Jet", "Hydro Pump", "Jet Punch", "Water Spout"];
      let rand = Math.floor(Math.random() * attacks.length);
      console.log(
        `\n\t\t%c${this.name}'s attack`,
        "color: black; background-color: lightblue; padding: 2px; border-radius: 4px"
      );
      console.log(
        `%c\t${this.name} uses ${attacks[rand]} on ${opponent.name}!!`,
        "color: lightblue"
      );
      let damage = this.level * 5;

      this.calculateDamage(opponent, damage);
    }
  }
  heal() {
    const heal = 15;
    console.log(`%c\t${this.name} is using LIFE DEW!!`, "color: #f8f87c");
    this.hp += heal;
    console.log(`\t${this.name} now has ${this.hp} HP (+${heal})...`);
    // 40% chance to activate defense when healing
    if (Math.random() < 0.4) {
      console.log(
        `\t%c${this.name} has activated DEFENSE!`,
        "color: black; background-color: rgb(238, 238, 83); padding: 2px; border-radius: 4px"
      );
      this.defense = true;
    }
  }
}

class GroundPokemon extends Pokemon {
  constructor(name, level, hp) {
    super(name, "Water", level, hp);
  }
  attack(opponent) {
    //prevent attacking when dead
    if (opponent.hasFainted === true) {
      return;
    } else {
      let attacks = ["Earth Quake", "Mud Bomb", "Sandstorm", "Scorching Sand"];
      let rand = Math.floor(Math.random() * attacks.length);
      console.log(
        `\n\t\t%c${this.name}'s attack`,
        "color: white; background-color: #b5651d; padding: 2px; border-radius: 4px"
      );
      console.log(`\t${this.name} uses ${attacks[rand]} on ${opponent.name}!!`);
      let damage = this.level * 5;

      this.calculateDamage(opponent, damage);
    }
  }
  heal() {
    const heal = 15;
    console.log(`%c\t${this.name} is using SHORE UP!!`, "color: #f8f87c");
    this.hp += heal;
    console.log(`\t${this.name} now has ${this.hp} HP (+${heal})...`);
    // 40% chance to activate DEFENSE mechanism
    if (Math.random() < 0.4) {
      console.log(
        `\t%c${this.name} has activated DEFENSE!`,
        "color: black; background-color: rgb(238, 238, 83); padding: 2px; border-radius: 4px"
      );
      this.defense = true;
    }
  }
}

const blastoise = new WaterPokemon("Blastoise", 10, 1000);
const charmeleon = new FirePokemon("Charmeleon", 10, 1000);
// const firefox = new FirePokemon("Firefox", 20, 2000);
const battle1 = new Battle(blastoise, charmeleon);

// const winner = battl1111111

const joe = new Trainer("Joe");
joe.addPokemon(new FirePokemon("Charizard", 15, 1500));
joe.addPokemon(new WaterPokemon("Blastoise", 15, 2000));
joe.addPokemon(new GroundPokemon("Diglet", 5, 800));
joe.addPokemon(new ElectricPokemon("ElectaBuzz", 20, 2000));
joe.addPokemon(new ElectricPokemon("Zapdos", 30, 10000));

const jun = new Trainer("Jun");
jun.addPokemon(new FirePokemon("Charmeleon", 15, 1500));
jun.addPokemon(new WaterPokemon("Wartortoise", 15, 2000));
jun.addPokemon(new GroundPokemon("Dugtrio", 5, 800));
jun.addPokemon(new ElectricPokemon("Pikachu", 20, 2000));

const jed = new Trainer("Jed");
jed.addPokemon(new FirePokemon("Lorenz", 15, 1500));
jed.addPokemon(new WaterPokemon("Alvarez", 15, 2000));
jed.addPokemon(new GroundPokemon("Jeddi", 5, 800));
jed.addPokemon(new ElectricPokemon("Pikachu", 20, 2000));

const ken = new Trainer("Ken");
ken.addPokemon(new FirePokemon("Ken", 15, 1500));
ken.addPokemon(new WaterPokemon("Shiro", 15, 2000));
ken.addPokemon(new GroundPokemon("Marowak", 5, 800));
ken.addPokemon(new ElectricPokemon("Nonan", 20, 2000));

const test = new Trainer("test");
test.addPokemon(new FirePokemon("ss", 15, 1500));
test.addPokemon(new WaterPokemon("Shssiro", 15, 2000));
test.addPokemon(new GroundPokemon("ss", 5, 800));
test.addPokemon(new ElectricPokemon("Nondsdsan", 20, 2000));

// joeshua.viewPokedex();

// number of tournament participants must be divisible by 2
const tourna1 = new Tournament([joe, jun, jed, ken, test]);

tourna1.startTournament();

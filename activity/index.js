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

  doBattle() {
    console.log(
      `\n\n\t\tBattle between ${this.pokemon1.name} and ${this.pokemon2.name} is starting\n\n`
    );
    while (this.pokemon1.hp > 0 && this.pokemon2.hp > 0) {
      if (Math.random() < 0.5) {
        this.pokemon1.attack(this.pokemon2);
      } else {
        this.pokemon2.attack(this.pokemon1);
      }
      //ACTIVATES HEAL OF POKEMON ON 25% CHANCE
      if (Math.random() < 0.25) {
        this.pokemon1.heal();
      }
      //ACTIVATES HEAL OF POKEMON ON 25% CHANCE
      if (Math.random() < 0.25) {
        this.pokemon2.heal();
      }

      if (this.pokemon1.hp <= 0) {
        console.log(`\n\n~~\n\n${this.pokemon2.name} has won!!!\n\n~~`);
        return this.pokemon2;
      }
      if (this.pokemon2.hp <= 0) {
        console.log(`\n\n~~\n\n${this.pokemon1.name} has won!!!\n\n~~`);
        return this.pokemon1;
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
    for (let i = 0; i < arrLen / 2; i++) {
      let arr = [this.trainers[i], this.trainers[arrLen - i - 1]];
      this.pairings.push(arr);
    }
  }

  getPairs() {
    console.log(this.pairings);
  }

  startTournament() {
    console.log(`\t\t~~ TOURNAMENT IS STARTING ~~`);
    for (let trainer of this.pairings) {
      for (let i in trainer[1].pokemons) {
        let rand1 = Math.floor(Math.random() * trainer[0].pokemons.length);
        let rand2 = Math.floor(Math.random() * trainer[0].pokemons.length);
        let randomPokemon1 = trainer[0].pokemons[rand1];
        let randomPokemon2 = trainer[1].pokemons[rand2];
        this.battle = new Battle(randomPokemon1, randomPokemon2);
        this.battle.doBattle();
      }

      // this.battle = new Battle(trainer[0].selectPokemon(0), trainer[1].selectPokemon(0));
    }
  }

  // startTournament() {
  //   for (let i = 0; i < this.pairings.length; i++) {
  //     for (let j = 0; j < this.pairings[0].length; j++) {
  //       console.log(
  //         this.pairings[i][j].pokemons[
  //           Math.floor(Math.random() * this.pairings[i][j].pokemons.length)
  //         ]
  //       );
  //     }
  //   }
  // }
}

class Pokemon {
  constructor(name, type, level, hp) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.hp = hp;
    this.initialHP = hp;
    this.defense = false;
  }

  attack(opponent) {
    console.log(`\n\t${this.name} attacks ${opponent.name}!!`);
    let damage = this.level * 3;
    this.calculateDamage(opponent, damage);
  }
  calculateDamage(opponent, damage) {
    // WHEN DAMAGE IS CRITICAL MULTIPLY DAMAGE BY 2
    if (Math.random() < 0.3) {
      damage *= 2;
      console.log(`(${damage}) CRITICAL DAMAGE!! `);
    }
    // WHEN DEFENSE IS ACTIVATED REDUCE DAMAGE TAKEN
    if (opponent.defense === true) {
      damage -= opponent.level * 2;
      console.log(`${opponent.name} reduced damage due to defense`);
    }
    //WHEN POKEMON DODGES DAMAGE IS REDUCED TO 0 (15% chance of dodging)
    if (Math.random() < 0.15) {
      damage = 0;
      console.log(`${opponent.name} has dodged!`);
    }

    this.receivedDamage(opponent, damage);
  }
  receivedDamage(opponent, damage) {
    opponent.hp -= damage;
    console.log(`${opponent.name} takes -${damage}HP damage...`);

    //if opponent dies
    if (opponent.hp <= 0) {
      console.log(`${opponent.name} has fainted...`);
      this.powerUp(opponent);
    } else {
      console.log(`${opponent.name} has ${opponent.hp}HP left...`);
    }
  }

  powerUp(opponent) {
    this.initialHP += opponent.initialHP * 0.5;
    this.hp += opponent.initialHP * 0.5;
    console.log(`${this.name} has powered up! +${opponent.initialHP * 0.2} HP`);
  }

  heal() {
    const heal = 10;
    console.log(`${this.name} is using potion +10 HP...`);
    this.hp += heal;
    console.log(`${this.name} now has ${this.hp} HP...`);
    if (Math.random() < 0.4) {
      console.log(`${this.name} has activated DEFENSE!!`);
      this.defense = true;
    }
  }
}

class FirePokemon extends Pokemon {
  constructor(name, level, hp) {
    super(name, "Fire", level, hp);
  }
  attack(opponent) {
    let attacks = ["Flaming tail whip", "Flamethrower", "Fire punch"];
    let rand = Math.floor(Math.random() * attacks.length);
    console.log(`\n\t${this.name} uses ${attacks[rand]} on ${opponent.name}!!`);
    let damage = this.level * 5;

    this.calculateDamage(opponent, damage);
  }
  heal() {
    const heal = 15;
    console.log(`${this.name} is using FLASH FIRE!!`);
    this.hp += heal;
    console.log(`${this.name} now has ${this.hp} HP (+${heal})...`);
    if (Math.random() < 0.4) {
      console.log(`${this.name} has activated DEFENSE!!`);
      this.defense = true;
    }
  }
}

class ElectricPokemon extends Pokemon {
  constructor(name, level, hp) {
    super(name, "Electric", level, hp);
  }
  attack(opponent) {
    let attacks = [
      "Electro Ball",
      "Thunder Fang",
      "Thunderbolt",
      "Bolt Strike",
    ];
    let rand = Math.floor(Math.random() * attacks.length);

    console.log(`\n\t${this.name} uses ${attacks[rand]} on ${opponent.name}!!`);
    let damage = this.level * 5;

    this.calculateDamage(opponent, damage);
  }
  heal() {
    const heal = 15;
    console.log(`${this.name} is using HEAL PULSE!!`);
    this.hp += heal;
    console.log(`${this.name} now has ${this.hp} HP (+${heal})...`);
    if (Math.random() < 0.4) {
      console.log(`${this.name} has activated DEFENSE!!`);
      this.defense = true;
    }
  }
}

class WaterPokemon extends Pokemon {
  constructor(name, level, hp) {
    super(name, "Water", level, hp);
  }
  attack(opponent) {
    let attacks = ["Aqua Jet", "Hydro Pump", "Jet Punch", "Water Spout"];
    let rand = Math.floor(Math.random() * attacks.length);

    console.log(`\n\t${this.name} uses ${attacks[rand]} on ${opponent.name}!!`);
    let damage = this.level * 5;

    this.calculateDamage(opponent, damage);
  }
  heal() {
    const heal = 15;
    console.log(`${this.name} is using LIFE DEW!!`);
    this.hp += heal;
    console.log(`${this.name} now has ${this.hp} HP (+${heal})...`);
    if (Math.random() < 0.4) {
      console.log(`${this.name} has activated DEFENSE!!`);
      this.defense = true;
    }
  }
}

class GroundPokemon extends Pokemon {
  constructor(name, level, hp) {
    super(name, "Water", level, hp);
  }
  attack(opponent) {
    let attacks = ["Earth Quake", "Mud Bomb", "Sandstorm", "Scorching Sand"];
    let rand = Math.floor(Math.random() * attacks.length);

    console.log(`\n\t${this.name} uses ${attacks[rand]} on ${opponent.name}!!`);
    let damage = this.level * 5;

    this.calculateDamage(opponent, damage);
  }
  heal() {
    const heal = 15;
    console.log(`${this.name} is using SHORE UP!!`);
    this.hp += heal;
    console.log(`${this.name} now has ${this.hp} HP (+${heal})...`);
    if (Math.random() < 0.4) {
      console.log(`${this.name} has activated DEFENSE!!`);
      this.defense = true;
    }
  }
}

const blastoise = new WaterPokemon("Blastoise", 10, 1000);
const charmeleon = new FirePokemon("Charmeleon", 10, 1000);
// const firefox = new FirePokemon("Firefox", 20, 2000);
const battle1 = new Battle(blastoise, charmeleon);

// const winner = battle1.doBattle();
// console.log(winner);

const joe = new Trainer("Joe");
joe.addPokemon(new FirePokemon("Charizard", 15, 1500));
joe.addPokemon(new WaterPokemon("Blastoise", 15, 2000));
joe.addPokemon(new GroundPokemon("Diglet", 5, 800));
joe.addPokemon(new ElectricPokemon("ElectaBuzz", 20, 2000));
// joe.addPokemon(new ElectricPokemon("Zapdos", 30, 10000));

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

// joeshua.viewPokedex();

const tourna1 = new Tournament([jun, joe, ken, jed]);
// tourna1.getTrainers();
tourna1.Pair();
// tourna1.getPairs();
tourna1.startTournament();

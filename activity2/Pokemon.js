class Pokemon {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.level = 1;
    this.baseDmg = (this.level + 2) * 2;
    this.initialHP = (this.level + 6) * 2;
    this.hp = this.initialHP;
    this.hasFainted = false;
  }

  attack(opponent) {
    // opponent
    const pokeTypes = {
      Electric: {
        attacks: [
          "Thunderbolt",
          "Thunder",
          "Volt Tackle",
          "Discharge",
          "Electro Ball",
        ],
        color: "gold",
        background: "darkslategray",
        icon: "⚡",
      },
      Grass: {
        attacks: [
          "Razor Leaf",
          "Solar Beam",
          "Leech Seed",
          "Vine Whip",
          "Leaf Storm",
        ],
        color: "darkgreen",
        background: "lightgreen",
        icon: "🌿",
      },
      Fire: {
        attacks: [
          "Flamethrower",
          "Ember",
          "Fire Spin",
          "Heat Wave",
          "Fire Blast",
        ],
        color: "darkred",
        background: "orange",
        icon: "🔥",
      },
      Water: {
        attacks: [
          "Hydro Pump",
          "Water Gun",
          "Surf",
          "Aqua Tail",
          "Bubble Beam",
        ],
        color: "navy",
        background: "lightblue",
        icon: "💧",
      },
      Normal: {
        attacks: [
          "Tackle",
          "Hyper Beam",
          "Quick Attack",
          "Body Slam",
          "Double-Edge",
        ],
        color: "black",
        background: "white",
        icon: "⚪",
      },
      Fairy: {
        attacks: [
          "Dazzling Gleam",
          "Moonblast",
          "Play Rough",
          "Charm",
          "Fairy Wind",
        ],
        color: "deeppink",
        background: "lightpink",
        icon: "✨",
      },
      Flying: {
        attacks: ["Aerial Ace", "Air Slash", "Fly", "Hurricane", "Peck"],
        color: "darkblue",
        background: "skyblue",
        icon: "🕊️",
      },
      Ground: {
        attacks: ["Earthquake", "Mud-Slap", "Sand Attack", "Dig", "Bulldoze"],
        color: "saddlebrown",
        background: "beige",
        icon: "🌍",
      },
      Psychic: {
        attacks: [
          "Psychic",
          "Confusion",
          "Future Sight",
          "Psybeam",
          "Zen Headbutt",
        ],
        color: "darkviolet",
        background: "lavender",
        icon: "🔮",
      },
      Fighting: {
        attacks: [
          "Karate Chop",
          "Low Kick",
          "Focus Punch",
          "Dynamic Punch",
          "Close Combat",
        ],
        color: "darkred",
        background: "lightcoral",
        icon: "🥊",
      },
      Steel: {
        attacks: [
          "Iron Tail",
          "Metal Claw",
          "Steel Wing",
          "Flash Cannon",
          "Iron Head",
        ],
        color: "darkslategray",
        background: "silver",
        icon: "⚙️",
      },
      Poison: {
        attacks: [
          "Sludge Bomb",
          "Poison Fang",
          "Toxic",
          "Acid Spray",
          "Venoshock",
        ],
        color: "darkmagenta",
        background: "lavender",
        icon: "☠️",
      },
      Bug: {
        attacks: [
          "Bug Buzz",
          "X-Scissor",
          "String Shot",
          "Leech Life",
          "Silver Wind",
        ],
        color: "darkgreen",
        background: "lightgreen",
        icon: "🐛",
      },
    };
    // window + . {EMOJI WINDOW}
    // console.log(pokeTypes["Electric"]);

    if (opponent.hasFainted === true) {
      return;
    } else {
      console.log(
        `\t%c[LVL: ${this.level} | DMG: ${this.baseDmg} | HP: ${this.hp}] %c${this.name}%c\'s attack`,
        `color: ${pokeTypes[this.type].color}; background-color: ${
          pokeTypes[this.type].background
        }; padding: 2px; border-radius: 4px 0px 0px 4px; font-weight: bold`,
        `color: ${pokeTypes[this.type].color}; background-color: ${
          pokeTypes[this.type].background
        }; padding: 2px; border-radius: 0px 0px 0px 0px;font-weight: bold; font-style: italic; font-variant: small-caps; text-transform: uppercase;`,
        `color: ${pokeTypes[this.type].color}; background-color: ${
          pokeTypes[this.type].background
        }; padding: 2px; border-radius: 0px 4px 4px 0px; font-weight: bold; font-variant:none; font-style: normal; text-transform: lowercase;`
      );
      let attackName = pokeTypes[this.type].attacks[this.level - 1];
      // background-color: ${
      //   pokeTypes[this.type].background
      // };
      console.log(
        `\t%c${this.name} uses ${attackName} on ${opponent.name} ${
          pokeTypes[this.type].icon
        }`,
        `color: ${
          pokeTypes[this.type].color
        }; padding: 2px; border-radius: 4px; font-weight: bold`
      );
      let damage = this.baseDmg;
      this.calculateDamage(opponent, damage);
    }
  }

  calculateDamage(opponent, damage) {
    // WHEN DAMAGE IS CRITICAL
    if (Math.random() < 0.25) {
      damage *= 2;
      console.log(
        `\t%c${damage} ~CRITICAL~ `,
        "color: white; background-color: red; padding: 2px; border-radius: 4px"
      );
    }
    // WHEN DEFENSE IS ACTIVATED REDUCE DAMAGE TAKEN
    if (opponent.defense === true) {
      damage -= (opponent.level + 1) * 2;
      opponent.defense = false;
      console.log(
        `\t%c${opponent.name} has BLOCKED (reduced damage)`,
        "color: black; background-color: rgb(238, 238, 83); padding: 2px; border-radius: 4px"
      );
    }
    //WHEN POKEMON DODGES DAMAGE IS REDUCED TO 0 (15% chance of dodging)
    if (Math.random() < 0.2) {
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
      this.levelUp();
      opponent.hasFainted = true;
      opponent.hp = 0;
    } else {
      console.log(`\t${opponent.name} has ${opponent.hp}HP left...`);
    }
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
  levelUp() {
    this.initialHP *= 2;
    this.baseDmg *= 2;
    this.level += 1;

    console.log(
      `${this.name} levels up! LVL: ${this.level} DMG: ${this.baseDmg} HP: ${this.hp}`
    );
  }
}

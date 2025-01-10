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
        icon: "🧠",
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
        `\t%c[LVL: ${this.level} | DMG: ${this.baseDmg} | HP: ${this.hp}] %c${this.name}%c\'s attack (ง•̀.•́)ง`,
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
        `\t%c${damage} CRITICAL DMG 💢`,
        "color: white; background-color: red; padding: 2px; border-radius: 4px; font-weight: bold;"
      );
    }
    // WHEN DEFENSE IS ACTIVATED REDUCE DAMAGE TAKEN
    if (opponent.defense === true) {
      let reduce = (opponent.level + 1) * 2;
      damage -= reduce;
      opponent.defense = false;
      console.log(
        `\t%c${opponent.name} BLOCKED ⚔️🛡️`,
        "color: white; background-color: rgb(192, 192, 192); padding: 2px; border-radius: 4px"
      );
      console.log(`\t-${reduce} DMG`);
    }
    //WHEN POKEMON DODGES DAMAGE IS REDUCED TO 0 (15% chance of dodging)
    if (Math.random() < 0.2) {
      damage = 0;
      console.log(
        `\t%c${opponent.name} DODGED 🤸‍♀️`,
        "background-color:rgb(173, 216, 230); color:rgb(0, 0, 139); padding: 2px; border-radius: 4px; font-weight: bold"
      );
    }

    this.receivedDamage(opponent, damage);
  }
  receivedDamage(opponent, damage) {
    opponent.hp -= damage;
    console.log(`\t${opponent.name} -${damage}HP `);

    //if opponent dies
    if (opponent.hp <= 0) {
      console.log(`\t${opponent.name} has fainted...`);
      this.levelUp();
      opponent.hasFainted = true;
      opponent.hp = 0;
    } else {
      console.log(`\t${opponent.name} HP: ${opponent.hp}`);
    }
  }
  heal() {
    const heal = 10;
    console.log(
      `\t%c${this.name} uses heal ✨✨`,
      "background-color:rgb(122, 216, 122); color:rgb(20, 102, 20); padding: 2px; border-radius: 4px"
    );
    this.hp += heal;
    console.log(`\t+${heal} | ${this.name} HP: ${this.hp}`);
    // 40% chance to activate defense when healing
    if (Math.random() < 0.4) {
      console.log(
        `\t%c${this.name} activates DEFENSE 🛡️`,
        "background-color:rgb(192, 192, 192); color:rgb(0, 0, 0); padding: 2px; border-radius: 4px"
      );
      this.defense = true;
    }
  }
  levelUp() {
    this.initialHP *= 2;
    this.baseDmg *= 2;
    this.level += 1;

    console.log(
      `%c${this.name} levels up ⭐⭐! LVL: ${this.level} DMG: ${this.baseDmg} HP: ${this.hp}`,
      "font-weight: bold; background-color: rgb(0, 191, 255); color: rgb(255, 255, 255); padding: 2px; border-radius: 4px;"
    );
  }
}

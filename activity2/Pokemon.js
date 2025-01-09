class Pokemon {
  constructor(name, type, level) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.baseDmg = (level + 2) * 2;
    this.initialHP = (level + 3) * 2;
    this.hp = this.initialHP;
    this.attackList = ["Tackle", "Tail Whip", "Headbutt", "RKO"];
  }

  attack(opponent) {
    if (opponent.hasFainted === true) {
      return;
    } else {
      console.log(
        `\n\t%c${this.name}'s attack`,
        "color: black; background-color: white; padding: 2px; border-radius: 4px; font-weight: bold"
      );
      console.log(`\t${this.name} attacks ${opponent.name}!!`);
      let damage = this.level * 3;
      this.calculateDamage(opponent, damage);
    }
  }

  calculateDamage(opponent, damage) {
    // WHEN DAMAGE IS CRITICAL
    if (Math.random() < 0.3) {
      damage *= 4;
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
  levelUp() {
    this.initialHP *= 2;
    this.baseDmg *= 2;
    this.level += 1;
    console.log(
      `${this.name} levels up! LVL: ${this.level} DMG: ${this.baseDmg} HP: ${this.hp}`
    );
  }
}

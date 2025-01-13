class Battle {
  constructor(trainers) {
    this.trainers = trainers;
  }

  doBattle() {
    let trainer1 = this.trainers[0];
    let trainer2 = this.trainers[1];

    //LOOP THROUGH EACH TRAINER'S POKEMONS
    trainer1.pokemons.forEach((pokemon1, index) => {
      const pokemon2 = trainer2.pokemons[index];
      console.log(
        `%c [${trainer1.name}] v.s [${trainer2.name}] BATTLE ${index + 1}`,
        " font-size: 16px; font-weight: bold;"
      );
      console.log(
        `\t%c[${trainer1.name}] ${pokemon1.name} v.s [${trainer2.name}] ${pokemon2.name}`,
        "color: white; font-size: 14px; font-weight: bold; background-color: gold; border-radius: 4px; padding: 4px"
      );

      let counter = 0;
      // BATTLE LOOP
      while (pokemon1.hasFainted == false && pokemon2.hasFainted == false) {
        //attack
        counter % 2 == 0
          ? pokemon2.attack(pokemon1)
          : pokemon1.attack(pokemon2);

        if (pokemon1.hp <= 0) {
          console.log(
            `%c${trainer2.name}'s ${pokemon2.name} wins 🎉🥳`,
            "background-color:rgb(255, 239, 184); color:rgb(0, 0, 0); padding: 8px; border-radius: 3px; font-size:12px; font-weight:bold;"
          );
          // return this.pokemon2;
          // return trainer2;
          break;
        }
        if (pokemon2.hp <= 0) {
          console.log(
            `%c${trainer1.name}'s ${pokemon1.name} wins 🎉🥳`,
            "background-color:rgb(255, 239, 184); color:rgb(0, 0, 0); padding: 3px; border-radius: 4px; font-size:12px; font-weight:bold;"
          );
          // return this.pokemon1;
          // return trainer1;
          break;
        }

        //ACTIVATES HEAL OF POKEMON ON 25% CHANCE
        if (Math.random() < 0.25) {
          pokemon1.heal();
        }
        //ACTIVATES HEAL OF POKEMON ON 25% CHANCE
        if (Math.random() < 0.25) {
          pokemon2.heal();
        }
        counter++;
      }
    });

    // console.log(trainer1, trainer2);
    let deadPokemon1 = trainer1.pokemons.filter((e) => e.hp <= 0);
    // console.log(deadPokemon1);
    let deadPokemon2 = trainer2.pokemons.filter((e) => e.hp <= 0);
    // console.log(deadPokemon2);

    if (deadPokemon1.length < deadPokemon2.length) {
      trainer1.levelUp();
      console.log(
        `%c${trainer1.name} wins the match and advances to the next round 🎉🥳👏`,
        "font-size: 12px; font-weight: bold; background-color: rgb(255, 215, 0); color: rgb(0, 0, 0); border-radius: 4px; padding: 4px"
      );
      return trainer1;
    } else {
      trainer2.levelUp();
      console.log(
        `%c${trainer2.name} wins the match and advances to the next round 🎉🥳👏`,
        "font-size: 12px; font-weight: bold; background-color: rgb(255, 215, 0); color: rgb(0, 0, 0); border-radius: 4px; padding: 4px"
      );
      return trainer2;
    }
  }
}

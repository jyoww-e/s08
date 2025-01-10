class Trainer {
  constructor(name, pokemons) {
    this.name = name;
    this.pokemons = pokemons;
    this.level = 1;
    this.revivePokemonCnt = 0;
  }

  revivePokemons() {
    if (this.revivePokemonCnt > 0) {
      // console.log("Reviving fainted pokemons...");
      let deadPokemons = this.pokemons.filter((e) => e.hp <= 0);
      // console.log(deadPokemons);
      deadPokemons.forEach((pokemon) => {
        console.log(`%c${this.name} is reviving ${pokemon.name}`);
        pokemon.hp = pokemon.initialHP;
        pokemon.hasFainted = false;
      });
      this.revivePokemonCnt--;
    }
  }

  restPokemons() {
    this.pokemons.forEach((pokemon) => {
      pokemon.hp = pokemon.initialHP;
      pokemon.hasFainted = false;
    });
    console.log(
      `%c${this.name} has rested his Pokemon 🛏️✨`,
      "background-color: rgb(173, 216, 230); color: rgb(34, 139, 34);"
    );
  }

  levelUp() {
    this.level += 1;
    this.revivePokemonCnt += 1;
    console.log(
      `%c${this.name} levels up ⭐⭐! +1 ⚗️ (Revival Elixir)`,
      "font-weight: bold; background-color: rgb(0, 167, 223); color: rgb(255, 255, 255); padding: 2px; border-radius: 4px;"
    );
  }

  // console.log(pokemonList);
}

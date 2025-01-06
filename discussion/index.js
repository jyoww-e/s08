/*
Functions in javascript are lines/blocks
of codes that tell our device/ application
to perform a certain task when called/invoked

Function Declarations:
    -function statement defines a function with the specified
    parameters
    -parameters are placeholders listed in a function declaration or expression.
    They represent values that are passed into a function when
    it is called/invoked.
    -variables are named containers for storing data values
    (let/const)
    -variables are used to store and manipulate data
    -variables can be global or scoped variables 
    

    Syntax:
        function fnName(<?parameters>){
            code block (statement);
        }

        function keyword - used to define a javascript functions
        fnName - name of the function (user-defined)

*/

function printName() {
  console.log("My name is joe!\n");
}

// const printName = function () {
//   console.log("My name is joe!\n");
// };

//invoked/called - calling function
// printName();

/*
    ---> Cannot call a function not yet defined

Function Declaration vs Expression:

    Function declarations
    -can be created through declaration by using the function 
    keyword and adding a function name
        
        function fnName(){codeblock;}

    - Declared functions are not executed immidiately. They are
    "save for later user", and will be executed later, when they are invoked (called upon)

    - Declared Functions can be hoisted
        - Hoisting in javascript is a behavior for certain 
        variables and functions to run or use them before 
        declaration.
    
    Function Expression 
    - A function can also be stored in a variable. This is a
    function expression:

    - A function expression is an anonymous function assigned into a 
    variableFunction

    - Anonymous function - a function without a name, it cannot be hoisted

    Syntax:
        let variableFunction = function(){codeblock};
    

*/

let fnExpression = function () {
  console.log("My name is joe!\nFunction Expression");
};

fnExpression = function () {
  console.log("My name is joe!\nNew Function Expression");
};

// fnExpression();

/*
    Parameters and Arguments
*/

function printNameWithParams(myName) {
  console.log(`My name is: ${myName}`);
}

// printNameWithParams("Joe");

/*
    - "myName" is called a parameter
    
    - A parameter acts as a named variable/container
    that exists only inside a function
    
    - it is used to store information that is provided to a function
    when it is called/invoked
    
    - An argument is a value passed when invoking a function,
    this argument is then stored as the parameters within the function

*/

function argumentFunction() {
  console.log(
    "This function was passed as an argument before the message was printed."
  );
}

function invokeFunction(argumentFunction) {
  argumentFunction();
}

// invokeFunction(argumentFunction);

/*
    Object Oriented Programming (OOP)
        - OOP is a programming style based on classes and objects, it has group of data (properties) and methods (actions). It is easier to maintain.

    Class    
        - Blueprint, template for an object.

    Objects 
        - Instance of a class
        Instance
            - it refers to an object created from a class or a constructor function.
        Constructor 
            - a special method used in a class to initialize objects.
*/

// Basic instance

const person = {
  name: "Joeoeoeoe",
  age: 25,
  getAge: function () {
    return this.age;
  },
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old`
    );
  },
};

// person.greet();
// console.log(person.getAge());

class Car {
  constructor(make, model, year) {
    this.make = make; // initializes 'make' property
    this.model = model; // initializes 'model' property
    this.year = year; // initializes 'year' property
  }
  introduce(greeting) {
    console.log(
      `${greeting}, This car is a ${this.make} ${this.model} from ${this.year}`
    );
  }
  start() {
    console.log(
      `${this.make} ${this.model} ${this.year} starts... * revving sounds * broom broom`
    );
  }
}

const civic = new Car("Honda", "Civic", 2024);
// civic.introduce("Hello");

// civic.start();

// Pokemon Game

class Pokemon {
  constructor(name, type, level, hp, potions) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.hp = hp;
    this.potions = potions;
  }

  attack(opponent) {
    console.log(`${this.name} attacks ${opponent.name}!!`);
    let damage = this.level * 2;

    this.receivedDamage(opponent, damage);
  }
  receivedDamage(opponent, damage) {
    opponent.hp -= damage;
    console.log(`${opponent.name} takes -${damage}HP damage...`);
    if (opponent.hp <= 0) {
      console.log(`${opponent.name} has fainted...`);
    } else {
      console.log(`${opponent.name} has ${opponent.hp}HP left...`);
    }
  }
  getHP() {
    console.log(`${this.name}: ${this.hp} HP`);
  }
  heal() {
    const heal = 15;
    if (this.potions > 0) {
      this.potions -= 1;
      console.log(`${this.name} is using potion +15 HP...`);
      this.hp += heal;
    } else {
      console.log(`${this.name} is using potion...
        No more potions left!!!`);
    }
  }
}

class Trainer {
  constructor(name, pokemons) {
    this.name = name;
    this.pokemons = pokemons;
  }
  viewPokedex() {
    console.log(`${this.name} has:`);
    for (let i of this.pokemons) {
      console.log(`\t${i.name}`);
      //   console.log(i);
    }
  }
  addPokemon(pokemon) {
    this.pokemons.push(pokemon);
  }
  selectPokemon(index) {
    return this.pokemons[index];
  }
}

class PokemonBattle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
  }
}

const pikachu = new Pokemon("Pikachu", "Electric", 5, 100, 0);

const charmander = new Pokemon("Charmander", "Fire", 5, 100, 1);

const joeshua = new Trainer("Joeshua", [
  new Pokemon("Pikachu", "Electric", 5, 100, 1),
  new Pokemon("Jirachi", "Psychic", 10, 200, 2),
  new Pokemon("Diglett", "Ground", 3, 60, 0),
]);

// pikachu.attack(charmander);

// pikachu.attack(charmander);

// charmander.heal();
// charmander.getHP();
// charmander.attack(pikachu);

// pikachu.heal();
console.log(joeshua.pokemons);
// joeshua.viewPokedex();

/*
    Encapsulation
        - refers to the bundling of data (properties) and the methods (functions) that operate on the data within a single unit or class
    
    Abstraction
        - refers to hiding the internal details of an object and showing only the essential features or behaviors to the outside world
        
    Inheritance
        - extend Pokemon class into specific type of pokemon
        - each subclass will inherit the properties and methods from the base class but it can also have its own specific behaviors
*/
class ElectricPokemon extends Pokemon {
  constructor(name, level, hp, potions) {
    // calls the base class constructor
    super(name, "Electric", level, hp, potions);
  }
  attack(opponent) {
    console.log(`${this.name} uses Thunderbolt on ${opponent.name}`);
    let damage = this.level * 3;
    opponent.receivedDamage(opponent, damage);
  }
}

class FirePokemon extends Pokemon {
  constructor(name, level, hp, potions) {
    super(name, "Fire", level, hp, potions);
  }

  attack(opponent) {
    console.log(`${this.name} uses Flamethrower on ${opponent.name}`);
    let damage = this.level * 4;
    opponent.receivedDamage(opponent, damage);
  }
}
const firePokemon = new FirePokemon("Charizard", 5, 100, 1);

firePokemon.attack(pikachu);

/*
    Polymorphism
        - refers to the ability of a child class to override or extend the behavior of a parent class method or property

        - method overriding
            - subclasses can provide their own specific implementation of a method that is already defined in the parent class.

        - method overloading
            - multiple methods with the same name but different number of parameters

        - dynamic method resolution
            - the method that gets called depends on the object's type (not the reference type), which is determined in the runtime

*/

const Pokemon = require("./classes/Pokemon");
const Move = require("./classes/Move");

const pokeArray = [
    new Pokemon (
        "Turtwig",
        "Grass",
        5,
        [
            new Move("Tackle", "Normal", 5),
            new Move("Razor Leaf", "Grass", 6)
        ],
        {
            attack: 5,
            defense: 5,
            speed: 4,
            hp: 30
        }
    ),
    new Pokemon (
        "Chimchar",
        "Fire", 
        5,
        [
            new Move("Scratch", "Normal", 4),
            new Move("Ember", "Fire", 7)
        ],
        {
            attack: 6,
            defense: 3,
            speed: 5,
            hp: 30
        }
    ),
    new Pokemon (
        "Piplup",
        "Water",
        5,
        [
            new Move("Peck", "Flying", 3),
            new Move("Water Gun", "Water", 6)
        ],
        {
            attack: 4,
            defense: 6,
            speed: 4,
            hp: 30
        }
    )
];

module.exports = pokeArray;
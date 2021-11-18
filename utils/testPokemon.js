const Pokemon = require("./classes/Pokemon");
const Move = require("./classes/Move");

const pokeArray = [
    new Pokemon (
        "Turtwig",
        "Grass",
        5,
        [
            new Move("Tackle", "Normal", 40),
            new Move("Razor Leaf", "Grass", 40)
        ],
        {
            attack: 68,
            defense: 64,
            speed: 31,
            hp: 55
        }
    ),
    new Pokemon (
        "Chimchar",
        "Fire", 
        5,
        [
            new Move("Scratch", "Normal", 40),
            new Move("Ember", "Fire", 40)
        ],
        {
            attack: 58,
            defense: 44,
            speed: 61,
            hp: 44
        }
    ),
    new Pokemon (
        "Piplup",
        "Water",
        5,
        [
            new Move("Pound", "Normal", 40),
            new Move("Bubble", "Water", 40)
        ],
        {
            attack: 51,
            defense: 53,
            speed: 40,
            hp: 53
        }
    )
];

module.exports = pokeArray;
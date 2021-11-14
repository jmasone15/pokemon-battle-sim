const pokeArray = require("../testPokemon");

const battleFunctions = {
    getOpponentPoke: function (userPokemon) {
        switch (userPokemon) {
            case "Turtwig":
                return pokeArray.find(p => p.name === "Piplup");
            case "Chimchar":
                return pokeArray.find(p => p.name === "Turtwig");
            default:
                return pokeArray.find(p => p.name === "Chimchar");
        }
    },
};

module.exports = battleFunctions;
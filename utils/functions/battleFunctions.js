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
    getBattleHeader: function (userPokemon, opponentPokemon) {
        console.clear();
        console.log("\n\n-------------------------------------------------------\n")
        console.log(`${userPokemon.name.padEnd(25)} ${"VS".padEnd(21)} ${opponentPokemon.name}`);
        console.log(`HP: ${JSON.stringify(userPokemon.baseStats.hp).padEnd(27)}                 HP: ${opponentPokemon.baseStats.hp}`);
        console.log("\n-------------------------------------------------------\n")
    } 
};

module.exports = battleFunctions;
// Required Dependencies
const inquirer = require("inquirer");
const testPoke = require("./utils/testPokemon");
const selectStarter = require("./utils/functions/selectStarter");
const figlet = require("figlet");
const pokeArray = require("./utils/testPokemon");
const { getOpponentPoke } = require("./utils/functions/battleFunctions");

function init() {
    // Large opening header
    figlet(
        "Pokemon Battle Sim",
        function (err, data) {
            if (err) throw err;
            console.log(data);
        }
    )

    setTimeout(() => {
        selectStarter(testPoke, battle);
    }, 500);

    const battle = (starter) => {
        console.clear();
        console.log("Trainer Kelley has challenged you to a battle!\n\n");

        const userPokemon = pokeArray.find(p => p.name === starter);
        const opponentPokemon = getOpponentPoke(starter);

        console.log(userPokemon);
        console.log(opponentPokemon);
    }
};

init();
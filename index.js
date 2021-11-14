// Required Dependencies
const inquirer = require("inquirer");
const figlet = require("figlet");

// Functions and Data in other files.
const testPoke = require("./utils/testPokemon");
const selectStarter = require("./utils/functions/selectStarter");
const pokeArray = require("./utils/testPokemon");
const {
    getOpponentPoke,
    getBattleHeader,
    whoGoesFirst,
    userSelectMove,
    oppSelectMove,
    calculateDamage
} = require("./utils/functions/battleFunctions");

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
        selectStarter(testPoke, battleStart);
    }, 100);

    const battleStart = (starter) => {
        console.clear();
        console.log("Trainer Kelley has challenged you to a battle!\n");

        // Finds the user pokemon data by name.
        // Generates an opponent pokemon based on the user's pokemon.
        const userPokemon = pokeArray.find(p => p.name === starter);
        const opponentPokemon = getOpponentPoke(starter);

        setTimeout(() => {
            console.log(`Trainer Kelley sent out: ${opponentPokemon.name}!`);
        }, 100);

        setTimeout(() => {
            console.log(`You sent out: ${userPokemon.name}!\n`);
        }, 100)

        setTimeout(() => {battleMenu(userPokemon, opponentPokemon)}, 100)
    };

    const battleMenu = (userPokemon, opponentPokemon) => {
        let currentUserPoke = userPokemon;
        let currentOppPoke = opponentPokemon;

        getBattleHeader(currentUserPoke, currentOppPoke);

        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: [
                    "Fight",
                    "Forfeit"
                ]
            }
        ]).then(data => {
            if (data.choice === "Fight") {

                // Add callback or put in seperate function.
                const userMove = userPokemon.moves.find(m => {
                    m.name === userSelectMove(userPokemon.moves);
                });
                const oppMove = opponentPokemon.moves.find(m => {
                    m.name === oppSelectMove(opponentPokemon.moves);
                });

            } else {
                console.log("Forfeit");
            }
        }).catch(err => {
            if (err) throw err;
        });
    }
};

init();
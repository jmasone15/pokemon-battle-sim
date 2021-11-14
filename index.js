// Required Dependencies
const inquirer = require("inquirer");
const figlet = require("figlet");

// Functions and Data in other files.
const testPoke = require("./utils/testPokemon");
const selectStarter = require("./utils/functions/selectStarter");
const pokeArray = require("./utils/testPokemon");
const { getOpponentPoke, getBattleHeader, whoGoesFirst, userSelectMove, oppSelectMove } = require("./utils/functions/battleFunctions");

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
    }, 100);

    const battle = (starter) => {
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

        setTimeout(() => {
            getBattleHeader(userPokemon, opponentPokemon);

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
                    // Checks speed to see which pokemon goes first.
                    let first = whoGoesFirst(userPokemon, opponentPokemon);
                    let second;
                    let firstMove;
                    let secondMove;

                    if (first === userPokemon) {
                        second = opponentPokemon;
                        firstMove = userSelectMove(userPokemon.moves);
                        secondMove = oppSelectMove(opponentPokemon.moves);
                    } else {
                        second = userPokemon;
                        firstMove = oppSelectMove(opponentPokemon.moves);
                        secondMove = userSelectMove(userPokemon.moves);
                    }

                } else {
                    console.log("Forfeit");
                };
            }).catch(err => {
                if (err) throw err;
            })
        }, 100)
    }
};

init();
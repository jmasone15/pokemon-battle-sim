// Required Dependencies
const inquirer = require("inquirer");
const figlet = require("figlet");

// Functions and Data in other files.
const testPoke = require("./utils/testPokemon");
const pokeArray = require("./utils/testPokemon");
const {
    getOpponentPoke,
    getBattleHeader,
    oppSelectMove,
    battleText,
    determineFirst,
    calculateDamage,
    checkPokeHealth
} = require("./utils/functions/battleFunctions");

function init() {
    // Large opening header
    figlet(
        "Pokemon Battle Sim",
        function (err, data) {
            if (err) throw err;
            console.log(data);
        }
    );

    setTimeout(() => {
        console.clear();

        inquirer.prompt([
            {
                type: "list",
                name: "select",
                message: "Which starter would you like?",
                choices: testPoke.map(({ name }) => name)
            }
        ]).then(data => {
            console.clear();
            console.log(`You selected: ${data.select}!`);
            return setTimeout(() => {
                battleStart(data.select);
            }, 3000);
        }).catch(err => {
            if (err) throw err;
            console.log("Something went wrong!")
        });
    }, 1500);

    const battleStart = (starter) => {
        console.clear();
        console.log("Trainer Kelley has challenged you to a battle!\n");

        // Finds the user pokemon data by name.
        // Generates an opponent pokemon based on the user's pokemon.
        const userPokemon = pokeArray.find(p => p.name === starter);
        const opponentPokemon = getOpponentPoke(starter);

        setTimeout(() => {
            console.log(`Trainer Kelley sent out: ${opponentPokemon.name}!`);
        }, 1500);

        setTimeout(() => {
            console.log(`You sent out: ${userPokemon.name}!\n`);
        }, 3000)

        setTimeout(() => {battleMenu(userPokemon, opponentPokemon)}, 4500)
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
                console.clear();

                // Select user move.
                inquirer.prompt([
                    {
                        type: "list",
                        name: "move",
                        message: "Select a move:",
                        choices: userPokemon.moves
                    }
                ]).then(data => {

                    let attackObject = {
                        firstPoke: "",
                        secondPoke: "",
                        firstMove: "",
                        secondMove: "",
                        firstMoveDamage: "",
                        secondMoveDamage: ""
                    }
                    
                    const userMove = userPokemon.moves.find(m => m.name === data.move);
                    const oppMove = oppSelectMove(opponentPokemon.moves);
                    const attackOrder = determineFirst(currentUserPoke, currentOppPoke, userMove, oppMove);

                    attackObject.firstPoke = attackOrder.first;
                    attackObject.secondPoke = attackOrder.second;
                    attackObject.firstMove = attackOrder.firstMove;
                    attackObject.secondMove = attackOrder.secondMove;
                    attackObject.firstMoveDamage = calculateDamage(attackOrder.first, attackOrder.second, attackOrder.firstMove);
                    attackObject.secondMoveDamage = calculateDamage(attackOrder.second, attackOrder.first, attackOrder.secondMove);

                    battleText(userPokemon, attackObject, checkPokeHealth, battleMenu, battleEnd);
                }).catch(err => {
                    if (err) throw err;
                });

            } else {
                battleEnd(opponentPokemon);
            }
        }).catch(err => {
            if (err) throw err;
        });
    };

    const battleEnd = (winnerPoke) => {
        console.clear();
        console.log(`${winnerPoke.name} has won the battle!`);
        setTimeout(() => {
            inquirer.prompt([
                {
                    type: "list",
                    name: "option",
                    message: "Would you like to play again?",
                    choices: [
                        "Yes",
                        "No"
                    ]
                }
            ]).then(data => {
                if (data.choice === "Yes") {
                    init();
                } else {
                    return console.log("Thanks for playing!")
                }
            }).catch(err => {
                if (err) throw err;
                console.log("Something went wrong.");
            })
        }, 1500);
    }
};

init();
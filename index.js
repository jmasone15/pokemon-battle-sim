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

    // User selects their starter Pokemon, which is passed into battleStart()
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

    // Starts the battle
    // Grabs the both the user's and opponent's pokemon data.
    // Sends out a series of logs in sequence.
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

    // Main function of the battle.
    const battleMenu = (userPokemon, opponentPokemon) => {

        // This is the object that will be updated with the pokemon's stats when they change.
        // Right now the only stat changing is health points.
        let currentUserPoke = userPokemon;
        let currentOppPoke = opponentPokemon;

        // Big Box with current Pokemon data.
        getBattleHeader(currentUserPoke, currentOppPoke);

        // User can either fight or forfeit.
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

                // User is prompted to select a move from the array of moves in the poke data.
                inquirer.prompt([
                    {
                        type: "list",
                        name: "move",
                        message: "Select a move:",
                        choices: currentUserPoke.moves
                    }
                ]).then(data => {
                
                    // Finds the user's move data based on the move name they selected.
                    // Randomly selects the opponents move.
                    const userMove = userPokemon.moves.find(m => m.name === data.move);
                    const oppMove = oppSelectMove(currentOppPoke.moves);

                    // Determines the order of attacks based on the pokemon's speed.
                    // If Pokemon speeds are equal, coin flip will determine the first attacker.
                    const attackOrder = determineFirst(currentUserPoke, currentOppPoke, userMove, oppMove);

                    // Object of all atatck data to be pushed into the battleText function.
                    const attackObject = {
                        firstPoke: attackOrder.first,
                        secondPoke: attackOrder.second,
                        firstMove: attackOrder.firstMove,
                        secondMove: attackOrder.secondMove,
                        firstMoveDamage: calculateDamage(attackOrder.first, attackOrder.second, attackOrder.firstMove),
                        secondMoveDamage: calculateDamage(attackOrder.second, attackOrder.first, attackOrder.secondMove)
                    };

                    // Function that prints out the attack data and adjusts pokemon stats accordingly.
                    battleText(currentUserPoke, attackObject, checkPokeHealth, battleMenu, battleEnd);

                }).catch(err => {

                    if (err) throw err;
                    console.log("Something went wrong!");

                });

            } else {

                // Ends the battle
                battleEnd(currentOppPoke);
            }
        }).catch(err => {
            if (err) throw err;
        });
    };

    const battleEnd = (winnerPoke) => {

        // Prints out the winner pokemon and asks the user if they want to play again.
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
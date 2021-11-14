const inquirer = require("inquirer");
const pokeArray = require("../testPokemon");

const battleFunctions = {
    getOpponentPoke: (userPokemon) => {
        switch (userPokemon) {
            case "Turtwig":
                return pokeArray.find(p => p.name === "Piplup");
            case "Chimchar":
                return pokeArray.find(p => p.name === "Turtwig");
            default:
                return pokeArray.find(p => p.name === "Chimchar");
        }
    },
    getBattleHeader: (userPokemon, opponentPokemon) => {
        console.clear();
        console.log("\n\n-------------------------------------------------------\n")
        console.log(`${userPokemon.name.padEnd(25)} ${"VS".padEnd(21)} ${opponentPokemon.name}`);
        console.log(`HP: ${JSON.stringify(userPokemon.baseStats.hp).padEnd(27)}                 HP: ${opponentPokemon.baseStats.hp}`);
        console.log("\n-------------------------------------------------------\n")
    },
    whoGoesFirst: (userPokemon, opponentPokemon) => {
        const userSpeed = userPokemon.baseStats.speed;
        const oppSpeed = opponentPokemon.baseStats.speed;

        if (userSpeed > oppSpeed) {
            return userPokemon
        } else if (oppSpeed > userSpeed) {
            return opponentPokemon
        } else {
            let chance = Math.round(Math.random()) + 1;
            if (chance === 1) {
                return userPokemon
            } else {
                return opponentPokemon
            }
        }
    },
    userSelectMove: (moves) => {
        inquirer.prompt([
            {
                type: "list",
                name: "move",
                message: "Select a move:",
                choices: moves
            }
        ]).then(data => {
            return data.move
        }).catch(err => {
            if (err) throw err;
        })
    },
    oppSelectMove: (moves) => {
        let chance = Math.round(Math.random()) + 1;
        if (chance === 1) {
            return moves[0]
        } else {
            moves[1]
        }
    }
};

module.exports = battleFunctions;
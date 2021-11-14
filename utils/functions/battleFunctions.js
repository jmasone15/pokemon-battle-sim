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
    },
    calculateDamage: (attackPoke, defensePoke, move) => {
        const power = selectedMove.power;
        const attack = attackPoke.baseStats.attack;
        const defense = defensePoke.baseStats.defense;
        const modifier = this.calculateModifier(attackPoke, defensePoke, move);

        const baseDamage = (0.5 * power * (attack / defense) * 1) + 1;
        const totalDamage = baseDamage * modifier.mod;

        if (modifier.crit === 2) {
            console.log("Critical Hit!")
        };
        if (modifier.type === 0.5) {
            console.log("It's not very effective...")
        };
        if (modifier.type === 2) {
            console.log("It's super effective!")
        };

        console.log(totalDamage);
        console.log(modifier);
        return totalDamage;
    },
    calculateModifier: (attackPoke, defensePoke, move) => {
        let isCritical = 1;
        let isSTAB = 1;
        let typeMod = this.calculateEffective(defensePoke, move);
        const critChance = Math.floor(Math.random() * 11);

        if (critChance >= 9) {
            isCritical = 2;
        };
        if (move.type === attackPoke.type) {
            isSTAB = 1.5
        };
        
        const modifier = {
            mod: isCritical * isSTAB * typeMod,
            crit: isCritical,
            type: typeMod
        };

        return modifier;
    },
    // Need to change to include all types.
    calculateEffective: (defensePoke, move) => {
        let moveType = move.type;
        let pokeType = defensePoke.type;

        if (pokeType === "Grass") {

            if (moveType === "Grass") {
                return 0.5
            } else if (moveType === "Water") {
                return 0.5
            } else if (moveType === "Fire") {
                return 2
            } else {
                return 1
            }

        } else if (pokeType === "Fire") {
            
            if (moveType === "Grass") {
                return 0.5
            } else if (moveType === "Water") {
                return 2
            } else if (moveType === "Fire") {
                return 0.5
            } else {
                return 1
            }

        } else {

            if (moveType === "Grass") {
                return 2
            } else if (moveType === "Water") {
                return 0.5
            } else if (moveType === "Fire") {
                return 0.5
            } else {
                return 1
            }

        }
    }
};

module.exports = battleFunctions;
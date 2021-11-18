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
    determineFirst: (userPokemon, opponentPokemon, userMove, oppMove) => {
        const userSpeed = userPokemon.baseStats.speed;
        const oppSpeed = opponentPokemon.baseStats.speed;

        const userPokeFirst = {
            first: userPokemon,
            firstMove: userMove,
            second: opponentPokemon,
            secondMove: oppMove
        };
        const oppPokeFirst = {
            first: opponentPokemon,
            firstMove: oppMove,
            second: userPokemon,
            secondMove: userMove
        };

        if (userSpeed > oppSpeed) {
            return userPokeFirst
        } else if (oppSpeed > userSpeed) {
            return oppPokeFirst
        } else {
            let chance = Math.round(Math.random()) + 1;
            if (chance === 1) {
                return userPokeFirst
            } else {
                return oppPokeFirst
            }
        }
    },
    oppSelectMove: (moves) => {
        let chance = Math.round(Math.random()) + 1;
        if (chance === 1) {
            return moves[0]
        } else {
            return moves[1]
        }
    },
    battleText: (userPokemon, attackObject, next, next2, end) => {
        console.clear();
        // First Pokemon Attack Logs
        console.log(`${attackObject.firstPoke.name} used ${attackObject.firstMove.name}!`);
        if (attackObject.firstMoveDamage.damageMessage.length != 0) {
            for (let i = 0; i < attackObject.firstMoveDamage.damageMessage.length; i++) {
                console.log(attackObject.firstMoveDamage.damageMessage[i]);
            }
        }

        setTimeout(() => {
            console.log(`${attackObject.secondPoke.name} took ${attackObject.firstMoveDamage.totalDamage} damage!`);
            attackObject.secondPoke.baseStats.hp -= attackObject.firstMoveDamage.totalDamage;
        }, 1250);

        // Second Pokemon Attack Logs
        setTimeout(() => {
            console.log(`${attackObject.secondPoke.name} used ${attackObject.secondMove.name}!`);
            if (attackObject.secondMoveDamage.damageMessage.length != 0) {
                for (let i = 0; i < attackObject.secondMoveDamage.damageMessage.length; i++) {
                    console.log(attackObject.secondMoveDamage.damageMessage[i]);
                }
            }
        }, 2500);

        setTimeout(() => {
            console.log(`${attackObject.firstPoke.name} took ${attackObject.secondMoveDamage.totalDamage} damage!`);
            attackObject.firstPoke.baseStats.hp -= attackObject.secondMoveDamage.totalDamage;
        }, 3750);

        setTimeout(() => {
            next(attackObject.firstPoke, attackObject.secondPoke, userPokemon, next2, end);
        }, 5000);
    },
    calculateDamage: (attackPoke, defensePoke, move) => {
        const power = move.power;
        const attack = attackPoke.baseStats.attack;
        const defense = defensePoke.baseStats.defense;
        const level = attackPoke.level;

        let moveType = move.type;
        let pokeType = defensePoke.type;

        let isCritical = 1;
        let isSTAB = 1;
        let typeMod = 1;
        const critChance = Math.floor(Math.random() * 11);

        if (critChance >= 9) {
            isCritical = 2;
        };
        if (move.type === attackPoke.type) {
            isSTAB = 1.5
        };

        if (pokeType === "Grass") {

            if (moveType === "Grass") {
                typeMod += 0.5
            } else if (moveType === "Water") {
                typeMod = 0.5
            } else if (moveType === "Fire") {
                typeMod = 2
            } else if (moveType === "Flying") {
                typeMod = 2
            }

        } else if (pokeType === "Fire") {

            if (moveType === "Grass") {
                typeMod = 0.5
            } else if (moveType === "Water") {
                typeMod = 2
            } else if (moveType === "Fire") {
                typeMod = 0.5
            } else if (moveType === "Flying") {
                typeMod = 1
            }

        } else if (pokeType === "Water") {

            if (moveType === "Grass") {
                typeMod = 2
            } else if (moveType === "Water") {
                typeMod = 0.5
            } else if (moveType === "Fire") {
                typeMod = 0.5
            } else if (moveType === "Flying") {
                typeMod = 1
            }
        }

        const modifier = {
            mod: isCritical * isSTAB * typeMod,
            crit: isCritical,
            type: typeMod
        };

        const baseDamage = ((((((level * 2) / 5) + 2) * power * (attack / defense)) / 50) + 2);
        let damageObject = {
            totalDamage: Math.round(baseDamage * modifier.mod),
            damageMessage: [],
        }

        if (modifier.crit === 2) {
            damageObject.damageMessage.push("Critical Hit!");
        };
        if (modifier.type === 0.5) {
            damageObject.damageMessage.push("It's not very effective...")
        };
        if (modifier.type === 2) {
            damageObject.damageMessage.push("It's super effective!")
        };

        return damageObject;
    },
    checkPokeHealth: (firstPoke, secondPoke, userPokemon, next, end) => {
        if (secondPoke.baseStats.hp <= 0) {
            return end(firstPoke);
        } else if (firstPoke.baseStats.hp <= 0) {
            return end(secondPoke);
        } else {
            if (userPokemon.name === firstPoke.name) {
                return next(firstPoke, secondPoke)
            } else {
                return next(secondPoke, firstPoke)
            }
        }
    }
};

module.exports = battleFunctions;
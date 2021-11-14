const inquirer = require("inquirer");

function selectStarter(choices, next) {
    console.clear();

    inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "Which starter would you like?",
            choices: choices.map(({ name }) => name)
        }
    ]).then(data => {
        console.clear();
        console.log(`You selected: ${data.select}!`);
        return setTimeout(() => {
            next(data.select);
        }, 1500);
    }).catch(err => {
        if (err) throw err;
        console.log("Something went wrong!")
    });
};

module.exports = selectStarter;
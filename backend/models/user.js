const Sequelize = require("sequelize");
const sequelize = require("../db/db.instance");

const user = sequelize.define(
    "user",
    {
        username: {
            type: Sequelize.STRING,
            allowNull: null,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        level: {
            type: Sequelize.STRING,
            defaultValue: "normal"
        }
    },
    {
        //option
    }
);

(async()=>{
    await user.sync({force: false});
})();

module.exports = user;
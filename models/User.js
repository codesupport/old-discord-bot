// Dependencies
const app = require("./../app.js");

const Sequelize = app.Sequelize;
const sql = app.sql;

const User = sql.define("user", {
	discordId: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false
});

module.exports = User;
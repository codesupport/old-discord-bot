// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);

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

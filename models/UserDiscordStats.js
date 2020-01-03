// Dependencies
const app = require(`${_ROOT_DIR}/app.js`);

const Sequelize = app.Sequelize;
const sql = app.sql;

const UserDiscordStats = sql.define("userDiscordStats", {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	messageCount: {
		type: Sequelize.INTEGER
	},
	lastShowcasePost: {
		type: Sequelize.STRING
	}
}, {
	timestamps: false
});

module.exports = UserDiscordStats;

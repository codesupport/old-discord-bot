// Dependencies
const app = require("./../app.js");

const Sequelize = app.Sequelize;
const sql = app.sql;

const UserProfile = sql.define("userProfiles", {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	bio: {
		type: Sequelize.STRING
	},
	git: {
		type: Sequelize.STRING
	},
	countryId: {
		type: Sequelize.STRING
	}
}, {
	timestamps: false
});

module.exports = UserProfile;
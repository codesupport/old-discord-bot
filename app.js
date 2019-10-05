// Local Dependencies
const config = require("./config.json");

// Package Dependencies
const Discord = require("discord.js");

// Setup the Discord Client
const client = new Discord.Client({
	fetchAllMembers: true
});


// Log the client in to establish a connection to Discord.
client.login(config.discord_token).then(() => {
	console.log(`Successfully connected to Discord as '${client.user.username}'.`);
}).catch(console.error);
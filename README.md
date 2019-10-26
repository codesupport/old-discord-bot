# CodeSupport Discord Bot

## Dependancies
### Production
- [discord.js](https://www.npmjs.com/package/discord.js)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [mysql2](https://www.npmjs.com/package/mysql2)

### Development
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-codesupport](https://www.npmjs.com/package/eslint-config-codesupport)

## Setup
1. Setup a local MySQL database using our [table creation syntax](https://github.com/codesupport/table-create-syntax)
2. Create a Discord bot via Discord's [Developer Portal](https://discordapp.com/developers/applications/)
3. Navigate into the repository on your local disc and run `npm i` 
4. To start the bot type `DISCORD_TOKEN=<YOUR_DISCORD_TOKEN> MYSQL_HOST=<YOUR_MYSQL_HOST> MYSQL_USER=<YOUR_MYSQL_USERNAME> MYSQL_PASSWORD=<YOUR_MYSQL_PASSWORD> MYSQL_DATABASE=<YOUR_MYSQL_DATABASE> npm start`

## Adding Commands
1. Create a file in the `commands` directory called `<your_command>.js`
2. Copy [this](https://gist.github.com/LamboCreeper/516ecb352ff82465ad2ab19aebe69fc4) template into your file
3. Customise the properties to meet your liking:
	- `command` is the command people will run e.g. `?profile` (don't include the prefix)
	- `description` is the command's description, this is displayed in `?commands`
	- `prefix` is wether or not the command requires a prefix to be ran
	- `arguments` is an array of arguments, this is used to:
		- decide how the command should be ran
		- display the correct usage in `?commands`
	- `visible` is wether or not the command appears in `?commands`
	- `botchat` is wether or not the command can only be executed in the bot chat
4. Add all your logic into the `run()` function.

Notes:
- If your command accepts arguments you will want to use [this](https://gist.github.com/LamboCreeper/21879a5cb2e56d1e70b66c038635188a) template instead
- Use `<argument>` for required arguments and `[argument]` for optional arguments

**Any Questions?** Feel free to mention @LamboCreeper#6510 in the CodeSupport Discord.
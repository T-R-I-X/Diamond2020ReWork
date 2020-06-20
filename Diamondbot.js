/* eslint-disable no-console */
const commando = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const botconfig = require('./configs/botconfig');
const { Warns } = require('./Helpers/WarnSystem/index');

//-- Creating the commando client
const client = new commando.Client({
  owner: '261167188193443841',
  commandPrefix: 'd!',
  unknownCommandResponse: false,
  invite: 'https://discord.gg/Ym5BnJU',
  disableEveryone: true
});

//-- Disabling client ready
client.ready = false;

//-- Logger
const logger = require('./Helpers/UtilsFunctions/WinstonLogger');
const { cli } = require('winston/lib/winston/config');
winstonlogger = new logger();
client.logger = winstonlogger;

//-- Utils
client.utils = "Utils for Diamond"
client.utils.messages = require('./Helpers/UtilsFunctions/MessageFunctions');
client.utils.numbers = require('./Helpers/UtilsFunctions/NumberFunctions');
client.utils.checks = require('./Helpers/UtilsFunctions/CheckFunctions');

//-- Database
client.database = require('./Helpers/DatabaseSystem/index')();

//-- All important events
client
  .on('disconnect', () => { winstonlogger.warn('Diamond has disconnected!'); })
  .on('reconnecting', () => { winstonlogger.warn('Diamond is trying to reconnect'); })
  .on('commandError', (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    winstonlogger.error(`Command ${cmd.groupID}:${cmd.memberName}\n ${err.stack}`);
  });

//-- Setting the warnsystem up
client.warnsystem = new Warns ({    
  datebase: 'sqlite' 
});

//-- Registering types, groups, commands
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['utils', 'Utils'],
    ['moderation','Moderation'],
    ['owner','Owner']
  ])
  .registerCommandsIn(path.join(__dirname, 'commands'));

//-- Login to the bot client
client.login(botconfig.bot.token);

//-- Event handler
fs.readdir(path.join(__dirname,'./Assets/Events/'), (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const eventFunction = require(`./Assets/Events/${file}`);
            if (eventFunction.disabled) return;
            let eventName = file.split(".")[0];
            try {
              client.on(eventName, (...args) => eventFunction.run(client, ...args));
            }
            catch (error) {
              console.error(error.stack);
          }
    });
});
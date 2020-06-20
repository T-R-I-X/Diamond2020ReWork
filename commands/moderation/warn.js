const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class WarnCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'warn',
      aliases: ['warnuser'],
      group: 'moderation',
      memberName: 'warn',
      description: 'Warns a user for doing something.',
      examples: ['warn @randomuser for being a member', 'warnuser @randomuser for being a friend'],
      guildOnly: false,
      args: [
        {
          key: 'member',
          label: 'user',
          prompt: 'What user are you warning?',
          type: 'member'
        },
        {
          key: 'text',
          label: 'reason',
          prompt: 'What are you warning this user for?',
          type:'string'
        }
      ]
    });
  }

  async run(msg, args) {
    const member = args.member;
    const user = member.user;
    const reason = args.text;
    const moderator = msg.author;

    const warns = this.client.warnsystem

    const addWarn = warns.Add({id: user.id,mod: moderator.id, reason: reason});

    if (addWarn != null) {
    // Setting up the embed
    const Embed = new RichEmbed()
    .addField(`**▶ Warned user**`,`‎‏‏‎ ‎‎`)
    .addField(`• User:`,`${user.username}#${user.discriminator}`,true)
    .addField(`• Moderator:`,`${moderator.username}#${moderator.discriminator}`,true)
    .addField(`• Reason:`,`${reason}`,false)
    .setColor('ORANGE')
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL);

    return msg.embed(Embed);
    } else {
        return msg.reply('error!')
    }
  }
};

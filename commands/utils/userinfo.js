const { RichEmbed } = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class UserInfoCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      aliases: ['whois'],
      group: 'utils',
      memberName: 'userinfo',
      description: 'Gets information about a user.',
      examples: ['userinfo @randomuser', 'whois @randomuser'],
      guildOnly: false,
      args: [
        {
          key: 'member',
          label: 'user',
          prompt: 'What user are you looking for?',
          type: 'member'
        }
      ]
    });
  }

  async run(msg, args) {
    const member = args.member;
    const user = member.user;

    // Setting up the embed
    const Embed = new RichEmbed()
    .setDescription(`${user.username}#${user.discriminator} ID: ${user.id}`)
    .addField(`**▶ Server member details**`,`‎‏‏‎ ‎‎`)
    .addField(`• Nickname:`,`${member.nickname ? member.nickname : 'none'}`,true)
    .addField(`• Joined server at:`,`${member.joinedAt}`,true)
    .addField(`• Created at:`,`${user.createdAt}${user.bot ? ', bot account' : ''}`,true)
    .addField(`• Roles:`, `${member.roles.map(roles => `<@&${roles.id}>` ).join(' ')}`)
    .addField(`**▶ User Details**`,`‏‏‎ ‎`)
    .addField(`• Status:`,`${user.presence.status}`,true)
    .addField(`• Game:`, `${user.presence.game ? user.presence.game.name : 'Nothing!'}`,true)
    .setColor('BLUE')
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL); 

    return msg.embed(Embed);
  }
};

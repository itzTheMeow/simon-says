const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (
    !message.member.roles.has(bot.rolez.admin) &&
    !message.member.roles.has(bot.rolez.simon)
  )
    return;

  let member = message.mentions.members.first();
  if (!member) return message.channel.send("Mention a user to make simon!");

  bot.guild.members
    .filter(mem => mem.roles.has(bot.rolez.simon))
    .forEach(m => {
      m.removeRole(bot.rolez.simon);
      m.addRole(bot.rolez.disqualified);
    });
  member.addRole(bot.rolez.simon);

  message.channel.send("I have made **" + member.user.tag + "** Simon!");
  message.delete();
};
module.exports.help = {
  name: "makesimon",
  description: "Make a user Simon.",
  usage: "makesimon [user]",
  commandAliases: []
};

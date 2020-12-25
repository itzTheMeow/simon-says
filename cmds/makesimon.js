const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (
    !message.member.roles.cache.has(bot.config.roles.admin) &&
    !message.member.roles.cache.has(bot.config.roles.simon)
  )
    return;

  let member = message.mentions.members.first();
  if (!member) return message.channel.send("Mention a user to make simon!");

  bot.guild.members.cache
    .filter((mem) => mem.roles.cache.has(bot.config.roles.simon))
    .forEach((m) => {
      m.roles.remove(bot.config.roles.simon);
      m.roles.add(bot.config.roles.disqualified);
    });
  member.addRole(bot.rolez.simon);

  message.channel.send(`I have made **${member.user.tag}** Simon!`);
  message.delete();
};
module.exports.help = {
  name: "makesimon",
  description: "Make a user Simon.",
  usage: "makesimon [user]",
  commandAliases: [],
};

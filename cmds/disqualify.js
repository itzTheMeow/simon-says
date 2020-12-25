const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (
    !message.member.roles.cache.has(bot.config.roles.simon) &&
    !message.member.roles.cache.has(bot.config.roles.admin)
  )
    return;
  let mem = message.mentions.members.first();
  if (!mem) return;

  mem.roles.add(bot.config.roles.disqualified);
  mem.roles.remove(bot.config.roles.playing);
  message.channel.send(`Disqualified **${mem.user.tag}**!`);
  bot.guild.channels.cache.get(bot.config.channels.lobby).send(`${mem}, welcome to the club!`);
  message.delete();
};
module.exports.help = {
  name: "disqualify",
  description: "Disqualifies a user.",
  usage: "disqualify",
  commandAliases: ["disc", "disq", "d"],
};

const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.has(bot.rolez.simon) && !message.member.roles.has(bot.rolez.admin)) return;
  let mem = message.mentions.members.first();
  if (!mem) return;

  mem.addRole(bot.rolez.disqualified);
  mem.removeRole(bot.rolez.playing);
  message.channel.send("Disqualified **" + mem.user.tag + "**!");
  bot.channelz.lobby.send(mem + ", welcome to the club!");
  message.delete();
};
module.exports.help = {
  name: "disqualify",
  description: "Disqualifies a user.",
  usage: "disqualify",
  commandAliases: ["disc", "disq", "d"]
};

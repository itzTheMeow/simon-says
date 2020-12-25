const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let chosen = "Nobody, HAH";
  let mems = bot.guild.members.cache.filter((m) => !m.user.bot).array();
  chosen = mems[Math.floor(Math.random() * mems.length)];
  message.channel.send("I choose " + chosen.toString() + "!");
};
module.exports.help = {
  name: "random",
  description: "Pick a random user in the server.",
  usage: "random",
  commandAliases: ["randomuser", "randomsimon"],
};

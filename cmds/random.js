const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let chosen = "NOBODY, HOE";
  let mems = bot.guild.members.filter(m => !m.user.bot).array();
  chosen = mems[Math.floor(Math.random() * mems.length)];
  message.channel.send("I choose " + chosen + "!");
};
module.exports.help = {
  name: "random",
  description: "Pick a random user in the server.",
  usage: "random",
  commandAliases: ["randomuser", "randomsimon"]
};

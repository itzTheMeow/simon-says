const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send("Pong!");
};
module.exports.help = {
  name: "ping",
  description: "Replies to you",
  usage: "ping",
  commandAliases: []
};

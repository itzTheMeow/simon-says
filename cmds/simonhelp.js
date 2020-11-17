const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let e = {
    title: "Simon Help",
    description:
      "Use `?start` to start the game. Use `?disc [user]` to disqualify someone. Use `?stop` to stop the game!\nRemember to read ?rules.",
    color: 3092790
  };

  (message.mentions.members.first() || message.channel).send({
    embed: e
  });
  message.delete();
};
module.exports.help = {
  name: "simonhelp",
  description: "Sends help about being simon!",
  usage: "simonhelp <user>",
  commandAliases: []
};

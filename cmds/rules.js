const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let e = {
    title: "Rules",
    description:
      "You are NOT allowed to use lowercase L (l) and uppercase I (I) in `simon`. They are literally impossible to tell apart! Here are them next to eachother: Il",
    color: 3092790,
  };

  (message.mentions.members.first() || message.channel).send({
    embed: e,
  });
  message.delete();
};
module.exports.help = {
  name: "rules",
  description: "Sends the rules in the channel or to the user you mention.",
  usage: "rules <user>",
  commandAliases: [],
};

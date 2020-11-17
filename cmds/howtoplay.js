const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send({
    embed: {
      title: "How to Play Simon Says",
      description:
        "If someone says `simon says [thing]` then you do it.\nIf someone does NOT say `simon says [thing]` then you do NOT do it.",
      color: 10070709
    }
  });
};
module.exports.help = {
  name: "howtoplay",
  description: "Shows you how to play Simon Says.",
  usage: "howtoplay",
  commandAliases: ["instructions", "how", "howto"]
};

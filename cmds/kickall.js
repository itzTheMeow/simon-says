const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.has(bot.rolez.admin)) return;

  bot.guild.members.forEach(async m => {
    if (m.roles.has(bot.rolez.admin) || m.roles.has(bot.rolez.bot)) return;
    try {
      await m.send(args.slice(1).join(" ") || "Thanks for playing!");
    } catch (e) {}
    await m.kick();
  });
  message.channel.send("Kicked all members!");
  message.delete();
};
module.exports.help = {
  name: "kickall",
  description: "Kick all members from the server.",
  usage: "kickall <message>",
  commandAliases: []
};

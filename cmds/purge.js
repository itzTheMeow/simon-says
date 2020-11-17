const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.has(bot.rolez.admin)) return;
  let num = Number(args[1]) || 100;
  if (num > 100) num = 100;
  if (num < 1) num = 1;

  await message.channel.bulkDelete(num);
  await message.channel.send("Deleted **" + num + "** messages!").then(msg => {
    msg.delete(4500);
  });
  message.delete();
};
module.exports.help = {
  name: "purge",
  description: "Purges messages in a channel.",
  usage: "purge <number>",
  commandAliases: ["clean", "clear"]
};

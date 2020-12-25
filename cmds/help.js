const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  let cmds = [];

  Object.keys(bot.commandDescriptions).forEach((cmd) => {
    cmds.push(cmd);
  });

  cmds.sort();

  const helpEmbed = new Discord.MessageEmbed()
    .setAuthor("Simon Says Help", message.author.displayAvatarURL)
    .setFooter("Commands", bot.user.displayAvatarURL);

  let cmd = args[1];

  if (!cmd) {
    helpEmbed.setDescription(
      `Use \`${bot.prefix}help <command>\` to view help on a specific command.
These are **[**required**]** and **<**optional**>** fields.`
    );
    helpEmbed.addField(`All Commands | ${cmds.length}`, `\`${cmds.join("`, `")}\``);
    message.channel.send(helpEmbed);
    return;
  }

  if (cmd in bot.commandDescriptions) {
    let aliases = [];

    bot.commandAliases.forEach((a) => {
      if (a.for == cmd) aliases = a.aliases;
    });

    if (aliases.length >= 1) {
      aliases = "`" + aliases.join("`, `") + "`";
    } else {
      aliases = "none";
    }

    helpEmbed.setFooter("The " + cmd + " Command");
    helpEmbed.setDescription(
      `${bot.commandDescriptions[cmd]}

**Usage:** ${bot.commandUsages[cmd]}
**Type:** ${bot.commandTypes[cmd]}
**Aliases:** ${aliases}`
    );
    message.channel.send(helpEmbed);
    return;
  }
  if (!(cmd in bot.commandDescriptions))
    return message.channel.send("That command does not exist!");
};
module.exports.help = {
  name: "help",
  description: "Shows you the commands in the bot.",
  usage: "help <command>",
  commandAliases: ["commands", "cmds"],
};

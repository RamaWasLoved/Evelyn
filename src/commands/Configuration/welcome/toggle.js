const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const GDB = require('../../../structures/schemas/guild.js');

module.exports = {
    subCommand: "welcome.toggle",
    /**
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guildId } = interaction;
        const data = await GDB.findOne({ id: guildId });
        const embed = new EmbedBuilder().setColor("Blurple");

        await interaction.deferReply({ ephemeral: true });

        switch (options.getString("choice")) {
            case "enable":
                if (data.welcome.enabled === true)
                    return interaction.editReply({ embeds: [embed.setDescription("🔹 | The welcome system is already enabled.")] });

                await GDB.findOneAndUpdate({
                    id: guildId,
                }, {
                    $set: {
                        'welcome.enabled': true
                    },
                });

                return interaction.editReply({ embeds: [embed.setDescription("🔹 | The welcome system has been enabled.")] });

            case "disable":
                if (data.welcome.enabled === false)
                    return interaction.editReply({ embeds: [embed.setDescription("🔹 | The welcome system is already disabled.")] });

                await GDB.findOneAndUpdate({
                    id: guildId,
                }, {
                    $set: {
                        'welcome.enabled': false
                    },
                });

                return interaction.editReply({ embeds: [embed.setDescription("🔹 | The welcome system has been disabled.")] });
        }
    }
}
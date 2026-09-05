const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
require('dotenv').config();

const ROLE_ID = process.env.LASTNAME_ROLE_ID || '1541114460649820200';

module.exports = {
    async sendSetup(message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

        const embed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle('✦ ʀᴏʟᴇ ᴀssɪɢɴᴍᴇɴᴛ ✦')
            .setDescription('```\nกรุณากดปุ่มด้านล่างเพื่อทำการรับยศ\nระบบจะทำการอัปเดตสถานะของคุณโดยอัตโนมัติ\n```')
            .setFooter({ text: 'LASTNAME.SITE • Secure Role System' })
            .setTimestamp();

        const roleBtn = new ButtonBuilder()
            .setCustomId('role_get')
            .setLabel('✦ รับยศ')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(roleBtn);

        await message.channel.send({ embeds: [embed], components: [row] });
        await message.delete().catch(() => {});
    },

    async handleButton(interaction) {
        const role = interaction.guild.roles.cache.get(ROLE_ID);
        if (!role) {
            return interaction.reply({ content: '❌ ไม่พบยศในระบบ กรุณาติดต่อแอดมิน', ephemeral: true });
        }

        const hasRole = interaction.member.roles.cache.has(ROLE_ID);
        if (hasRole) {
            return interaction.reply({ content: `✦ คุณมียศ **${role.name}** อยู่แล้วครับ`, ephemeral: true });
        } else {
            await interaction.member.roles.add(ROLE_ID);
            return interaction.reply({ content: `✦ มอบยศ **${role.name}** ให้เรียบร้อยแล้ว`, ephemeral: true });
        }
    }
};

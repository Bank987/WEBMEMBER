const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    async handleWelcome(member) {
        const welcomeChannelId = process.env.LASTNAME_WELCOME_CHANNEL_ID;
        if (!welcomeChannelId || welcomeChannelId === 'YOUR_WELCOME_CHANNEL_ID_HERE') return;

        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
        if (!welcomeChannel) return;

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle('✦ ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ʟᴀsᴛɴᴀᴍᴇ.sɪᴛᴇ ✦')
            .setDescription(`ยินดีต้อนรับคุณ ${member.user} เข้าสู่เซิร์ฟเวอร์ของเรา!\n\n\`\`\`\nขอบคุณที่เข้ามาร่วมเป็นส่วนหนึ่งของคอมมูนิตี้ของเรา\nโปรดอ่านกฎระเบียบและขอให้สนุกกับการพูดคุยครับ\n\`\`\`\n> ❖ ลำดับสมาชิกที่: **${member.guild.memberCount}**\n> ❖ ไปที่ห้องรับยศเพื่อยืนยันตัวตน`)
            .setFooter({ text: 'LASTNAME.SITE • System Notification' })
            .setTimestamp();

        welcomeChannel.send({ content: `👋 ยินดีต้อนรับ <@${member.user.id}>!`, embeds: [welcomeEmbed] });
    }
};

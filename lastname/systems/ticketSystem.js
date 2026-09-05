const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionsBitField } = require('discord.js');
require('dotenv').config();

const TICKET_CATEGORY_ID = process.env.LASTNAME_TICKET_CATEGORY_ID || '1541114947088552027';

module.exports = {
    async sendSetup(message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

        const embed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle('✦ ᴄᴜsᴛᴏᴍᴇʀ sᴜᴘᴘᴏʀᴛ ✦')
            .setDescription('```\nหากท่านมีข้อสงสัยหรือต้องการความช่วยเหลือจากแอดมิน\nสามารถกดปุ่มเปิดทิคเก็ตด้านล่างเพื่อติดต่อทีมงานได้ทันที\n```\n> ❖ กรุณาระบุเหตุผลการติดต่อให้ชัดเจน\n> ❖ ห้ามสแปมเปิดทิคเก็ตโดยเด็ดขาด')
            .setFooter({ text: 'LASTNAME.SITE • Support Ticket System' });

        const ticketBtn = new ButtonBuilder()
            .setCustomId('ticket_open')
            .setLabel('✉️ เปิดทิคเก็ต (Open Ticket)')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(ticketBtn);

        await message.channel.send({ embeds: [embed], components: [row] });
        await message.delete().catch(() => {});
    },

    async handleOpenButton(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('ticket_modal')
            .setTitle('SUPPORT TICKET');

        const reasonInput = new TextInputBuilder()
            .setCustomId('ticket_reason')
            .setLabel('โปรดระบุเรื่องที่ต้องการติดต่อ:')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('เช่น ต้องการสอบถามเรื่อง...')
            .setRequired(true)
            .setMaxLength(500);

        const firstActionRow = new ActionRowBuilder().addComponents(reasonInput);
        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);
    },

    async handleModal(interaction) {
        const reason = interaction.fields.getTextInputValue('ticket_reason');
        const category = interaction.guild.channels.cache.get(TICKET_CATEGORY_ID);
        
        if (!category || category.type !== ChannelType.GuildCategory) {
             return interaction.reply({ content: '❌ ไม่พบหมวดหมู่ Ticket ในระบบ กรุณาตรวจสอบ ID ในไฟล์ .env', ephemeral: true });
        }

        try {
            const ticketChannel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: TICKET_CATEGORY_ID,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                    },
                ],
            });

            await interaction.reply({ content: `✦ เปิดทิคเก็ตสำเร็จ! โปรดไปยังห้อง ${ticketChannel}`, ephemeral: true });

            const ticketEmbed = new EmbedBuilder()
                .setColor('#000000')
                .setTitle('✦ ᴛɪᴄᴋᴇᴛ ᴏᴘᴇɴᴇᴅ ✦')
                .setDescription(`สวัสดีคุณ ${interaction.user} ทีมงานจะรีบตอบกลับให้เร็วที่สุดครับ\n\n**📝 หัวข้อ / เหตุผลการติดต่อ:**\n\`\`\`\n${reason}\n\`\`\`\n> ⏳ ระหว่างรอ ท่านสามารถทิ้งรายละเอียดเพิ่มเติมไว้ได้เลยครับ`)
                .setFooter({ text: 'LASTNAME.SITE • Support' })
                .setTimestamp();

            const closeBtn = new ButtonBuilder()
                .setCustomId('ticket_close')
                .setLabel('✖️ ปิดทิคเก็ต (Close)')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder().addComponents(closeBtn);

            await ticketChannel.send({ content: `<@${interaction.user.id}>`, embeds: [ticketEmbed], components: [row] });
            
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ เกิดข้อผิดพลาดในการสร้างห้องทิคเก็ต', ephemeral: true });
        }
    },

    async handleCloseButton(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: '❌ คุณไม่มีสิทธิ์ในการปิดทิคเก็ตนี้', ephemeral: true });
        }
        
        const embed = new EmbedBuilder()
            .setColor('#000000')
            .setDescription('⏳ **ระบบกำลังทำการลบห้องทิคเก็ตในอีก 5 วินาที...**');
            
        await interaction.reply({ embeds: [embed] });
        setTimeout(() => {
            interaction.channel.delete().catch(console.error);
        }, 5000);
    }
};

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const crypto = require('crypto');

// ใช้ createConnection แยกอิสระ ไม่ชนกับบอทตัวอื่น
let lastnameDb = null;
let Gang = null;
let dbConnected = false;

const lastnameConn = mongoose.createConnection(process.env.MONGODB_URILASTNAME, { dbName: 'webmember' });

lastnameConn.on('connected', () => {
    dbConnected = true;
    console.log('💎 VIP System connected to MongoDB (Isolated)');
});

lastnameConn.on('error', (err) => {
    console.error('💎 VIP MongoDB connection error:', err.message);
});

const GangSchema = new mongoose.Schema({}, { strict: false });
Gang = lastnameConn.model('Gang', GangSchema, 'gangs');

function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

module.exports = {
    sendSetup: async (message) => {
        const embed = new EmbedBuilder()
            .setTitle('💎 VIP Verification / รับยศ VIP')
            .setDescription('กดปุ่มด้านล่างเพื่อยืนยันตัวตนและรับยศ VIP\n(เฉพาะเจ้าของเว็บหรือแอดมินที่มี Masterkey)\n\n*1 เว็บไซต์ (1 Subdomain) สามารถรับยศ VIP ได้เพียง 1 คนเท่านั้น*')
            .setColor('#facc15');

        const button = new ButtonBuilder()
            .setCustomId('vip_claim')
            .setLabel('รับยศ VIP')
            .setEmoji('💎')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(button);

        await message.channel.send({ embeds: [embed], components: [row] });
        if (message.deletable) message.delete();
    },

    handleButton: async (interaction) => {
        const modal = new ModalBuilder()
            .setCustomId('vip_modal')
            .setTitle('ยืนยันตัวตนรับยศ VIP');

        const subdomainInput = new TextInputBuilder()
            .setCustomId('subdomain')
            .setLabel('Subdomain (เช่น mygang)')
            .setPlaceholder('พิมพ์แค่ชื่อซับโดเมน')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const masterkeyInput = new TextInputBuilder()
            .setCustomId('masterkey')
            .setLabel('Masterkey')
            .setPlaceholder('รหัสผ่านหลักของเว็บไซต์')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const row1 = new ActionRowBuilder().addComponents(subdomainInput);
        const row2 = new ActionRowBuilder().addComponents(masterkeyInput);

        modal.addComponents(row1, row2);
        await interaction.showModal(modal);
    },

    handleModal: async (interaction) => {
        if (!dbConnected) {
            return interaction.reply({ content: '❌ ระบบฐานข้อมูลยังไม่พร้อมใช้งาน โปรดลองใหม่ภายหลัง', ephemeral: true });
        }

        const subdomain = interaction.fields.getTextInputValue('subdomain').toLowerCase().trim().replace('.lastname.site', '');
        const masterkey = interaction.fields.getTextInputValue('masterkey').trim();
        
        await interaction.deferReply({ ephemeral: true });

        try {
            const gang = await Gang.findOne({ subdomain: subdomain });
            if (!gang) {
                return interaction.editReply('❌ ไม่พบเว็บไซต์นี้ในระบบ');
            }

            const inputHash = hashToken(masterkey);
            const adminTokenHash = gang.get('adminTokenHash');

            if (inputHash !== adminTokenHash) {
                return interaction.editReply('❌ Masterkey ไม่ถูกต้อง!');
            }

            const isVip = gang.get('isVip');
            
            if (!isVip) {
                return interaction.editReply('❌ เว็บไซต์นี้ยังไม่ได้เปิดระบบ VIP ครับ');
            }

            const claimedBy = gang.get('vipDiscordUserId');
            if (claimedBy) {
                if (claimedBy === interaction.user.id) {
                    return interaction.editReply('❌ คุณได้รับยศ VIP ของเว็บนี้ไปแล้วครับ');
                } else {
                    return interaction.editReply(`❌ ยศ VIP ของเว็บนี้ถูกรับไปแล้วโดยผู้ใช้อื่น (<@${claimedBy}>)\n*1 เว็บไซต์ สามารถรับยศ VIP ได้เพียง 1 คนเท่านั้น*`);
                }
            }

            let roleId = process.env.LASTNAME_VIP_ROLE_ID;
            
            if (!roleId) {
                const role = interaction.guild.roles.cache.find(r => r.name.toLowerCase().includes('vip'));
                if (role) roleId = role.id;
            }

            if (!roleId) {
                return interaction.editReply('❌ แอดมินยังไม่ได้ตั้งค่า VIP Role ID ในระบบบอท โปรดนำ `LASTNAME_VIP_ROLE_ID=ไอดียศ` ไปใส่ในไฟล์ `.env` ของบอท');
            }

            const role = interaction.guild.roles.cache.get(roleId);
            if (!role) {
                return interaction.editReply('❌ ไม่พบยศ VIP ในเซิร์ฟเวอร์นี้ (ID ไม่ถูกต้อง) โปรดแจ้งแอดมิน');
            }

            await interaction.member.roles.add(role);

            await Gang.updateOne({ _id: gang._id }, { $set: { vipDiscordUserId: interaction.user.id } });

            await interaction.editReply('💎 **ยืนยันตัวตนสำเร็จ!** คุณได้รับยศ VIP ประจำเว็บไซต์ `' + subdomain + '.lastname.site` เรียบร้อยแล้ว');

        } catch (error) {
            console.error('VIP Claim Error:', error);
            await interaction.editReply('❌ เกิดข้อผิดพลาดในการตรวจสอบข้อมูล โปรดแจ้งแอดมิน');
        }
    }
};

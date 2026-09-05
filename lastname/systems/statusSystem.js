const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

const STATUS_CHANNEL_ID = process.env.LASTNAME_STATUS_CHANNEL_ID;
// Discord มีจำกัดการแก้ไขข้อความ (Rate Limit) ห้ามเกิน 5 ครั้งใน 5 วินาที
// ดังนั้นการตั้ง 2 วินาที (2000ms) คือความเร็วสูงสุดที่ทำได้โดยที่บอทไม่โดนแบน/ค้างครับ
const UPDATE_INTERVAL = 2 * 1000; 
const WEB_URL = process.env.LASTNAME_WEB_URL || 'https://lastname.site'; // เปลี่ยนมาเช็คปิงกับเว็บเราเอง

let statusMessageId = null;

// ─── Measure Web Ping ───
async function getWebPing() {
    const start = Date.now();
    try {
        // ใช้ fetch ยิงไปที่เว็บเพื่อเช็คว่าตอบสนองเร็วแค่ไหน
        await fetch(WEB_URL, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        return Date.now() - start;
    } catch (e) {
        return -1; // -1 แปลว่าเว็บล่ม หรือเชื่อมต่อไม่ได้
    }
}

// ─── Build Embed ───
function buildStatusEmbed(webPing) {
    const now = new Date();
    
    // สถานะเว็บ
    const isOnline = webPing !== -1;
    const statusText = isOnline ? '🟢 พร้อมใช้งาน (Online)' : '🔴 ขัดข้อง (Offline)';
    const pingText = isOnline ? `${webPing} ms` : 'N/A';
    const embedColor = isOnline ? (webPing < 200 ? '#00ff88' : '#facc15') : '#ef4444';

    const embed = new EmbedBuilder()
        .setColor(embedColor)
        .setTitle('✦ ʟᴀsᴛɴᴀᴍᴇ.sɪᴛᴇ — sʏsᴛᴇᴍ sᴛᴀᴛᴜs ✦')
        .setDescription('ระบบรายงานสถานะเซิร์ฟเวอร์แบบ Realtime')
        .addFields(
            { name: '🌐 สถานะระบบ', value: `> **${statusText}**`, inline: false },
            { name: '🏓 ความหน่วง (Ping)', value: `> **\`${pingText}\`**`, inline: false }
        )
        .setFooter({ text: `LASTNAME.SITE • อัปเดตอัตโนมัติทุก ${UPDATE_INTERVAL / 1000} วินาที` })
        .setTimestamp(now);

    return embed;
}

// ─── Update Loop ───
async function updateStatus(client) {
    if (!STATUS_CHANNEL_ID || STATUS_CHANNEL_ID === 'YOUR_STATUS_CHANNEL_ID_HERE') {
        return;
    }

    const channel = client.channels.cache.get(STATUS_CHANNEL_ID);
    if (!channel) return;

    const webPing = await getWebPing();
    
    const embed = buildStatusEmbed(webPing);

    try {
        if (statusMessageId) {
            const msg = await channel.messages.fetch(statusMessageId).catch(() => null);
            if (msg) {
                await msg.edit({ embeds: [embed] });
            } else {
                const newMsg = await channel.send({ embeds: [embed] });
                statusMessageId = newMsg.id;
            }
        } else {
            const messages = await channel.messages.fetch({ limit: 10 });
            const botMessages = messages.filter(m => m.author.id === client.user.id);
            for (const [, msg] of botMessages) {
                await msg.delete().catch(() => {});
            }
            const newMsg = await channel.send({ embeds: [embed] });
            statusMessageId = newMsg.id;
        }
    } catch (err) {
        console.error('❌ [StatusSystem] Failed to update status message:', err.message);
    }
}

// ─── Init ───
module.exports = {
    async init(client) {
        console.log('📊 [StatusSystem] Initializing...');
        await new Promise(r => setTimeout(r, 3000));
        await updateStatus(client);
        setInterval(() => updateStatus(client), UPDATE_INTERVAL);
        console.log(`📊 [StatusSystem] Running! Updates every ${UPDATE_INTERVAL / 1000}s`);
    }
};

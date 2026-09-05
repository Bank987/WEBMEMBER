require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// Load Modular Systems
const roleSystem = require('./systems/roleSystem');
const ticketSystem = require('./systems/ticketSystem');
const welcomeSystem = require('./systems/welcomeSystem');
const statusSystem = require('./systems/statusSystem');

client.once('ready', async () => {
    console.log(`🔥 Logged in as ${client.user.tag}!`);
    client.user.setActivity('LASTNAME.SITE', { type: 3 });
    console.log('✅ Bot is ready! Systems are loaded modularly.');
    console.log('Use !setup_role to spawn Role panel.');
    console.log('Use !setup_ticket to spawn Ticket panel.');

    // เริ่มระบบ Status (อัปเดต Embed อัตโนมัติ)
    statusSystem.init(client);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Fallback prefix commands for setup panels
    if (message.content === '!setup_role') {
        roleSystem.sendSetup(message);
    }
    
    if (message.content === '!setup_ticket') {
        ticketSystem.sendSetup(message);
    }
});

client.on('interactionCreate', async (interaction) => {
    // Route button clicks to their respective systems
    if (interaction.isButton()) {
        if (interaction.customId === 'role_get') return roleSystem.handleButton(interaction);
        if (interaction.customId === 'ticket_open') return ticketSystem.handleOpenButton(interaction);
        if (interaction.customId === 'ticket_close') return ticketSystem.handleCloseButton(interaction);
    }

    // Route modal submissions
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'ticket_modal') return ticketSystem.handleModal(interaction);
    }
});

client.on('guildMemberAdd', async (member) => {
    welcomeSystem.handleWelcome(member);
});

// Start Bot
if (!process.env.LASTNAME_BOT_TOKEN || process.env.LASTNAME_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
    console.error('❌ กรุณาใส่ LASTNAME_BOT_TOKEN ในไฟล์ .env');
    process.exit(1);
}
client.login(process.env.LASTNAME_BOT_TOKEN);

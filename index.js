require('dotenv').config();
const { QuickDB } = require("quick.db");
const db = new QuickDB();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Events
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
  ]
});


const editorChannels = [
  '1427252950903947326'
];

const designerChannels = [
  '1427252950903947327'
];

const developerChannels = [
  '1427252950903947330'
];

const animatorChannels = [
  '1427252950903947328'
];

const userActivity = {};

client.on('messageCreate', async message => {

  console.log('MESSAGE EVENT TRIGGERED');

  if (message.author.bot) return;

  console.log('User:', message.author.tag);

  const member = await message.guild.members.fetch(message.author.id);

  if (!member) {
    console.log('NO MEMBER FOUND');
    return;
  }

  console.log('Channel ID:', message.channel.id);

  const now = Date.now();

  if (!userActivity[member.id]) {
    userActivity[member.id] = {};
  }

  // ANTI SPAM COOLDOWN
  if (
    userActivity[member.id][message.channel.id] &&
    now - userActivity[member.id][message.channel.id] < 10000
  ) {
    console.log('COOLDOWN ACTIVE');
    return;
  }

  userActivity[member.id][message.channel.id] = now;

  // EDITOR SYSTEM
  if (editorChannels.includes(message.channel.id)) {

    console.log('EDITOR CHANNEL DETECTED');

    const role = message.guild.roles.cache.find(
      r => r.name === "Active Video Editor"
    );

    if (!role) {
      console.log('ROLE NOT FOUND');
      return;
    }

    console.log('ROLE FOUND');

    if (role && !member.roles.cache.has(role.id)) {

      console.log('USER DOES NOT HAVE ROLE');

      const countKey = `editor_${member.id}`;

      if (!userActivity[countKey]) {
        userActivity[countKey] = 0;
      }

      userActivity[countKey]++;

      console.log('EDITOR XP:', userActivity[countKey]);

      if (userActivity[countKey] >= 2) {

        console.log('TRYING TO ADD ROLE');

        try {

          await member.roles.add(role);

          console.log('ROLE ADDED SUCCESS');

          await message.channel.send(
            `${member} You've Unlocked Active Video Editor access!`
          );

          console.log('SUCCESS MESSAGE SENT');

        } catch (err) {

          console.log('ROLE ERROR:', err);

        }
        
      }
    }
  }

});

client.login(process.env.TOKEN);

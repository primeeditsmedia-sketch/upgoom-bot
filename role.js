require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Events,
  MessageFlags
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once(Events.ClientReady, async () => {

  console.log(`Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch('1434535059020316797');

  const embed = new EmbedBuilder()
    .setTitle('Pickup A Role For Yourself [Only 1]')
    .setDescription('✧ Choose your role by clicking the button below to connect with like-minded members and get access to role-specific channels and updates.✧')
    .setImage('https://i.postimg.cc/ry5QJn2D/ef16e4e68b0d3cb81e6bb8a8c3258d7e-1.gif')
    .setColor('#d5d5d5');

  const row1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('editor')
        .setLabel('🎬 Video Editor')
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('designer')
        .setLabel('🎨 Designer')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('developer')
        .setLabel('💻 Developer')
        .setStyle(ButtonStyle.Success)
    );

  const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('animator')
        .setLabel('✨ Animator')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('client')
        .setLabel('💼 Client')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('creator')
        .setLabel('📸 Creator')
        .setStyle(ButtonStyle.Danger)
    );

  const row3 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('agency')
        .setLabel('🏢 Agency')
        .setStyle(ButtonStyle.Secondary)
    );

  const messages = await channel.messages.fetch({ limit: 10 });

  const existingMessage = messages.find(
    msg =>
      msg.author.id === client.user.id &&
      msg.embeds.length > 0 &&
      msg.embeds[0].title === 'Pickup A Role For Yourself [Only 1]'
  );

  if (!existingMessage) {
    await channel.send({
      embeds: [embed],
      components: [row1, row2, row3]
    });
  }

});

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isButton()) return;

  const member = await interaction.guild.members.fetch(interaction.user.id);

  const editorRole = interaction.guild.roles.cache.find(r => r.name === "Video Editor");
  const designRole = interaction.guild.roles.cache.find(r => r.name === "Designer");
  const developerRole = interaction.guild.roles.cache.find(r => r.name === "Developer");
  const animatorRole = interaction.guild.roles.cache.find(r => r.name === "Animator");
  const clientRole = interaction.guild.roles.cache.find(r => r.name === "Client");
  const creatorRole = interaction.guild.roles.cache.find(r => r.name === "Creator");
  const agencyRole = interaction.guild.roles.cache.find(r => r.name === "Agency");

  const rolesToRemove = [
    editorRole,
    designRole,
    developerRole,
    animatorRole,
    clientRole,
    creatorRole,
    agencyRole
  ].filter(Boolean);

  await interaction.deferReply({
    flags: MessageFlags.Ephemeral
  });

  await member.roles.remove(rolesToRemove);

  if (interaction.customId === 'editor') {
    await member.roles.add(editorRole);
    await interaction.editReply({ content: '✅ Video Editor role added!' });
  }

  if (interaction.customId === 'designer') {
    await member.roles.add(designRole);
    await interaction.editReply({ content: '✅ Designer role added!' });
  }

  if (interaction.customId === 'developer') {
    await member.roles.add(developerRole);
    await interaction.editReply({ content: '✅ Developer role added!' });
  }

  if (interaction.customId === 'animator') {
    await member.roles.add(animatorRole);
    await interaction.editReply({ content: '✅ Animator role added!' });
  }

  if (interaction.customId === 'client') {
    await member.roles.add(clientRole);
    await interaction.editReply({ content: '✅ Client role added!' });
  }

  if (interaction.customId === 'creator') {
    await member.roles.add(creatorRole);
    await interaction.editReply({ content: '✅ Creator role added!' });
  }

  if (interaction.customId === 'agency') {
    await member.roles.add(agencyRole);
    await interaction.editReply({ content: '✅ Agency role added!' });
  }

});

client.login(process.env.TOKEN);

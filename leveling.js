require('dotenv').config();
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = (client) => {



const editorChannels = [
  '1427252950903947326'
];

const designerChannels = [
  '1502568507123175514'
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
  if (editorChannels.includes(String(message.channel.id))) {

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

      if (userActivity[countKey] >= 5) {

        console.log('TRYING TO ADD ROLE');

        try {

          await member.roles.add(role);

          console.log('ROLE ADDED SUCCESS');

await message.channel.send(
  `${member} You've Unlocked Active Video Editor access! Check out the <#1434955147284582565> channel.`
);


          console.log('SUCCESS MESSAGE SENT');

        } catch (err) {

          console.log('ROLE ERROR:', err);

        }
        
      }
    }
  }

  // DESIGNER SYSTEM
  if (designerChannels.includes(String(message.channel.id))) {
console.log('DESIGNER CHANNEL DETECTED');


    const role = message.guild.roles.cache.find(
      r => r.name === "Active Designer"
    );

    if (role && !member.roles.cache.has(role.id)) {
console.log('DESIGNER USER DOES NOT HAVE ROLE');


      const countKey = `designer_${member.id}`;

      if (!userActivity[countKey]) {
        userActivity[countKey] = 0;
      }

      userActivity[countKey]++;
console.log('DESIGNER XP:', userActivity[countKey]);



      if (userActivity[countKey] >= 5) {

        try {

          await member.roles.add(role);

await message.channel.send(
  `${member} You've Unlocked Active Designer access! Check out the <#1493208129612283914> channel.`
);


        } catch (err) {

          console.log('DESIGNER ROLE ERROR:', err);

        }
      }
    }
  }

  // DEVELOPER SYSTEM
  if (developerChannels.includes(String(message.channel.id))) {

    const role = message.guild.roles.cache.find(
      r => r.name === "Active Developer"
    );

    if (role && !member.roles.cache.has(role.id)) {

      const countKey = `developer_${member.id}`;

      if (!userActivity[countKey]) {
        userActivity[countKey] = 0;
      }

      userActivity[countKey]++;

      if (userActivity[countKey] >= 5) {

        try {

          await member.roles.add(role);

          await message.channel.send( 
            `${member} You've Unlocked Active Developer access! Check out the <#1434955414100906154> channel.` );

        } catch (err) {

          console.log('DEVELOPER ROLE ERROR:', err);

        }
      }
    }
  }

  // ANIMATOR SYSTEM
  if (animatorChannels.includes(String(message.channel.id))) {

    const role = message.guild.roles.cache.find(
      r => r.name === "Active Animator"
    );

    if (role && !member.roles.cache.has(role.id)) {

      const countKey = `animator_${member.id}`;

      if (!userActivity[countKey]) {
        userActivity[countKey] = 0;
      }

      userActivity[countKey]++;

      if (userActivity[countKey] >= 5) {

        try {

          await member.roles.add(role);

          await message.channel.send( 
            `${member} You've Unlocked Active Animator access! Check out the <#1502289576138641550> channel.` );

        } catch (err) {

          console.log('ANIMATOR ROLE ERROR:', err);

        }
      }
    }
  }

});

};

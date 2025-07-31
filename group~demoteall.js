/*
        𓋜  ＢＯＴ ＮＡＭＥ ⇩
         
          𝗍𝖾𝖼𝗁𝗌𝗒𝗇𝖼
         
       𓋜 ＢＯＴ ＯＷＮＥＲ ⇩
         
         𝗄𝗁𝗎𝗅𝖾𝗄𝖺𝗇𝗂 𝖽𝗎𝖻𝖾
         
       𓋜 ＤＥＶＥＬＯＰＥＲ ⇩
         
         𝗄𝗁𝗎𝗅𝖾𝗄𝖺𝗇𝗂 𝖽𝗎𝖻𝖾
         
       𓋜 ＤＥＶ ＬＯＣＡＴＩＯＮ ⇩
         
         𝗓𝗂𝗆𝖻𝖺𝖻𝗐𝖾,𝖻𝗎𝗅𝖺𝗐𝖺𝗒𝗈
         
       𓋜 ＴＥＡＭ ＮＡＭＥ ⇩
         
         𝗍𝖾𝖼𝗁𝗀𝗎𝗒𝗌
         
*/




const { cmd } = require("../command");

cmd({
  pattern: "demoteall",
  desc: "Demote all group admins except the bot and the command user (Owner Only)",
  category: "group",
  isOwner: true, // Only the owner can use this command
  use: ".demoteall"
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Ensure the command is used in a group
    if (!m.isGroup) return reply("❌ *This command can only be used in groups.*");

    // Get the group metadata
    const groupData = await conn.groupMetadata(from);

    // Filter all admins and exclude both the bot and the command sender
    const admins = groupData.participants
      .filter(p => p.admin !== null) // Select only admins
      .map(p => p.id)
      .filter(id => id !== conn.user.jid && id !== m.sender); // Exclude the bot and the command user

    if (admins.length === 0) {
      return reply("✅ *No admins to demote.*");
    }

    // Demote all filtered admins
    await conn.groupParticipantsUpdate(from, admins, "demote");

    return reply("✅ *All group admins have been demoted except the bot and you.*");
  } catch (error) {
    console.error("*Error in demoteall command:*", error);
    return reply(`❌ *An error occurred*: ${error.message}`);
  }
});
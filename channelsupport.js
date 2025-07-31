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



const { cmd } = require('../command');
let antideleteStatus = {}; // Tracks the ON/OFF status for each chat


cmd({
    pattern: "channel",
    desc: "Get the link to the official WhatsApp channel.",
    react: "📢",
    category: "utility",
    use: ".channel",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        // Define the channel link inside the command
        const channelLink = "https://whatsapp.com/channel/0029Vb8oWKA5vK9zwbVKmc1C";

        // Send the channel link to the user
        reply(`*Here's the link to our official Techsync Channel:*\n\n${channelLink}\n\n> *Join us to stay updated with the latest news and announcements🧞‍♂️.*`);
    } catch (error) {
        // Log and notify about any errors
        console.error("*Error sending channel link:*", error.message);
        reply("❌ *Sorry, an error occurred while trying to send the channel link.*");
    }
});
// Command for sending the support group or page link
cmd({
    pattern: "support",
    desc: "Get the link to the support group or page.",
    react: "🛠️",
    category: "utility",
    use: ".support",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    try {
        // Define the support link inside the command
        const supportLink = "https://whatsapp.com/channel/0029Vb8oWKA5vK9zwbVKmc1C";

        // Send the support link to the user
        reply(`*Need help or have questions ? Join Techsync group:*\n\n${supportLink}\n\n> *Feel free to ask your questions or report issues*.`);
    } catch (error) {
        // Log and notify about any errors
        console.error("*Error sending support link:*", error.message);
        reply("❌ *Sorry, an error occurred while trying to send the support link.*");
    }
});
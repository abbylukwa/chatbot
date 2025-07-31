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




const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "define",
    desc: "📖 Get the definition of a word",
    react: "🔍",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("*`Please provide a word to define.`*\n\n📌 *Usage:* *.define [word]*");

        const word = q.trim();
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const response = await axios.get(url);
        const definitionData = response.data[0];

        const definition = definitionData.meanings[0].definitions[0].definition;
        const example = definitionData.meanings[0].definitions[0].example || '❌ *No example available*';
        const synonyms = definitionData.meanings[0].definitions[0].synonyms.join(', ') || '❌ *No synonyms available*';
        const phonetics = definitionData.phonetics[0]?.text || '🔇 *No phonetics available*';
        const audio = definitionData.phonetics[0]?.audio || null;

        const wordInfo = `
📖 *𝐖𝐎𝐑𝐃*: *${definitionData.word}*  
🗣️ *𝐏𝐑𝐎𝐍𝐔𝐍𝐂𝐈𝐀𝐓𝐈𝐎𝐍*: _*${phonetics}*_
📚 *𝐃𝐄𝐅𝐈𝐍𝐀𝐓𝐈𝐎𝐍*: *${definition}*
✍️ *𝐄𝐗𝐀𝐌𝐏𝐋𝐄*: *${example}* 
📝 *𝐒𝐘𝐍𝐎𝐍𝐘𝐌𝐒*: *${synonyms}* 

> *𝐌𝐕𝐄𝐋𝐀𝐒𝐄 𝐎𝐅𝐂 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐌𝐄𝐍𝐓.*`;

        if (audio) {
            await conn.sendMessage(from, { audio: { url: audio }, mimetype: 'audio/mpeg' }, { quoted: mek });
        }

        return reply(wordInfo);
    } catch (e) {
        console.error("❌ Error:", e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 *Word not found.* *Please check the spelling and try again.*");
        }
        return reply("⚠️ *An error occurred while fetching the definition. Please try again later.*");
    }
});

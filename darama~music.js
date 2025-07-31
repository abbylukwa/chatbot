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




const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')
cmd({
    pattern: "play22",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*`Please give me a url or title`*")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*𝐓𝐑𝐂𝐇𝐒𝐘𝐍𝐂 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑*

         🎵 *𝐒𝐎𝐍𝐆 𝐅𝐎𝐔𝐍𝐃!* 

➲ *𝐓𝐈𝐓𝐓𝐋𝐄 :* *${data.title}*
➲ *𝐃𝐔𝐑𝐀𝐓𝐈𝐎𝐍 :* *${data.timestamp}*
➲ *𝐕𝐈𝐄𝐖𝐒:* *${data.views}*
➲ *𝐔𝐏𝐋𝐎𝐀𝐃𝐄𝐃 𝐎𝐍 :* *${data.ago}* 
➲ *𝐋𝐈𝐍𝐊 :* *${data.url}* 

🎧 *𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐑 𝐅𝐀𝐕 𝐒𝐎𝐍𝐆!*

> *𝐓𝐄𝐂𝐇𝐒𝐘𝐍𝐂 𝐓𝐇𝐄 𝐁𝐄𝐒𝐓 𝐁𝐎𝐓 𝐈𝐍 𝐓𝐇𝐄 𝐖𝐎𝐑𝐋𝐃 𝐂𝐎𝐃𝐄𝐃 𝐁𝐘 𝐌𝐕𝐄𝐋𝐀𝐒𝐄-𝐓𝐄𝐂𝐇𝐍𝐎𝐋𝐎𝐆𝐘*

> *𝐌𝐕𝐄𝐋𝐀𝐒𝐄 𝐎𝐅𝐂 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐌𝐄𝐍𝐓.*
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"*© ᴛᴇᴄʜsʏɴᴄ-ᴍᴅ ᴛᴇᴄʜɴᴏʟᴏɢʏ*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`_*Hi ${pushname} retry later*_`)
}
})

//====================video_dl=======================

cmd({
    pattern: "darama",
    alias: ["video2"],
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*`Please give me a url or title`*")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*𝐓𝐄𝐂𝐇𝐒𝐘𝐍𝐂 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑*

         🎵 *𝐕𝐈𝐃𝐄𝐎 𝐅𝐎𝐔𝐍𝐃!* 

➲ *𝐓𝐈𝐓𝐓𝐋𝐄 :* *${data.title}*
➲ *𝐃𝐔𝐑𝐀𝐓𝐈𝐎𝐍 :* *${data.timestamp}*
➲ *𝐕𝐈𝐄𝐖𝐒:* *${data.views}*
➲ *𝐔𝐏𝐋𝐎𝐀𝐃𝐄𝐃 𝐎𝐍 :* *${data.ago}*
➲ *𝐋𝐈𝐍𝐊 :* *${data.url}*

🎧 *𝐏𝐋𝐀𝐘 𝐘𝐎𝐔𝐑 𝐅𝐀𝐕 𝐕𝐈𝐃𝐄𝐎!*

> *𝐓𝐄𝐂𝐇𝐒𝐘𝐍𝐂 𝐓𝐇𝐄 𝐁𝐄𝐒𝐓 𝐁𝐎𝐓 𝐈𝐍 𝐓𝐇𝐄 𝐖𝐎𝐑𝐋𝐃 𝐂𝐎𝐃𝐄𝐃 𝐁𝐘 𝐌𝐕𝐄𝐋𝐀𝐒𝐄-𝐓𝐄𝐂𝐇𝐍𝐎𝐋𝐎𝐆𝐘*

> *𝐌𝐕𝐄𝐋𝐀𝐒𝐄 𝐎𝐅𝐂 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐌𝐄𝐍𝐓.*
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*© ᴛᴇᴄʜsʏɴᴄ-ᴍᴅ ᴛᴇᴄʜɴᴏʟᴏɢʏ*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`_*Hi ${pushname} retry later*_`)
}
})
//

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




const axios = require("axios");
const yts = require("yt-search");
const ffmpeg = require("fluent-ffmpeg");
const { cmd } = require("../command");
const fs = require("fs");
const path = require("path");

cmd({
  pattern: "playpro",
  alias: ["mp3pro", "musicpro"],
  react: '🎵',
  desc: "Download songs from YouTube.",
  category: "download",
  use: ".song <YouTube URL or song name>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args, q }) => {
  try {
    // Check if the user provided a query
    if (!q) {
      return reply("*ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ʏᴏᴜᴛᴜʙᴇ ᴜʀʟ ᴏʀ sᴏɴɢ ɴᴀᴍᴇ..*");
    }

    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    let videoUrl = q;
    let searchData = null;

    // If the user provided a song name instead of a URL
    if (!q.startsWith("https://")) {
      const searchResults = await yts(q);
      if (!searchResults.videos.length) {
        return reply('❌ *No results found. Please try a different query.*');
      }

      searchData = searchResults.videos[0];
      videoUrl = searchData.url;
    }

    // Prepare the Velyn API URL
    const apiUrl = `https://velyn.vercel.app/api/downloader/ytmp3?url=${encodeURIComponent(videoUrl)}`;

    // Call the Velyn API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || !response.data.status || !response.data.output) {
      return reply('❌ *Unable to fetch the song. Please try again later.*');
    }

    // Extract the download link
    const downloadUrl = response.data.output;

    // Prepare the song details
    const songDetails = searchData ? {
      title: searchData.title,
      artist: searchData.author.name,
      duration: searchData.timestamp,
      views: searchData.views
    } : {
      title: "Unknown",
      artist: "Unknown",
      duration: "Unknown",
      views: "Unknown"
    };

    // Inform the user that the song is being downloaded
    await reply(`🎵 *ᴛᴇᴄʜsʏɴᴄ-ᴍᴅ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ* *${songDetails.title}*...`);

    // Download the song
    const songResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
    if (!songResponse.data) {
      return reply('❌ *Failed to download the song. Please try again later.*');
    }

    // Save the downloaded file temporarily
    const tempFilePath = path.join(__dirname, `${songDetails.title}.mp3`);
    fs.writeFileSync(tempFilePath, songResponse.data);

    // Compress the audio using ffmpeg
    const compressedFilePath = path.join(__dirname, `${songDetails.title}_compressed.mp3`);
    await new Promise((resolve, reject) => {
      ffmpeg(tempFilePath)
        .audioBitrate(128) // Set audio bitrate to 128kbps
        .output(compressedFilePath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Read the compressed file
    const compressedBuffer = fs.readFileSync(compressedFilePath);

    // Send the compressed song as a document
    await conn.sendMessage(from, {
      document: compressedBuffer,
      mimetype: 'audio/mpeg',
      fileName: `${songDetails.title}.mp3`,
      caption: `> *Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ ᴍᴠᴇʟᴀsᴇ ᴛᴇᴄʜɴᴏʟᴏɢʏ*`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363411325763461@newsletter',
          newsletterName: '*ᴛᴇᴄʜsʏɴᴄ-ᴍᴅ sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ☠️*',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Delete temporary files
    fs.unlinkSync(tempFilePath);
    fs.unlinkSync(compressedFilePath);

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('*Error downloading song:*', error);
    reply('❌ *Unable to download the song. Please try again later.*');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

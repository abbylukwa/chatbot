const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");

cmd({
    pattern: "ban",
    alias: ["blockuser", "addban"],
    desc: "Ban a user from using the bot",
    category: "owner",
    react: "⛔",
    filename: __filename
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("*`Only the bot owner can use this command!`*");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("*`Please provide a number or tag/reply a user.`*");

        let banned = JSON.parse(fs.readFileSync("./assets/ban.json", "utf-8"));

        if (banned.includes(target)) {
            return reply("❌ *`This user is already banned.`*");
        }

        banned.push(target);
        fs.writeFileSync("./techsync/ban.json", JSON.stringify([...new Set(banned)], null, 2));

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/jt3qb1.png" },
            caption: `⛔ *User has been banned from using the Techsync~MD.*`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

cmd({
    pattern: "unban",
    alias: ["removeban"],
    desc: "Unban a user",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("*`Only the bot owner can use this command!`*");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("*`Please provide a number or tag/reply a user.`*");

        let banned = JSON.parse(fs.readFileSync("./assets/ban.json", "utf-8"));

        if (!banned.includes(target)) {
            return reply("❌ *`This user is not banned.`*");
        }

        const updated = banned.filter(u => u !== target);
        fs.writeFileSync("./techsync/ban.json", JSON.stringify(updated, null, 2));

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/jt3qb1.png" },
            caption: `✅ *User has been unbanned from using Techsync~MD*.`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

cmd({
    pattern: "listban",
    alias: ["banlist", "bannedusers"],
    desc: "List all banned users",
    category: "owner",
    react: "📋",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("*`Only the bot owner can use this command!`*");

        let banned = JSON.parse(fs.readFileSync("./assets/ban.json", "utf-8"));
        banned = [...new Set(banned)];

        if (banned.length === 0) return reply("✅ No banned users found.");

        let msg = "`⛔ *Banned Users:*`\n\n";
        banned.forEach((id, i) => {
            msg += `${i + 1}. ${id.replace("@s.whatsapp.net", "")}\n`;
        });

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/jt3qb1.png" },
            caption: msg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

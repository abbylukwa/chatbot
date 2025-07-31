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
const { cmd } = require("../command");

// Helper function to convert a country ISO code to its flag emoji
function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(letter => String.fromCodePoint(letter.charCodeAt(0) + 127397))
    .join("");
}

cmd({
    pattern: "check",
    desc: "Checks the country calling code and returns the corresponding country name(s) with flag",
    category: "utility",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        let code = args[0];
        if (!code) {
            return reply("*🎐 ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ. ᴇxᴀᴍᴘʟᴇ: `.ᴄʜᴇᴄᴋ 263`*");
        }

        // Remove any '+' signs from the code
        code = code.replace(/\+/g, '');

        // Fetch all countries using the REST Countries v2 API
        const url = "https://restcountries.com/v2/all";
        const { data } = await axios.get(url);

        // Filter countries whose callingCodes include the given code
        const matchingCountries = data.filter(country =>
            country.callingCodes && country.callingCodes.includes(code)
        );

        if (matchingCountries.length > 0) {
            const countryNames = matchingCountries
                .map(country => `${getFlagEmoji(country.alpha2Code)} ${country.name}`)
                .join("\n");
            reply(`📮 *𝖢𝗈𝗎𝗇𝗍𝗋𝗒 𝖢𝗈𝖽𝖾*: ${code}\n🌍 *𝖢𝗈𝗎𝗇𝗍𝗋𝗂𝖾𝗌*:\n${countryNames}`);
        } else {
            reply(`❌ *No country found for the code* ${code}.`);
        }
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while checking the country code.*");
    }
});

const settings = require('../settings');
const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const moment = require('moment-timezone');

cmd({
    pattern: "menu",
    desc: "To get the main menu.",
    react: "🤍",
    category: "main",
    filename: __filename
},
async(conn, mek, m, { from, pushname }) => {
try {
    const menuIdentifier = '©White-Queen-MAIN-MENU'; // හඳුනාගැනීම සඳහා මෙය තවමත් අවශ්‍යයි

    const ownerName = settings.OWNER_NAME;
    const ownerNumber = settings.OWNER_NUMBER;
    const botVersion = require("../package.json").version;
    const botRuntime = runtime(process.uptime());
    const currentTime = moment().tz('Asia/Colombo').format('HH:mm:ss');
    const currentDate = moment().tz('Asia/Colombo').format('YYYY.MM.DD');
    const platform = os.platform();

    const mainMenu = `
.........․⁀⸱⁀⸱︵⸌⸃૰⳹․👸․⳼૰⸂⸍︵⸱⁀⸱⁀․........
𔓕꯭  ꯭ 𓏲꯭֟፝੭ ꯭White Queen 𓏲꯭֟፝੭ ꯭  ꯭𔓕
▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭
─────────────────


╭───────────────╮
| *Owner:* ${ownerName}
| *Owner Number:* ${ownerNumber}
| *User:* ${pushname}
| *Version:* ${botVersion}
| *Runtime:* ${botRuntime}
| *Time:* ${currentTime}
| *Date:* ${currentDate}
| *Platform:* ${platform}
└ ⚙️ *Mode:* [${settings.MODE}]
╰───────────────╯
▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭


*Please reply to this message with the number of the menu you want to see.*

*1.* 📥 Download Menu

*2.* 📺 YouTube Menu

*3.* 🔎 Search Menu

*4.* 🔄 Convert Menu

*5.* 👥 Group Menu

*6.* 👑 Owner Menu

*7.* ⚙️ Settings Menu



${menuIdentifier} 
*©Made by White Queen whatsapp bot 2025* 
💻 *GitHub:* 🤍
`;

    // ඡායාරූපය සමඟ ප්‍රධාන මෙනුව යැවීම
    await conn.sendMessage(from, {
        image: { url: settings.MENU_IMG || 'https://files.catbox.moe/sim4y1.png' },
        caption: mainMenu
    }, { quoted: mek });

} catch (e) {
    console.log(e);
    reply(`An error occurred: ${e.message}`);
}
});
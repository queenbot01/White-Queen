
const settings = require('../settings');
const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

function replaceYouTubeID(url) {
  const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

cmd({
  pattern: "b",
  alias: ["ytmp4"],
  react: "🎥",
  desc: "Download Ytmp4",
  category: "youtube",
  use: ".video <Text or YT URL>",
  filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
  try {
    if (!q) return await reply("❌ Please provide a Query or Youtube URL!");
    let id = q.startsWith("https:                                  
    if (!id) {
      const searchResults = await dy_scrap.ytsearch(q);
      if (!searchResults?.results?.length) return await reply("//") ? replaceYouTubeID(q) : null;
    if (!id) {
      const searchResults = await dy_scrap.ytsearch(q);
      if (!searchResults?.results?.length) return await reply("❌ No results found!");
      id = searchResults.results[0].videoId;
    }
    const data = await dy_scrap.ytsearch(`https:                              
    if (!data?.results?.length) return await reply("//youtube.com/watch?v=${id}`);
    if (!data?.results?.length) return await reply("❌ Failed to fetch video!");
    const { url, title, image, timestamp, ago, views, author } = data.results[0];
    let info = `🍄 *ELISA 𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁* 🍄\n\n` +
      `🎵 *Title:* ${title || "Unknown"}\n` +
      `⏳ *Duration:* ${timestamp || "Unknown"}\n` +
      `👀 *Views:* ${views || "Unknown"}\n` +
      `🌏 *Release Ago:* ${ago || "Unknown"}\n` +
      `👤 *Author:* ${author?.name || "Unknown"}\n` +
      `🖇 *Url:* ${url || "Unknown"}\n\n` +
      `🔽 *Choose a quality:*\n` +
      
      
      `1 *144p*\n` +
      `2 *240p*\n` +
      `3 *360p*\n` +
      `4 *480p*\n` +
      `5 *720p*\n` +
      `6 *1080p*\n\n` +
      `${settings.FOOTER || "> *©Made by White Queen whatsapp bot 2025*"}`;
    const sentMsg = await conn.sendMessage(from, { image: { url: image }, caption: info }, { quoted: mek });
    const messageID = sentMsg.key.id;
    await conn.sendMessage(from, { react: { text: '🎶', key: sentMsg.key } });

    conn.ev.on('messages.upsert', async (messageUpdate) => {
      try {
        const mekInfo = messageUpdate?.messages[0];
        if (!mekInfo?.message) return;
        const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
        const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;
        if (!isReplyToSentMsg) return;
        let userReply = messageType.trim();
        let quality;
        switch (userReply) {
          case "1":
            quality = "144";
            break;
          case "2":
            quality = "240";
            break;
          case "3":
            quality = "360";
            break;
          case "4":
            quality = "480";
            break;
          case "5":
            quality = "720";
            break;
          case "6":
            quality = "1080";
            break;
          default:
            return await reply("❌ Invalid quality! Please choose a number between 1 and 6.");
        }
        const response = await dy_scrap.ytmp4(`https:                                       
        let downloadUrl = response?.result?.download?.url;
        if (!downloadUrl) return await reply("//youtube.com/watch?v=${id}`, quality);
        let downloadUrl = response?.result?.download?.url;
        if (!downloadUrl) return await reply("❌ Download link not found!");
        await conn.sendMessage(from, { video: { url: downloadUrl }, caption: title });
          await conn.sendMessage(from, type, { quoted: mek });

                await conn.sendMessage(from, { text: '*White Queen🤍✅*', edit: msg.key });
              } catch (error) {

        console.error(error);

        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });

        await reply(`❌ *An error occurred:* ${error.message || "Error!"}`);

    }

});
        

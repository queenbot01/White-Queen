// QUEEN ELISA MULTIDEVICE WHATSAPP BOT 2025-2099
 // CREATED BY HASHEN MD
 // FOLLOW MY CHANNEL   White Queen🤍
 //    ⏤͟͟͞͞ ✰© White Queen TOOLS⏤͟͟͞͞ ✰


































































































const { cmd, commands } = require('../command');
const settings = require('../settings');
const prefix = settings.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const path = require('path');
const converter = require('../data/converter');
const stickerConverter = require('../data/sticker-converter');
const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');
const { fetchGif, fetchImage, gifToSticker } = require('../lib/sticker-utils');
const os = require("os");
const fetch = require("node-fetch");
const Crypto = require("crypto");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const { videoToWebp } = require('../lib/video-utils');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const axios = require('axios');
const FormData = require('form-data');
const { translate } = require("@vitalets/google-translate-api")






cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply,
  sender
}) => {
  try {
    const badWords = ["wtf", "mia", "xxx", "fuck", 'sex', "huththa", "pakaya", 'ponnaya', "hutto"];

    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const messageText = body.toLowerCase();
    const containsBadWord = badWords.some(word => messageText.includes(word));

    if (containsBadWord && settings.ANTI_BAD_WORD === "true") {
      await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });
      await conn.sendMessage(from, { 'text': "🚫 ⚠️ BAD WORDS NOT ALLOWED ⚠️ 🚫" }, { 'quoted': m });
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});


cmd({
  pattern: "vv2",
  alias: ["wah", "ohh", "oho", "🙂", "nice", "ok"],
  desc: "Owner Only - retrieve quoted message back to user",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    if (!isCreator) {
      return; // Simply return without any response if not owner
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a view once message!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;
      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, { quoted: message });
    }

    // Forward to user's DM
    await client.sendMessage(message.sender, messageContent, options);
  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});

cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    // Initialize warnings if not exists
    if (!global.warnings) {
      global.warnings = {};
    }

    // Only act in groups where bot is admin and sender isn't admin
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    // List of link patterns to detect
    const linkPatterns = [
      /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi, // WhatsApp links
      /https?:\/\/(?:api\.whatsapp\.com|wa\.me)\/\S+/gi,  // WhatsApp API links
      /wa\.me\/\S+/gi,                                    // WhatsApp.me links
      /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,         // Telegram links
      /https?:\/\/(?:www\.)?\.com\/\S+/gi,                // Generic .com links
      /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,         // Twitter links
      /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,        // LinkedIn links
      /https?:\/\/(?:whatsapp\.com|channel\.me)\/\S+/gi,  // Other WhatsApp/channel links
      /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,          // Reddit links
      /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,         // Discord links
      /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,           // Twitch links
      /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,           // Vimeo links
      /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,     // Dailymotion links
      /https?:\/\/(?:www\.)?medium\.com\/\S+/gi           // Medium links
    ];

    // Check if message contains any forbidden links
    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    // Only proceed if anti-link is enabled and link is detected
    if (containsLink && config.ANTI_LINK === 'true') {
      console.log(`Link detected from ${sender}: ${body}`);

      // Try to delete the message
      try {
        await conn.sendMessage(from, {
          delete: m.key
        });
        console.log(`Message deleted: ${m.key.id}`);
      } catch (error) {
        console.error("Failed to delete message:", error);
      }

      // Update warning count for user
      global.warnings[sender] = (global.warnings[sender] || 0) + 1;
      const warningCount = global.warnings[sender];

      // Handle warnings
      if (warningCount < 4) {
        // Send warning message
        await conn.sendMessage(from, {
          text: `‎*♻️𝐋𝐈𝐍𝐊𝐒 𝐀𝐑𝐄 𝐍𝐎𝐓 𝐀𝐋𝐋𝐎𝐖𝐄𝐃🪀*\n` +
                `*╭────⪨ 𝐖𝐀𝐑𝐍𝐈𝐍𝐆 ⪩────*\n` +
                `*├✺ USER :* @${sender.split('@')[0]}!\n` +
                `*├✺ COUNT : ${warningCount}*\n` +
                `*├✺ REASON : LINK SENDING*\n` +
                `*├✺ WARN LIMIT : 2*\n` +
                `*╰────────────────*`,
          mentions: [sender]
        });
      } else {
        // Remove user if they exceed warning limit
        await conn.sendMessage(from, {
          text: `@${sender.split('@')[0]} *HAS BEEN REMOVED - WARN LIMIT EXCEEDED!*`,
          mentions: [sender]
        });
        await conn.groupParticipantsUpdate(from, [sender], "remove");
        delete global.warnings[sender];
      }
    }
  } catch (error) {
    console.error("Anti-link error:", error);
    reply("❌ An error occurred while processing the message.");
  }
});


const linkPatterns = [
  /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
  /wa\.me\/\S+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
  /https?:\/\/ngl\/\S+/gi,
  /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
  /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
];

cmd({
  on: 'body'
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    if (containsLink && settings.DELETE_LINKS === 'true') {
      await conn.sendMessage(from, { delete: m.key }, { quoted: m });
    }
  } catch (error) {
    console.error(error);
  }
});


cmd({
    pattern: "remove",
    alias: ["kick", "k"],
    desc: "Removes a member from the group",
    category: "admin",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, quoted, senderNumber
}) => {
    // Check if the command is used in a group
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    // Get the bot owner's number dynamically from conn.user.id
    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) {
        return reply("❌ Only the bot owner can use this command.");
    }

    // Check if the bot is an admin
    if (!isBotAdmins) return reply("❌ I need to be an admin to use this command.");

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0]; // If replying to a message, get the sender's number
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, ''); // If mentioning a user
    } else {
        return reply("❌ Please reply to a message or mention a user to remove.");
    }

    const jid = number + "@s.whatsapp.net";

    try {
        await conn.groupParticipantsUpdate(from, [jid], "remove");
        reply(`✅ Successfully removed @${number}`, { mentions: [jid] });
    } catch (error) {
        console.error("Remove command error:", error);
        reply("❌ Failed to remove the member.");
    }
});


cmd({
    pattern: "link",
    alias: ["glink", "grouplink"],
    desc: "Get group invite link.",
    category: "group", // Already group
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
    try {
        // Ensure this is being used in a group
        if (!isGroup) return reply("𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩❗");

        // Get the sender's number
        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];
        
        // Check if the bot is an admin
        const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
        const groupAdmins = groupMetadata ? groupMetadata.participants.filter(member => member.admin) : [];
        const isBotAdmins = isGroup ? groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net') : false;
        
        if (!isBotAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Check if the sender is an admin
        const isAdmins = isGroup ? groupAdmins.some(admin => admin.id === sender) : false;
        if (!isAdmins) return reply("𝐏𝐥𝐞𝐚𝐬𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐌𝐞 𝐀𝐝𝐦𝐢𝐧 𝐑𝐨𝐥𝐞 ❗");

        // Get the invite code and generate the link
        const inviteCode = await conn.groupInviteCode(from);
        if (!inviteCode) return reply("Failed to retrieve the invite code.");

        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

        // Reply with the invite link
        return reply(`*Here is your group invite link:*\n${inviteLink}`);
        
    } catch (error) {
        console.error("Error in invite command:", error);
        reply(`An error occurred: ${error.message || "Unknown error"}`);
    }
});

          


cmd({
    pattern: "join",
    react: "📬",
    alias: ["joinme", "f_join"],
    desc: "To Join a Group from Invite link",
    category: "group",
    use: '.join < Group Link >',
    filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator, isDev, isAdmins, reply }) => {
    try {
        const msr = {
            own_cmd: "You don't have permission to use this command."
        };

        // Only allow the creator to use the command
        if (!isCreator) return reply(msr.own_cmd);

        // If there's no input, check if the message is a reply with a link
        if (!q && !quoted) return reply("*Please write the Group Link*️ 🖇️");

        let groupLink;

        // If the message is a reply to a group invite link
        if (quoted && quoted.type === 'conversation' && isUrl(quoted.text)) {
            groupLink = quoted.text.split('https://chat.whatsapp.com/')[1];
        } else if (q && isUrl(q)) {
            // If the user provided the link in the command
            groupLink = q.split('https://chat.whatsapp.com/')[1];
        }

        if (!groupLink) return reply("❌ *Invalid Group Link* 🖇️");

        // Accept the group invite
        await conn.groupAcceptInvite(groupLink);
        await conn.sendMessage(from, { text: `✔️ *Successfully Joined*` }, { quoted: mek });

    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        console.log(e);
        reply(`❌ *Error Occurred!!*\n\n${e}`);
    }
});


cmd({
  pattern: "broadcast",
  category: "group",
  desc: "Bot makes a broadcast in all groups",
  filename: __filename,
  use: "<text for broadcast.>"
}, async (conn, mek, m, { q, isGroup, isAdmins, reply }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups!");
    if (!isAdmins) return reply("❌ You need to be an admin to broadcast in this group!");

    if (!q) return reply("❌ Provide text to broadcast in all groups!");

    let allGroups = await conn.groupFetchAllParticipating();
    let groupIds = Object.keys(allGroups); // Extract group IDs

    reply(`📢 Sending Broadcast To ${groupIds.length} Groups...\n⏳ Estimated Time: ${groupIds.length * 1.5} seconds`);

    for (let groupId of groupIds) {
      try {
        await sleep(1500); // Avoid rate limits
        await conn.sendMessage(groupId, { text: q }); // Sends only the provided text
      } catch (err) {
        console.log(`❌ Failed to send broadcast to ${groupId}:`, err);
      }
    }

    return reply(`✅ Successfully sent broadcast to ${groupIds.length} groups!`);
    
  } catch (err) {
    await m.error(`❌ Error: ${err}\n\nCommand: broadcast`, err);
  }
});
cmd({
    pattern: "countryinfo",
    alias: ["cinfo", "country","cinfo2"],
    desc: "Get information about a country",
    category: "convert",
    react: "🌍",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a country name.\nExample: `.countryinfo Pakistan`");

        const apiUrl = `https://api.siputzx.my.id/api/tools/countryInfo?name=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌");
            return reply(`No information found for *${q}*. Please check the country name.`);
        }

        const info = data.data;
        let neighborsText = info.neighbors.length > 0
            ? info.neighbors.map(n => `🌍 *${n.name}*`).join(", ")
            : "No neighboring countries found.";

        const text = `🌍 *Country Information: ${info.name}* 🌍\n\n` +
                     `🏛 *Capital:* ${info.capital}\n` +
                     `📍 *Continent:* ${info.continent.name} ${info.continent.emoji}\n` +
                     `📞 *Phone Code:* ${info.phoneCode}\n` +
                     `📏 *Area:* ${info.area.squareKilometers} km² (${info.area.squareMiles} mi²)\n` +
                     `🚗 *Driving Side:* ${info.drivingSide}\n` +
                     `💱 *Currency:* ${info.currency}\n` +
                     `🔤 *Languages:* ${info.languages.native.join(", ")}\n` +
                     `🌟 *Famous For:* ${info.famousFor}\n` +
                     `🌍 *ISO Codes:* ${info.isoCode.alpha2.toUpperCase()}, ${info.isoCode.alpha3.toUpperCase()}\n` +
                     `🌎 *Internet TLD:* ${info.internetTLD}\n\n` +
                     `🔗 *Neighbors:* ${neighborsText}`;

        await conn.sendMessage(from, {
            image: { url: info.flag },
            caption: text,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });

        await react("✅"); // React after successful response
    } catch (e) {
        console.error("Error in countryinfo command:", e);
        await react("❌");
        reply("An error occurred while fetching country information.");
    }
});
cmd({
    pattern: 'convert',
    alias: ['sticker2img', 'stoimg', 'stickertoimage', 's2i'],
    desc: 'Convert stickers to images',
    category: 'convert',
    react: '🖼️',
    filename: __filename
}, async (client, match, message, { from }) => {
    // Input validation
    if (!message.quoted) {
        return await client.sendMessage(from, {
            text: "✨ *Sticker Converter*\n\nPlease reply to a sticker message\n\nExample: `.convert` (reply to sticker)"
        }, { quoted: message });
    }

    if (message.quoted.mtype !== 'stickerMessage') {
        return await client.sendMessage(from, {
            text: "❌ Only sticker messages can be converted"
        }, { quoted: message });
    }

    // Send processing message
    await client.sendMessage(from, {
        text: "🔄 Converting sticker to image..."
    }, { quoted: message });

    try {
        const stickerBuffer = await message.quoted.download();
        const imageBuffer = await stickerConverter.convertStickerToImage(stickerBuffer);

        // Send result
        await client.sendMessage(from, {
            image: imageBuffer,
            caption: "> Powered By ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ 🤍",
            mimetype: 'image/png'
        }, { quoted: message });

    } catch (error) {
        console.error('Conversion error:', error);
        await client.sendMessage(from, {
            text: "❌ Please try with a different sticker."
        }, { quoted: message });
    }
});

cmd({
    pattern: 'tomp3',
    desc: 'Convert media to audio',
    category: 'convert',
    react: '🎵',
    filename: __filename
}, async (client, match, message, { from }) => {
    // Input validation
    if (!match.quoted) {
        return await client.sendMessage(from, {
            text: "*🔊 Please reply to a video/audio message*"
        }, { quoted: message });
    }

    if (!['videoMessage', 'audioMessage'].includes(match.quoted.mtype)) {
        return await client.sendMessage(from, {
            text: "❌ Only video/audio messages can be converted"
        }, { quoted: message });
    }

    if (match.quoted.seconds > 300) {
        return await client.sendMessage(from, {
            text: "⏱️ Media too long (max 5 minutes)"
        }, { quoted: message });
    }

    // Send processing message and store it
    await client.sendMessage(from, {
        text: "🔄 Converting to audio..."
    }, { quoted: message });

    try {
        const buffer = await match.quoted.download();
        const ext = match.quoted.mtype === 'videoMessage' ? 'mp4' : 'm4a';
        const audio = await converter.toAudio(buffer, ext);

        // Send result
        await client.sendMessage(from, {
            audio: audio,
            mimetype: 'audio/mpeg'
        }, { quoted: message });

    } catch (e) {
        console.error('Conversion error:', e.message);
        await client.sendMessage(from, {
            text: "❌ Failed to process audio"
        }, { quoted: message });
    }
});

cmd({
    pattern: 'toptt',
    desc: 'Convert media to voice message',
    category: 'convert',
    react: '🎙️',
    filename: __filename
}, async (client, match, message, { from }) => {
    // Input validation
    if (!match.quoted) {
        return await client.sendMessage(from, {
            text: "*🗣️ Please reply to a video/audio message*"
        }, { quoted: message });
    }

    if (!['videoMessage', 'audioMessage'].includes(match.quoted.mtype)) {
        return await client.sendMessage(from, {
            text: "❌ Only video/audio messages can be converted"
        }, { quoted: message });
    }

    if (match.quoted.seconds > 60) {
        return await client.sendMessage(from, {
            text: "⏱️ Media too long for voice (max 1 minute)"
        }, { quoted: message });
    }

    // Send processing message
    await client.sendMessage(from, {
        text: "🔄 Converting to voice message..."
    }, { quoted: message });

    try {
        const buffer = await match.quoted.download();
        const ext = match.quoted.mtype === 'videoMessage' ? 'mp4' : 'm4a';
        const ptt = await converter.toPTT(buffer, ext);

        // Send result
        await client.sendMessage(from, {
            audio: ptt,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: message });

    } catch (e) {
        console.error('PTT conversion error:', e.message);
        await client.sendMessage(from, {
            text: "❌ Failed to create voice message"
        }, { quoted: message });
    }
});
cmd({
    pattern: "fetch",
    alias: ["get", "api"],
    desc: "Fetch data from a provided URL or API",
    category: "group",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, args, reply }) => {
    try {
        const q = args.join(' ').trim(); // Extract the URL or API query
        if (!q) return reply('❌ Please provide a valid URL or query.');

        if (!/^https?:\/\//.test(q)) return reply('❌ URL must start with http:// or https://.');

        const data = await fetchJson(q); // Use your fetchJson utility function to get data
        const content = JSON.stringify(data, null, 2);

        await conn.sendMessage(from, {
            text: `🔍 *Fetched Data*:\n\`\`\`${content.slice(0, 2048)}\`\`\``,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardingSourceMessage: 'Your Data Request',
            }
        }, { quoted: mek });
    } catch (e) {
        console.error("Error in fetch command:", e);
        reply(`❌ An error occurred:\n${e.message}`);
    }
});


// Safety Configuration
const SAFETY = {
  MAX_JIDS: 20,
  BASE_DELAY: 2000,  // jawad on top 🔝
  EXTRA_DELAY: 4000,  // huh don't copy mine file 
};

cmd({
  pattern: "forward",
  alias: ["fwd"],
  desc: "Bulk forward media to groups",
  category: "owner",
  filename: __filename
}, async (client, message, match, { isOwner }) => {
  try {
    // Owner check
    if (!isOwner) return await message.reply("*📛 Owner Only Command*");
    
    // Quoted message check
    if (!message.quoted) return await message.reply("*🍁 Please reply to a message*");

    // ===== [BULLETPROOF JID PROCESSING] ===== //
    let jidInput = "";
    
    // Handle all possible match formats
    if (typeof match === "string") {
      jidInput = match.trim();
    } else if (Array.isArray(match)) {
      jidInput = match.join(" ").trim();
    } else if (match && typeof match === "object") {
      jidInput = match.text || "";
    }
    
    // Extract JIDs (supports comma or space separated)
    const rawJids = jidInput.split(/[\s,]+/).filter(jid => jid.trim().length > 0);
    
    // Process JIDs (accepts with or without @g.us)
    const validJids = rawJids
      .map(jid => {
        // Remove existing @g.us if present
        const cleanJid = jid.replace(/@g\.us$/i, "");
        // Only keep if it's all numbers
        return /^\d+$/.test(cleanJid) ? `${cleanJid}@g.us` : null;
      })
      .filter(jid => jid !== null)
      .slice(0, SAFETY.MAX_JIDS);

    if (validJids.length === 0) {
      return await message.reply(
        "❌ No valid group JIDs found\n" +
        "Examples:\n" +
        ".fwd 120363411055156472@g.us,120363333939099948@g.us\n" +
        ".fwd 120363411055156472 120363333939099948"
      );
    }

    // ===== [ENHANCED MEDIA HANDLING - ALL TYPES] ===== //
    let messageContent = {};
    const mtype = message.quoted.mtype;
    
    // For media messages (image, video, audio, sticker, document)
    if (["imageMessage", "videoMessage", "audioMessage", "stickerMessage", "documentMessage"].includes(mtype)) {
      const buffer = await message.quoted.download();
      
      switch (mtype) {
        case "imageMessage":
          messageContent = {
            image: buffer,
            caption: message.quoted.text || '',
            mimetype: message.quoted.mimetype || "image/jpeg"
          };
          break;
        case "videoMessage":
          messageContent = {
            video: buffer,
            caption: message.quoted.text || '',
            mimetype: message.quoted.mimetype || "video/mp4"
          };
          break;
        case "audioMessage":
          messageContent = {
            audio: buffer,
            mimetype: message.quoted.mimetype || "audio/mp4",
            ptt: message.quoted.ptt || false
          };
          break;
        case "stickerMessage":
          messageContent = {
            sticker: buffer,
            mimetype: message.quoted.mimetype || "image/webp"
          };
          break;
        case "documentMessage":
          messageContent = {
            document: buffer,
            mimetype: message.quoted.mimetype || "application/octet-stream",
            fileName: message.quoted.fileName || "document"
          };
          break;
      }
    } 
    // For text messages
    else if (mtype === "extendedTextMessage" || mtype === "conversation") {
      messageContent = {
        text: message.quoted.text
      };
    } 
    // For other message types (forwarding as-is)
    else {
      try {
        // Try to forward the message directly
        messageContent = message.quoted;
      } catch (e) {
        return await message.reply("❌ Unsupported message type");
      }
    }

    // ===== [OPTIMIZED SENDING WITH PROGRESS] ===== //
    let successCount = 0;
    const failedJids = [];
    
    for (const [index, jid] of validJids.entries()) {
      try {
        await client.sendMessage(jid, messageContent);
        successCount++;
        
        // Progress update (every 10 groups instead of 5)
        if ((index + 1) % 10 === 0) {
          await message.reply(`🔄 Sent to ${index + 1}/${validJids.length} groups...`);
        }
        
        // Apply reduced delay
        const delayTime = (index + 1) % 10 === 0 ? SAFETY.EXTRA_DELAY : SAFETY.BASE_DELAY;
        await new Promise(resolve => setTimeout(resolve, delayTime));
        
      } catch (error) {
        failedJids.push(jid.replace('@g.us', ''));
        await new Promise(resolve => setTimeout(resolve, SAFETY.BASE_DELAY));
      }
    }

    // ===== [COMPREHENSIVE REPORT] ===== //
    let report = `✅ *Forward Complete*\n\n` +
                 `📤 Success: ${successCount}/${validJids.length}\n` +
                 `📦 Content Type: ${mtype.replace('Message', '') || 'text'}\n`;
    
    if (failedJids.length > 0) {
      report += `\n❌ Failed (${failedJids.length}): ${failedJids.slice(0, 5).join(', ')}`;
      if (failedJids.length > 5) report += ` +${failedJids.length - 5} more`;
    }
    
    if (rawJids.length > SAFETY.MAX_JIDS) {
      report += `\n⚠️ Note: Limited to first ${SAFETY.MAX_JIDS} JIDs`;
    }

    await message.reply(report);

  } catch (error) {
    console.error("Forward Error:", error);
    await message.reply(
      `💢 Error: ${error.message.substring(0, 100)}\n\n` +
      `Please try again or check:\n` +
      `1. JID formatting\n` +
      `2. Media type support\n` +
      `3. Bot permissions`
    );
  }
});

cmd({
    pattern: "rcolor",
    desc: "Generate a random color with name and code.",
    category: "download",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        const colorNames = [
            "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", 
            "Gray", "Cyan", "Magenta", "Violet", "Indigo", "Teal", "Lavender", "Turquoise"
        ];
        
        const randomColorHex = "#" + Math.floor(Math.random()*16777215).toString(16);
        const randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];

        reply(`🎨 *Random Color:* \nName: ${randomColorName}\nCode: ${randomColorHex}`);
    } catch (e) {
        console.error("Error in .randomcolor command:", e);
        reply("❌ An error occurred while generating the random color.");
    }
});

cmd({
    pattern: "binary",
    desc: "Convert text into binary format.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        if (!args.length) return reply("❌ Please provide the text to convert to binary.");

        const textToConvert = args.join(" ");
        const binaryText = textToConvert.split('').map(char => {
            return `00000000${char.charCodeAt(0).toString(2)}`.slice(-8);
        }).join(' ');

        reply(`🔑 *Binary Representation:* \n${binaryText}`);
    } catch (e) {
        console.error("Error in .binary command:", e);
        reply("❌ An error occurred while converting to binary.");
    }
});

cmd({
    pattern: "dbinary",
    desc: "Decode binary string into text.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        if (!args.length) return reply("❌ Please provide the binary string to decode.");

        const binaryString = args.join(" ");
        const textDecoded = binaryString.split(' ').map(bin => {
            return String.fromCharCode(parseInt(bin, 2));
        }).join('');

        reply(`🔓 *Decoded Text:* \n${textDecoded}`);
    } catch (e) {
        console.error("Error in .binarydecode command:", e);
        reply("❌ An error occurred while decoding the binary string.");
    }
});


cmd({
    pattern: "base64",
    desc: "Encode text into Base64 format.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        // Ensure the user provided some text
        if (!args.length) return reply("❌ Please provide the text to encode into Base64.");

        const textToEncode = args.join(" ");
        
        // Encode the text into Base64
        const encodedText = Buffer.from(textToEncode).toString('base64');
        
        // Send the encoded Base64 text
        reply(`🔑 *Encoded Base64 Text:* \n${encodedText}`);
    } catch (e) {
        console.error("Error in .base64 command:", e);
        reply("❌ An error occurred while encoding the text into Base64.");
    }
});

cmd({
    pattern: "unbase64",
    desc: "Decode Base64 encoded text.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        // Ensure the user provided Base64 text
        if (!args.length) return reply("❌ Please provide the Base64 encoded text to decode.");

        const base64Text = args.join(" ");
        
        // Decode the Base64 text
        const decodedText = Buffer.from(base64Text, 'base64').toString('utf-8');
        
        // Send the decoded text
        reply(`🔓 *Decoded Text:* \n${decodedText}`);
    } catch (e) {
        console.error("Error in .unbase64 command:", e);
        reply("❌ An error occurred while decoding the Base64 text.");
    }
});

cmd({
    pattern: "urlencode",
    desc: "Encode text into URL encoding.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        if (!args.length) return reply("❌ Please provide the text to encode into URL encoding.");

        const textToEncode = args.join(" ");
        const encodedText = encodeURIComponent(textToEncode);

        reply(`🔑 *Encoded URL Text:* \n${encodedText}`);
    } catch (e) {
        console.error("Error in .urlencode command:", e);
        reply("❌ An error occurred while encoding the text.");
    }
});

cmd({
    pattern: "urldecode",
    desc: "Decode URL encoded text.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        if (!args.length) return reply("❌ Please provide the URL encoded text to decode.");

        const encodedText = args.join(" ");
        const decodedText = decodeURIComponent(encodedText);

        reply(`🔓 *Decoded Text:* \n${decodedText}`);
    } catch (e) {
        console.error("Error in .urldecode command:", e);
        reply("❌ An error occurred while decoding the URL encoded text.");
    }
});

cmd({
    pattern: "roll",
    desc: "Roll a dice (1-6).",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        // Roll a dice (generate a random number between 1 and 6)
        const result = Math.floor(Math.random() * 6) + 1;
        
        // Send the result
        reply(`🎲 You rolled: *${result}*`);
    } catch (e) {
        console.error("Error in .roll command:", e);
        reply("❌ An error occurred while rolling the dice.");
    }
}); 


cmd({
    pattern: "coinflip",
    desc: "Flip a coin and get Heads or Tails.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        // Simulate coin flip (randomly choose Heads or Tails)
        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        
        // Send the result
        reply(`🪙 Coin Flip Result: *${result}*`);
    } catch (e) {
        console.error("Error in .coinflip command:", e);
        reply("❌ An error occurred while flipping the coin.");
    }
});

cmd({
    pattern: "flip",
    desc: "Flip the text you provide.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        // Ensure text is provided
        if (!args.length) return reply("❌ Please provide the text to flip.");

        // Flip the text
        const flippedText = args.join(" ").split('').reverse().join('');
        
        // Send the flipped text
        reply(`🔄 Flipped Text: *${flippedText}*`);
    } catch (e) {
        console.error("Error in .flip command:", e);
        reply("❌ An error occurred while flipping the text.");
    }
});

cmd({
    pattern: "pick",
    desc: "Pick between two choices.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply }) => {
    try {
        // Ensure two options are provided
        if (args.length < 2) return reply("❌ Please provide two choices to pick from. Example: `.pick Ice Cream, Pizza`");

        // Pick a random option
        const option = args.join(" ").split(',')[Math.floor(Math.random() * 2)].trim();
        
        // Send the result
        reply(`🎉 Bot picks: *${option}*`);
    } catch (e) {
        console.error("Error in .pick command:", e);
        reply("❌ An error occurred while processing your request.");
    }
});

cmd({
    pattern: "timenow",
    desc: "Check the current local time.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        // Get current date and time
        const now = new Date();
        
        // Get local time in Pakistan timezone (Asia/Karachi)
        const localTime = now.toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit", 
            second: "2-digit", 
            hour12: true,
            timeZone: "Asia/Karachi" // Setting Pakistan's time zone explicitly
        });
        
        // Send the local time as reply
        reply(`🕒 Current Local Time in Pakistan: ${localTime}`);
    } catch (e) {
        console.error("Error in .timenow command:", e);
        reply("❌ An error occurred. Please try again later.");
    }
});

cmd({
    pattern: "date",
    desc: "Check the current date.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { reply }) => {
    try {
        // Get current date
        const now = new Date();
        
        // Get the formatted date (e.g., "Monday, January 15, 2025")
        const currentDate = now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        
        // Send the current date as reply
        reply(`📅 Current Date: ${currentDate}`);
    } catch (e) {
        console.error("Error in .date command:", e);
        reply("❌ An error occurred. Please try again later.");
    }
});

cmd({
    pattern: "shapar",
    desc: "Send shapar ASCII art with mentions.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Extract the mentioned user
        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) {
            return reply("Please mention a user to send the ASCII art to.");
        }

        // Shapar ASCII Art
        const asciiArt = `
          _______
       .-'       '-.
      /           /|
     /           / |
    /___________/  |
    |   _______ |  |
    |  |  \\ \\  ||  |
    |  |   \\ \\ ||  |
    |  |____\\ \\||  |
    |  '._  _.'||  |
    |    .' '.  ||  |
    |   '.___.' ||  |
    |___________||  |
    '------------'  |
     \\_____________\\|
`;

        // Message to send
        const message = `😂 @${mentionedUser.split("@")[0]}!\n😂 that for you:\n\n${asciiArt}`;

        // Send the message with mentions
        await conn.sendMessage(from, {
            text: message,
            mentions: [mentionedUser],
        }, { quoted: m });

    } catch (e) {
        console.error("Error in .shapar command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});

cmd({
    pattern: "rate",
    desc: "Rate someone out of 10.",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        if (!isGroup) return reply("This command can only be used in groups.");

        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) return reply("Please mention someone to rate.");

        const randomRating = Math.floor(Math.random() * 10) + 1;
        const message = `@${mentionedUser.split("@")[0]} is rated ${randomRating}/10.`;

        await conn.sendMessage(from, { text: message, mentions: [mentionedUser] }, { quoted: m });
    } catch (e) {
        console.error("Error in .rate command:", e);
        reply("An error occurred. Please try again.");
    }
});

cmd({
    pattern: "countx",
    desc: "Start a reverse countdown from the specified number to 1.",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, reply, senderNumber }) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("❎ Only the bot owner can use this command.");
        }

        // Ensure arguments are provided
        if (!args[0]) {
            return reply("✳️ Use this command like:\n *Example:* .countx 10");
        }

        const count = parseInt(args[0].trim());

        // Validate the input
        if (isNaN(count) || count <= 0 || count > 50) {
            return reply("❎ Please specify a valid number between 1 and 50.");
        }

        reply(`⏳ Starting reverse countdown from ${count}...`);

        for (let i = count; i >= 1; i--) {
            await conn.sendMessage(m.chat, { text: `${i}` }, { quoted: mek });
            await sleep(1000); // 1-second delay between messages
        }

        reply(`✅ Countdown completed.`);
    } catch (e) {
        console.error(e);
        reply("❎ An error occurred while processing your request.");
    }
});

cmd({
    pattern: "count",
    desc: "Start a countdown from 1 to the specified number.",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { args, reply, senderNumber }) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("❎ Only the bot owner can use this command.");
        }

        // Ensure arguments are provided
        if (!args[0]) {
            return reply("✳️ Use this command like:\n *Example:* .count 10");
        }

        const count = parseInt(args[0].trim());

        // Validate the input
        if (isNaN(count) || count <= 0 || count > 50) {
            return reply("❎ Please specify a valid number between 1 and 50.");
        }

        reply(`⏳ Starting countdown to ${count}...`);

        for (let i = 1; i <= count; i++) {
            await conn.sendMessage(m.chat, { text: `${i}` }, { quoted: mek });
            await sleep(1000); // 1-second delay between messages
        }

        reply(`✅ Countdown completed.`);
    } catch (e) {
        console.error(e);
        reply("❎ An error occurred while processing your request.");
    }
});


cmd({
    pattern: "calculate",
    alias: ["calc"],
    desc: "Evaluate a mathematical expression.",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        // Ensure arguments are provided
        if (!args[0]) {
            return reply("✳️ Use this command like:\n *Example:* .calculate 5+3*2");
        }

        const expression = args.join(" ").trim();

        // Validate the input to prevent unsafe operations
        if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
            return reply("❎ Invalid expression. Only numbers and +, -, *, /, ( ) are allowed.");
        }

        // Evaluate the mathematical expression
        let result;
        try {
            result = eval(expression);
        } catch (e) {
            return reply("❎ Error in calculation. Please check your expression.");
        }

        // Reply with the result
        reply(`✅ Result of "${expression}" is: ${result}`);
    } catch (e) {
        console.error(e);
        reply("❎ An error occurred while processing your request.");
    }
});

cmd({
    pattern: "tempnum",
    alias: ["fakenum", "tempnumber"],
    desc: "Get temporary numbers & OTP instructions",
    category: "group",
    react: "📱",
    use: "<country-code>"
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Mandatory country code check
        if (!args || args.length < 1) {
            return reply(`❌ *Usage:* .tempnum <country-code>\nExample: .tempnum us\n\n📦 Use .otpbox <number>* to check OTPs`);
        }

        const countryCode = args[0].toLowerCase();
        
        // API call with validation
        const { data } = await axios.get(
            `https://api.vreden.my.id/api/tools/fakenumber/listnumber?id=${countryCode}`,
            { 
                timeout: 10000,
                validateStatus: status => status === 200
            }
        );

        // Fixed syntax error here - added missing parenthesis
        if (!data?.result || !Array.isArray(data.result)) {
            console.error("Invalid API structure:", data);
            return reply(`⚠ Invalid API response format\nTry .tempnum us`);
        }

        if (data.result.length === 0) {
            return reply(`📭 No numbers available for *${countryCode.toUpperCase()}*\nTry another country code!\n\nUse .otpbox <number> after selection`);
        }

        // Process numbers
        const numbers = data.result.slice(0, 25);
        const numberList = numbers.map((num, i) => 
            `${String(i+1).padStart(2, ' ')}. ${num.number}`
        ).join("\n");

        // Final message with OTP instructions
        await reply(
            `╭──「 📱 TEMPORARY NUMBERS 」\n` +
            `│\n` +
            `│ Country: ${countryCode.toUpperCase()}\n` +
            `│ Numbers Found: ${numbers.length}\n` +
            `│\n` +
            `${numberList}\n\n` +
            `╰──「 📦 USE: .otpbox <number> 」\n` +
            `_Example: .otpbox +1234567890_`
        );

    } catch (err) {
        console.error("API Error:", err);
        const errorMessage = err.code === "ECONNABORTED" ? 
            `⏳ *Timeout*: API took too long\nTry smaller country codes like 'us', 'gb'` :
            `⚠ *Error*: ${err.message}\nUse format: .tempnum <country-code>`;
            
        reply(`${errorMessage}\n\n🔑 Remember: ${prefix}otpinbox <number>`);
    }
});

cmd({
    pattern: "templist",
    alias: ["tempnumberlist", "tempnlist", "listnumbers"],
    desc: "Show list of countries with temp numbers",
    category: "group",
    react: "🌍",
    filename: __filename,
    use: ".templist"
},
async (conn, m, { reply }) => {
    try {
        const { data } = await axios.get("https://api.vreden.my.id/api/tools/fakenumber/country");

        if (!data || !data.result) return reply("❌ Couldn't fetch country list.");

        const countries = data.result.map((c, i) => `*${i + 1}.* ${c.title} \`(${c.id})\``).join("\n");

        await reply(`🌍 *Total Available Countries:* ${data.result.length}\n\n${countries}`);
    } catch (e) {
        console.error("TEMP LIST ERROR:", e);
        reply("❌ Failed to fetch temporary number country list.");
    }
});

cmd({
    pattern: "otpbox",
    alias: ["checkotp", "getotp"],
    desc: "Check OTP messages for temporary number",
    category: "group",
    react: "🔑",
    use: "<full-number>"
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Validate input
        if (!args[0] || !args[0].startsWith("+")) {
            return reply(`❌ *Usage:* .otpbox <full-number>\nExample: .otpbox +9231034481xx`);
        }

        const phoneNumber = args[0].trim();
        
        // Fetch OTP messages
        const { data } = await axios.get(
            `https://api.vreden.my.id/api/tools/fakenumber/message?nomor=${encodeURIComponent(phoneNumber)}`,
            { 
                timeout: 10000,
                validateStatus: status => status === 200
            }
        );

        // Validate response
        if (!data?.result || !Array.isArray(data.result)) {
            return reply("⚠ No OTP messages found for this number");
        }

        // Format OTP messages
        const otpMessages = data.result.map(msg => {
            // Extract OTP code (matches common OTP patterns)
            const otpMatch = msg.content.match(/\b\d{4,8}\b/g);
            const otpCode = otpMatch ? otpMatch[0] : "Not found";
            
            return `┌ *From:* ${msg.from || "Unknown"}
│ *Code:* ${otpCode}
│ *Time:* ${msg.time_wib || msg.timestamp}
└ *Message:* ${msg.content.substring(0, 50)}${msg.content.length > 50 ? "..." : ""}`;
        }).join("\n\n");

        await reply(
            `╭──「 🔑 OTP MESSAGES 」\n` +
            `│ Number: ${phoneNumber}\n` +
            `│ Messages Found: ${data.result.length}\n` +
            `│\n` +
            `${otpMessages}\n` +
            `╰──「 📌 Use .tempnum to get numbers 」`
        );

    } catch (err) {
        console.error("OTP Check Error:", err);
        const errorMsg = err.code === "ECONNABORTED" ?
            "⌛ OTP check timed out. Try again later" :
            `⚠ Error: ${err.response?.data?.error || err.message}`;
        
        reply(`${errorMsg}\n\nUsage: .otpbox +9231034481xx`);
    }
});
cmd({
    pattern: "topdf",
    alias: ["pdf","topdf"],use: '.topdf',
    desc: "Convert provided text to a PDF file.",
    react: "📄",
    category: "convert",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide the text you want to convert to PDF. *Eg* `.topdf` *Pakistan ZindaBad 🇵🇰*");

        // Create a new PDF document
        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(buffers);

            // Send the PDF file
            await conn.sendMessage(from, {
                document: pdfData,
                mimetype: 'application/pdf',
                fileName: 'ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ.pdf',
                caption: `
*📄 PDF created successully!*

> © Created By ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ 💜`
            }, { quoted: mek });
        });

        // Add text to the PDF
        doc.text(q);

        // Finalize the PDF and end the stream
        doc.end();

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    } 
});
cmd({
    pattern: "person",
    react: "👤",
    alias: ["userinfo", "profile"],
    desc: "Get complete user profile information",
    category: "group",
    use: '.person [@tag or reply]',
    filename: __filename
},
async (conn, mek, m, { from, sender, isGroup, reply, quoted, participants }) => {
    try {
        // 1. DETERMINE TARGET USER
        let userJid = quoted?.sender || 
                     mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                     sender;

        // 2. VERIFY USER EXISTS
        const [user] = await conn.onWhatsApp(userJid).catch(() => []);
        if (!user?.exists) return reply("❌ User not found on WhatsApp");

        // 3. GET PROFILE PICTURE
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(userJid, 'image');
        } catch {
            ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
        }

        // 4. GET NAME (MULTI-SOURCE FALLBACK)
        let userName = userJid.split('@')[0];
        try {
            // Try group participant info first
            if (isGroup) {
                const member = participants.find(p => p.id === userJid);
                if (member?.notify) userName = member.notify;
            }
            
            // Try contact DB
            if (userName === userJid.split('@')[0] && conn.contactDB) {
                const contact = await conn.contactDB.get(userJid).catch(() => null);
                if (contact?.name) userName = contact.name;
            }
            
            // Try presence as final fallback
            if (userName === userJid.split('@')[0]) {
                const presence = await conn.presenceSubscribe(userJid).catch(() => null);
                if (presence?.pushname) userName = presence.pushname;
            }
        } catch (e) {
            console.log("Name fetch error:", e);
        }

        // 5. GET BIO/ABOUT
        let bio = {};
        try {
            // Try personal status
            const statusData = await conn.fetchStatus(userJid).catch(() => null);
            if (statusData?.status) {
                bio = {
                    text: statusData.status,
                    type: "Personal",
                    updated: statusData.setAt ? new Date(statusData.setAt * 1000) : null
                };
            } else {
                // Try business profile
                const businessProfile = await conn.getBusinessProfile(userJid).catch(() => null);
                if (businessProfile?.description) {
                    bio = {
                        text: businessProfile.description,
                        type: "Business",
                        updated: null
                    };
                }
            }
        } catch (e) {
            console.log("Bio fetch error:", e);
        }

        // 6. GET GROUP ROLE
        let groupRole = "";
        if (isGroup) {
            const participant = participants.find(p => p.id === userJid);
            groupRole = participant?.admin ? "👑 Admin" : "👥 Member";
        }

        // 7. FORMAT OUTPUT
        const formattedBio = bio.text ? 
            `${bio.text}\n└─ 📌 ${bio.type} Bio${bio.updated ? ` | 🕒 ${bio.updated.toLocaleString()}` : ''}` : 
            "No bio available";

        const userInfo = `
*GC MEMBER INFORMATION 🧊*

📛 *Name:* ${userName}
🔢 *Number:* ${userJid.replace(/@.+/, '')}
📌 *Account Type:* ${user.isBusiness ? "💼 Business" : user.isEnterprise ? "🏢 Enterprise" : "👤 Personal"}

*📝 About:*
${formattedBio}

*⚙️ Account Info:*
✅ Registered: ${user.isUser ? "Yes" : "No"}
🛡️ Verified: ${user.verifiedName ? "✅ Verified" : "❌ Not verified"}
${isGroup ? `👥 *Group Role:* ${groupRole}` : ''}
`.trim();

        // 8. SEND RESULT
        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: userInfo,
            mentions: [userJid]
        }, { quoted: mek });

    } catch (e) {
        console.error("Person command error:", e);
        reply(`❌ Error: ${e.message || "Failed to fetch profile"}`);
    }
});
                     
cmd({
    pattern: "msg",
    desc: "Send a message multiple times (Owner Only)",
    category: "group",
    react: "🔁",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator, q }) => {
    // Owner-only restriction
    if (!isCreator) return reply('🚫 *Owner only command!*');

    try {
        // Check format: .msg text,count
        if (!q.includes(',')) {
            return reply("❌ *Format:* .msg text,count\n*Example:* .msg Hello,5");
        }

        const [message, countStr] = q.split(',');
        const count = parseInt(countStr.trim());

        // Hard limit: 1-100 messages
        if (isNaN(count) || count < 1 || count > 100) {
            return reply("❌ *Max 100 messages at once!*");
        }

        // Silent execution (no confirmations)
        for (let i = 0; i < count; i++) {
            await conn.sendMessage(from, { text: message }, { quoted: null });
            if (i < count - 1) await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        }

    } catch (e) {
        console.error("Error in msg command:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

cmd({
    pattern: "report",
    alias: ["ask", "bug", "request"],
    desc: "Report a bug or request a feature",
    category: "group",
    filename: __filename
}, async (conn, mek, m, {
    from, body, command, args, senderNumber, reply
}) => {
    try {
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("Only the bot owner can use this command.");
        }
        
        if (!args.length) {
            return reply(`Example: ${config.PREFIX}report Play command is not working`);
        }

        const reportedMessages = {};
        const devNumber = "258871168283"; // Bot owner's number
        const messageId = m.key.id;

        if (reportedMessages[messageId]) {
            return reply("This report has already been forwarded to the owner. Please wait for a response.");
        }
        reportedMessages[messageId] = true;

        const reportText = `*| REQUEST/BUG |*\n\n*User*: @${m.sender.split("@")[0]}\n*Request/Bug*: ${args.join(" ")}`;
        const confirmationText = `Hi ${m.pushName}, your request has been forwarded to the owner. Please wait...`;

        await conn.sendMessage(`${devNumber}@s.whatsapp.net`, {
            text: reportText,
            mentions: [m.sender]
        }, { quoted: m });

        reply(confirmationText);
    } catch (error) {
        console.error(error);
        reply("An error occurred while processing your report.");
    }
});
 

cmd(
  {
    pattern: 'vsticker',
    alias: ['gsticker', 'g2s', 'gs', 's', 'vs',],
    desc: 'Convert GIF/Video to a sticker.',
    category: 'convert',
    use: '<reply media or URL>',
    filename: __filename,
  },
  async (conn, mek, m, { quoted, args, reply }) => {
    try {
      if (!mek.quoted) return reply('*Reply to a video or GIF to convert it to a sticker!*');

      const mime = mek.quoted.mtype;
      if (!['videoMessage', 'imageMessage'].includes(mime)) {
        return reply('*Please reply to a valid video or GIF.*');
      }

      // Download the media file
      const media = await mek.quoted.download();

      // Convert the video to a WebP buffer
      const webpBuffer = await videoToWebp(media);

      // Generate sticker metadata
      const sticker = new Sticker(webpBuffer, {
        pack: config.STICKER_NAME || 'My Pack',
        author: 'ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ', // Leave blank or customize
        type: StickerTypes.FULL, // FULL for regular stickers
        categories: ['🤩', '🎉'], // Emoji categories
        id: '12345', // Optional ID
        quality: 75, // Set quality for optimization
        background: 'transparent', // Transparent background
      });

      // Convert sticker to buffer and send
      const stickerBuffer = await sticker.toBuffer();
      return conn.sendMessage(mek.chat, { sticker: stickerBuffer }, { quoted: mek });
    } catch (error) {
      console.error(error);
      reply(`❌ An error occurred: ${error.message}`);
    }
  }
);    


cmd({
    pattern: "attp",
    desc: "Convert text to a GIF sticker.",
    react: "✨",
    category: "convert",
    use: ".attp HI",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args[0]) return reply("*Please provide text!*");

        const gifBuffer = await fetchGif(`https://api-fix.onrender.com/api/maker/attp?text=${encodeURIComponent(args[0])}`);
        const stickerBuffer = await gifToSticker(gifBuffer);

        await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: mek });
    } catch (error) {
        reply(`❌ ${error.message}`);
    }
});

cmd({
    pattern: "tempmail",
    alias: ["genmail"],
    desc: "Generate a new temporary email address",
    category: "search",
    react: "📧",
    filename: __filename
},
async (conn, mek, m, { from, reply, prefix }) => {
    try {
        const response = await axios.get('https://apis.davidcyriltech.my.id/temp-mail');
        const { email, session_id, expires_at } = response.data;

        // Format the expiration time and date
        const expiresDate = new Date(expires_at);
        const timeString = expiresDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        const dateString = expiresDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        // Create the complete message
        const message = `
📧 *TEMPORARY EMAIL GENERATED*

✉️ *Email Address:*
${email}

⏳ *Expires:*
${timeString} • ${dateString}

🔑 *Session ID:*
\`\`\`${session_id}\`\`\`

📥 *Check Inbox:*
.inbox ${session_id}

_Email will expire after 24 hours_
`;

        await conn.sendMessage(
            from,
            { 
                text: message,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402829832961@newsletter',
                        newsletterName: 'TempMail Service',
                        serverMessageId: 101
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('TempMail error:', e);
        reply(`❌ Error: ${e.message}`);
    }
});
cmd({
    pattern: "checkmail",
    alias: ["inbox", "tmail", "mailinbox"],
    desc: "Check your temporary email inbox",
    category: "search",
    react: "📬",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const sessionId = args[0];
        if (!sessionId) return reply('🔑 Please provide your session ID\nExample: .checkmail YOUR_SESSION_ID');

        const inboxUrl = `https://apis.davidcyriltech.my.id/temp-mail/inbox?id=${encodeURIComponent(sessionId)}`;
        const response = await axios.get(inboxUrl);

        if (!response.data.success) {
            return reply('❌ Invalid session ID or expired email');
        }

        const { inbox_count, messages } = response.data;

        if (inbox_count === 0) {
            return reply('📭 Your inbox is empty');
        }

        let messageList = `📬 *You have ${inbox_count} message(s)*\n\n`;
        messages.forEach((msg, index) => {
            messageList += `━━━━━━━━━━━━━━━━━━\n` +
                          `📌 *Message ${index + 1}*\n` +
                          `👤 *From:* ${msg.from}\n` +
                          `📝 *Subject:* ${msg.subject}\n` +
                          `⏰ *Date:* ${new Date(msg.date).toLocaleString()}\n\n` +
                          `📄 *Content:*\n${msg.body}\n\n`;
        });

        await reply(messageList);

    } catch (e) {
        console.error('CheckMail error:', e);
        reply(`❌ Error checking inbox: ${e.response?.data?.message || e.message}`);
    }
});
                                      
cmd({
  'pattern': "tourl",
  'alias': ["imgtourl", "imgurl", "url", "geturl", "upload"],
  'react': '🖇',
  'desc': "Convert media to Catbox URL",
  'category': "convert",
  'use': ".tourl [reply to media]",
  'filename': __filename
}, async (client, message, args, { reply }) => {
  try {
    // Check if quoted message exists and has media
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType) {
      throw "Please reply to an image, video, or audio file";
    }

    // Download the media
    const mediaBuffer = await quotedMsg.download();
    const tempFilePath = path.join(os.tmpdir(), `catbox_upload_${Date.now()}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Get file extension based on mime type
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else if (mimeType.includes('video')) extension = '.mp4';
    else if (mimeType.includes('audio')) extension = '.mp3';
    
    const fileName = `file${extension}`;

    // Prepare form data for Catbox
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), fileName);
    form.append('reqtype', 'fileupload');

    // Upload to Catbox
    const response = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    if (!response.data) {
      throw "Error uploading to Catbox";
    }

    const mediaUrl = response.data;
    fs.unlinkSync(tempFilePath);

    // Determine media type for response
    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';

    // Send response
    await reply(
      `*${mediaType} Uploaded Successfully*\n\n` +
      `*Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © Uploaded by 03:40MN 💜`
    );

  } catch (error) {
    console.error(error);
    await reply(`Error: ${error.message || error}`);
  }
});

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
                      
cmd({
    pattern: "aivoice",
    alias: ["vai", "voicex", "voiceai"],
    desc: "Text to speech with different AI voices",
    category: "group",
    react: "🪃",
    filename: __filename
},
async (conn, mek, m, { 
    from, 
    quoted, 
    body, 
    isCmd, 
    command, 
    args, 
    q, 
    isGroup, 
    sender, 
    senderNumber, 
    botNumber2, 
    botNumber, 
    pushname, 
    isMe, 
    isOwner, 
    groupMetadata, 
    groupName, 
    participants, 
    groupAdmins, 
    isBotAdmins, 
    isAdmins, 
    reply 
}) => {
    try {
        // Check if args[0] exists (user provided text)
        if (!args[0]) {
            return reply("Please provide text after the command.\nExample: .aivoice hello");
        }

        // Get the full input text
        const inputText = args.join(' ');

        // Send initial reaction
        await conn.sendMessage(from, {  
            react: { text: '⏳', key: m.key }  
        });

        // Voice model menu
        const voiceModels = [
            { number: "1", name: "Hatsune Miku", model: "miku" },
            { number: "2", name: "Nahida (Exclusive)", model: "nahida" },
            { number: "3", name: "Nami", model: "nami" },
            { number: "4", name: "Ana (Female)", model: "ana" },
            { number: "5", name: "Optimus Prime", model: "optimus_prime" },
            { number: "6", name: "Goku", model: "goku" },
            { number: "7", name: "Taylor Swift", model: "taylor_swift" },
            { number: "8", name: "Elon Musk", model: "elon_musk" },
            { number: "9", name: "Mickey Mouse", model: "mickey_mouse" },
            { number: "10", name: "Kendrick Lamar", model: "kendrick_lamar" },
            { number: "11", name: "Angela Adkinsh", model: "angela_adkinsh" },
            { number: "12", name: "Eminem", model: "eminem" }
        ];

        // Create menu text
        let menuText = "╭━━━〔 *QUEEN ELISA AI VOICE MODELS* 〕━━━⊷\n";
        voiceModels.forEach(model => {
            menuText += `┃▸ ${model.number}. ${model.name}\n`;
        });
        menuText += "╰━━━⪼\n\n";
        menuText += `📌 *Reply with the number to select voice model for:*\n"${inputText}"`;

        // Send menu message with image
        const sentMsg = await conn.sendMessage(from, {  
            image: { url: "https://files.catbox.moe/b477kp.jpg" },
            caption: menuText
        }, { quoted: m });

        const messageID = sentMsg.key.id;
        let handlerActive = true;

        // Set timeout to remove handler after 2 minutes
        const handlerTimeout = setTimeout(() => {
            handlerActive = false;
            conn.ev.off("messages.upsert", messageHandler);
            reply("⌛ Voice selection timed out. Please try the command again.");
        }, 120000);

        // Message handler function
        const messageHandler = async (msgData) => {  
            if (!handlerActive) return;
            
            const receivedMsg = msgData.messages[0];  
            if (!receivedMsg || !receivedMsg.message) return;  

            const receivedText = receivedMsg.message.conversation || 
                              receivedMsg.message.extendedTextMessage?.text || 
                              receivedMsg.message.buttonsResponseMessage?.selectedButtonId;  
            const senderID = receivedMsg.key.remoteJid;  
            const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;  

            if (isReplyToBot && senderID === from) {  
                clearTimeout(handlerTimeout);
                conn.ev.off("messages.upsert", messageHandler);
                handlerActive = false;

                await conn.sendMessage(senderID, {  
                    react: { text: '⬇️', key: receivedMsg.key }  
                });  

                const selectedNumber = receivedText.trim();
                const selectedModel = voiceModels.find(model => model.number === selectedNumber);

                if (!selectedModel) {
                    return reply("❌ Invalid option! Please reply with a number from the menu.");
                }

                try {
                    // Show processing message
                    await conn.sendMessage(from, {  
                        text: `🔊 Generating audio with ${selectedModel.name} voice...`  
                    }, { quoted: receivedMsg });

                    // Call the API
                    const apiUrl = `https://api.agatz.xyz/api/voiceover?text=${encodeURIComponent(inputText)}&model=${selectedModel.model}`;
                    const response = await axios.get(apiUrl, {
                        timeout: 30000 // 30 seconds timeout
                    });
                    
                    const data = response.data;

                    if (data.status === 200) {
                        await conn.sendMessage(from, {  
                            audio: { url: data.data.oss_url },  
                            mimetype: "audio/mpeg"
                            // Removed ptt: true to send as regular audio
                        }, { quoted: receivedMsg });
                    } else {
                        reply("❌ Error generating audio. Please try again.");
                    }
                } catch (error) {
                    console.error("API Error:", error);
                    reply("❌ Error processing your request. Please try again.");
                }
            }  
        };

        // Register the handler
        conn.ev.on("messages.upsert", messageHandler);

    } catch (error) {
        console.error("Command Error:", error);
        reply("❌ An error occurred. Please try again.");
    }
});
                     
cmd({
  pattern: "wikipedia",
  alias: ["wiki"],
  react: "📖",
  desc: "Fetch Wikipedia information and translate to English.",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
  try {
    if (!q) {
      return reply("Please provide a search query for Wikipedia.");
    }

    await reply("Searching Wikipedia...");

    const response = await fetchJson(`https://api.siputzx.my.id/api/s/wikipedia?query=${encodeURIComponent(q)}`);

    if (!response.status || !response.data) {
      return reply("No results found for your query.");
    }

    const { wiki, thumb } = response.data;

    // Translate the Wikipedia text to English
    const translated = await translate(wiki, { to: "en" });

    let message = `📖 *Wikipedia Result*\n\n📝 *Query:* ${q}\n\n${translated.text}`;

    if (thumb) {
      await conn.sendMessage(m.chat, {
        image: { url: thumb },
        caption: message
      });
    } else {
      await reply(message);
    }

  } catch (error) {
    console.error(error);
    reply("An error occurred: " + error.message);
  }
});
cmd({
    pattern: "wstalk",
    alias: ["channelstalk", "chinfo"],
    desc: "Get WhatsApp channel information",
    category: "search",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        // Check if URL is provided
        if (!args) return reply("❌ Please provide a WhatsApp channel URL\nExample: .wstalk https://whatsapp.com/channel/0029VatOy2EAzNc2WcShQw1j");

        // Extract channel ID from URL
        const channelId = args.match(/channel\/([0-9A-Za-z]+)/i)?.[1];
        if (!channelId) return reply("❌ Invalid WhatsApp channel URL");

        // API endpoint
        const apiUrl = `https://itzpire.com/stalk/whatsapp-channel?url=https://whatsapp.com/channel/${channelId}`;

        // Fetch channel info
        const response = await axios.get(apiUrl);
        const data = response.data.data;

        // Format the information
        const channelInfo = `╭━━〔 *CHANNEL INFO* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *📢 Title*: ${data.title}
┃◈┃• *👥 Followers*: ${data.followers}
┃◈┃• *📝 Description*: ${data.description.replace(/\n/g, '\n┃◈┃• ')}
┃◈└───────────┈⊷
╰──────────────┈⊷
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ`;

        // Send message with channel image
        await conn.sendMessage(from, {
            image: { url: data.img },
            caption: channelInfo,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in wstalk command:", e);
        reply(`❌ Error: ${e.response?.data?.message || e.message}`);
    }
});


cmd({
  pattern: "joke",
  desc: "😂 Get a random joke",
  react: "🤣",
  category: "group",
  filename: __filename
}, async (conn, m, store, { reply }) => {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    const joke = response.data;

    if (!joke || !joke.setup || !joke.punchline) {
      return reply("❌ Failed to fetch a joke. Please try again.");
    }

    const jokeMessage = `🤣 *Here's a random joke for you!* 🤣\n\n*${joke.setup}*\n\n${joke.punchline} 😆\n\n> *© Powered by ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ*`;

    return reply(jokeMessage);
  } catch (error) {
    console.error("❌ Error in joke command:", error);
    return reply("⚠️ An error occurred while fetching the joke. Please try again.");
  }
});

// flirt

cmd({
    pattern: "flirt",
    alias: ["masom", "line"],
    desc: "Get a random flirt or pickup line.",
    react: "💘",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // Define API key and URL
        const shizokeys = 'shizo';
        const apiUrl = `https://shizoapi.onrender.com/api/texts/flirt?apikey=${shizokeys}`;

        // Fetch data from the API
        const res = await fetch(apiUrl);
        if (!res.ok) {
            throw new Error(`API error: ${await res.text()}`);
        }
        
        const json = await res.json();
        if (!json.result) {
            throw new Error("Invalid response from API.");
        }

        // Extract and send the flirt message
        const flirtMessage = `${json.result}`;
        await conn.sendMessage(from, {
            text: flirtMessage,
            mentions: [m.sender],
        }, { quoted: m });

    } catch (error) {
        console.error("Error in flirt command:", error);
        reply("Sorry, something went wrong while fetching the flirt line. Please try again later.");
    }
});

//truth

cmd({
    pattern: "truth",
    alias: ["truthquestion"],
    desc: "Get a random truth question from the API.",
    react: "❓",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const shizokeys = 'shizo';
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/truth?apikey=${shizokeys}`);
        
        if (!res.ok) {
            console.error(`API request failed with status ${res.status}`);
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        if (!json.result) {
            console.error("Invalid API response: No 'result' field found.");
            throw new Error("Invalid API response: No 'result' field found.");
        }

        const truthText = `${json.result}`;
        await conn.sendMessage(from, { 
            text: truthText, 
            mentions: [m.sender] 
        }, { quoted: m });

    } catch (error) {
        console.error("Error in truth command:", error);
        reply("Sorry, something went wrong while fetching the truth question. Please try again later.");
    }
});

// dare

cmd({
    pattern: "dare",
    alias: ["truthordare"],
    desc: "Get a random dare from the API.",
    react: "🎯",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // API Key
        const shizokeys = 'shizo';

        // Fetch dare text from the API
        const res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=${shizokeys}`);
        
        if (!res.ok) {
            console.error(`API request failed with status ${res.status}`);
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        if (!json.result) {
            console.error("Invalid API response: No 'result' field found.");
            throw new Error("Invalid API response: No 'result' field found.");
        }

        // Format the dare message
        const dareText = `${json.result}`;

        // Send the dare to the chat
        await conn.sendMessage(from, { 
            text: dareText, 
            mentions: [m.sender] 
        }, { quoted: m });

    } catch (error) {
        console.error("Error in dare command:", error);
        reply("Sorry, something went wrong while fetching the dare. Please try again later.");
    }
});

cmd({
  pattern: "fact",
  desc: "🧠 Get a random fun fact",
  react: "🧠",
  category: "group",
  filename: __filename
}, async (conn, m, store, { reply }) => {
  try {
    const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
    const fact = response.data.text;

    if (!fact) {
      return reply("❌ Failed to fetch a fun fact. Please try again.");
    }

    const factMessage = `🧠 *Random Fun Fact* 🧠\n\n${fact}\n\nIsn't that interesting? 😄\n\n> *© Powered by ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ*`;

    return reply(factMessage);
  } catch (error) {
    console.error("❌ Error in fact command:", error);
    return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
  }
});

cmd({
    pattern: "pickupline",
    alias: ["pickup"],
    desc: "Get a random pickup line from the API.",
    react: "💬",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        // Fetch pickup line from the API
        const res = await fetch('https://api.popcat.xyz/pickuplines');
        
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }

        const json = await res.json();

        // Log the API response (for debugging purposes)
        console.log('JSON response:', json);

        // Format the pickup line message
        const pickupLine = `*Here's a pickup line for you:*\n\n"${json.pickupline}"\n\n> *© Powered By 03:40MN*`;

        // Send the pickup line to the chat
        await conn.sendMessage(from, { text: pickupLine }, { quoted: m });

    } catch (error) {
        console.error("Error in pickupline command:", error);
        reply("Sorry, something went wrong while fetching the pickup line. Please try again later.");
    }
});

// char

cmd({
    pattern: "character",
    alias: ["char"],
    desc: "Check the character of a mentioned user.",
    react: "🔥",
    category: "convert",
    filename: __filename,
}, 
async (conn, mek, m, { from, isGroup, text, reply }) => {
    try {
        // Ensure the command is used in a group
        if (!isGroup) {
            return reply("This command can only be used in groups.");
        }

        // Extract the mentioned user
        const mentionedUser = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mentionedUser) {
            return reply("Please mention a user whose character you want to check.");
        }

        // Define character traits
        const userChar = [
            "Sigma",
            "Generous",
            "Grumpy",
            "Overconfident",
            "Obedient",
            "Good",
            "Simp",
            "Kind",
            "Patient",
            "Pervert",
            "Cool",
            "Helpful",
            "Brilliant",
            "Sexy",
            "Hot",
            "Gorgeous",
            "Cute",
        ];

        // Randomly select a character trait
        const userCharacterSelection =
            userChar[Math.floor(Math.random() * userChar.length)];

        // Message to send
        const message = `Character of @${mentionedUser.split("@")[0]} is *${userCharacterSelection}* 🔥⚡`;

        // Send the message with mentions
        await conn.sendMessage(from, {
            text: message,
            mentions: [mentionedUser],
        }, { quoted: m });

    } catch (e) {
        console.error("Error in character command:", e);
        reply("An error occurred while processing the command. Please try again.");
    }
});

cmd({
  pattern: "repeat",
  alias: ["rp", "rpm"],
  desc: "Repeat a message a specified number of times.",
  category: "group",
  filename: __filename
}, async (conn, m, store, { args, reply }) => {
  try {
    if (!args[0]) {
      return reply("✳️ Use this command like:\n*Example:* .repeat 10,I love you");
    }

    const [countStr, ...messageParts] = args.join(" ").split(",");
    const count = parseInt(countStr.trim());
    const message = messageParts.join(",").trim();

    if (isNaN(count) || count <= 0 || count > 300) {
      return reply("❎ Please specify a valid number between 1 and 300.");
    }

    if (!message) {
      return reply("❎ Please provide a message to repeat.");
    }

    const repeatedMessage = Array(count).fill(message).join("\n");

    reply(`🔄 Repeated ${count} times:\n\n${repeatedMessage}`);
  } catch (error) {
    console.error("❌ Error in repeat command:", error);
    reply("❎ An error occurred while processing your request.");
  }
});

cmd({
  pattern: "send",
  desc: "Send a message multiple times, one by one.",
  category: "owner",
  filename: __filename
}, async (conn, m, store, { args, reply, senderNumber }) => {
  try {
    const botOwner = conn.user.id.split(":")[0]; // Get bot owner's number

    if (senderNumber !== botOwner) {
      return reply("❎ Only the bot owner can use this command.");
    }

    if (!args[0]) {
      return reply("✳️ Use this command like:\n *Example:* .send 10,I love you");
    }

    const [countStr, ...messageParts] = args.join(" ").split(",");
    const count = parseInt(countStr.trim());
    const message = messageParts.join(",").trim();

    if (isNaN(count) || count <= 0 || count > 100) {
      return reply("❎ Please specify a valid number between 1 and 100.");
    }

    if (!message) {
      return reply("❎ Please provide a message to send.");
    }

    reply(`⏳ Sending "${message}" ${count} times. This may take a while...`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(m.from, { text: message }, { quoted: m });
      await sleep(1000); // 1-second delay
    }

    reply(`✅ Successfully sent the message ${count} times.`);
  } catch (error) {
    console.error("❌ Error in ask command:", error);
    reply("❎ An error occurred while processing your request.");
  }
});

cmd({
  pattern: "readmore",
  alias: ["rm", "rmore", "readm"],
  desc: "Generate a Read More message.",
  category: "convert",
  use: ".readmore <text>",
  react: "📝",
  filename: __filename
}, async (conn, m, store, { args, reply }) => {
  try {
    const inputText = args.join(" ") || "No text provided.";
    const readMore = String.fromCharCode(8206).repeat(4000); // Creates a large hidden gap
    const message = `${inputText} ${readMore} Continue Reading...`;

    await conn.sendMessage(m.from, { text: message }, { quoted: m });
  } catch (error) {
    console.error("❌ Error in readmore command:", error);
    reply("❌ An error occurred: " + error.message);
  }
});
cmd({
    pattern: "privacy",
    alias: ["privacymenu"],
    desc: "Privacy settings menu",
    category: "owner",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let privacyMenu = `╭━━〔 *Privacy Settings* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• blocklist - View blocked users
┃◈┃• getbio - Get user's bio
┃◈┃• setppall - Set profile pic privacy
┃◈┃• setonline - Set online privacy
┃◈┃• setpp - Change bot's profile pic
┃◈┃• setmyname - Change bot's name
┃◈┃• updatebio - Change bot's bio
┃◈┃• groupsprivacy - Set group add privacy
┃◈┃• getprivacy - View current privacy settings
┃◈┃• getpp - Get user's profile picture
┃◈┃
┃◈┃*Options for privacy commands:*
┃◈┃• all - Everyone
┃◈┃• contacts - My contacts only
┃◈┃• contact_blacklist - Contacts except blocked
┃◈┃• none - Nobody
┃◈┃• match_last_seen - Match last seen
┃◈└───────────┈⊷
╰──────────────┈⊷
*Note:* Most commands are owner-only`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/v6zfno.jpg` }, // Replace with privacy-themed image if available
                caption: privacyMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402829832961@newsletter',
                        newsletterName: "Privacy Settings",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});


cmd({
    pattern: "blocklist",
    desc: "View the list of blocked users.",
    category: "owner",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 You are not the owner!*");

    try {
        // Fetch the block list
        const blockedUsers = await conn.fetchBlocklist();

        if (blockedUsers.length === 0) {
            return reply("📋 Your block list is empty.");
        }

        // Format the blocked users with 📌 and count the total
        const list = blockedUsers
            .map((user, i) => `🚧 BLOCKED ${user.split('@')[0]}`) // Remove domain and add 📌
            .join('\n');

        const count = blockedUsers.length;
        reply(`📋 Blocked Users (${count}):\n\n${list}`);
    } catch (err) {
        console.error(err);
        reply(`❌ Failed to fetch block list: ${err.message}`);
    }
});

cmd({
    pattern: "getbio",
    desc: "Displays the user's bio.",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        const jid = args[0] || mek.key.remoteJid;
        const about = await conn.fetchStatus?.(jid);
        if (!about) return reply("No bio found.");
        return reply(`User Bio:\n\n${about.status}`);
    } catch (error) {
        console.error("Error in bio command:", error);
        reply("No bio found.");
    }
});
cmd({
    pattern: "setppall",
    desc: "Update Profile Picture Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];  
        
        if (!validValues.includes(value)) {
            return reply("❌ Invalid option. Valid options are: 'all', 'contacts', 'contact_blacklist', 'none'.");
        }
        
        await conn.updateProfilePicturePrivacy(value);
        reply(`✅ Profile picture privacy updated to: ${value}`);
    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});
cmd({
    pattern: "setonline",
    desc: "Update Online Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'match_last_seen'];
        
        if (!validValues.includes(value)) {
            return reply("❌ Invalid option. Valid options are: 'all', 'match_last_seen'.");
        }

        await conn.updateOnlinePrivacy(value);
        reply(`✅ Online privacy updated to: ${value}`);
    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});

cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");
    try {
        const stream = await downloadContentFromMessage(quoted.message.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        const mediaPath = path.join(__dirname, `${Date.now()}.jpg`);
        fs.writeFileSync(mediaPath, buffer);

        // Update profile picture with the saved file
        await conn.updateProfilePicture(conn.user.jid, { url: `file://${mediaPath}` });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        console.error("Error updating profile picture:", error);
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

cmd({
    pattern: "setmyname",
    desc: "Set your WhatsApp display name.",
    category: "owner",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    // Ensure you have the display name argument
    const displayName = args.join(" ");
    if (!displayName) return reply("❌ Please provide a display name.");

    try {
        // Ensure the session is loaded before trying to update
        const { state, saveCreds } = await useMultiFileAuthState('path/to/auth/folder');
        const conn = makeWASocket({
            auth: state,
            printQRInTerminal: true,
        });

        conn.ev.on('creds.update', saveCreds);

        // Update display name after connection
        await conn.updateProfileName(displayName);
        reply(`✅ Your display name has been set to: ${displayName}`);
    } catch (err) {
        console.error(err);
        reply("❌ Failed to set your display name.");
    }
});

cmd({
    pattern: "updatebio",
    react: "🥏",
    desc: "Change the Bot number Bio.",
    category: "owner",
    use: '.updatebio',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
        if (!q) return reply('❓ *Enter the New Bio*');
        if (q.length > 139) return reply('❗ *Sorry! Character limit exceeded*');
        await conn.updateProfileStatus(q);
        await conn.sendMessage(from, { text: "✔️ *New Bio Added Successfully*" }, { quoted: mek });
    } catch (e) {
        reply('🚫 *An error occurred!*\n\n' + e);
        l(e);
    }
});
cmd({
    pattern: "groupsprivacy",
    desc: "Update Group Add Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
}, 
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];
        
        if (!validValues.includes(value)) {
            return reply("❌ Invalid option. Valid options are: 'all', 'contacts', 'contact_blacklist', 'none'.");
        }

        await conn.updateGroupsAddPrivacy(value);
        reply(`✅ Group add privacy updated to: ${value}`);
    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});

cmd({
    pattern: "getprivacy",
    desc: "Get the bot Number Privacy Setting Updates.",
    category: "owner",
    use: '.getprivacy',
    filename: __filename
},
async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) return reply('🚫 *You must be an Owner to use this command*');
        const duka = await conn.fetchPrivacySettings?.(true);
        if (!duka) return reply('🚫 *Failed to fetch privacy settings*');
        
        let puka = `
╭───「 𝙿𝚁𝙸𝚅𝙰𝙲𝚈  」───◆  
│ ∘ 𝚁𝚎𝚊𝚍 𝚁𝚎𝚌𝚎𝚒𝚙𝚝: ${duka.readreceipts}  
│ ∘ 𝙿𝚛𝚘𝚏𝚒𝚕𝚎 𝙿𝚒𝚌𝚝𝚞𝚛𝚎: ${duka.profile}  
│ ∘ 𝚂𝚝𝚊𝚝𝚞𝚜: ${duka.status}  
│ ∘ 𝙾𝚗𝚕𝚒𝚗𝚎: ${duka.online}  
│ ∘ 𝙻𝚊𝚜𝚝 𝚂𝚎𝚎𝚗: ${duka.last}  
│ ∘ 𝙶𝚛𝚘𝚞𝚙 𝙿𝚛𝚒𝚟𝚊𝚌𝚢: ${duka.groupadd}  
│ ∘ 𝙲𝚊𝚕𝚕 𝙿𝚛𝚒𝚟𝚊𝚌𝚢: ${duka.calladd}  
╰────────────────────`;
        await conn.sendMessage(from, { text: puka }, { quoted: mek });
    } catch (e) {
        reply('🚫 *An error occurred!*\n\n' + e);
        l(e);
    }
});
cmd({
    pattern: "getpp",
    desc: "Fetch the profile picture of a tagged or replied user.",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { quoted, isGroup, sender, participants, reply }) => {
    try {
        // Determine the target user
        const targetJid = quoted ? quoted.sender : sender;

        if (!targetJid) return reply("⚠️ Please reply to a message to fetch the profile picture.");

        // Fetch the user's profile picture URL
        const userPicUrl = await conn.profilePictureUrl(targetJid, "image").catch(() => null);

        if (!userPicUrl) return reply("⚠️ No profile picture found for the specified user.");

        // Send the user's profile picture
        await conn.sendMessage(m.chat, {
            image: { url: userPicUrl },
            caption: "🖼️ Here is the profile picture of the specified user."
        });
    } catch (e) {
        console.error("Error fetching user profile picture:", e);
        reply("❌ An error occurred while fetching the profile picture. Please try again later.");
    }
});

cmd({
  pattern: "ss",
  alias: ["ssweb"],
  react: "💫",
  desc: "Download screenshot of a given link.",
  category: "other",
  use: ".ss <link>",
  filename: __filename,
}, 
async (conn, mek, m, {
  from, l, quoted, body, isCmd, command, args, q, isGroup, sender, 
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, 
  groupMetadata, groupName, participants, isItzcp, groupAdmins, 
  isBotAdmins, isAdmins, reply 
}) => {
  if (!q) {
    return reply("Please provide a URL to capture a screenshot.");
  }

  try {
    // created by jawad tech 
    const response = await axios.get(`https://api.davidcyriltech.my.id/ssweb?url=${q}`);
    const screenshotUrl = response.data.screenshotUrl;

    // give credit and use
    const imageMessage = {
      image: { url: screenshotUrl },
      caption: "*WEB SS DOWNLOADER*\n\n> *© Powered By ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363402829832961@newsletter',
          newsletterName: "ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ",
          serverMessageId: 143,
        },
      },
    };

    await conn.sendMessage(from, imageMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    reply("Failed to capture the screenshot. Please try again.");
  }
});

// ⿻ ⌜ ELISA ⌟⿻⃮͛🇵🇰𖤐
cmd({
  pattern: "rw",
  alias: ["randomwall", "wallpaper"],
  react: "🌌",
  desc: "Download random wallpapers based on keywords.",
  category: "download",
  use: ".rw <keyword>",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const query = args.join(" ") || "random";
    const apiUrl = `https://pikabotzapi.vercel.app/random/randomwall/?apikey=anya-md&query=${encodeURIComponent(query)}`;

    const { data } = await axios.get(apiUrl);
    
    if (data.status && data.imgUrl) {
      const caption = `🌌 *Random Wallpaper: ${query}*\n\n> *© Powered by ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ*`;
      await conn.sendMessage(from, { image: { url: data.imgUrl }, caption }, { quoted: m });
    } else {
      reply(`❌ No wallpaper found for *"${query}"*.`);
    }
  } catch (error) {
    console.error("Wallpaper Error:", error);
    reply("❌ An error occurred while fetching the wallpaper. Please try again.");
  }
});
cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");
        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        const weather = `
> 🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍
> 🌡️ *Temperature*: ${data.main.temp}°C
> 🌡️ *Feels Like*: ${data.main.feels_like}°C
> 🌡️ *Min Temp*: ${data.main.temp_min}°C
> 🌡️ *Max Temp*: ${data.main.temp_max}°C
> 💧 *Humidity*: ${data.main.humidity}%
> ☁️ *Weather*: ${data.weather[0].main}
> 🌫️ *Description*: ${data.weather[0].description}
> 💨 *Wind Speed*: ${data.wind.speed} m/s
> 🔽 *Pressure*: ${data.main.pressure} hPa

> *© Powdered By ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ*
`;
        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});
                 
cmd({
  pattern: "repo",
  desc: "Fetch information about a GitHub repository.",
  category: "group",
  react: "🍃",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const repoName = args.join(" ");
    if (!repoName) {
      return reply("❌ Please provide a GitHub repository in the format 📌 `owner/repo`.");
    }

    const apiUrl = `https://api.github.com/repos/${repoName}`;
    const { data } = await axios.get(apiUrl);

    let responseMsg = `📁 *GitHub Repository Info* 📁\n\n`;
    responseMsg += `📌 *Name*: ${data.name}\n`;
    responseMsg += `🔗 *URL*: ${data.html_url}\n`;
    responseMsg += `📝 *Description*: ${data.description || "No description"}\n`;
    responseMsg += `⭐ *Stars*: ${data.stargazers_count}\n`;
    responseMsg += `🍴 *Forks*: ${data.forks_count}\n`;
    responseMsg += `👤 *Owner*: ${data.owner.login}\n`;
    responseMsg += `📅 *Created At*: ${new Date(data.created_at).toLocaleDateString()}\n`;
    responseMsg += `\n> *© Powered by JawadTechX*`;

    await conn.sendMessage(from, { text: responseMsg }, { quoted: m });
  } catch (error) {
    console.error("GitHub API Error:", error);
    reply(`❌ Error fetching repository data: ${error.response?.data?.message || error.message}`);
  }
});
cmd({
  pattern: "quran",
  alias: ["surah"],
  react: "🤍",
  desc: "Get Quran Surah details and explanation.",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {

    let surahInput = args[0];

    if (!surahInput) {
      return reply('Type Surah Number or Type *.Surahmenu* for getting Surah numbers');
    }

    let surahListRes = await fetchJson('https://quran-endpoint.vercel.app/quran');
    let surahList = surahListRes.data;

    let surahData = surahList.find(surah => 
        surah.number === Number(surahInput) || 
        surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() || 
        surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
    );

    if (!surahData) {
      return reply(`Couldn't find surah with number or name "${surahInput}"`);
    }

    let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);
    
    if (!res.ok) {
      let error = await res.json(); 
      return reply(`API request failed with status ${res.status} and message ${error.message}`);
    }

    let json = await res.json();

    let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur', autoCorrect: true });

    let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'en', autoCorrect: true });

    let quranSurah = `
🕋 *Quran: The Holy Book ♥️🌹قرآن مجید🌹♥️*\n
📖 *Surah ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
💫Type: ${json.data.type.en}\n
✅Number of verses: ${json.data.ayahCount}\n
⚡🔮 *Explanation (Urdu):*\n
${translatedTafsirUrdu.text}\n
⚡🔮 *Explanation (English):*\n
${translatedTafsirEnglish.text}`;

    await conn.sendMessage(
      from,
      {
        image: { url: `https://files.catbox.moe/v6zfno.jpg` },
        caption: quranSurah,
        contextInfo: {
          mentionedJid: [m.sender], 
          forwardingScore: 999,  
          isForwarded: true,   
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363402829832961@newsletter', 
            newsletterName: 'ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ', 
            serverMessageId: 143
          }
        }
      },
      { quoted: mek }
    );

    if (json.data.recitation.full) {
      await conn.sendMessage(from, {
        audio: { url: json.data.recitation.full },
        mimetype: 'audio/mpeg',  
        ptt: true
      }, { quoted: mek });
    }

  } catch (error) {
    console.error(error);
    reply(`Error: ${error.message}`);
  }
});


cmd({
    pattern: "quranmenu",
    alias: ["surahmenu", "surahlist"],
    desc: "menu the bot",
    category: "owner",
    react: "❤️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body,isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `❤️  ⊷┈ *QURAN KAREEM* ┈⊷  🤍

 💫 𝘈𝘭𝘭 𝘴𝘶𝘳𝘢𝘩 𝘢𝘯𝘥 𝘵𝘩𝘦𝘪𝘳 𝘯𝘶𝘮𝘣𝘦𝘳𝘴 𝘭𝘪𝘴𝘵
𝘧𝘰𝘳 𝘨𝘦𝘵𝘵𝘪𝘯𝘨 𝘴𝘶𝘳𝘢𝘩 𝘵𝘺𝘱𝘦 .𝘴𝘶𝘳𝘢𝘩 36 💫🌸 

1. 🕌 Al-Fatiha (The Opening) - الفاتحہ (پہلا سورہ)


2. 🐄 Al-Baqarah (The Cow) - البقرہ (گائے)


3. 🏠 Aali Imran (The Family of Imran) - آل عمران (عمران کا خاندان)


4. 👩 An-Nisa' (The Women) - النساء (عورتیں)


5. 🍽️ Al-Ma'idah (The Table Spread) - المائدہ (پھیلی ہوئی میز)


6. 🐪 Al-An'am (The Cattle) - الانعام (مویشی)


7. ⛰️ Al-A'raf (The Heights) - الأعراف (بلندیاں)


8. ⚔️ Al-Anfal (The Spoils of War) - الانفال (غنائم)


9. 🙏 At-Tawbah (The Repentance) - التوبہ (توبہ)


10. 🐟 Yunus (Jonah) - یونس (یونس)


11. 🌩️ Hud (Hud) - ہود (ہود)


12. 👶 Yusuf (Joseph) - یوسف (یوسف)


13. ⚡ Ar-Rad (The Thunder) - الرعد (گرج)


14. 🕊️ Ibrahim (Abraham) - ابراہیم (ابراہیم)


15. 🪨 Al-Hijr (The Rocky Tract) - الحجر (پتھرائی زمین)


16. 🐝 An-Nahl (The Bee) - النحل (مکھی)


17. 🌙 Al-Isra' (The Night Journey) - الإسراء (رات کا سفر)


18. 🕳️ Al-Kahf (The Cave) - الکہف (غار)


19. 🧕🏻 Maryam (Mary) - مریم (مریم)


20. 📜 Ta-Ha (Ta-Ha) - طٰہٰ (طٰہٰ)


21. 📖 Al-Anbiya' (The Prophets) - الانبیاء (پیغمبروں)


22. 🕋 Al-Hajj (The Pilgrimage) - الحج (حج)


23. 🙌 Al-Mu'minun (The Believers) - المؤمنون (ایمان والے)


24. 💡 An-Nur (The Light) - النور (روشنی)


25. ⚖️ Al-Furqan (The Criterion) - الفرقان (فرق کرنے والا)


26. 🎤 Ash-Shu'ara' (The Poets) - الشعراء (شاعر)


27. 🐜 An-Naml (The Ant) - النمل (چڑیا)


28. 📚 Al-Qasas (The Stories) - القصص (کہانیاں)


29. 🕷️ Al-Ankabut (The Spider) - الأنعام (مکڑی)


30. 🏛️ Ar-Rum (The Romans) - الروم (رومی)


31. 📖 Luqman (Luqman) - لقمان (لقمان)


32. 🙇 As-Sajda (The Prostration) - السجدہ (سجدہ)


33. ⚔️ Al-Ahzab (The Combined Forces) - الاحزاب (مخلوط قوتیں)


34. 🌸 Saba' (Sheba) - سبا (سبا)


35. 🛠️ Fatir (The Originator) - فاطر (خالق)


36. 📖 Ya-Sin (Ya-Sin) - یس (یس)


37. 🛡️ As-Saffat (Those who set the Ranks) - الصافات (صفیں مرتب کرنے والے)


38. 🅱️ Sad (The Letter Sad) - صاد (حرف صاد)


39. 🪖 Az-Zumar (The Troops) - الزمر (جنگی دستے)


40. 🤲 Ghafir (The Forgiver) - غافر (بخشنے والا)


41. 📜 Fussilat (Explained in Detail) - فصلت (تفصیل سے بیان)


42. 🗣️ Ash-Shura (Consultation) - الشوری (مشاورت)


43. 💰 Az-Zukhruf (The Gold Adornments) - الزخرف (سونے کے زیور)


44. 💨 Ad-Dukhan (The Smoke) - الدخان (دھواں)


45. 🐊 Al-Jathiyah (The Crouching) - الجاثیہ (جھکنا)


46. 🌪️ Al-Ahqaf (The Wind-Curved Sandhills) - الأحقاف (ہوائی چکروں والی ریت کی پہاڑیاں)


47. 🕋 Muhammad (Muhammad) - محمد (محمد)


48. 🏆 Al-Fath (The Victory) - الفتح (فتح)


49. 🏠 Al-Hujurat (The Rooms) - الحجرات (کمرے)


50. 🔤 Qaf (The Letter Qaf) - قاف (حرف قاف)


51. 🌬️ Adh-Dhariyat (The Winnowing Winds) - الذاریات (پھٹنے والی ہوائیں)


52. ⛰️ At-Tur (The Mount) - الطور (پہاڑ)


53. 🌟 An-Najm (The Star) - النجم (ستارہ)


54. 🌙 Al-Qamar (The Moon) - القمر (چاند)


55. 💖 Ar-Rahman (The Beneficent) - الرحمن (بہت مہربان)


56. 🌌 Al-Waqi'a (The Inevitable) - الواقعہ (ہونے والا)


57. 🔩 Al-Hadid (The Iron) - الحدید (لوہا)


58. 👩‍⚖️ Al-Mujadila (The Pleading Woman) - المجادلہ (مدعی عورت)


59. 🏴 Al-Hashr (The Exile) - الحشر (اخراج)


60. 🔍 Al-Mumtahanah (She that is to be examined) - الممتحنہ (جانچنے والی)


61. 📊 As-Saff (The Ranks) - الصف (صفیں)


62. 🕌 Al-Jumu'ah (Friday) - الجمعة (جمعہ)


63. 🤥 Al-Munafiqun (The Hypocrites) - المنافقون (منافق)


64. 🌪️ At-Taghabun (Mutual Disillusion) - التغابن (آپس کی بے وقوفی)


65. 💔 At-Talaq (The Divorce) - الطلاق (طلاق)


66. 🚫 At-Tahrim (The Prohibition) - التحریم (پابندی)


67. 👑 Al-Mulk (The Sovereignty) - المُلك (حکومت)


68. 🖋️ Al-Qalam (The Pen) - القلم (قلم)


69. 🔍 Al-Haqqah (The Reality) - الحقہ (حقیقت)


70. ⬆️ Al-Ma'arij (The Ascending Stairways) - المعارج (چڑھنے کی سیڑھیاں)


71. 🌊 Nuh (Noah) - نوح (نوح)


72. 👻 Al-Jinn (The Jinn) - الجن (جنات)


73. 🕵️‍♂️ Al-Muzzammil (The Enshrouded One) - المزمل (چادر اوڑھے ہوئے)


74. 🧕 Al-Muddathir (The Cloaked One) - المُدثر (پوشیدہ)


75. 🌅 Al-Qari'ah (The Calamity) - القارعة (آفت)


76. 🧑‍🤝‍🧑 Al-Insan (Man) - الانسان (انسان)


77. ✉️ Al-Mursalat (The Emissaries) - المُرسلات (پہنچانے والے)


78. 📣 An-Naba' (The Tidings) - النبأ (خبریں)


79. 🪤 An-Nazi'at (Those who drag forth) - النازعات (کھینچنے والے)


80. 😠 Abasa (He frowned) - عبس (اس نے چہرہ بدلا)


81. 💥 At-Takwir (The Overthrowing) - التکوير (پھٹنا)


82. 💔 Al-Infitar (The Cleaving) - الانفطار (پھٹنا)


83. ⚖️ Al-Mutaffifin (Defrauding) - المطففين (کم تولنے والے)


84. 🌀 Al-Inshiqaq (The Splitting Open) - الانشقاق (پھٹنا)


85. 🌌 Al-Buruj (The Mansions of the Stars) - البروج (ستاروں کے گھر)


86. 🌠 At-Tariq (The Morning Star) - الطارق (صبح کا ستارہ)


87. 🌍 Al-Ala (The Most High) - الأعلى (سب سے بلند)


88. 🌊 Al-Ghashiyah (The Overwhelming) - الغاشیہ (پرامن)


89. 🌅 Al-Fajr (The Dawn) - الفجر (صبح)


90. 🏙️ Al-Balad (The City) - البلد (شہر)


91. ☀️ Ash-Shams (The Sun) - الشمس (سورج)


92. 🌜 Al-Lail (The Night) - اللیل (رات)


93. 🌅 Ad-Duha (The Morning Hours) - الضحی (صبح کے گھنٹے)


94. 📖 As-Sharh (The Relief) - الشرح (آرام)


95. 🍈 At-Tin (The Fig) - التین (انجیر)


96. 💧 Al-Alaq (The Clot) - العلق (خون کا لوتھڑا)


97. ⚡ Al-Qadr (The Power) - القدر (قدرت)


98. 📜 Al-Bayyinah (The Clear Proof) - البینة (واضح دلیل)


99. 🌍 Az-Zalzalah (The Earthquake) - الزلزلة (زلزلہ)


100. 🐎 Al-Adiyat (The Chargers) - العادیات (چارج کرنے والے)


101. ⚡ Al-Qari'ah (The Calamity) - القارعة (آفت)


102. 💰 At-Takathur (The Abundance of Wealth) - التکاثر (مال کی کثرت)


103. ⏳ Al-Asr (The Time) - العصر (وقت)


104. 😠 Al-Humazah (The Scandal-Monger) - الہمزہ (چغلی کرنے والا)


105. 🐘 Al-Fil (The Elephant) - الفیل (ہاتھی)


106. 🕌 Quraysh (Quraysh) - قریش (قریش)


107. 🤲 Al-Ma'un (Acts of Kindness) - الماعون (نیکی کے کام)


108. 🍇 Al-Kawthar (The Abundance) - الکوثر (کثرت)


109. ❌ Al-Kafirun (The Disbelievers) - الکافرون (کافر)


110. 🛡️ An-Nasr (The Help) - النصر (مدد)


111. 🔥 Al-Lahab (The Flame) - اللہب (شعلہ)


112. ❤️ Al-Ikhlas (The Sincerity) - الإخلاص (اخلاص)


113. 🌅 Al-Falaq (The Daybreak) - الفلق (طلوع صبح)


114. 🌐 An-Nas (Mankind) - الناس (انسانیت)`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/v6zfno.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402829832961@newsletter',
                        newsletterName: 'ᴀʏᴀɴ ꜱᴇᴠᴇɴ ᴍᴏᴅᴢ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/JawadYT36/KHAN-DATA/raw/refs/heads/main/autovoice/Quran.m4a' },
            mimetype: 'audio/mp4',
            ptt: false
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
  pattern: "quote",
  desc: "Get a random inspiring quote.",
  category: "group",
  react: "💬",
  filename: __filename
}, async (conn, m, store, { from, reply }) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    const { content, author } = response.data;

    const message = `💬 *"${content}"*\n- ${author}\n\n> *QUOTES BY QUEEN ELISA*`;
    reply(message);
  } catch (error) {
    console.error("Error fetching quote:", error);
    reply("⚠️ API issue or coding error, please check the logs!");
  }
});             
        
          

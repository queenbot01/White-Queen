// settings.js - නිවැරදි කරන ලද සහ පැහැදිලි කරන ලද කේතය

const fs = require('fs');
if (fs.existsSync('settings.env')) require('dotenv').config({ path: './settings.env' });

function convertToBool(text, fault = 'true') {
    return text === fault;
}

const env = process.env;

const settings = {
    // --- String (Text) Settings ---
    SESSION_ID: env.SESSION_ID || "QUEEN-ELISA~HJdx1bjI#gFHS3Trc1NjWQOM3o1adWWNcpV0DbXd19T7LMhTzcY8",
    
    // [වෙනස්කම 1] - ඔබ ඉල්ලූ ස්ථිර status reply පණිවිඩය
    AUTO_STATUS_MSG: env.AUTO_STATUS_MSG || "YOU STATUS SEEN BY WHITE QUEEN 🤍✅",
    
    MENU_IMG: env.MENU_IMG || "https://files.catbox.moe/dr27e4.jpg",
    PREFIX: env.PREFIX || ".",
    BOT_NAME: env.BOT_NAME || "White Queen",
    STICKER_NAME: env.STICKER_NAME || "White Queen",
    CUSTOM_REACT_EMOJIS: env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
    OWNER_NUMBER: env.OWNER_NUMBER || "94729101856",
    OWNER_NAME: env.OWNER_NAME || "HASHEN MD",
    DESCRIPTION: env.DESCRIPTION || "*©made by HASHEN MD*",
    ALIVE_VIDEO: env.ALIVE_VIDEO || "https://files.catbox.moe/4qjiga.mp4",
    LIVE_MSG: env.LIVE_MSG || "> Zinda Hun Yar *White Queen*⚡",
    MODE: env.MODE || "public",
    DEV: env.DEV || "94729101856",
    ANTI_DEL_PATH: env.ANTI_DEL_PATH || "same",
    BOT_NUMBER: env.BOT_NUMBER || "94729101856",

    // --- Boolean (true/false) Settings ---
    AUTO_STATUS_SEEN: convertToBool(env.AUTO_STATUS_SEEN, "true"),
    AUTO_STATUS_REPLY: convertToBool(env.AUTO_STATUS_REPLY, "true"),
    AUTO_STATUS_REACT: convertToBool(env.AUTO_STATUS_REACT, "true"),
    WELCOME: convertToBool(env.WELCOME, "true"),
    ADMIN_EVENTS: convertToBool(env.ADMIN_EVENTS, "true"),
    ANTI_LINK: convertToBool(env.ANTI_LINK, "true"),
    MENTION_REPLY: convertToBool(env.MENTION_REPLY, "true"),
    CUSTOM_REACT: convertToBool(env.CUSTOM_REACT, "true"),
    DELETE_LINKS: convertToBool(env.DELETE_LINKS, "true"),
    READ_MESSAGE: convertToBool(env.READ_MESSAGE, "true"),
    AUTO_REACT: convertToBool(env.AUTO_REACT, "true"),
    ANTI_BAD: convertToBool(env.ANTI_BAD, "true"),
    ANTI_LINK_KICK: convertToBool(env.ANTI_LINK_KICK, "true"),
    AUTO_VOICE: convertToBool(env.AUTO_VOICE, "true"),
    AUTO_STICKER: convertToBool(env.AUTO_STICKER, "true"),
    
    // [වෙනස්කම 2] - ස්ටේටස් නැතුව reply කිරීම නැවැත්වීම සඳහා මෙය false කිරීම
    AUTO_REPLY: convertToBool(env.AUTO_REPLY, "false"), 
    
    ALWAYS_ONLINE: convertToBool(env.ALWAYS_ONLINE, "true"),
    PUBLIC_MODE: convertToBool(env.PUBLIC_MODE, "true"),
    AUTO_TYPING: convertToBool(env.AUTO_TYPING, "true"),
    READ_CMD: convertToBool(env.READ_CMD, "true"),
    ANTI_VV: convertToBool(env.ANTI_VV, "true"),
    AUTO_RECORDING: convertToBool(env.AUTO_RECORDING, "true")
};

module.exports = settings;
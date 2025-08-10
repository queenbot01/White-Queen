const settings = require('../settings');
const { cmd } = require('../command');

// සාර්ථක පණිවිඩය සඳහා function එකක්
function successMessage(settingName, status) {
    return `✅ *${settingName.toUpperCase()}* setting has been successfully changed to *${status}*.`;
}

// boolean (on/off) settings සඳහා පොදු function එකක්
async function handleBooleanSetting(settingName, args, reply) {
    const option = args[0] ? args[0].toLowerCase() : null;
    if (option === 'on' || option === 'true') {
        settings[settingName] = true;
        await reply(successMessage(settingName, 'on'));
    } else if (option === 'off' || option === 'false') {
        settings[settingName] = false;
        await reply(successMessage(settingName, 'off'));
    } else {
        await reply(`Invalid option. Use 'on' or 'off'.\nCurrent status for *${settingName.toUpperCase()}*: ${settings[settingName] ? 'on' : 'off'}`);
    }
}

// --- සියලුම Settings විධාන ---

cmd({
    pattern: "mode",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => {
    const newMode = args[0] ? args[0].toLowerCase() : null;
    if (['public', 'private', 'inbox', 'group'].includes(newMode)) {
        settings.MODE = newMode;
        await reply(successMessage('MODE', newMode));
    } else {
        await reply(`Invalid mode. Use 'public', 'private', 'inbox', or 'group'.\nCurrent mode: ${settings.MODE}`);
    }
});

cmd({
    pattern: "alwaysonline",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('ALWAYS_ONLINE', args, reply));

cmd({
    pattern: "autovoice",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_VOICE', args, reply));

cmd({
    pattern: "autoreply",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_REPLY', args, reply));

cmd({
    pattern: "autosticker",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_STICKER', args, reply));

cmd({
    pattern: "autostatusseen",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_STATUS_SEEN', args, reply));

cmd({
    pattern: "autostatusreact",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_STATUS_REACT', args, reply));

cmd({
    pattern: "autostatusreply",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_STATUS_REPLY', args, reply));

cmd({
    pattern: "autostatusmsg",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { q, reply }) => {
    if (!q) return await reply(`Please provide a message.\nCurrent message: ${settings.AUTO_STATUS_MSG}`);
    settings.AUTO_STATUS_MSG = q;
    await reply(successMessage('AUTO_STATUS_MSG', q));
});

cmd({
    pattern: "antilink",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('ANTI_LINK', args, reply));

cmd({
    pattern: "antilinkkick",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('ANTI_LINK_KICK', args, reply));

cmd({
    pattern: "antibad",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('ANTI_BAD', args, reply));

cmd({
    pattern: "mentionreply",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('MENTION_REPLY', args, reply));

cmd({
    pattern: "deletelinks",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('DELETE_LINKS', args, reply));

cmd({
    pattern: "autorecording",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_RECORDING', args, reply));

cmd({
    pattern: "autotyping",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_TYPING', args, reply));

cmd({
    pattern: "autoreact",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('AUTO_REACT', args, reply));

cmd({
    pattern: "customreact",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('CUSTOM_REACT', args, reply));

cmd({
    pattern: "customreactemojis",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { q, reply }) => {
    if (!q) return await reply(`Please provide emojis separated by commas.\nCurrent emojis: ${settings.CUSTOM_REACT_EMOJIS}`);
    settings.CUSTOM_REACT_EMOJIS = q;
    await reply(successMessage('CUSTOM_REACT_EMOJIS', 'set successfully'));
});

cmd({
    pattern: "antidelpath",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => {
    const path = args[0] ? args[0].toLowerCase() : null;
    if (['log', 'same'].includes(path)) {
        settings.ANTI_DEL_PATH = path;
        await reply(successMessage('ANTI_DEL_PATH', path));
    } else {
        await reply(`Invalid path. Use 'log' or 'same'.\nCurrent path: ${settings.ANTI_DEL_PATH}`);
    }
});

cmd({
    pattern: "adminevents",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('ADMIN_EVENTS', args, reply));

cmd({
    pattern: "welcome",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('WELCOME', args, reply));

cmd({
    pattern: "readmessage",
    category: "settings",
    filename: __filename
}, async(conn, mek, m, { args, reply }) => handleBooleanSetting('READ_MESSAGE', args, reply));
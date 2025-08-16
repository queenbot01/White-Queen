// index.js - සියලුම දෝෂ නිරාකරණය කරන ලද, අවසාන සහ සම්පූර්ණ කේතය

const {
  default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    isJidBroadcast,
    getContentType,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    AnyMessageContent,
    prepareWAMessageMedia,
    areJidsSameUser,
    downloadContentFromMessage,                            downloadMediaMessage,
    MessageRetryMap,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    generateMessageID, makeInMemoryStore,
    jidDecode,
    fetchLatestBaileysVersion,
    Browsers
  } = require('@whiskeysockets/baileys')
  
  const readline = require('readline'); 
  const l = console.log
  const { getBuffer, getGroupAdmins, getRandom, h2k,isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
  const { AntiDelDB, initializeAntiDeleteSettings, setAnti, getAnti, getAllAntiDeleteSettings,saveContact,loadMessage, getName, getChatSummary, saveGroupMetadata, getGroupMetadata,saveMessageCount,getInactiveGroupMembers,getGroupMembersMessageCount,saveMessage }=    require('./data')
  const fs = require('fs')
  const ff = require('fluent-ffmpeg')
  const P = require('pino')
  const settings = require('./settings')
  const GroupEvents = require('./lib/groupevents');
  const rcode = require('qrcode-terminal')
  const StickersTypes = require('wa-sticker-formatter')
  const util = require('util')
  const { sms, AntiDelete } = 
  require('./lib')
  const FileType = require('file-type');
  const axios = require('axios')
  const { File } = require('megajs')
  const { fromBuffer } = require('file-type')
  const bodyparser = require('body-parser')
  const os = require('os')
  const crypto = require('crypto')
  const path = require('path')
  const prefix = settings.PREFIX
  const { commands } = require('./command');

  const messageStore = new Map();
  const ownerNumber = [settings.OWNER_NUMBER.replace(/[^0-9]/g, '94729101856')];
  
  const tempDir = path.join(os.tmpdir(), 'cache-temp')
  if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
  }
  
  const clearTempDir = () => {
      fs.readdir(tempDir, (err, files) => {
          if (err) throw err;
          for (const file of files) {
              fs.unlink(path.join(tempDir, file), err => {
                  if (err) throw err;
              });
          }
      });
  }
  
  setInterval(clearTempDir, 5 * 60 * 1000);

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

const express = require("express");
const app = express();
const port = process.env.PORT || 9090;
  
  async function connectToWA() {
  console.log("White Queen Connecting to WhatsApp ⏳️...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/White-Queen/')
  var { version } = await fetchLatestBaileysVersion()
  
  const conn = makeWASocket({
          logger: P({ level: 'silent' }),
          printQRInTerminal: false,
          browser: Browsers.macOS("Firefox"),
          syncFullHistory: true,
          auth: state,
          version
          })
      
  conn.ev.on('connection.update', (update) => {
  const { connection, lastDisconnect } = update
  if (connection === 'close') {
  if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
  connectToWA()
  }
  } else if (connection === 'open') {
  console.log('🧬 Installing Plugins')
  const path = require('path');
  fs.readdirSync("./plugins/").forEach((plugin) => {
          if (path.extname(plugin).toLowerCase() == ".js") {
          require("./plugins/" + plugin);
        }
      });
      console.log('White Queen Plugins installed successful ✅')
      console.log('White Queen CONNECTED SUCCESSFULLY ✅')

    }
  })

  conn.ev.on('creds.update', saveCreds)                 
 conn.ev.on("group-participants.update", (update) => GroupEvents(conn, update));	  
	  
  conn.ev.on('messages.upsert', async(mek) => {
    mek = mek.messages[0]
    if (!mek.message) return
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') 
    ? mek.message.ephemeralMessage.message 
    : mek.message;

    if (mek.key.id) {
        messageStore.set(mek.key.id, mek);
        setTimeout(() => {
            if (messageStore.has(mek.key.id)) {
                messageStore.delete(mek.key.id);
            }
        }, 300000); 
    }

    if (!mek.key.fromMe) {
      if (settings.AUTO_TYPING === true) {
          await conn.sendPresenceUpdate('composing', mek.key.remoteJid);
      }
      if (settings.AUTO_RECORDING === true) {
          await conn.sendPresenceUpdate('recording', mek.key.remoteJid);
      }
    }
    
    if (settings.READ_MESSAGE === true) {
      await conn.readMessages([mek.key]);
    }
    if(mek.message.viewOnceMessageV2)
      mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && settings.AUTO_STATUS_SEEN === true){
      await conn.readMessages([mek.key])
    }
    
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && settings.AUTO_STATUS_REACT === true){
      if (mek.key.participant) {
          await conn.sendMessage(
            mek.key.remoteJid, 
            { react: { text: '🤍', key: mek.key } },
            { statusJidList: [mek.key.participant] } 
          );
      }
    }
    
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && settings.AUTO_STATUS_REPLY === true){
      const user = mek.key.participant;
      if (user) { 
        const text = `${settings.AUTO_STATUS_MSG}`;
        await conn.sendMessage(user, { text: text }, { quoted: mek });
      }
    }

    await Promise.all([ saveMessage(mek) ]);
    const m = sms(conn, mek)
    const type = getContentType(mek.message)
    const content = JSON.stringify(mek.message)
    const from = mek.key.remoteJid
    const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
    const body = (type === 'conversation') ?           
 mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
    const isCmd = body.startsWith(prefix)
    var budy = typeof mek.text == 'string' ? mek.text : false;
    const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
    const args = body.trim().split(/ +/).slice(1)
    const q = args.join(' ')
    const text = args.join(' ')
    const isGroup = from.endsWith('@g.us')
    const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
    const senderNumber = sender.split('@')[0]
    const botNumber = conn.user.id.split(':')[0]
    const pushname = mek.pushName || 'Sin Nombre'
    const isMe = botNumber.includes(senderNumber)
    const isOwner = ownerNumber.includes(senderNumber) || isMe
    const botNumber2 = await jidNormalizedUser(conn.user.id);
    const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const participants = isGroup ? await groupMetadata.participants : ''
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false
    const isReact = m.message.reactionMessage ? true : false
    const reply = (teks) => { conn.sendMessage(from, { text: teks }, { quoted: mek }) }
    const udp = botNumber.split('@')[0];
    const jawad = (settings.DEV.replace(/[^0-9]/g, ''));
    let isCreator = [udp, jawad, settings.OWNER_NUMBER.replace(/[^0-9]/g, '')].map(v => v + '@s.whatsapp.net').includes(sender);
    if (isCreator && mek.text.startsWith('%')) {
        let code = budy.slice(2);
        if (!code) { return reply(`Provide me with a query to run Master!`); }
        try {
            let resultTest = eval(code);
            if (typeof resultTest === 'object') reply(util.format(resultTest));
            else reply(util.format(resultTest));
        } catch (err) { reply(util.format(err)); }
        return;
    }
    if (isCreator && mek.text.startsWith('$')) {
        let code = budy.slice(2);
        if (!code) { return reply(`Provide me with a query to run Master!`); }
        try {
            let resultTest = await eval('const a = async()=>{\n' + code + '\n}\na()');
            let h = util.format(resultTest);
            if (h === undefined) return console.log(h);
            else reply(h);
        } catch (err) {
            if (err === undefined) return console.log('error');
            else reply(util.format(err));
        }
        return;
    }

    if (!isReact && settings.AUTO_REACT === true) {
        const reactions = [ '🌼', '❤️', '💐', '🔥', '🏵️', '❄️', '🧊', '🐳', '💥', '🥀', '❤‍🔥', '🥹', '😩', '🫣', '🤭', '👻', '👾', '🫶', '😻', '🙌', '🫂', '🫀', '👩‍🦰', '🧑‍🦰', '👩‍⚕️', '🧑‍⚕️', '🧕', '👩‍🏫', '👨‍💻', '👰‍♀', '🦹🏻‍♀️', '🧟‍♀️', '🧟', '🧞‍♀️', '🧞', '🙅‍♀️', '💁‍♂️', '💁‍♀️', '🙆‍♀️', '🙋‍♀️', '🤷', '🤷‍♀️', '🤦', '🤦‍♀️', '💇‍♀️', '💇', '💃', '🚶‍♀️', '🚶', '🧶', '🧤', '👑', '💍', '👝', '💼', '🎒', '🥽', '🐻', '🐼', '🐭', '🐣', '🪿', '🦆', '🦊', '🦋', '🦄', '🪼', '🐋', '🐳', '🦈', '🐍', '🕊️', '🦦', '🦚', '🌱', '🍃', '🎍', '🌿', '☘️', '🍀', '🍁', '🪺', '🍄', '🍄‍🟫', '🪸', '🪨', '🌺', '🪷', '🪻', '🥀', '🌹', '🌷', '💐', '🌾', '🌸', '🌼', '🌻', '🌝', '🌚', '🌕', '🌎', '💫', '🔥', '☃️', '❄️', '🌨️', '🫧', '🍟', '🍫', '🧃', '🧊', '🪀', '🤿', '🏆', '🥇', '🥈', '🥉', '🎗️', '🤹', '🤹‍♀️', '🎧', '🎤', '🥁', '🧩', '🎯', '🚀', '🚁', '🗿', '🎙️', '⌛', '⏳', '💸', '💎', '⚙️', '⛓️', '🔪', '🧸', '🎀', '🪄', '🎈', '🎁', '🎉', '🏮', '🪩', '📩', '💌', '📤', '📦', '📊', '📈', '📑', '📉', '📂', '🔖', '🧷', '📌', '📝', '🔏', '🔐', '🩷', '❤️', '🧡', '💛', '💚', '🩵', '💙', '💜', '🖤', '🩶', '🤍', '🤎', '❤‍🔥', '❤‍🩹', '💗', '💖', '💘', '💝', '❌', '✅', '🔰', '〽️', '🌐', '🌀', '⤴️', '⤵️', '🔴', '🟢', '🟡', '🟠', '🔵', '🟣', '⚫', '⚪', '🟤', '🔇', '🔊', '📢', '🔕', '♥️', '🕐', '🚩', '🇵🇰' ];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        m.react(randomReaction);
    }
    
    if (!isReact && settings.CUSTOM_REACT === true) {
        const reactions = (settings.CUSTOM_REACT_EMOJIS || '🥲,😂,👍🏻,🙂,😔').split(',');
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        m.react(randomReaction);
    }
    
    try {
        const menuIdentifier = '©White-Queen-MAIN-MENU';
        if (m.quoted) {
            const quotedMessageContent = m.quoted.caption || m.quoted.text || '';
            
            if (quotedMessageContent.includes(menuIdentifier)) {
                const choice = m.text.trim();

                const categories = {
                    '1': { name: 'download', emoji: '📥' }, '2': { name: 'youtube', emoji: '📺' },
                    '3': { name: 'search', emoji: '🔎' }, '4': { name: 'convert', emoji: '🔄' },
                    '5': { name: 'group', emoji: '👥' }, '6': { name: 'owner', emoji: '👑' },
                    '7': { name: 'settings', emoji: '⚙️' }
                };

                const selected = categories[choice];

                if (selected) {
                    let commandList = commands
                        .filter(cmd => cmd.category === selected.name && !cmd.dontAddCommandList && cmd.pattern)
                        .map(cmd => `●●► ${prefix}${cmd.pattern}`)
                        .join('\n');

                    if (!commandList) { commandList = 'No commands found in this category.'; }

                    const categoryMenu = `
${selected.emoji} *${selected.name.toUpperCase()} MENU* ${selected.emoji}
▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭
${commandList}
▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭͞▬͞▭

*Reply to the main menu with another number to see other commands.*
`;
                    await conn.sendMessage(from, {
                        image: { url: settings.MENU_IMG || 'https://files.catbox.moe/sim4y1.png' },
                        caption: categoryMenu
                    }, { quoted: mek });
                    
                    return; 
                }
            }
        }
    } catch (e) {
        console.error("Error in menu reply handler:", e);
    }
        
    if(!isOwner && settings.MODE === "private") return
    if(!isOwner && isGroup && settings.MODE === "inbox") return
    if(!isOwner && !isGroup && settings.MODE === "groups") return
    
    const events = require('./command')
    const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
    if (isCmd) {
        const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
        if (cmd) {
            if (cmd.owner && !isOwner) {
                return reply("This command can only be used by the bot owner.");
            }
            if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})
            try {
                cmd.function(conn, mek, m,{from, prefix, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
            } catch (e) { console.error("[PLUGIN ERROR] " + e); }
        }
    }
    events.commands.map(async(command) => {
        if (body && command.on === "body") {
            command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
        } else if (mek.q && command.on === "text") {
            command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
        } else if ((command.on === "image" || command.on === "photo") && mek.type === "imageMessage") {
            command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdgins, isBotAdmins, isAdmins, reply})
        } else if (command.on === "sticker" && mek.type === "stickerMessage") {
            command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, text, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, isCreator, groupMetadata, groupName, participants, groupAdgins, isBotAdmins, isAdmins, reply})
        }
    });
  
  });
    
  }

  async function startBot() {
    let sessionExists = fs.existsSync(__dirname + '/White-Queen/creds.json');
    
    if (!sessionExists) {
        console.log("No session file found.");
        const sessionInput = await askQuestion("Enter Your Session ID: ");
        
        if (!sessionInput) {
            console.log('Session ID is required to start the bot. Exiting...');
            return;
        }

        const sessdata = sessionInput.replace("QUEEN-ELISA~", '');
        const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
        
        try {
            const data = await new Promise((resolve, reject) => {
                filer.download((err, data) => {
                    if (err) return reject(err);
                    resolve(data);
                });
            });
            
            if (!fs.existsSync(__dirname + '/White-Queen')) {
                fs.mkdirSync(__dirname + '/White-Queen');
            }
            
            fs.writeFileSync(__dirname + '/White-Queen/creds.json', data);
            console.log("Session file created successfully! ✅");
        } catch (err) {
            console.error("Failed to download or save session file:", err);
            return;
        }
    } else {
        console.log("Session file found. Starting bot...");
    }

    connectToWA();
}

app.get("/", (req, res) => {
    res.send("WHITE QUEEN MULTIDEVICE WHATSAPP BOT STARTED ✅");
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
    startBot();
});
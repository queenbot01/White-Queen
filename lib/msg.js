// lib/msg.js - සම්පූර්ණයෙන්ම නිවැරදි කරන ලද අවසාන කේතය

const { proto, getContentType, jidDecode } = require('@whiskeysockets/baileys');

const sms = (conn, m, store) => {
    if (!m) return m;

    let M = proto.WebMessageInfo;
    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        
        // නිවැරදි කරන ලද sender ලබාගැනීමේ ක්‍රමය
        m.sender = jidDecode(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '');
    }
    
    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype === 'viewOnceMessageV2' ? m.message.viewOnceMessageV2.message : m.message[m.mtype]);
        m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype === 'listResponseMessage' && m.msg.singleSelectReply.selectedRowId) || (m.mtype === 'buttonsResponseMessage' && m.msg.selectedButtonId) || m.text || '';
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];

        if (m.quoted) {
            let type = getContentType(quoted);
            m.quoted = m.quoted[type];
            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted);
                m.quoted = m.quoted[type];
            }
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted };
            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo.stanzaId;
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false;
            
            // conn.decodeJid වෙනුවට jidDecode භාවිතා කිරීම
            m.quoted.sender = jidDecode(m.msg.contextInfo.participant);

            m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id.split(':')[0] + '@s.whatsapp.net');
            m.quoted.text = m.quoted.caption || m.quoted.conversation || m.quoted.text || '';
            m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
            
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            });
            
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key });
            m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
        }
    }

    m.text = m.msg.text || m.msg.caption || m.message.conversation || '';
    m.reply = (text, chatId = m.chat, options = {}) => conn.sendMessage(chatId, { text: text }, { quoted: m, ...options });
    m.react = (emoji) => conn.sendMessage(m.chat, { react: { text: emoji, key: m.key } });

    return m;
};

module.exports = { sms };

// Give Me Credit If Using This File ✅ 
// Credits: AYAN DEV

const { isJidGroup } = require('@whiskeysockets/baileys');
const settings = require('../settings');

// 📦 Context Info pou mesaj avanse
const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363401819417685@newsletter',
            newsletterName: 'White Queen🤍✅',
            serverMessageId: 143,
        },
    };
};

// 🔄 Default Profile Pictures si group pa gen
const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        if (!isJidGroup(update.id)) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) { 
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            // 👋 WELCOME
            if (update.action === "add" && settings.WELCOME === "true") {
                const welcomeText = `Hey @${userName} 👋\n` +
                    `Welcome to *${metadata.subject}*.\n` +
                    `You are member number ${groupMembersCount} in this group. 🙏\n` +
                    `Time joined: *${timestamp}*\n` +
                    `Please read the group description to avoid being removed:\n` +
                    `${desc}\n` +
                    `> *©White Queen WHATSAPP BOT 2025-2099*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: welcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            // 👋 GOODBYE
            } else if (update.action === "remove" && settings.WELCOME === "true") {
                const goodbyeText = `Goodbye @${userName}. 😔\n` +
                    `Another member has left the group.\n` +
                    `Time left: *${timestamp}*\n` +
                    `The group now has ${groupMembersCount} members. 😭\n` +
                    `> ©White Queen WHATSAPP BOT 2025-2099`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: goodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            // ⬇️ DEMOTE
            } else if (update.action === "demote" && settings.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*Admin Event*\n\n` +
                          `@${demoter} has demoted @${userName} from admin. 👀\n` +
                          `Time: ${timestamp}\n` +
                          `*Group:* ${metadata.subject}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            // ⬆️ PROMOTE
            } else if (update.action === "promote" && settings.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*Admin Event*\n\n` +
                          `@${promoter} has promoted @${userName} to admin. 🎉\n` +
                          `Time: ${timestamp}\n` +
                          `*Group:* ${metadata.subject}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }

    } catch (err) {
        console.error('❌ Group event error:', err);
    }
};

module.exports = GroupEvents;

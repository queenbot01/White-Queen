const { execSync } = require('child_process');
const { cmd } = require('../command');
const settings = require('../settings');

cmd({
    pattern: "update",
    alias: ["gitpull"],
    react: "🚀",
    desc: "Update the bot with the latest changes from the GitHub repository.",
    category: "owner",
    filename: __filename,
},
async (conn, mek, m, { isOwner, reply }) => {
    // මෙම කමාන්ඩ් එක බොට්ගේ හිමිකරුට (owner) පමණක් භාවිත කළ හැක
    if (!isOwner) {
        return reply("*Only the bot owner can use this command.*");
    }

    try {
        // 'git pull' කමාන්ඩ් එක ක්‍රියාත්මක කර GitHub වෙතින් නවතම දත්ත ලබාගැනීම
        const stdout = execSync('git pull').toString();

        // ලැබුණු ප්‍රතිචාරය පරීක්ෂා කිරීම
        if (stdout.includes("Already up to date.")) {
            // දැනටමත් යාවත්කාලීන නම්
            return reply("✅ *Your bot is already on the latest version.*");
        } else if (stdout.includes("Updating") || stdout.includes("Fast-forward")) {
            // යාවත්කාලීන කිරීම සාර්ථක නම්, බොට් එක නැවත ආරම්භ කිරීම
            reply("✅ *Bot updated successfully! Restarting to apply changes...*");
            
            // Replit වැනි පරිසරයකදී, process.exit() මගින් බොට් එක නතර කළ විට එය ස්වයංක්‍රීයව නැවත පණගැන්වේ.
            process.exit(0);
        } else {
             // වෙනත් ප්‍රතිචාරයක් ලැබුනහොත් එය පෙන්වීම
             reply(stdout);
        }

    } catch (e) {
        // දෝෂයක් ඇති වුවහොත් එය වාර්තා කිරීම
        console.error(e);
        return reply(`❌ *An error occurred during the update:*\n\n${e.message}`);
    }
});
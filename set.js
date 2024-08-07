const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0NEMnpPSnQxT3BLaW5lVm9uYlNoN2t5M0N2N2g3dnpnaVFINW5ndkVIUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaHpVWGtleTFDNnFXT3lLZHg1K2hwYWx1cHpWbkM2VGRkUUg3WlF6aGdYQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SnFneDVsTmFjMkxRVTlDRzlKd0xoS0pVTFcxeC8ydVB0L2ROd0ZZT25FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyMzZzM2Y3bjc0TXVVZ3NEV1lDdUU4UjA2cFFoajgrZHpPdmVpTTVnc244PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1HTnNPRStTdmsreDNwU2tyZGxNcnpoenlDM1hld1FyQUZzMVRzUWtvSE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1uNzdBdm5yNThJaFNyU1crblk0Z1dHWTJpQi9XLzVNUjN6RlA0UlQ0RXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0ZjQ2l5UXgwTTNVU0lXbmRMNXYvb1hFWDhvRk9mSXFHOG9HbXM2VE5WND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidy95S1R5cHBZZkQ1RzkyaHpxWnplb25DMW1XSURaOUpOZjJuUWwydlRHQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhwOTlkMDdKZEdPSldnQUJ5TGpSRHh4dGtBR2dNOTFKbis4OGNENjBKeVRQRDJjMGxSOTRxbzlHdXdENVE4NUtkZUVXWHNHMFJMREdnMXRnWFltakJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6IktXM2pYOFQ2SHgvbkxxWDRvaUwzRmc1eGZyT3FsM2JqMVFweHpHd2VabXM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTAyMTU0NzQyOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5ODg2REVDRjIwOEU1MkFDQ0I4RDk1QTJCNUQ3NUJDQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzMDEyODUzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJsbkRBU0JTS1JlU2Z0QV95QzBxTmZBIiwicGhvbmVJZCI6IjM2Njg3YzRlLTMxMWItNDUzYy05ZTUzLTc1ZmZkYmM3ZTY2NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpYm14bXZoQ1lVMnVlbk43c2s3TndpMkhXM2c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlVBYjhSbVBRNnlVMXNVRzVsVm5MYUVONFVvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik41R1BIS1dSIiwibWUiOnsiaWQiOiIyMzQ5MDIxNTQ3NDI4OjQ2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNBWkVZIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPbnV0Y0lERU9XdHpMVUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqd21IRTRUQWs2YmhzZFlNa25pQzV1bjUzZU1mNk1ONnBiOVhWeGZSOEQ4PSIsImFjY291bnRTaWduYXR1cmUiOiJnVmtPZlNYSlR2cTFBdldmUmk2OFlQOTVvQmJnc2c2SGQ2QzEyK2lBdHUzV25YcTB4SDZ5bTBlTU5kdktQNEx4bE5nK0FsenRreDZzRy9PZlhEQ0lEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoid1VMOGk2VFIyZjdsMkVaTGNEWjRld3J5TVdJMTdTUWdkb2YwNWVldmNzRlFFNXVHQnNQRE5GNnFXTGNBdTIvWkc4Z1hmOFJFS0x1UWdORFZDYWcxQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDIxNTQ3NDI4OjQ2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlk4Smh4T0V3Sk9tNGJIV0RKSjRndWJwK2QzakgrakRlcVcvVjFjWDBmQS8ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMwMTI4NDksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSkNZIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "CAZEY",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349021547428",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

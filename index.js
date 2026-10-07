
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const cron = require("node-cron");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        headless: true,
    },
});

client.on("qr", (qr) => qrcode.generate(qr, { small: true }));

client.on("ready", async () => {
    console.log("WhatsApp ready!");

    // Test: ippove unga number-ke (Message yourself) anuppum
    await client.sendMessage("919363316976@c.us", "Test message from my bot ✅");

    // Auto: daily 9:00 AM
    cron.schedule("* * * * *", async () => {
        await client.sendMessage("919363316976@c.us", "Good morning! 🌞");
    });
});

client.initialize();
const TelegramBot = require("node-telegram-bot-api");

// 🔴 Replace these with your real values in .env
const BOT_TOKEN = "8742801452:AAGcKPtecapF0woewZqtL9oqdsEFvNqmT1E";
const CHAT_ID = "-1003741749807";

const bot = new TelegramBot(BOT_TOKEN);

async function sendBooking(data) {

  const caption = `
🚨 NEW BOOKING

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📍 Location: ${data.location}

🏍 Bike: ${data.bike}
📅 Days: ${data.days}

💰 Total: MVR ${data.total}

💳 Payment: ${data.payment || "Not set"}
⏰ Time: ${data.time || "Not set"}
`;

  try {

    // 1. LICENSE IMAGE
    if (data.license) {
      await bot.sendPhoto(CHAT_ID, data.license, {
        caption: "🪪 LICENSE PHOTO"
      });
    }

    // 2. PAYMENT SLIP IMAGE
    if (data.slip) {
      await bot.sendPhoto(CHAT_ID, data.slip, {
        caption: "🧾 PAYMENT SLIP"
      });
    }

    // 3. FULL BOOKING DETAILS
    await bot.sendMessage(CHAT_ID, caption);

  } catch (err) {
    console.log("Telegram error:", err.message);
  }
}

module.exports = sendBooking;
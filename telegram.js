const TelegramBot = require("node-telegram-bot-api");

const BOT_TOKEN = "8742801452:AAGcKPtecapF0woewZqtL9oqdsEFvNqmT1E";
const CHAT_ID = "-1003741749807";

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

async function sendBooking(data) {
  const message = `
🚨 NEW BOOKING

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📍 Location: ${data.location}

🏍 Bike: ${data.bike}
📅 Days: ${data.days}

💰 Total: MVR ${data.total}

💳 Payment: ${data.payment}
`;

  await bot.sendMessage(CHAT_ID, message);
}

module.exports = sendBooking;
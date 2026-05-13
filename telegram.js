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

💳 Payment: ${data.payment}
⏰ Time: ${data.time}
`;

  const media = [];

  // LICENSE PHOTO
  if (data.license) {
    media.push({
      type: "photo",
      media: data.license,
      caption: caption
    });
  }

  // PAYMENT SLIP
  if (data.slip) {
    media.push({
      type: "photo",
      media: data.slip
    });
  }

  // SEND GROUP
  if (media.length > 0) {

    await bot.sendMediaGroup(
      CHAT_ID,
      media
    );

  } else {

    await bot.sendMessage(
      CHAT_ID,
      caption
    );

  }

}

module.exports = sendBooking;
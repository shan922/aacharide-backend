from flask import Flask, request, jsonify
from telegram import Bot
import os

app = Flask(__name__)

BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID"))

bot = Bot(token=BOT_TOKEN)

@app.route("/booking", methods=["POST"])
def booking():
    try:
        name = request.form.get("name")
        phone = request.form.get("phone")
        license_file = request.files.get("license")

        msg = f"""
🚲 NEW BOOKING

Name: {name}
Phone: {phone}
"""

        bot.send_message(chat_id=ADMIN_ID, text=msg)

        if license_file:
            bot.send_photo(chat_id=ADMIN_ID, photo=license_file)

        return jsonify({"status": "ok"}), 200

    except Exception as e:
        print(e)
        return jsonify({"status": "error"}), 500


if __name__ == "__main__":
    app.run()
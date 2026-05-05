const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

// 🔴 PUT YOUR STRIPE SECRET KEY HERE
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// CREATE PAYMENT SESSION
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd", // you can change later
          product_data: {
            name: "AACHA RIDE - Bike Rental"
          },
          unit_amount: 150 * 100 // 150 (example price)
        },
        quantity: 1
      }],
      success_url: "https://aachaaride.netlify.app/success.html",
      cancel_url: "https://aachaaride.netlify.app/cancel.html",
    });

    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
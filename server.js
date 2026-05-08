const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const sendBooking = require("./telegram");

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

 app.get("/bikes", (req, res) => {
  res.json([
    {
      name: "AIRBLADE Black",
      price: 150,
      image: "https://aachaaride.netlify.app/images/bike1.jpg",
      available: true
    },
    {
      name: "AIRBLADE Red",
      price: 150,
      image: "https://aachaaride.netlify.app/images/bike2.jpg",
      available: true
    },
    {
      name: "AIRBLADE White",
      price: 150,
      image: "https://aachaaride.netlify.app/images/bike3.jpg",
      available: true
    },
    {
      name: "AIRBLADE Blue",
      price: 150,
      image: "https://aachaaride.netlify.app/images/bike4.jpg",
      available: true
    },
    {
      name: "AIRBLADE Grey",
      price: 150,
      image: "https://aachaaride.netlify.app/images/bike5.jpg",
      available: true
    },
    {
      name: "AIRBLADE Silver",
      price: 150,
      image: "https://aachaaride.netlify.app/images/bike6.jpg",
      available: true
    }
  ]);
});

app.post("/submit-booking", async (req, res) => {
  try {

    const bookingData = req.body;

    await sendBooking(bookingData);

    res.json({
      success: true,
      message: "Booking sent to Telegram"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
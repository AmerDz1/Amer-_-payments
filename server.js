const express = require("express");
const stripe = require("stripe")("sk_test_51QwVZhLxivUp61goRR7w1piGQHfqidwgaVSm47AEpfXi45GARAuBxOr8bhY4L5kW2TvgRi0dhGAJ9xHqqZ6tYsM8002STIwUlV"); // ضع مفتاحك السري هنا
const app = express();
app.use(express.static("public"));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
            price_data: {
                currency: "usd",
                product_data: { name: "اشتراك" },
                unit_amount: Math.round(req.body.amount * 100),
            },
            quantity: 1,
        }],
        mode: "payment",
        success_url: "https://yourwebsite.com/success",
        cancel_url: "https://yourwebsite.com/cancel",
    });
    res.json({ id: session.id });
});

app.listen(3000, () => console.log("Server running on port 3000"));

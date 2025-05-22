import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const planPrices = {
  Beginner: 1000 * 100,
  Professional: 10000 * 100,
};

const razorpay_controller = async (req, res) => {
  const { plan } = req.body;
  const amount = planPrices[plan];
  if (!amount) {
    return res.status(400).json({ error: "Invalid plan" });
  }
  const options = {
    amount,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };
  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Razorpay order creation failed: " + err });
  }
};

export default razorpay_controller;

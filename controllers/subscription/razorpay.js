import Razorpay from "razorpay";

import Subscription from "../../models/subscription.js";
import User from "../../models/user.js"
import Keys from "../../models/keys.js";
import Activity from "../../models/activity.js"
import produce_email_enqueue_job from "../../core/producer.js";
import PLANS from "../../constants/plans.js"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const create_order = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { plan } = req.body;
  if (!plan) {
    return res.status(400).json({ error: "Please provide a plan" });
  }
  if (PLANS[plan].rank <= PLANS[user.subscription].rank) {
    return res.status(400).json({ error: `User already subscribed to ${user.subscription} plan.` });
  }
  const amount = PLANS[plan].price;
  if (!amount) {
    return res.status(400).json({ error: "Invalid plan" });
  }
  const options = {
    amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  try {
    const order = await razorpay.orders.create(options);
    const subscription = await Subscription.create({
      order_id: order.id,
      receipt: order.receipt,
      plan: plan,
      currency: order.currency,
      amount: order.amount,
      isVerified: false,
      isActive: false,
      provider: "Razorpay",
      user: user
    })
    return res.status(200).json(subscription);
  } catch (err) {
    return res.status(500).json({ error: "Razorpay order creation failed: " + JSON.stringify(err) });
  }
};

const set_order_active = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { subscription_id, subscription_plan, transaction } = req.body;
  if (!subscription_id || !subscription_plan || !transaction) {
    return res.status(400).json({ error: "Subscription ID, plan or transaction data not found." });
  }

  try {
    const subscription = await Subscription.findById(subscription_id);
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    const user_to_activate = await User.findById(user._id);
    var key_document;
    key_document = await Keys.findOne({
      user: user._id
    })
    if (!key_document) {
      key_document = await Keys.create({
        user: user._id,
        keys: [],
      });
    }

    subscription.isVerified = true;
    subscription.isActive = true;
    subscription.payment_id = transaction.razorpay_payment_id;
    subscription.signature = transaction.razorpay_signature;

    key_document.used_quota = 0;
    key_document.max_quota = PLANS[subscription_plan].quota;
    user_to_activate.subscription = subscription_plan;

    await subscription.save();
    await user_to_activate.save();
    await Activity.create({
      type: "subscribe",
      info: `Subscription activated: ${subscription_plan}`,
      user: user._id,
      status: "success",
    });
    await produce_email_enqueue_job({
      email: user.email,
      subject: `Your Queuetie account has been upgraded to ${subscription_plan}`,
      body: `Hi ${user.email},
      <br/>This is to inform you that your account has been upgraded to ${subscription_plan}.
      Your max limit to use our API has been changed to ${key_document.max_quota} starting today.
      <br/><br/>
      Thank You.
      <br/><br/>
      Queuetie`
    });
    return res.status(200).json({ message: `Subscription activated for plan ${subscription_plan}.` });
  }
  catch (err) {
    return res.status(500).json({ error: "Activating subscription failed: " + err })
  }
};

export { create_order, set_order_active };

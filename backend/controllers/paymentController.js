const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51JGrQAJXauSgGPWdDSFEvtj1X1ktkj8hTQL10CD4ktVUeqiN2cxxH2IPoYzBpFhecXJmZtjxrfoi2xBtOdALL80j003qqJrWU1"
);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

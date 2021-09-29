const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiContracts = require("authorizenet").APIContracts;
const ApiControllers = require("authorizenet").APIControllers;
const SDKConstants = require("authorizenet").Constants;

const { validateForm } = require("../utils/credit-card-validation");

const stripe = require("stripe")(
  "sk_test_51JGrQAJXauSgGPWdDSFEvtj1X1ktkj8hTQL10CD4ktVUeqiN2cxxH2IPoYzBpFhecXJmZtjxrfoi2xBtOdALL80j003qqJrWU1"
);

require("dotenv").config({ path: "backend/config/config.env" });

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

// Process authorize.net   =>   /api/v1/payment/newprocess
exports.processPaymentNew = catchAsyncErrors(async (req, res, next) => {
  const validationErrors = validateForm(req);

  if (validationErrors.length > 0) {
    res.json({ errors: validationErrors });
    return;
  }

  const { cc, cvv, expire, amount } = req.body;

  const merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(process.env.AUTHORIZE_LOGIN_ID);
  merchantAuthenticationType.setTransactionKey(
    process.env.AUTHORIZE_TRANSACTION_ID
  );

  const creditCard = new ApiContracts.CreditCardType();
  creditCard.setCardNumber(cc);
  creditCard.setExpirationDate(expire);
  creditCard.setCardCode(cvv);

  const paymentType = new ApiContracts.PaymentType();
  paymentType.setCreditCard(creditCard);

  const transactionSetting = new ApiContracts.SettingType();
  transactionSetting.setSettingName("recurringBilling");
  transactionSetting.setSettingValue("false");

  const transactionSettingList = [];
  transactionSettingList.push(transactionSetting);

  const transactionSettings = new ApiContracts.ArrayOfSetting();
  transactionSettings.setSetting(transactionSettingList);

  const transactionRequestType = new ApiContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(
    ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );
  transactionRequestType.setPayment(paymentType);
  transactionRequestType.setAmount(amount);
  transactionRequestType.setTransactionSettings(transactionSettings);

  const createRequest = new ApiContracts.CreateTransactionRequest();
  createRequest.setMerchantAuthentication(merchantAuthenticationType);
  createRequest.setTransactionRequest(transactionRequestType);

  const ctrl = new ApiControllers.CreateTransactionController(
    createRequest.getJSON()
  );

  ctrl.execute(() => {
    const apiResponse = ctrl.getResponse();
    const response = new ApiContracts.CreateTransactionResponse(apiResponse);

    if (response !== null) {
      if (
        response.getMessages().getResultCode() ===
        ApiContracts.MessageTypeEnum.OK
      ) {
        if (response.getTransactionResponse().getMessages() !== null) {
          res.json({
            success: "Transaction was successful.",
            id: response.getTransactionResponse().transId,
          });
        } else {
          if (response.getTransactionResponse().getErrors() !== null) {
            let code = response
              .getTransactionResponse()
              .getErrors()
              .getError()[0]
              .getErrorCode();
            let text = response
              .getTransactionResponse()
              .getErrors()
              .getError()[0]
              .getErrorText();
            res.json({
              error: `${code}: ${text}`,
            });
          } else {
            res.json({ error: "Transaction failed." });
          }
        }
      } else {
        if (
          response.getTransactionResponse() !== null &&
          response.getTransactionResponse().getErrors() !== null
        ) {
          let code = response
            .getTransactionResponse()
            .getErrors()
            .getError()[0]
            .getErrorCode();
          let text = response
            .getTransactionResponse()
            .getErrors()
            .getError()[0]
            .getErrorText();
          res.json({
            error: `${code}: ${text}`,
          });
        } else {
          let code = response.getMessages().getMessage()[0].getCode();
          let text = response.getMessages().getMessage()[0].getText();
          res.json({
            error: `${code}: ${text}`,
          });
        }
      }
    } else {
      res.json({ error: "No response." });
    }
  });
});

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

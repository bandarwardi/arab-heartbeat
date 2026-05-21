import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Your USDC (Polygon) wallet address to receive payouts.
// Set this in Firebase environment config:
//   firebase functions:secrets:set CARD2CRYPTO_USDC_WALLET
// Or hardcode below if preferred (not recommended for production):
const USDC_WALLET = process.env.CARD2CRYPTO_USDC_WALLET || "0xYOUR_USDC_POLYGON_WALLET_ADDRESS";
const CARD2CRYPTO_API = "https://api.card2crypto.org";
const CARD2CRYPTO_PAY = "https://pay.card2crypto.org";
// Actual deployed callback URL from Firebase Functions
const CALLBACK_BASE = "https://card2cryptocallback-lzsc5i6ooq-uc.a.run.app";

/**
 * createPaymentSession
 * Called by the frontend when user clicks "Pay".
 * Steps:
 *   1. Save pending order to Firestore
 *   2. Call card2crypto API to get encrypted wallet address
 *   3. Build and return the payment URL
 */
export const createPaymentSession = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const { uid, email, planId, planTitle, planDuration, connections, price } = req.body;

      if (!uid || !email || !planId || !price) {
        res.status(400).json({ error: "Missing required fields: uid, email, planId, price" });
        return;
      }

      // 1. Create a unique order ID and save pending order
      const orderId = `${uid}_${Date.now()}`;
      const callbackUrl = `${CALLBACK_BASE}?uid=${encodeURIComponent(uid)}&orderId=${encodeURIComponent(orderId)}`;

      await db.collection("pendingOrders").doc(orderId).set({
        uid,
        email,
        planId,
        planTitle,
        planDuration,
        connections,
        price,
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // 2. Call card2crypto API to generate encrypted wallet address
      const walletApiUrl =
        `${CARD2CRYPTO_API}/control/wallet.php` +
        `?address=${encodeURIComponent(USDC_WALLET)}` +
        `&callback=${encodeURIComponent(callbackUrl)}`;

      console.log(`Calling card2crypto wallet API: ${walletApiUrl}`);

      const walletRes = await fetch(walletApiUrl);
      if (!walletRes.ok) {
        const errText = await walletRes.text();
        console.error("Card2Crypto wallet API error:", errText);
        res.status(502).json({ error: "فشل الاتصال ببوابة الدفع، يرجى المحاولة مرة أخرى" });
        return;
      }

      const walletData = await walletRes.json();
      const addressIn = walletData.address_in;

      if (!addressIn) {
        console.error("No address_in in card2crypto response:", walletData);
        res.status(502).json({ error: "لم يُستلم عنوان المحفظة من بوابة الدفع" });
        return;
      }

      // 3. Build the payment URL using the smart hosted page (pays.php)
      // which auto-selects best provider based on user's geo-location
      const paymentUrl =
        `${CARD2CRYPTO_PAY}/pay.php` +
        `?address=${addressIn}` +
        `&amount=${encodeURIComponent(price.toString())}` +
        `&email=${encodeURIComponent(email)}` +
        `&currency=USD`;

      console.log(`Payment session created for order ${orderId}, user ${uid}`);

      res.status(200).json({ paymentUrl, orderId });
    } catch (error) {
      console.error("Error creating payment session:", error);
      res.status(500).json({ error: "خطأ داخلي في الخادم" });
    }
  }
);

/**
 * card2cryptoCallback
 * Called by card2crypto via GET after a successful payment.
 * URL params: uid, orderId (our custom params) + value_coin, coin, txid_in, txid_out (from card2crypto)
 */
export const card2cryptoCallback = onRequest(
  { cors: false },
  async (req, res) => {
    // card2crypto sends callbacks via GET
    const { uid, orderId, value_coin, coin, txid_in, txid_out } = req.query;

    console.log("card2cryptoCallback received:", JSON.stringify(req.query));

    if (!uid || !orderId) {
      console.error("Missing uid or orderId in callback");
      res.status(400).send("Bad Request: missing uid or orderId");
      return;
    }

    try {
      // 1. Load the pending order
      const orderRef = db.collection("pendingOrders").doc(orderId);
      const orderSnap = await orderRef.get();

      if (!orderSnap.exists) {
        console.warn(`Pending order not found: ${orderId}`);
        // Still respond 200 to prevent card2crypto from retrying
        res.status(200).send("OK");
        return;
      }

      const order = orderSnap.data()!;

      // 2. Verify the uid matches the order
      if (order.uid !== uid) {
        console.error(`UID mismatch: callback uid=${uid}, order uid=${order.uid}`);
        res.status(403).send("Forbidden");
        return;
      }

      // 3. Update user subscription to active
      const userRef = db.collection("users").doc(uid);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        console.error(`User not found: ${uid}`);
        res.status(200).send("OK");
        return;
      }

      const updateData = {
        subscriptionStatus: "active",
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
        planId: order.planId || null,
        planTitle: order.planTitle || null,
        planDuration: order.planDuration || null,
        connections: order.connections || 1,
        price: order.price || null,
        // Card2Crypto specific transaction data
        card2cryptoTxId: txid_in || null,
        card2cryptoTxOut: txid_out || null,
        card2cryptoValueCoin: value_coin || null,
        card2cryptoCoin: coin || null,
        paddleTransactionId: null,
        paddleSubscriptionId: null,
      };

      await userRef.update(updateData);

      // 4. Mark the pending order as completed
      await orderRef.update({
        status: "completed",
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        value_coin: value_coin || null,
        coin: coin || null,
        txid_in: txid_in || null,
        txid_out: txid_out || null,
      });

      console.log(`Successfully activated subscription for user ${uid}, order ${orderId}`);
      res.status(200).send("OK");
    } catch (error) {
      console.error("Error processing card2crypto callback:", error);
      // Still respond 200 to prevent retries from card2crypto bot
      res.status(200).send("OK");
    }
  }
);

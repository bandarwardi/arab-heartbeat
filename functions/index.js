import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const paddleWebhook = onRequest(
  { cors: true },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const event = req.body;
      console.log("Received webhook event:", JSON.stringify(event));

      const eventType = event.event_type;
      const eventData = event.data;

      if (!eventType || !eventData) {
        console.error("Invalid webhook payload structure");
        res.status(400).send("Bad Request");
        return;
      }

      // Extract custom_data (Paddle Billing passes this from Checkout.open)
      const customData = eventData.custom_data || {};
      const uid = customData.uid;

      if (!uid) {
        console.warn(`No user UID found in custom_data. Event type: ${eventType}`);
        res.status(200).send("Ignored: No user UID");
        return;
      }

      console.log(`Processing event: ${eventType} for user UID: ${uid}`);

      const userRef = db.collection("users").doc(uid);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        console.error(`User document for UID: ${uid} not found in Firestore`);
        res.status(404).send("User Not Found");
        return;
      }

      let newStatus = "none";

      if (eventType.startsWith("subscription.created") || eventType.startsWith("subscription.updated")) {
        const paddleStatus = eventData.status;
        if (paddleStatus === "active" || paddleStatus === "trialing") {
          newStatus = "active";
        } else if (paddleStatus === "paused") {
          newStatus = "paused";
        } else if (paddleStatus === "canceled") {
          newStatus = "canceled";
        } else if (paddleStatus === "past_due") {
          newStatus = "past_due";
        } else {
          newStatus = "none";
        }
      } else if (eventType === "transaction.completed" || eventType === "transaction.paid" || eventType === "checkout.completed") {
        newStatus = "active";
      }

      const updateData = {
        subscriptionStatus: newStatus,
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      if (customData.planId) updateData.planId = customData.planId;
      if (customData.planTitle) updateData.planTitle = customData.planTitle;
      if (customData.planDuration) updateData.planDuration = customData.planDuration;
      if (customData.connections) updateData.connections = Number(customData.connections);
      if (customData.price) updateData.price = Number(customData.price);

      if (eventData.id) {
        updateData.paddleTransactionId = eventData.id;
      }
      if (eventData.subscription_id) {
        updateData.paddleSubscriptionId = eventData.subscription_id;
      } else if (eventType.startsWith("subscription.")) {
        updateData.paddleSubscriptionId = eventData.id;
      }

      await userRef.update(updateData);

      console.log(`Successfully updated user ${uid} status to: ${newStatus}`);
      res.status(200).send("Success");
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

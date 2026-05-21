// Card2Crypto payment gateway utility
// API Docs: https://documenter.getpostman.com/view/40408788/2sAYHxo4T5
//
// Flow:
//  1. Frontend calls Firebase Function `createPaymentSession` with order details
//  2. Function calls api.card2crypto.org/control/wallet.php to get encrypted address
//  3. Function returns payment URL to frontend
//  4. Frontend redirects user to payment URL (opens in new tab)
//  5. After payment, card2crypto calls our Firebase Function `card2cryptoCallback` via GET
//  6. Callback function activates the user's subscription in Firestore

export const CARD2CRYPTO_FUNCTION_BASE =
  import.meta.env.VITE_FIREBASE_FUNCTIONS_BASE ||
  "https://us-central1-en-tec.cloudfunctions.net";

export interface CreatePaymentSessionRequest {
  uid: string;
  email: string;
  planId: string;
  planTitle: string;
  planDuration: string;
  connections: number;
  price: number;
}

export interface CreatePaymentSessionResponse {
  paymentUrl: string;
  orderId: string;
}

/**
 * Calls our Firebase Function which communicates with Card2Crypto API
 * and returns a payment URL to redirect the user to.
 */
export async function createPaymentSession(
  data: CreatePaymentSessionRequest
): Promise<CreatePaymentSessionResponse> {
  const functionUrl = `${CARD2CRYPTO_FUNCTION_BASE}/createPaymentSession`;

  const res = await fetch(functionUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`فشل إنشاء جلسة الدفع: ${text}`);
  }

  return res.json() as Promise<CreatePaymentSessionResponse>;
}

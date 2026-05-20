import { initializePaddle, type Paddle } from "@paddle/paddle-js";

let paddlePromise: Promise<Paddle | undefined> | null = null;

export const PADDLE_PRICES: Record<string, string | undefined> = {
  "1": import.meta.env.VITE_PADDLE_PRICE_1,
  "2": import.meta.env.VITE_PADDLE_PRICE_2,
  "3": import.meta.env.VITE_PADDLE_PRICE_3,
  "5": import.meta.env.VITE_PADDLE_PRICE_5,
};

export function getPaddle(
  onEvent?: (event: unknown) => void,
): Promise<Paddle | undefined> {
  if (typeof window === "undefined") return Promise.resolve(undefined);
  if (!paddlePromise) {
    const token = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string;
    const env = (import.meta.env.VITE_PADDLE_ENVIRONMENT ?? "sandbox") as
      | "sandbox"
      | "production";
    if (!token) {
      console.error("VITE_PADDLE_CLIENT_TOKEN is not set");
      return Promise.resolve(undefined);
    }
    paddlePromise = initializePaddle({
      environment: env,
      token,
      eventCallback: (data) => onEvent?.(data),
    });
  }
  return paddlePromise;
}
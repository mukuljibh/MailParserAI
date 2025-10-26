import { Queue } from "bullmq";
import "./worker";

export const BullQueue = new Queue("email-queue", {
  connection: {
    url: process.env.UPSTASH_REDIS_URL,
    tls: {},
  },
});

(async () => {
  const client = await BullQueue.client;
  client.on("connect", () => {
    console.log("✅ Connected to Upstash Redis successfully!");
  });
  client.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
  });

  const pong = await client.ping();
  console.log("Redis ping response:", pong);
})();

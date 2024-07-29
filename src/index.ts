import { createApp } from "@deroll/app";

// Create the application
export const app = createApp({
  url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004",
});

// Start the application
app.start().catch((e) => {
  console.error(e);
  process.exit(1);
});

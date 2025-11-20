import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: "browser",
          include: ["tests/browser/**/*"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        test: {
          name: "node",
          include: ["tests/**/*"],
          exclude: ["tests/browser/**/*"],
          environment: "node",
        },
      },
    ],
  },
});

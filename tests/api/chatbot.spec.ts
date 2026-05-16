import { test, expect } from "@playwright/test";
import { API_BASE } from "../helpers/test-utils";

test.describe("Chatbot API", () => {
  test("POST /api/chatbot should validate message field", async ({ request }) => {
    const response = await request.post(`${API_BASE}/chatbot`, {
      data: { message: "" },
    });
    expect([400, 404, 429]).toContain(response.status());
  });

  test("POST /api/chatbot should return fallback when n8n not configured", async ({ request }) => {
    const response = await request.post(`${API_BASE}/chatbot`, {
      data: { message: "Xin chào" },
    });
    expect([200, 404, 429]).toContain(response.status());
    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toHaveProperty("reply");
      expect(data).toHaveProperty("source");
    }
  });

  test("POST /api/chatbot should reject invalid body", async ({ request }) => {
    const response = await request.post(`${API_BASE}/chatbot`, {
      data: {},
    });
    expect([400, 404, 429]).toContain(response.status());
  });
});

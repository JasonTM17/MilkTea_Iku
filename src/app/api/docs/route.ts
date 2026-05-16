import { NextResponse } from "next/server";

const API_DOCS = {
  openapi: "3.0.0",
  info: {
    title: "MilkTea Iku API",
    version: "1.0.0",
    description: "Premium Milk Tea E-Commerce Platform API",
    contact: {
      name: "Nguyễn Sơn",
      url: "https://github.com/JasonTM17/MilkTea_Iku",
    },
  },
  servers: [
    { url: "https://milktea-iku.vercel.app/api", description: "Production" },
    { url: "http://localhost:3000/api", description: "Development" },
  ],
  paths: {
    "/health": {
      get: { summary: "Health check", tags: ["System"], responses: { "200": { description: "OK" } } },
    },
    "/products": {
      get: {
        summary: "List products",
        tags: ["Products"],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 12 } },
          { name: "category", in: "query", schema: { type: "string" } },
          { name: "search", in: "query", schema: { type: "string" } },
        ],
        responses: { "200": { description: "Paginated product list" } },
      },
    },
    "/products/{slug}": {
      get: {
        summary: "Get product by slug",
        tags: ["Products"],
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Product details" }, "404": { description: "Not found" } },
      },
    },
    "/orders": {
      get: {
        summary: "List orders by phone",
        tags: ["Orders"],
        parameters: [{ name: "phone", in: "query", schema: { type: "string" } }],
        responses: { "200": { description: "Order list" } },
      },
      post: {
        summary: "Create order",
        tags: ["Orders"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["customerName", "phone", "items"],
                properties: {
                  customerName: { type: "string", minLength: 2 },
                  phone: { type: "string", minLength: 9 },
                  address: { type: "string" },
                  note: { type: "string" },
                  items: { type: "array", minItems: 1 },
                },
              },
            },
          },
        },
        responses: { "201": { description: "Order created" }, "400": { description: "Validation error" }, "429": { description: "Rate limited" } },
      },
    },
    "/contact": {
      post: {
        summary: "Submit contact form",
        tags: ["Contact"],
        responses: { "201": { description: "Message sent" }, "400": { description: "Validation error" } },
      },
    },
    "/newsletter": {
      post: {
        summary: "Subscribe to newsletter",
        tags: ["Newsletter"],
        responses: { "201": { description: "Subscribed" }, "400": { description: "Invalid email" } },
      },
    },
    "/coupons/validate": {
      get: {
        summary: "Validate coupon code",
        tags: ["Coupons"],
        parameters: [{ name: "code", in: "query", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Validation result" } },
      },
    },
    "/chatbot": {
      post: {
        summary: "Send message to chatbot",
        tags: ["Chatbot"],
        responses: { "200": { description: "Bot reply" }, "429": { description: "Rate limited" } },
      },
    },
    "/search": {
      get: {
        summary: "Search products",
        tags: ["Products"],
        parameters: [{ name: "q", in: "query", schema: { type: "string" } }],
        responses: { "200": { description: "Search results" } },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(API_DOCS);
}

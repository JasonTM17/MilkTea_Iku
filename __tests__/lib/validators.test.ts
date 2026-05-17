import { describe, it, expect } from "vitest";
import {
  phoneSchema,
  emailSchema,
  orderItemSchema,
  createOrderSchema,
  contactSchema,
  reviewSchema,
} from "@/lib/validators";

describe("phoneSchema", () => {
  it("accepts a valid Vietnamese mobile number starting with 09", () => {
    expect(phoneSchema.safeParse("0901234567").success).toBe(true);
  });

  it("accepts a valid number starting with 03", () => {
    expect(phoneSchema.safeParse("0312345678").success).toBe(true);
  });

  it("rejects a number starting with 01 (old format)", () => {
    expect(phoneSchema.safeParse("0112345678").success).toBe(false);
  });

  it("rejects a number with fewer than 10 digits", () => {
    expect(phoneSchema.safeParse("090123456").success).toBe(false);
  });

  it("rejects a number with more than 10 digits", () => {
    expect(phoneSchema.safeParse("09012345678").success).toBe(false);
  });

  it("rejects a number containing non-digit characters", () => {
    expect(phoneSchema.safeParse("090-123-456").success).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(phoneSchema.safeParse("").success).toBe(false);
  });
});

describe("emailSchema", () => {
  it("accepts a standard email address", () => {
    expect(emailSchema.safeParse("user@example.com").success).toBe(true);
  });

  it("accepts an email with subdomain", () => {
    expect(emailSchema.safeParse("user@mail.example.co.vn").success).toBe(true);
  });

  it("rejects an email without @ symbol", () => {
    expect(emailSchema.safeParse("userexample.com").success).toBe(false);
  });

  it("rejects an email without domain", () => {
    expect(emailSchema.safeParse("user@").success).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(emailSchema.safeParse("").success).toBe(false);
  });
});

describe("orderItemSchema", () => {
  const validItem = {
    productId: 1,
    quantity: 2,
    size: "M" as const,
    sugarLevel: "50%",
    iceLevel: "50%",
    toppings: [],
  };

  it("accepts a valid order item", () => {
    expect(orderItemSchema.safeParse(validItem).success).toBe(true);
  });

  it("defaults toppings to an empty array when omitted", () => {
    const { toppings: _, ...withoutToppings } = validItem;
    void _;
    const result = orderItemSchema.safeParse(withoutToppings);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.toppings).toEqual([]);
    }
  });

  it("rejects quantity of 0", () => {
    expect(orderItemSchema.safeParse({ ...validItem, quantity: 0 }).success).toBe(false);
  });

  it("rejects quantity greater than 20", () => {
    expect(orderItemSchema.safeParse({ ...validItem, quantity: 21 }).success).toBe(false);
  });

  it("rejects an invalid size value", () => {
    expect(orderItemSchema.safeParse({ ...validItem, size: "XL" }).success).toBe(false);
  });

  it("rejects a non-positive productId", () => {
    expect(orderItemSchema.safeParse({ ...validItem, productId: 0 }).success).toBe(false);
  });
});

describe("createOrderSchema", () => {
  const validOrder = {
    customerName: "Nguyen Son",
    phone: "0901234567",
    address: "123 Nguyen Hue, Quan 1, TP HCM",
    items: [
      {
        productId: 1,
        quantity: 1,
        size: "M" as const,
        sugarLevel: "100%",
        iceLevel: "100%",
        toppings: [],
      },
    ],
    paymentMethod: "cod" as const,
  };

  it("accepts a valid order", () => {
    expect(createOrderSchema.safeParse(validOrder).success).toBe(true);
  });

  it("rejects a customer name shorter than 2 characters", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, customerName: "A" }).success).toBe(false);
  });

  it("rejects an address shorter than 10 characters", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, address: "Short" }).success).toBe(false);
  });

  it("rejects an order with no items", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, items: [] }).success).toBe(false);
  });

  it("rejects an invalid payment method", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, paymentMethod: "crypto" }).success).toBe(false);
  });

  it("defaults paymentMethod to cod when omitted", () => {
    const { paymentMethod: _, ...withoutPayment } = validOrder;
    void _;
    const result = createOrderSchema.safeParse(withoutPayment);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.paymentMethod).toBe("cod");
    }
  });
});

describe("contactSchema", () => {
  const validContact = {
    name: "Nguyen Son",
    email: "son@example.com",
    subject: "Question about menu",
    message: "I would like to know more about your seasonal drinks.",
  };

  it("accepts a valid contact form submission", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects a name shorter than 2 characters", () => {
    expect(contactSchema.safeParse({ ...validContact, name: "A" }).success).toBe(false);
  });

  it("rejects a subject shorter than 5 characters", () => {
    expect(contactSchema.safeParse({ ...validContact, subject: "Hi" }).success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    expect(contactSchema.safeParse({ ...validContact, message: "Short" }).success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    expect(contactSchema.safeParse({ ...validContact, email: "not-an-email" }).success).toBe(false);
  });
});

describe("reviewSchema", () => {
  const validReview = {
    productId: 1,
    rating: 5,
    name: "Nguyen Son",
    comment: "Absolutely delicious milk tea!",
  };

  it("accepts a valid review", () => {
    expect(reviewSchema.safeParse(validReview).success).toBe(true);
  });

  it("rejects a rating below 1", () => {
    expect(reviewSchema.safeParse({ ...validReview, rating: 0 }).success).toBe(false);
  });

  it("rejects a rating above 5", () => {
    expect(reviewSchema.safeParse({ ...validReview, rating: 6 }).success).toBe(false);
  });

  it("rejects a comment shorter than 5 characters", () => {
    expect(reviewSchema.safeParse({ ...validReview, comment: "Ok" }).success).toBe(false);
  });

  it("rejects a non-positive productId", () => {
    expect(reviewSchema.safeParse({ ...validReview, productId: -1 }).success).toBe(false);
  });
});

export const testProducts = [
  { name: "Trà sữa trân châu", slug: "tra-sua-tran-chau", price: 45000 },
  { name: "Matcha Latte", slug: "matcha-latte", price: 55000 },
  { name: "Trà đào cam sả", slug: "tra-dao-cam-sa", price: 40000 },
];

export const testUser = {
  name: "Nguyễn Văn Test",
  phone: "0901234567",
  email: "test@example.com",
  address: "123 Nguyễn Huệ, Q.1, TP.HCM",
};

export const testOrder = {
  customerName: "Nguyễn Văn Test",
  phone: "0901234567",
  address: "123 Nguyễn Huệ, Q.1, TP.HCM",
  items: [
    { productId: "test-1", quantity: 2, price: 45000 },
    { productId: "test-2", quantity: 1, price: 55000 },
  ],
  note: "Ít đường",
};

export const validCoupon = {
  code: "WELCOME20",
  discount: 20,
  type: "PERCENT" as const,
};

export const invalidEmails = [
  "notanemail",
  "@missing.com",
  "spaces in@email.com",
  "",
];

export const validPhones = [
  "0901234567",
  "0812345678",
  "0701234567",
];

export const invalidPhones = [
  "123",
  "abcdefghij",
  "",
  "090123456789012",
];

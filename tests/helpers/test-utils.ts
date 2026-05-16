import { Page, expect } from "@playwright/test";

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState("networkidle");
}

export async function addProductToCart(page: Page, productName?: string) {
  await page.goto("/menu");
  await waitForPageLoad(page);
  const productCard = productName
    ? page.locator(`text=${productName}`).first()
    : page.locator('[data-testid="product-card"]').first();
  await productCard.click();
  await page.locator('button:has-text("Thêm vào giỏ")').click();
}

export async function openCart(page: Page) {
  await page.locator('[aria-label="Giỏ hàng"]').first().click();
}

export async function navigateToCheckout(page: Page) {
  await openCart(page);
  await page.locator('a:has-text("Thanh toán")').click();
  await waitForPageLoad(page);
}

export async function fillCheckoutForm(page: Page, data?: Partial<CheckoutData>) {
  const defaults: CheckoutData = {
    name: "Nguyễn Văn Test",
    phone: "0901234567",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    note: "",
  };
  const formData = { ...defaults, ...data };

  await page.fill('[name="name"]', formData.name);
  await page.fill('[name="phone"]', formData.phone);
  await page.fill('[name="address"]', formData.address);
  if (formData.note) {
    await page.fill('[name="note"]', formData.note);
  }
}

export interface CheckoutData {
  name: string;
  phone: string;
  address: string;
  note: string;
}

export const API_BASE = "/api";

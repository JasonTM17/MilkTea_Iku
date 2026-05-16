import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MilkTea Iku - Trà Sữa Premium",
    short_name: "Iku",
    description: "Đặt trà sữa premium online, giao tận nơi. Nguyên liệu tươi, hương vị đậm đà.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdf6ee",
    theme_color: "#d4792a",
    orientation: "portrait-primary",
    categories: ["food", "shopping"],
    icons: [
      {
        src: "/logo-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/logo-icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Menu",
        short_name: "Menu",
        url: "/menu",
        description: "Xem menu trà sữa",
      },
      {
        name: "Đặt hàng",
        short_name: "Order",
        url: "/checkout",
        description: "Đặt hàng nhanh",
      },
    ],
  };
}

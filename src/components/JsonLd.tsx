export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "MilkTea Iku",
    description: "Trà sữa premium với nguyên liệu tươi ngon nhất. Đặt hàng online, giao tận nơi.",
    url: "https://milktea-iku.vercel.app",
    logo: "https://milktea-iku.vercel.app/logo.svg",
    image: "https://milktea-iku.vercel.app/logo.svg",
    telephone: "+84-28-1234-5678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Nguyễn Huệ",
      addressLocality: "Quận 1",
      addressRegion: "TP. Hồ Chí Minh",
      postalCode: "700000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.7769,
      longitude: 106.7009,
    },
    servesCuisine: ["Milk Tea", "Bubble Tea", "Vietnamese Tea"],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2000",
      bestRating: "5",
    },
    hasMenu: "https://milktea-iku.vercel.app/menu",
    acceptsReservations: false,
    sameAs: [
      "https://facebook.com/milkteaiku",
      "https://instagram.com/milkteaiku",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

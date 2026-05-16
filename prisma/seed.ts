import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.topping.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Trà Sữa Truyền Thống",
        slug: "tra-sua-truyen-thong",
        description: "Hương vị trà sữa cổ điển, đậm đà và thơm ngon",
        image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400",
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Trà Trái Cây",
        slug: "tra-trai-cay",
        description: "Trà kết hợp trái cây tươi mát, thanh nhiệt",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Đặc Biệt",
        slug: "dac-biet",
        description: "Những sáng tạo độc đáo chỉ có tại Iku",
        image: "https://images.unsplash.com/photo-1525803377221-4a4e2d4e66c8?w=400",
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Sữa Tươi & Kem",
        slug: "sua-tuoi-kem",
        description: "Thức uống từ sữa tươi nguyên chất và kem béo",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400",
        order: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: "Trà Xanh & Matcha",
        slug: "tra-xanh-matcha",
        description: "Trà xanh Nhật Bản cao cấp, matcha nguyên chất",
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400",
        order: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: "Topping & Thêm",
        slug: "topping",
        description: "Các loại topping thêm vào thức uống",
        image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=400",
        order: 6,
      },
    }),
  ]);

  const [traSua, traTraiCay, dacBiet, suaTuoi, traXanh] = categories;

  // Create toppings
  await prisma.topping.createMany({
    data: [
      { name: "Trân châu đen", price: 10000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Trân châu trắng", price: 10000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Thạch dừa", price: 8000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Pudding trứng", price: 12000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Kem cheese", price: 15000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Thạch trái cây", price: 10000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Sương sáo", price: 8000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Đào miếng", price: 12000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Shot espresso", price: 15000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
      { name: "Kem whipping", price: 12000, image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=100" },
    ],
  });

  // Create products - Trà Sữa Truyền Thống
  await prisma.product.createMany({
    data: [
      {
        name: "Trà Sữa Iku Signature",
        slug: "tra-sua-iku-signature",
        description: "Trà đen pha sữa tươi nguyên chất, vị đậm đà hài hòa. Thức uống signature của Iku với công thức độc quyền.",
        basePrice: 45000,
        image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=600",
        categoryId: traSua.id,
        isBestSeller: true,
      },
      {
        name: "Trà Sữa Trân Châu Hoàng Kim",
        slug: "tra-sua-tran-chau-hoang-kim",
        description: "Trà sữa đậm đà kết hợp trân châu hoàng kim dẻo thơm, phủ lớp kem cheese béo ngậy.",
        basePrice: 55000,
        image: "https://images.unsplash.com/photo-1525803377221-4a4e2d4e66c8?w=600",
        categoryId: traSua.id,
        isBestSeller: true,
        isNew: true,
      },
      {
        name: "Hồng Trà Sữa",
        slug: "hong-tra-sua",
        description: "Hồng trà Ceylon thượng hạng pha cùng sữa tươi, hương thơm nhẹ nhàng thanh tao.",
        basePrice: 42000,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600",
        categoryId: traSua.id,
      },
      {
        name: "Trà Sữa Ô Long",
        slug: "tra-sua-o-long",
        description: "Trà Ô Long đài loan rang nhẹ, kết hợp sữa tươi tạo nên hương vị thanh mát đặc trưng.",
        basePrice: 48000,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
        categoryId: traSua.id,
      },
      {
        name: "Trà Sữa Socola",
        slug: "tra-sua-socola",
        description: "Socola Bỉ nguyên chất hòa quyện cùng trà sữa, đậm đà và ngọt ngào.",
        basePrice: 50000,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
        categoryId: traSua.id,
      },
    ],
  });

  // Create products - Trà Trái Cây
  await prisma.product.createMany({
    data: [
      {
        name: "Trà Đào Cam Sả",
        slug: "tra-dao-cam-sa",
        description: "Trà xanh kết hợp đào tươi, cam vàng và sả thơm. Thanh mát, giải nhiệt tuyệt vời.",
        basePrice: 45000,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
        categoryId: traTraiCay.id,
        isBestSeller: true,
      },
      {
        name: "Trà Vải Lychee Rose",
        slug: "tra-vai-lychee-rose",
        description: "Trà hoa hồng kết hợp vải thiều tươi, thơm ngát và ngọt thanh tự nhiên.",
        basePrice: 48000,
        image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=600",
        categoryId: traTraiCay.id,
        isNew: true,
      },
      {
        name: "Trà Chanh Dây Passion",
        slug: "tra-chanh-day-passion",
        description: "Chanh dây tươi chua ngọt hài hòa, kết hợp trà xanh thanh mát.",
        basePrice: 42000,
        image: "https://images.unsplash.com/photo-1544252890-c3e95e867d73?w=600",
        categoryId: traTraiCay.id,
      },
      {
        name: "Trà Xoài Tropical",
        slug: "tra-xoai-tropical",
        description: "Xoài chín mọng ngọt lịm kết hợp trà lài, mang hương vị nhiệt đới sảng khoái.",
        basePrice: 45000,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600",
        categoryId: traTraiCay.id,
      },
    ],
  });

  // Create products - Đặc Biệt
  await prisma.product.createMany({
    data: [
      {
        name: "Brown Sugar Boba Milk",
        slug: "brown-sugar-boba-milk",
        description: "Sữa tươi nguyên chất với trân châu đường nâu caramel hóa, tạo vân hổ đặc trưng.",
        basePrice: 55000,
        image: "https://images.unsplash.com/photo-1525803377221-4a4e2d4e66c8?w=600",
        categoryId: dacBiet.id,
        isBestSeller: true,
        isNew: true,
      },
      {
        name: "Dirty Matcha Latte",
        slug: "dirty-matcha-latte",
        description: "Matcha Nhật Bản cao cấp kết hợp espresso shot, tạo nên sự tương phản độc đáo.",
        basePrice: 58000,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600",
        categoryId: dacBiet.id,
        isNew: true,
      },
      {
        name: "Taro Cream Cheese",
        slug: "taro-cream-cheese",
        description: "Khoai môn tím xay mịn, phủ lớp kem cheese mặn ngọt hài hòa.",
        basePrice: 52000,
        image: "https://images.unsplash.com/photo-1558857563-b371033873b8?w=600",
        categoryId: dacBiet.id,
        isBestSeller: true,
      },
      {
        name: "Iku Cloud Nine",
        slug: "iku-cloud-nine",
        description: "Trà ô long đặc biệt với lớp foam kem tươi bồng bềnh như mây, rắc bột cacao.",
        basePrice: 55000,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600",
        categoryId: dacBiet.id,
        isNew: true,
      },
    ],
  });

  // Create products - Sữa Tươi & Kem
  await prisma.product.createMany({
    data: [
      {
        name: "Sữa Tươi Trân Châu Đường Nâu",
        slug: "sua-tuoi-tran-chau-duong-nau",
        description: "Sữa tươi Mộc Châu nguyên chất với trân châu đường nâu thủ công.",
        basePrice: 45000,
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
        categoryId: suaTuoi.id,
        isBestSeller: true,
      },
      {
        name: "Kem Sữa Dừa",
        slug: "kem-sua-dua",
        description: "Kem dừa béo ngậy kết hợp sữa tươi, thêm nước cốt dừa thơm lừng.",
        basePrice: 48000,
        image: "https://images.unsplash.com/photo-1525803377221-4a4e2d4e66c8?w=600",
        categoryId: suaTuoi.id,
      },
      {
        name: "Smoothie Dâu Tây",
        slug: "smoothie-dau-tay",
        description: "Dâu tây tươi xay cùng sữa và đá, thêm whipping cream béo ngậy.",
        basePrice: 52000,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600",
        categoryId: suaTuoi.id,
        isNew: true,
      },
    ],
  });

  // Create products - Trà Xanh & Matcha
  await prisma.product.createMany({
    data: [
      {
        name: "Matcha Latte",
        slug: "matcha-latte",
        description: "Bột matcha Uji cao cấp đánh tan cùng sữa tươi nóng hoặc đá.",
        basePrice: 52000,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600",
        categoryId: traXanh.id,
        isBestSeller: true,
      },
      {
        name: "Trà Xanh Sữa",
        slug: "tra-xanh-sua",
        description: "Trà xanh Thái Nguyên pha sữa tươi, vị chát nhẹ hòa quyện béo ngậy.",
        basePrice: 42000,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600",
        categoryId: traXanh.id,
      },
      {
        name: "Matcha Đậu Đỏ",
        slug: "matcha-dau-do",
        description: "Matcha kết hợp đậu đỏ ninh mềm, vị ngọt thanh kiểu Nhật Bản.",
        basePrice: 55000,
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600",
        categoryId: traXanh.id,
        isNew: true,
      },
    ],
  });

  console.log("Seed completed successfully!");
  console.log(`Created ${categories.length} categories`);
  const productCount = await prisma.product.count();
  const toppingCount = await prisma.topping.count();
  console.log(`Created ${productCount} products`);
  console.log(`Created ${toppingCount} toppings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

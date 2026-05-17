import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.topping.deleteMany();
  await prisma.category.deleteMany();

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Trà Sữa Truyền Thống",
        slug: "tra-sua-truyen-thong",
        description: "Hương vị trà sữa cổ điển, đậm đà và thơm ngon",
        image: "https://picsum.photos/seed/cat-trasua/400/400",
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Trà Trái Cây",
        slug: "tra-trai-cay",
        description: "Trà kết hợp trái cây tươi mát, thanh nhiệt",
        image: "https://picsum.photos/seed/cat-traicay/400/400",
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Đặc Biệt",
        slug: "dac-biet",
        description: "Những sáng tạo độc đáo chỉ có tại Iku",
        image: "https://picsum.photos/seed/cat-dacbiet/400/400",
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Sữa Tươi & Kem",
        slug: "sua-tuoi-kem",
        description: "Thức uống từ sữa tươi nguyên chất và kem béo",
        image: "https://picsum.photos/seed/cat-suatuoi/400/400",
        order: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: "Trà Xanh & Matcha",
        slug: "tra-xanh-matcha",
        description: "Trà xanh Nhật Bản cao cấp, matcha nguyên chất",
        image: "https://picsum.photos/seed/cat-matcha/400/400",
        order: 5,
      },
    }),
  ]);

  const [traSua, traTraiCay, dacBiet, suaTuoi, traXanh] = categories;

  await prisma.topping.createMany({
    data: [
      { name: "Trân châu đen", price: 10000, image: "https://picsum.photos/seed/topping1/100/100" },
      { name: "Trân châu trắng", price: 10000, image: "https://picsum.photos/seed/topping2/100/100" },
      { name: "Thạch dừa", price: 8000, image: "https://picsum.photos/seed/topping3/100/100" },
      { name: "Pudding trứng", price: 12000, image: "https://picsum.photos/seed/topping4/100/100" },
      { name: "Kem cheese", price: 15000, image: "https://picsum.photos/seed/topping5/100/100" },
      { name: "Thạch trái cây", price: 10000, image: "https://picsum.photos/seed/topping6/100/100" },
      { name: "Sương sáo", price: 8000, image: "https://picsum.photos/seed/topping7/100/100" },
      { name: "Đào miếng", price: 12000, image: "https://picsum.photos/seed/topping8/100/100" },
      { name: "Shot espresso", price: 15000, image: "https://picsum.photos/seed/topping9/100/100" },
      { name: "Kem whipping", price: 12000, image: "https://picsum.photos/seed/topping10/100/100" },
      { name: "Trân châu hoàng kim", price: 12000, image: "https://picsum.photos/seed/topping11/100/100" },
      { name: "Thạch cà phê", price: 10000, image: "https://picsum.photos/seed/topping12/100/100" },
    ],
  });

  // Trà Sữa Truyền Thống - ảnh thật trà sữa
  await prisma.product.createMany({
    data: [
      {
        name: "Trà Sữa Iku Signature",
        slug: "tra-sua-iku-signature",
        description: "Trà đen Ceylon pha sữa tươi nguyên chất, vị đậm đà hài hòa. Thức uống signature với công thức độc quyền, kèm trân châu hoàng kim.",
        basePrice: 45000,
        image: "https://picsum.photos/seed/trasua1/600/600",
        categoryId: traSua.id,
        isBestSeller: true,
      },
      {
        name: "Trà Sữa Trân Châu Hoàng Kim",
        slug: "tra-sua-tran-chau-hoang-kim",
        description: "Trà sữa đậm đà kết hợp trân châu hoàng kim dẻo thơm, phủ lớp kem cheese béo ngậy. Best seller tại tất cả chi nhánh.",
        basePrice: 55000,
        image: "https://picsum.photos/seed/trasua2/600/600",
        categoryId: traSua.id,
        isBestSeller: true,
        isNew: true,
      },
      {
        name: "Hồng Trà Sữa",
        slug: "hong-tra-sua",
        description: "Hồng trà Ceylon thượng hạng pha cùng sữa tươi Mộc Châu, hương thơm nhẹ nhàng thanh tao, vị ngọt dịu tự nhiên.",
        basePrice: 42000,
        image: "https://picsum.photos/seed/trasua3/600/600",
        categoryId: traSua.id,
      },
      {
        name: "Trà Sữa Ô Long Nướng",
        slug: "tra-sua-o-long-nuong",
        description: "Trà Ô Long Đài Loan rang nhẹ trên than hồng, kết hợp sữa tươi tạo nên hương vị thanh mát đặc trưng khó quên.",
        basePrice: 48000,
        image: "https://picsum.photos/seed/trasua4/600/600",
        categoryId: traSua.id,
      },
      {
        name: "Trà Sữa Socola Bỉ",
        slug: "tra-sua-socola-bi",
        description: "Socola Bỉ Callebaut nguyên chất hòa quyện cùng trà sữa, đậm đà và ngọt ngào, thêm whipping cream.",
        basePrice: 50000,
        image: "https://picsum.photos/seed/trasua5/600/600",
        categoryId: traSua.id,
      },
      {
        name: "Trà Sữa Hokkaido",
        slug: "tra-sua-hokkaido",
        description: "Công thức trà sữa Nhật Bản với sữa Hokkaido béo ngậy, trà đen Assam đậm vị, caramel nhẹ.",
        basePrice: 52000,
        image: "https://picsum.photos/seed/trasua6/600/600",
        categoryId: traSua.id,
        isNew: true,
      },
    ],
  });

  // Trà Trái Cây
  await prisma.product.createMany({
    data: [
      {
        name: "Trà Đào Cam Sả",
        slug: "tra-dao-cam-sa",
        description: "Trà xanh kết hợp đào tươi miếng lớn, cam vàng tươi và sả thơm. Thanh mát, giải nhiệt tuyệt vời cho ngày hè.",
        basePrice: 45000,
        image: "https://picsum.photos/seed/traicay1/600/600",
        categoryId: traTraiCay.id,
        isBestSeller: true,
      },
      {
        name: "Trà Vải Lychee Rose",
        slug: "tra-vai-lychee-rose",
        description: "Trà hoa hồng Bulgaria kết hợp vải thiều tươi Bắc Giang, thơm ngát và ngọt thanh tự nhiên.",
        basePrice: 48000,
        image: "https://picsum.photos/seed/traicay2/600/600",
        categoryId: traTraiCay.id,
        isNew: true,
      },
      {
        name: "Trà Chanh Dây Passion",
        slug: "tra-chanh-day-passion",
        description: "Chanh dây Đà Lạt tươi chua ngọt hài hòa, kết hợp trà xanh Thái Nguyên thanh mát, thêm hạt chia.",
        basePrice: 42000,
        image: "https://picsum.photos/seed/traicay3/600/600",
        categoryId: traTraiCay.id,
      },
      {
        name: "Trà Xoài Tropical",
        slug: "tra-xoai-tropical",
        description: "Xoài Cát Hòa Lộc chín mọng ngọt lịm kết hợp trà lài, mang hương vị nhiệt đới sảng khoái.",
        basePrice: 45000,
        image: "https://picsum.photos/seed/traicay4/600/600",
        categoryId: traTraiCay.id,
      },
      {
        name: "Trà Dâu Tây Tươi",
        slug: "tra-dau-tay-tuoi",
        description: "Dâu tây Đà Lạt tươi nguyên trái kết hợp trà hồng, vị chua nhẹ ngọt thanh, thêm thạch dâu.",
        basePrice: 48000,
        image: "https://picsum.photos/seed/traicay5/600/600",
        categoryId: traTraiCay.id,
        isNew: true,
      },
    ],
  });

  // Đặc Biệt
  await prisma.product.createMany({
    data: [
      {
        name: "Brown Sugar Boba Milk",
        slug: "brown-sugar-boba-milk",
        description: "Sữa tươi nguyên chất với trân châu đường nâu caramel hóa thủ công, tạo vân hổ đặc trưng. Signature drink của Tiger Sugar.",
        basePrice: 55000,
        image: "https://picsum.photos/seed/dacbiet1/600/600",
        categoryId: dacBiet.id,
        isBestSeller: true,
        isNew: true,
      },
      {
        name: "Dirty Matcha Latte",
        slug: "dirty-matcha-latte",
        description: "Matcha Uji Nhật Bản cao cấp kết hợp double espresso shot, tạo nên sự tương phản độc đáo giữa đắng và ngọt.",
        basePrice: 58000,
        image: "https://picsum.photos/seed/dacbiet2/600/600",
        categoryId: dacBiet.id,
        isNew: true,
      },
      {
        name: "Taro Cream Cheese",
        slug: "taro-cream-cheese",
        description: "Khoai môn Đà Lạt tím xay mịn, phủ lớp kem cheese mặn ngọt hài hòa. Topping trân châu tím đặc biệt.",
        basePrice: 52000,
        image: "https://picsum.photos/seed/dacbiet3/600/600",
        categoryId: dacBiet.id,
        isBestSeller: true,
      },
      {
        name: "Iku Cloud Nine",
        slug: "iku-cloud-nine",
        description: "Trà ô long đặc biệt với lớp foam kem tươi bồng bềnh như mây, rắc bột cacao Valrhona và caramel.",
        basePrice: 55000,
        image: "https://picsum.photos/seed/dacbiet4/600/600",
        categoryId: dacBiet.id,
        isNew: true,
      },
      {
        name: "Mochi Milk Tea",
        slug: "mochi-milk-tea",
        description: "Trà sữa Nhật Bản với mochi dẻo mềm handmade, nhân đậu đỏ Hokkaido, rắc bột kinako.",
        basePrice: 58000,
        image: "https://picsum.photos/seed/dacbiet5/600/600",
        categoryId: dacBiet.id,
        isNew: true,
      },
    ],
  });

  // Sữa Tươi & Kem
  await prisma.product.createMany({
    data: [
      {
        name: "Sữa Tươi Trân Châu Đường Nâu",
        slug: "sua-tuoi-tran-chau-duong-nau",
        description: "Sữa tươi Mộc Châu nguyên chất 100% với trân châu đường nâu thủ công nấu mỗi ngày.",
        basePrice: 45000,
        image: "https://picsum.photos/seed/suatuoi1/600/600",
        categoryId: suaTuoi.id,
        isBestSeller: true,
      },
      {
        name: "Kem Sữa Dừa Tropical",
        slug: "kem-sua-dua-tropical",
        description: "Kem dừa Bến Tre béo ngậy kết hợp sữa tươi, thêm nước cốt dừa thơm lừng và topping dừa nạo.",
        basePrice: 48000,
        image: "https://picsum.photos/seed/suatuoi2/600/600",
        categoryId: suaTuoi.id,
      },
      {
        name: "Smoothie Dâu Tây Yogurt",
        slug: "smoothie-dau-tay-yogurt",
        description: "Dâu tây Đà Lạt tươi xay cùng yogurt Hy Lạp và đá, thêm whipping cream và granola.",
        basePrice: 52000,
        image: "https://picsum.photos/seed/suatuoi3/600/600",
        categoryId: suaTuoi.id,
        isNew: true,
      },
      {
        name: "Oreo Cookie Cream",
        slug: "oreo-cookie-cream",
        description: "Sữa tươi blend cùng Oreo cookies, thêm kem vanilla và chocolate chips. Thức uống yêu thích của giới trẻ.",
        basePrice: 50000,
        image: "https://picsum.photos/seed/suatuoi4/600/600",
        categoryId: suaTuoi.id,
      },
    ],
  });

  // Trà Xanh & Matcha
  await prisma.product.createMany({
    data: [
      {
        name: "Matcha Latte Premium",
        slug: "matcha-latte",
        description: "Bột matcha Uji grade A đánh tan cùng sữa tươi Hokkaido. Có thể chọn nóng hoặc đá, thêm shot espresso.",
        basePrice: 52000,
        image: "https://picsum.photos/seed/matcha1/600/600",
        categoryId: traXanh.id,
        isBestSeller: true,
      },
      {
        name: "Trà Xanh Sữa Thái Nguyên",
        slug: "tra-xanh-sua",
        description: "Trà xanh Thái Nguyên hảo hạng pha sữa tươi, vị chát nhẹ hòa quyện béo ngậy, thêm đậu đỏ.",
        basePrice: 42000,
        image: "https://picsum.photos/seed/matcha2/600/600",
        categoryId: traXanh.id,
      },
      {
        name: "Matcha Đậu Đỏ Nhật Bản",
        slug: "matcha-dau-do",
        description: "Matcha kết hợp đậu đỏ Hokkaido ninh mềm 8 tiếng, vị ngọt thanh kiểu Nhật Bản truyền thống.",
        basePrice: 55000,
        image: "https://picsum.photos/seed/matcha3/600/600",
        categoryId: traXanh.id,
        isNew: true,
      },
      {
        name: "Matcha Cream Cheese",
        slug: "matcha-cream-cheese",
        description: "Matcha đậm vị phủ lớp cream cheese béo mặn, tạo sự cân bằng hoàn hảo giữa đắng-ngọt-mặn.",
        basePrice: 55000,
        image: "https://picsum.photos/seed/matcha4/600/600",
        categoryId: traXanh.id,
        isBestSeller: true,
      },
    ],
  });

  console.log("Seed completed successfully!");
  const productCount = await prisma.product.count();
  const toppingCount = await prisma.topping.count();
  console.log(`Created ${categories.length} categories`);
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

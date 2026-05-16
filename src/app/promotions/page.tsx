"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Tag, Clock, Sparkles, Gift } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const coupons = [
  {
    id: 1,
    code: "WELCOME20",
    title: "Giảm 20% đơn đầu tiên",
    description: "Áp dụng cho thành viên mới, đơn tối thiểu 50.000đ",
    discount: "20%",
    minOrder: 50000,
    expiry: "31/12/2024",
    color: "from-brand-500 to-brand-700",
    icon: Sparkles,
    isNew: true,
  },
  {
    id: 2,
    code: "FREESHIP",
    title: "Miễn phí giao hàng",
    description: "Áp dụng cho đơn từ 100.000đ trong bán kính 5km",
    discount: "Free Ship",
    minOrder: 100000,
    expiry: "30/06/2025",
    color: "from-blue-500 to-blue-700",
    icon: Gift,
    isNew: false,
  },
  {
    id: 3,
    code: "BUY2GET1",
    title: "Mua 2 tặng 1",
    description: "Mua 2 ly bất kỳ, tặng 1 ly size S cùng loại",
    discount: "Tặng 1",
    minOrder: 0,
    expiry: "Mỗi thứ 3",
    color: "from-purple-500 to-purple-700",
    icon: Tag,
    isNew: false,
  },
  {
    id: 4,
    code: "BIRTHDAY",
    title: "Sinh nhật vui vẻ",
    description: "Giảm 30% trong tháng sinh nhật (cần đăng ký thành viên)",
    discount: "30%",
    minOrder: 0,
    expiry: "Tháng sinh nhật",
    color: "from-pink-500 to-rose-700",
    icon: Gift,
    isNew: true,
  },
  {
    id: 5,
    code: "TOPPING0",
    title: "Free topping",
    description: "Miễn phí 1 topping bất kỳ cho đơn từ 45.000đ",
    discount: "Free Topping",
    minOrder: 45000,
    expiry: "15/07/2025",
    color: "from-green-500 to-emerald-700",
    icon: Sparkles,
    isNew: false,
  },
  {
    id: 6,
    code: "COMBO50K",
    title: "Combo tiết kiệm",
    description: "Giảm 50.000đ cho combo 3 ly trở lên",
    discount: "-50K",
    minOrder: 150000,
    expiry: "31/08/2025",
    color: "from-amber-500 to-orange-700",
    icon: Tag,
    isNew: true,
  },
];

export default function PromotionsPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="bg-brand-100 text-brand-700 border-0 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Ưu đãi đặc biệt
            </Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              Khuyến mãi & Mã giảm giá
            </h1>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Sử dụng mã giảm giá khi thanh toán để nhận ưu đãi hấp dẫn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon, i) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className={`h-2 bg-gradient-to-r ${coupon.color}`} />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${coupon.color} flex items-center justify-center`}>
                        <coupon.icon className="w-5 h-5 text-white" />
                      </div>
                      {coupon.isNew && (
                        <Badge className="bg-red-100 text-red-600 border-0 text-xs">Mới</Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-1">{coupon.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{coupon.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>HSD: {coupon.expiry}</span>
                      </div>
                      <span className="text-lg font-bold text-brand-600">{coupon.discount}</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                      <code className="flex-1 text-sm font-mono font-semibold text-gray-700 tracking-wider">
                        {coupon.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCode(coupon.id, coupon.code)}
                        className="h-8 px-3 text-xs"
                      >
                        {copiedId === coupon.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1 text-green-600" />
                            <span className="text-green-600">Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1" />
                            Sao chép
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center p-8 bg-brand-50 rounded-3xl border border-brand-100"
          >
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
              Nhận thêm ưu đãi?
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Đăng ký thành viên Iku để nhận mã giảm giá độc quyền mỗi tuần
            </p>
            <Button className="bg-brand-600 hover:bg-brand-700 text-white rounded-full px-8">
              Đăng ký thành viên
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

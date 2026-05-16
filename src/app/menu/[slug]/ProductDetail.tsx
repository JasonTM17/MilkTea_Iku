"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

interface Topping {
  id: string;
  name: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  image: string | null;
  isNew: boolean;
  isBestSeller: boolean;
  category: { name: string };
}

interface ProductDetailProps {
  product: Product;
  toppings: Topping[];
}

const sizes = [
  { value: "S" as const, label: "Nhỏ", modifier: 0.85 },
  { value: "M" as const, label: "Vừa", modifier: 1 },
  { value: "L" as const, label: "Lớn", modifier: 1.2 },
];

const sugarLevels = [0, 30, 50, 70, 100];
const iceLevels = [0, 30, 50, 70, 100];

export default function ProductDetail({ product, toppings }: ProductDetailProps) {
  const [size, setSize] = useState<"S" | "M" | "L">("M");
  const [sugar, setSugar] = useState(100);
  const [ice, setIce] = useState(100);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();

  const sizeModifier = sizes.find((s) => s.value === size)!.modifier;
  const toppingTotal = selectedToppings.reduce((sum, id) => {
    const t = toppings.find((t) => t.id === id);
    return sum + (t?.price || 0);
  }, 0);
  const unitPrice = product.basePrice * sizeModifier + toppingTotal;
  const totalPrice = unitPrice * quantity;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image || "",
      size,
      quantity,
      sugarLevel: sugar,
      iceLevel: ice,
      toppings: selectedToppings,
      basePrice: product.basePrice,
      toppingPrice: toppingTotal,
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại menu
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-cream-100"
        >
          <Image
            src={product.image || "https://images.unsplash.com/photo-1558857563-b371033873b8?w=600"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                Mới
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-3 py-1 bg-brand-500 text-white text-sm font-medium rounded-full">
                Best Seller
              </span>
            )}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <span className="text-sm text-brand-600 font-medium">
              {product.category.name}
            </span>
            <h1 className="text-3xl font-display font-bold text-gray-900 mt-1">
              {product.name}
            </h1>
            <p className="text-gray-500 mt-3">{product.description}</p>
          </div>

          {/* Size */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Kích cỡ</h3>
            <div className="flex gap-3">
              {sizes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all ${
                    size === s.value
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-gray-200 hover:border-brand-200"
                  }`}
                >
                  <div className="text-lg">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sugar level */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Độ ngọt: {sugar}%
            </h3>
            <div className="flex gap-2">
              {sugarLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSugar(level)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    sugar === level
                      ? "bg-brand-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-brand-50"
                  }`}
                >
                  {level}%
                </button>
              ))}
            </div>
          </div>

          {/* Ice level */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Đá: {ice}%
            </h3>
            <div className="flex gap-2">
              {iceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setIce(level)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    ice === level
                      ? "bg-brand-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-brand-50"
                  }`}
                >
                  {level}%
                </button>
              ))}
            </div>
          </div>

          {/* Toppings */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Topping</h3>
            <div className="grid grid-cols-2 gap-2">
              {toppings.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggleTopping(t.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm transition-all ${
                    selectedToppings.includes(t.id)
                      ? "border-brand-500 bg-brand-50"
                      : "border-gray-200 hover:border-brand-200"
                  }`}
                >
                  <span>{t.name}</span>
                  <span className="text-brand-600 font-medium">
                    +{formatPrice(t.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to cart */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-all hover:shadow-lg hover:shadow-brand-500/25"
            >
              <ShoppingBag className="w-5 h-5" />
              Thêm vào giỏ — {formatPrice(totalPrice)}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

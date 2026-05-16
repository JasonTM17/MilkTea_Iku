"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Clock, CheckCircle, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const statusMap: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { label: "Đang xác nhận", icon: <Clock className="w-5 h-5" />, color: "text-yellow-600 bg-yellow-50" },
  confirmed: { label: "Đã xác nhận", icon: <CheckCircle className="w-5 h-5" />, color: "text-blue-600 bg-blue-50" },
  preparing: { label: "Đang pha chế", icon: <Package className="w-5 h-5" />, color: "text-purple-600 bg-purple-50" },
  delivering: { label: "Đang giao", icon: <Truck className="w-5 h-5" />, color: "text-brand-600 bg-brand-50" },
  completed: { label: "Hoàn thành", icon: <CheckCircle className="w-5 h-5" />, color: "text-green-600 bg-green-50" },
};

export default function OrderPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Array<{
    id: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
    items: Array<{ product: { name: string }; quantity: number; size: string }>;
  }> | null>(null);
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?phone=${encodeURIComponent(phone)}`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Tra cứu đơn hàng
            </h1>
            <p className="text-gray-500 mt-2">
              Nhập số điện thoại để xem trạng thái đơn hàng
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-brand-600 text-white rounded-full font-medium hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Tìm"}
            </button>
          </form>

          {orders !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl">
                  <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
                </div>
              ) : (
                orders.map((order) => {
                  const status = statusMap[order.status] || statusMap.pending;
                  return (
                    <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                          </span>
                          <h3 className="font-semibold">{order.customerName}</h3>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                      </div>
                      <div className="space-y-2 border-t pt-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span>{item.product.name} (Size {item.size}) x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-3 pt-3 flex justify-between">
                        <span className="text-sm text-gray-500">Tổng</span>
                        <span className="font-bold text-brand-600">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

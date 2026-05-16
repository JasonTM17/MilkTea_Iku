"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Clock, CheckCircle, Truck, ChefHat, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusSteps = ["pending", "confirmed", "preparing", "delivering", "completed"];

const statusMap: Record<string, { label: string; icon: React.ReactNode; color: string; bgColor: string }> = {
  pending: { label: "Đang xác nhận", icon: <Clock className="w-5 h-5" />, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  confirmed: { label: "Đã xác nhận", icon: <CheckCircle className="w-5 h-5" />, color: "text-blue-600", bgColor: "bg-blue-100" },
  preparing: { label: "Đang pha chế", icon: <ChefHat className="w-5 h-5" />, color: "text-purple-600", bgColor: "bg-purple-100" },
  delivering: { label: "Đang giao", icon: <Truck className="w-5 h-5" />, color: "text-brand-600", bgColor: "bg-brand-100" },
  completed: { label: "Hoàn thành", icon: <CheckCircle className="w-5 h-5" />, color: "text-green-600", bgColor: "bg-green-100" },
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

  const getStepIndex = (status: string) => statusSteps.indexOf(status);

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-brand-100 rounded-2xl flex items-center justify-center">
              <Package className="w-8 h-8 text-brand-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              Tra cứu đơn hàng
            </h1>
            <p className="text-gray-500 mt-2">
              Nhập số điện thoại để theo dõi trạng thái đơn hàng của bạn
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="flex gap-3 mb-10"
          >
            <div className="relative flex-1">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-sm transition-shadow hover:shadow-md"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="px-8 py-4 h-auto rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-lg shadow-brand-500/20"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Search className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Tìm
                </>
              )}
            </Button>
          </motion.form>

          <AnimatePresence mode="wait">
            {orders !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {orders.length === 0 ? (
                  <Card className="border-dashed border-2">
                    <CardContent className="py-16 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-300" />
                      </div>
                      <p className="text-gray-500 text-lg font-medium">Không tìm thấy đơn hàng nào</p>
                      <p className="text-gray-400 text-sm mt-1">Vui lòng kiểm tra lại số điện thoại</p>
                    </CardContent>
                  </Card>
                ) : (
                  orders.map((order, idx) => {
                    const status = statusMap[order.status] || statusMap.pending;
                    const stepIndex = getStepIndex(order.status);

                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-5">
                              <div>
                                <p className="text-sm text-gray-400">
                                  {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <h3 className="font-semibold text-lg text-gray-900">{order.customerName}</h3>
                              </div>
                              <Badge className={`${status.bgColor} ${status.color} border-0 gap-1.5 px-3 py-1.5`}>
                                {status.icon}
                                {status.label}
                              </Badge>
                            </div>

                            {/* Progress stepper */}
                            <div className="mb-5">
                              <div className="flex items-center justify-between relative">
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 rounded-full" />
                                <div
                                  className="absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 rounded-full transition-all duration-500"
                                  style={{ width: `${(stepIndex / (statusSteps.length - 1)) * 100}%` }}
                                />
                                {statusSteps.map((step, i) => {
                                  const isActive = i <= stepIndex;
                                  const stepInfo = statusMap[step];
                                  return (
                                    <div key={step} className="relative z-10 flex flex-col items-center">
                                      <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                          isActive
                                            ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                                            : "bg-gray-100 text-gray-400"
                                        }`}
                                      >
                                        <span className="text-xs">{i + 1}</span>
                                      </div>
                                      <span className={`text-[10px] mt-1.5 font-medium ${isActive ? "text-brand-600" : "text-gray-400"}`}>
                                        {stepInfo.label.split(" ").pop()}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Order items */}
                            <div className="space-y-2 border-t border-gray-100 pt-4">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm py-1">
                                  <span className="text-gray-600">
                                    {item.product.name}
                                    <span className="text-gray-400 ml-1">(Size {item.size})</span>
                                  </span>
                                  <span className="text-gray-500 font-medium">x{item.quantity}</span>
                                </div>
                              ))}
                            </div>

                            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                              <span className="text-sm text-gray-500">Tổng cộng</span>
                              <span className="text-lg font-bold text-brand-600">{formatPrice(order.total)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}

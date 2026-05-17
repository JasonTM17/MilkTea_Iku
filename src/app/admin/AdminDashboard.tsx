"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package, ShoppingCart, DollarSign, TrendingUp,
  Clock, CheckCircle, Truck, ChefHat, Eye, Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  product: { name: string };
  quantity: number;
  size: string;
  subtotal: number;
}

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string | null;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

interface AdminDashboardProps {
  stats: { products: number; orders: number; revenue: number };
  recentOrders: Order[];
}

const statusOptions = ["pending", "confirmed", "preparing", "delivering", "completed"];
const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bgColor: string }> = {
  pending: { label: "Chờ xác nhận", icon: <Clock className="w-4 h-4" />, color: "text-yellow-700", bgColor: "bg-yellow-100" },
  confirmed: { label: "Đã xác nhận", icon: <CheckCircle className="w-4 h-4" />, color: "text-blue-700", bgColor: "bg-blue-100" },
  preparing: { label: "Đang pha chế", icon: <ChefHat className="w-4 h-4" />, color: "text-purple-700", bgColor: "bg-purple-100" },
  delivering: { label: "Đang giao", icon: <Truck className="w-4 h-4" />, color: "text-orange-700", bgColor: "bg-orange-100" },
  completed: { label: "Hoàn thành", icon: <CheckCircle className="w-4 h-4" />, color: "text-green-700", bgColor: "bg-green-100" },
};

export default function AdminDashboard({ stats, recentOrders }: AdminDashboardProps) {
  const [orders, setOrders] = useState(recentOrders);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  const updateStatus = async (orderId: string, newStatus: string) => {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = filterStatus === "all"
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  const statCards = [
    { label: "Sản phẩm", value: stats.products.toString(), icon: Package, color: "text-brand-600", bg: "bg-brand-100", trend: "+3 tuần này" },
    { label: "Đơn hàng", value: stats.orders.toString(), icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-100", trend: "+12 hôm nay" },
    { label: "Doanh thu", value: formatPrice(stats.revenue), icon: DollarSign, color: "text-green-600", bg: "bg-green-100", trend: "+18% so với tuần trước" },
    { label: "Tỷ lệ hoàn thành", value: "94%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100", trend: "Tốt" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Admin Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Quản lý đơn hàng MilkTea Iku</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-0 gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Đang hoạt động
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
                  <p className="text-xs text-green-600 mt-2 font-medium">{stat.trend}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Orders Section */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Đơn hàng gần đây</CardTitle>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                >
                  <option value="all">Tất cả ({orders.length})</option>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {statusConfig[s].label} ({orders.filter((o) => o.status === s).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p>Không có đơn hàng nào</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status] || statusConfig.pending;
                  const isExpanded = expandedOrder === order.id;

                  return (
                    <div key={order.id} className="px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 dark:text-gray-50">{order.customerName}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{order.phone}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {new Date(order.createdAt).toLocaleString("vi-VN")}
                              {order.address && ` • ${order.address}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-brand-600">{formatPrice(order.total)}</span>
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className={`text-sm border-0 rounded-lg px-3 py-1.5 font-medium ${status.bgColor} ${status.color} focus:outline-none focus:ring-2 focus:ring-brand-500/20`}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {statusConfig[s].label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 ml-12 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Chi tiết đơn hàng:</p>
                          <div className="space-y-1.5">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">
                                  {item.product.name} (Size {item.size}) x{item.quantity}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400">{formatPrice(item.subtotal)}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

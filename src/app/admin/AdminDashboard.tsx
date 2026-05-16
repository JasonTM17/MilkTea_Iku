"use client";

import { useState } from "react";
import { Package, ShoppingCart, DollarSign, Clock, CheckCircle, Truck } from "lucide-react";

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

export default function AdminDashboard({ stats, recentOrders }: AdminDashboardProps) {
  const [orders, setOrders] = useState(recentOrders);

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

  const statusOptions = ["pending", "confirmed", "preparing", "delivering", "completed"];
  const statusLabels: Record<string, string> = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    preparing: "Đang pha chế",
    delivering: "Đang giao",
    completed: "Hoàn thành",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý đơn hàng MilkTea Iku</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sản phẩm</p>
                <p className="text-2xl font-bold">{stats.products}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Đơn hàng</p>
                <p className="text-2xl font-bold">{stats.orders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Doanh thu</p>
                <p className="text-2xl font-bold">{formatPrice(stats.revenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="font-semibold text-gray-900">Đơn hàng gần đây</h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Chưa có đơn hàng nào
            </div>
          ) : (
            <div className="divide-y">
              {orders.map((order) => (
                <div key={order.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium">{order.customerName}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-sm text-gray-500">{order.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString("vi-VN")}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {statusLabels[s]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {order.items.map((item, i) => (
                        <span key={i}>
                          {item.product.name} x{item.quantity}
                          {i < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    <span className="font-semibold text-brand-600">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

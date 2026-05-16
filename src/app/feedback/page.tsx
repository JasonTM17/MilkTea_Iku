"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Camera, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="pt-20 min-h-screen bg-cream-50">
        <section className="bg-gradient-to-b from-cream-100 to-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4"
            >
              Góp ý & Đánh giá
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg"
            >
              Ý kiến của bạn giúp chúng tôi phục vụ tốt hơn mỗi ngày
            </motion.p>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 py-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-10"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                <Star className="w-9 h-9 text-yellow-400 fill-yellow-400" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Cảm ơn bạn!
              </h2>
              <p className="text-gray-500 mb-6">
                Phản hồi của bạn đã được ghi nhận. Chúng tôi sẽ cải thiện dịch vụ dựa trên ý kiến quý báu này.
              </p>
              <button
                onClick={() => { setSubmitted(false); setRating(0); setFeedback(""); }}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
              >
                Gửi thêm góp ý
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6"
            >
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 mb-3">Đánh giá trải nghiệm của bạn</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Danh mục</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                >
                  <option value="">Chọn danh mục</option>
                  <option value="product">Chất lượng sản phẩm</option>
                  <option value="service">Dịch vụ khách hàng</option>
                  <option value="delivery">Giao hàng</option>
                  <option value="app">Ứng dụng / Website</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ tên</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="Tên của bạn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nội dung góp ý</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none"
                  placeholder="Chia sẻ trải nghiệm của bạn với Iku..."
                />
              </div>

              <button
                type="submit"
                disabled={!rating || !feedback}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
              >
                <Send className="w-4 h-4" />
                Gửi đánh giá
              </button>
            </motion.form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

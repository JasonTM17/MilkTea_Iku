"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const subjects = [
  "Góp ý về sản phẩm",
  "Vấn đề đặt hàng",
  "Vấn đề giao hàng",
  "Thanh toán & hoàn tiền",
  "Hợp tác kinh doanh",
  "Đặt hàng số lượng lớn",
  "Khác",
];

const contactInfo = [
  {
    icon: MapPin,
    label: "Địa chỉ",
    lines: ["123 Nguyễn Huệ, Quận 1", "TP. Hồ Chí Minh, Việt Nam"],
  },
  {
    icon: Phone,
    label: "Điện thoại",
    lines: ["1800-IKU (miễn phí)", "028 3822 1234"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["hello@milkteaiku.vn", "event@milkteaiku.vn"],
  },
  {
    icon: Clock,
    label: "Giờ làm việc",
    lines: ["Thứ 2 – Chủ nhật", "07:00 – 22:00"],
  },
];

const socials = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/milkteaiku",
    color: "hover:text-blue-600",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/milkteaiku",
    color: "hover:text-pink-500",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com/@milkteaiku",
    color: "hover:text-red-500",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Vui lòng nhập họ tên.";
  if (!form.email.trim()) {
    errors.email = "Vui lòng nhập email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Email không hợp lệ.";
  }
  if (form.phone && !/^[0-9+\s\-()]{7,15}$/.test(form.phone)) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }
  if (!form.subject) errors.subject = "Vui lòng chọn chủ đề.";
  if (!form.message.trim()) errors.message = "Vui lòng nhập nội dung.";
  else if (form.message.trim().length < 20)
    errors.message = "Nội dung cần ít nhất 20 ký tự.";
  return errors;
}

export default function ContactContent() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  }

  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all";
  const inputNormal = `${inputBase} border-cream-200 focus:ring-brand-300 focus:border-brand-400`;
  const inputError = `${inputBase} border-red-300 focus:ring-red-200 focus:border-red-400`;

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-cream-100 to-cream-50 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-6"
          >
            Chúng tôi lắng nghe bạn
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
          >
            Liên hệ với{" "}
            <span className="text-brand-600">MilkTea Iku</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Có câu hỏi, góp ý hay muốn hợp tác? Đội ngũ của chúng tôi luôn
            sẵn sàng hỗ trợ bạn trong thời gian sớm nhất.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl shadow-sm border border-cream-100 p-8 md:p-10">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  Gửi tin nhắn
                </h2>
                <p className="text-gray-500 mb-8">
                  Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong vòng 24
                  giờ.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                        }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle size={40} className="text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                        Gửi thành công!
                      </h3>
                      <p className="text-gray-500 max-w-sm">
                        Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi qua email{" "}
                        <span className="font-medium text-brand-600">
                          {form.email}
                        </span>{" "}
                        trong vòng 24 giờ.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            name: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        className="mt-8 px-6 py-2.5 rounded-full border border-brand-300 text-brand-600 hover:bg-brand-50 transition-colors text-sm font-medium"
                      >
                        Gửi tin nhắn khác
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      {/* Name + Email */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Họ và tên <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nguyễn Văn A"
                            className={errors.name ? inputError : inputNormal}
                          />
                          {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="ban@email.com"
                            className={errors.email ? inputError : inputNormal}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone + Subject */}
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Số điện thoại
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="0901 234 567"
                            className={errors.phone ? inputError : inputNormal}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Chủ đề <span className="text-red-400">*</span>
                          </label>
                          <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className={`${errors.subject ? inputError : inputNormal} appearance-none cursor-pointer`}
                          >
                            <option value="">Chọn chủ đề...</option>
                            {subjects.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {errors.subject && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.subject}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Nội dung <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                          className={`${errors.message ? inputError : inputNormal} resize-none`}
                        />
                        <div className="flex justify-between mt-1">
                          {errors.message ? (
                            <p className="text-xs text-red-500">
                              {errors.message}
                            </p>
                          ) : (
                            <span />
                          )}
                          <span className="text-xs text-gray-400">
                            {form.message.length} ký tự
                          </span>
                        </div>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                      >
                        {loading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                            />
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Gửi tin nhắn
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Side panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact info cards */}
              <div className="bg-white rounded-3xl shadow-sm border border-cream-100 p-8">
                <h3 className="text-lg font-display font-bold text-gray-900 mb-6">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-5">
                  {contactInfo.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                        <item.icon size={18} className="text-brand-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        {item.lines.map((line) => (
                          <p key={line} className="text-gray-700 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social links */}
                <div className="mt-8 pt-6 border-t border-cream-100">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
                    Mạng xã hội
                  </p>
                  <div className="flex gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`w-10 h-10 bg-cream-50 rounded-xl flex items-center justify-center text-gray-500 ${s.color} hover:bg-cream-100 transition-all`}
                      >
                        <s.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-3xl overflow-hidden border border-cream-100 shadow-sm"
              >
                <div className="relative h-56 bg-gradient-to-br from-cream-100 to-brand-50 flex flex-col items-center justify-center gap-3">
                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(#d4a96a 1px, transparent 1px), linear-gradient(90deg, #d4a96a 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="relative z-10 w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin size={22} className="text-white" />
                  </div>
                  <div className="relative z-10 text-center">
                    <p className="font-semibold text-gray-800 text-sm">
                      123 Nguyễn Huệ, Quận 1
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      TP. Hồ Chí Minh
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-1 px-4 py-1.5 bg-white rounded-full text-xs font-medium text-brand-600 shadow hover:shadow-md transition-shadow"
                  >
                    Xem trên Google Maps
                  </a>
                </div>
              </motion.div>

              {/* Quick response note */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-brand-50 rounded-2xl p-5 flex gap-4 items-start"
              >
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">
                    Phản hồi nhanh
                  </p>
                  <p className="text-gray-500 text-sm">
                    Thời gian phản hồi trung bình của chúng tôi là{" "}
                    <span className="font-medium text-brand-700">
                      dưới 2 giờ
                    </span>{" "}
                    trong giờ làm việc.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

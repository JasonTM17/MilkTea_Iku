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
  "GÃ³p Ã½ vá» sáº£n pháº©m",
  "Váº¥n Ä‘á» Ä‘áº·t hÃ ng",
  "Váº¥n Ä‘á» giao hÃ ng",
  "Thanh toÃ¡n & hoÃ n tiá»n",
  "Há»£p tÃ¡c kinh doanh",
  "Äáº·t hÃ ng sá»‘ lÆ°á»£ng lá»›n",
  "KhÃ¡c",
];

const contactInfo = [
  {
    icon: MapPin,
    label: "Äá»‹a chá»‰",
    lines: ["123 Nguyá»…n Huá»‡, Quáº­n 1", "TP. Há»“ ChÃ­ Minh, Viá»‡t Nam"],
  },
  {
    icon: Phone,
    label: "Äiá»‡n thoáº¡i",
    lines: ["1800-IKU (miá»…n phÃ­)", "028 3822 1234"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["hello@milkteaiku.vn", "event@milkteaiku.vn"],
  },
  {
    icon: Clock,
    label: "Giá» lÃ m viá»‡c",
    lines: ["Thá»© 2 â€“ Chá»§ nháº­t", "07:00 â€“ 22:00"],
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
  if (!form.name.trim()) errors.name = "Vui lÃ²ng nháº­p há» tÃªn.";
  if (!form.email.trim()) {
    errors.email = "Vui lÃ²ng nháº­p email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Email khÃ´ng há»£p lá»‡.";
  }
  if (form.phone && !/^[0-9+\s\-()]{7,15}$/.test(form.phone)) {
    errors.phone = "Sá»‘ Ä‘iá»‡n thoáº¡i khÃ´ng há»£p lá»‡.";
  }
  if (!form.subject) errors.subject = "Vui lÃ²ng chá»n chá»§ Ä‘á».";
  if (!form.message.trim()) errors.message = "Vui lÃ²ng nháº­p ná»™i dung.";
  else if (form.message.trim().length < 20)
    errors.message = "Ná»™i dung cáº§n Ã­t nháº¥t 20 kÃ½ tá»±.";
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
    "w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all";
  const inputNormal = `${inputBase} border-cream-200 dark:border-gray-600 focus:ring-brand-300 focus:border-brand-400`;
  const inputError = `${inputBase} border-red-300 focus:ring-red-200 focus:border-red-400`;

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-cream-100 dark:from-gray-800 to-cream-50 dark:to-gray-900 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-6"
          >
            ChÃºng tÃ´i láº¯ng nghe báº¡n
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-gray-50 mb-6"
          >
            LiÃªn há»‡ vá»›i{" "}
            <span className="text-brand-600">MilkTea Iku</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            CÃ³ cÃ¢u há»i, gÃ³p Ã½ hay muá»‘n há»£p tÃ¡c? Äá»™i ngÅ© cá»§a chÃºng tÃ´i luÃ´n
            sáºµn sÃ ng há»— trá»£ báº¡n trong thá»i gian sá»›m nháº¥t.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-cream-100 dark:border-gray-700 p-8 md:p-10">
                <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
                  Gá»­i tin nháº¯n
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Äiá»n thÃ´ng tin bÃªn dÆ°á»›i, chÃºng tÃ´i sáº½ pháº£n há»“i trong vÃ²ng 24
                  giá».
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
                      <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-50 mb-3">
                        Gá»­i thÃ nh cÃ´ng!
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Cáº£m Æ¡n báº¡n Ä‘Ã£ liÃªn há»‡. ChÃºng tÃ´i sáº½ pháº£n há»“i qua email{" "}
                        <span className="font-medium text-brand-600">
                          {form.email}
                        </span>{" "}
                        trong vÃ²ng 24 giá».
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
                        Gá»­i tin nháº¯n khÃ¡c
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
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Há» vÃ  tÃªn <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nguyá»…n VÄƒn A"
                            className={errors.name ? inputError : inputNormal}
                          />
                          {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
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
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Sá»‘ Ä‘iá»‡n thoáº¡i
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
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Chá»§ Ä‘á» <span className="text-red-400">*</span>
                          </label>
                          <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className={`${errors.subject ? inputError : inputNormal} appearance-none cursor-pointer`}
                          >
                            <option value="">Chá»n chá»§ Ä‘á»...</option>
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Ná»™i dung <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="MÃ´ táº£ chi tiáº¿t váº¥n Ä‘á» hoáº·c cÃ¢u há»i cá»§a báº¡n..."
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
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {form.message.length} kÃ½ tá»±
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
                            Äang gá»­i...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Gá»­i tin nháº¯n
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
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-cream-100 dark:border-gray-700 p-8">
                <h3 className="text-lg font-display font-bold text-gray-900 dark:text-gray-50 mb-6">
                  ThÃ´ng tin liÃªn há»‡
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
                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        {item.lines.map((line) => (
                          <p key={line} className="text-gray-700 dark:text-gray-200 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social links */}
                <div className="mt-8 pt-6 border-t border-cream-100 dark:border-gray-700">
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-4">
                    Máº¡ng xÃ£ há»™i
                  </p>
                  <div className="flex gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`w-10 h-10 bg-cream-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 ${s.color} hover:bg-cream-100 dark:hover:bg-gray-600 transition-all`}
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
                className="rounded-3xl overflow-hidden border border-cream-100 dark:border-gray-700 shadow-sm"
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
                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                      123 Nguyá»…n Huá»‡, Quáº­n 1
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      TP. Há»“ ChÃ­ Minh
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-1 px-4 py-1.5 bg-white rounded-full text-xs font-medium text-brand-600 shadow hover:shadow-md transition-shadow"
                  >
                    Xem trÃªn Google Maps
                  </a>
                </div>
              </motion.div>

              {/* Quick response note */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-5 flex gap-4 items-start"
              >
                <svg className="w-6 h-6 text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">
                    Pháº£n há»“i nhanh
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Thá»i gian pháº£n há»“i trung bÃ¬nh cá»§a chÃºng tÃ´i lÃ {" "}
                    <span className="font-medium text-brand-700">
                      dÆ°á»›i 2 giá»
                    </span>{" "}
                    trong giá» lÃ m viá»‡c.
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


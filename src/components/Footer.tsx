import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">I</span>
              </div>
              <span className="font-display text-xl font-bold">Iku</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Thương hiệu trà sữa premium với nguyên liệu tươi ngon, mang đến
              trải nghiệm thưởng thức đẳng cấp.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/menu?category=tra-sua-truyen-thong" className="hover:text-brand-400 transition-colors">Trà Sữa</Link></li>
              <li><Link href="/menu?category=tra-trai-cay" className="hover:text-brand-400 transition-colors">Trà Trái Cây</Link></li>
              <li><Link href="/menu?category=dac-biet" className="hover:text-brand-400 transition-colors">Đặc Biệt</Link></li>
              <li><Link href="/menu?category=tra-xanh-matcha" className="hover:text-brand-400 transition-colors">Matcha</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Về Iku</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-brand-400 transition-colors">Câu chuyện</Link></li>
              <li><Link href="/about" className="hover:text-brand-400 transition-colors">Nguyên liệu</Link></li>
              <li><Link href="/about" className="hover:text-brand-400 transition-colors">Tuyển dụng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 123 Nguyễn Huệ, Q.1, TP.HCM</li>
              <li>📞 1900 1234</li>
              <li>✉️ hello@milktea-iku.vn</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© 2024 MilkTea Iku. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

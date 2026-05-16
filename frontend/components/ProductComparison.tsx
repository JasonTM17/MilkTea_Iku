"use client";

import { Check, X, Minus } from "lucide-react";

interface Product {
  name: string;
  price: number;
  sizes: string[];
  sugarLevels: string[];
  toppings: string[];
  calories: number;
  isNew?: boolean;
}

interface ProductComparisonProps {
  productA: Product;
  productB: Product;
}

const defaultA: Product = {
  name: "Trà Sữa Truyền Thống",
  price: 45000,
  sizes: ["S", "M", "L"],
  sugarLevels: ["0%", "30%", "50%", "70%", "100%"],
  toppings: ["Trân châu đen", "Thạch dừa", "Pudding"],
  calories: 280,
};

const defaultB: Product = {
  name: "Matcha Latte Premium",
  price: 65000,
  sizes: ["M", "L"],
  sugarLevels: ["0%", "50%", "100%"],
  toppings: ["Trân châu trắng", "Thạch matcha", "Kem cheese"],
  calories: 320,
  isNew: true,
};

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

function DiffCell({
  valueA,
  valueB,
  render,
}: {
  valueA: unknown;
  valueB: unknown;
  render: (v: unknown) => React.ReactNode;
}) {
  const isDiff = JSON.stringify(valueA) !== JSON.stringify(valueB);
  return isDiff ? (
    <span className="font-semibold text-brand-600 dark:text-brand-400">
      {render(valueA)}
    </span>
  ) : (
    <span>{render(valueA)}</span>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {items.map((item) => (
        <span
          key={item}
          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function ProductComparison({
  productA = defaultA,
  productB = defaultB,
}: Partial<ProductComparisonProps>) {
  const rows = [
    {
      label: "Giá",
      a: formatPrice(productA.price),
      b: formatPrice(productB.price),
      diff: productA.price !== productB.price,
    },
    {
      label: "Calo",
      a: `${productA.calories} kcal`,
      b: `${productB.calories} kcal`,
      diff: productA.calories !== productB.calories,
    },
    {
      label: "Kích cỡ",
      a: <TagList items={productA.sizes} />,
      b: <TagList items={productB.sizes} />,
      diff: JSON.stringify(productA.sizes) !== JSON.stringify(productB.sizes),
    },
    {
      label: "Độ ngọt",
      a: <TagList items={productA.sugarLevels} />,
      b: <TagList items={productB.sugarLevels} />,
      diff:
        JSON.stringify(productA.sugarLevels) !==
        JSON.stringify(productB.sugarLevels),
    },
    {
      label: "Topping",
      a: <TagList items={productA.toppings} />,
      b: <TagList items={productB.toppings} />,
      diff:
        JSON.stringify(productA.toppings) !==
        JSON.stringify(productB.toppings),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden max-w-2xl w-full">
      {/* Header */}
      <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-900">
        <div className="p-4" />
        {[productA, productB].map((p, i) => (
          <div
            key={i}
            className={`p-4 text-center border-l border-gray-200 dark:border-gray-700 ${
              i === 1 ? "bg-brand-50 dark:bg-brand-900/20" : ""
            }`}
          >
            {p.isNew && (
              <span className="inline-block text-[10px] font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full mb-1">
                MỚI
              </span>
            )}
            <p className="font-display font-bold text-gray-900 dark:text-white text-sm leading-tight">
              {p.name}
            </p>
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, idx) => (
        <div
          key={row.label}
          className={`grid grid-cols-3 border-t border-gray-100 dark:border-gray-700 ${
            idx % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-gray-900/30"
          }`}
        >
          <div className="p-3 flex items-center">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {row.label}
            </span>
          </div>
          {[row.a, row.b].map((val, i) => (
            <div
              key={i}
              className={`p-3 text-center text-sm text-gray-700 dark:text-gray-300 border-l border-gray-100 dark:border-gray-700 flex items-center justify-center ${
                row.diff
                  ? i === 0
                    ? "text-gray-700 dark:text-gray-300"
                    : "font-semibold text-brand-600 dark:text-brand-400"
                  : ""
              }`}
            >
              {val}
            </div>
          ))}
        </div>
      ))}

      {/* Footer note */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          <span className="inline-flex items-center gap-1 text-brand-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-500 inline-block" />
            Màu xanh
          </span>{" "}
          đánh dấu điểm khác biệt giữa hai sản phẩm
        </p>
      </div>
    </div>
  );
}

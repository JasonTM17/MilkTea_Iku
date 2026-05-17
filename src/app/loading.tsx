export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-brand-200 dark:border-brand-900" />
          <div className="absolute inset-0 rounded-full border-4 border-brand-600 dark:border-brand-400 border-t-transparent animate-spin" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm animate-pulse">Đang tải...</p>
      </div>
    </div>
  );
}

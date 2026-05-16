import Header from "@/components/Header";
import MenuSkeleton from "@/components/MenuSkeleton";

export default function MenuLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-cream-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page heading skeleton */}
          <div className="mb-10 space-y-3">
            <div className="h-9 w-48 rounded-full bg-cream-200 animate-pulse" />
            <div className="h-4 w-72 rounded-full bg-cream-100 animate-pulse" />
          </div>

          <MenuSkeleton />
        </div>
      </main>
    </>
  );
}

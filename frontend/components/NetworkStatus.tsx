"use client";

import { useEffect, useState } from "react";

interface NetworkStatusProps {
  children: React.ReactNode;
}

export function NetworkStatus({ children }: NetworkStatusProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-amber-500 text-white text-center py-2 text-sm font-medium">
          Bạn đang offline. Một số tính năng có thể không hoạt động.
        </div>
      )}
      {children}
    </>
  );
}

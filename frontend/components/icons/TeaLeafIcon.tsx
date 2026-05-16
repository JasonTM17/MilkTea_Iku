export default function TeaLeafIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 56c-12-8-20-20-16-36C20 8 44 8 48 20c4 16-4 28-16 36z" fill="currentColor" opacity="0.2" />
      <path d="M32 56c-12-8-20-20-16-36C20 8 44 8 48 20c4 16-4 28-16 36z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 20v36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 28c4-2 8-1 10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 36c-4-2-7-1-9 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

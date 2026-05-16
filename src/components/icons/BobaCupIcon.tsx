export default function BobaCupIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 16h24l-3 40H23L20 16z" fill="currentColor" opacity="0.2" />
      <path d="M20 16h24l-3 40H23L20 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 12h28a2 2 0 012 2v2H16v-2a2 2 0 012-2z" fill="currentColor" opacity="0.3" />
      <path d="M32 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="44" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="34" cy="38" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="30" cy="50" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="36" cy="46" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

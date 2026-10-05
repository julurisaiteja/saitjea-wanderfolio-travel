"use client";

export function IconStar({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.2 1 5.8L12 16.9 6.8 19.7l1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
    </svg>
  );
}

export function IconChevron({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCart({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h2l2.2 11h10.4L21 7H7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChat({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClose({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function IconRotateLeft({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 4H5v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8a8 8 0 108-8" strokeLinecap="round" />
    </svg>
  );
}

export function IconRotateRight({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 4h4v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 8a8 8 0 11-8-8" strokeLinecap="round" />
    </svg>
  );
}

export function IconPause({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function IconPlay({ className = "icon-svg" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M8 5l12 7-12 7V5z" />
    </svg>
  );
}

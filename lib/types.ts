export type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviewCount: number;
  specs: [string, string][];
  variants: string[];
  faq: { q: string; a: string }[];
};

export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  niche: string;
  mode: "cart" | "booking" | "civic";
  layout: string;
  fonts: { display: string; body: string };
  colors: Record<string, string>;
  heroImage: string;
  heroVideo: string;
  categories: string[];
  labels: Record<string, string>;
  dark: boolean;
};

export type CartItem = Product & { qty: number; variant?: string };

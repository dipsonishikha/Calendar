// ─── Calendar hook ─────────────────────────────────────────
export const useCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const dates: (Date | null)[] = [];

  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let i = 1; i <= totalDays; i++) {
    dates.push(new Date(year, month, i));
  }

  return dates;
};
// ─── Quote Type + Data ─────────────────────
export interface Quote {
  text: string;
  author: string;
  src?: string;
}

export const QUOTES: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
];
// ─── Theme System ──────────────────────────
export type ThemeName = "default" | "lofi" | "minimalist" | "cyberpunk";

export interface ThemeConfig {
  accent: string;
  pageBg: string;
  cardBg: string;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  default: {
    accent: "#6c5ce7",
    pageBg: "from-gray-100 to-gray-200",
    cardBg: "bg-white/90",
  },
  lofi: {
    accent: "#b5838d",
    pageBg: "from-rose-50 to-orange-50",
    cardBg: "bg-rose-50/90",
  },
  minimalist: {
    accent: "#2d3436",
    pageBg: "from-gray-50 to-gray-100",
    cardBg: "bg-white/95",
  },
  cyberpunk: {
    accent: "#00f5ff",
    pageBg: "from-black to-gray-900",
    cardBg: "bg-black/90",
  },
};

// ─── Month Images ─────────────────────────────────────────
export const MONTH_IMAGES: Record<number, string> = {
  0:  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2000",
  1:  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2400",
  2:  "https://wallpapersok.com/images/high/ash-and-electric-pikachu-cool-pokemon-6cyvh7vr4o3q2k1a.jpg",
  3:  "https://wallpapers-clan.com/wp-content/uploads/2024/09/pokemon-pikachu-happy-love-hearts-kawaii-desktop-wallpaper-preview.jpg",
  4:  "https://wallpapers.com/images/featured/crayon-shin-chan-wgwthaxe7fb8qc7k.jpg",
  5:  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2400",
  6:  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2400",
  7:  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2400",
  8:  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000",
  9:  "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800&q=80",
  10: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=800&q=80",
  11: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800&q=80",
};

// ─── Indian Holidays ──────────────────────────────────────
export const INDIAN_HOLIDAYS: Record<string, string> = {
  "1-14":  "Makar Sankranti",
  "1-26":  "Republic Day",
  "3-17":  "Holi",
  "3-30":  "Eid ul-Fitr",
  "4-2":   "Ram Navami",
  "4-14":  "Dr. Ambedkar Jayanti",
  "4-18":  "Good Friday",
  "5-8":   "Buddha Purnima",
  "6-7":   "Eid ul-Adha",
  "8-15":  "Independence Day",
  "9-10":  "Ganesh Chaturthi",
  "10-2":  "Gandhi Jayanti",
  "10-20": "Dussehra",
  "11-1":  "Diwali",
  "11-27": "Guru Nanak Jayanti",
  "12-25": "Christmas",
};

// ─── Theme Types ──────────────────────────────────────────


// ─── Quote Type (required by QuotePanel) ──────────────────
export interface Quote {
  text: string;
  author: string;
  src?: string;
}
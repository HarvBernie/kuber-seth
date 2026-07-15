import rationKitsImg from "./assets/ration-kits.jpg";
import streetChildrenImg from "./assets/street-childrens-day.jpg";
import poetryPotteryImg from "./assets/poetry-pottery.jpg";
import previousWorkImg from "./assets/previous-work.jpg";
import aboutImg from "./assets/about.jpg";
import volunteersImg from "./assets/volunteers.jpg";
import founderImg from "./assets/founder.jpg";

export const ABOUT_IMAGE = aboutImg;
export const VOLUNTEERS_IMAGE = volunteersImg;

export const FOUNDATION = {
  name: "Kuber Seth Foundation",
  shortName: "KSF",
  tagline: "Relief is our belief.",
  address: "Gole Market, Karan Nagar, Srinagar",
  email: "kuberseth.foundation@gmail.com",
  yearsActive: "1+",
  socials: {
    instagram: "https://www.instagram.com/kuberseth.foundation/",
    facebook: "",
    twitter: "",
    linkedin: "",
  },
} as const;

export const UPI = {
  vpa: "JKBMERC00655512@jkb",
  payeeName: "JKBANK MERCHANT",
  merchantCode: "",
  refBase: "TERM00655512",
  currency: "INR",
};

export function buildUpiString(initiativeId: string, initiativeTitle: string, amount?: number): string {
  const params = new URLSearchParams({
    pa: UPI.vpa,
    pn: UPI.payeeName,
    mc: UPI.merchantCode,
    tr: `${UPI.refBase}-${initiativeId}`.slice(0, 35),
    tn: `Donation: ${initiativeTitle}`,
    cu: UPI.currency,
  });
  if (amount && amount > 0) params.set("am", String(amount));
  return `upi://pay?${params.toString()}`;
}

export const SUGGESTED_AMOUNTS: number[] = [201, 501, 1100, 2100];

export const EMAILJS = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  donorReceiptTemplateId: "YOUR_DONOR_RECEIPT_TEMPLATE_ID",
  foundationNotifyTemplateId: "YOUR_FOUNDATION_NOTIFY_TEMPLATE_ID",
};

export const isEmailConfigured = (): boolean =>
  !Object.values(EMAILJS).some((v) => v.startsWith("YOUR_"));

export const VOLUNTEER_FORM_URL = "YOUR_GOOGLE_FORM_EMBED_URL";
export const isVolunteerFormConfigured = (): boolean => VOLUNTEER_FORM_URL.startsWith("http");

export const LEADERBOARD_CSV_URL = "YOUR_PUBLISHED_SHEET_CSV_URL";
export const isLeaderboardConfigured = (): boolean => LEADERBOARD_CSV_URL.startsWith("http");

export const LEADERBOARD_TOP_N = 10;

export const POINTS_GUIDE: { action: string; points: string }[] = [
  { action: "Attend a ground initiative", points: "+100" },
  { action: "Upload verified proof of work", points: "+150" },
  { action: "Bring a new volunteer", points: "+200" },
  { action: "Lead / organise an event", points: "+500" },
];

export interface Volunteer {
  name: string;
  points: number;
  badges: string[];
  proof?: string;
}

export const LEADERBOARD_FALLBACK: Volunteer[] = [
  { name: "Aariz Mir", points: 4500, badges: ["Winter Vanguard", "MVP"], proof: previousWorkImg },
  { name: "Sana Bhat", points: 3800, badges: ["Taleem Tutor", "Gold"], proof: streetChildrenImg },
  { name: "Imran Wani", points: 2450, badges: ["Silver"], proof: poetryPotteryImg },
  { name: "Zoya Khan", points: 1200, badges: ["Logistics"], proof: rationKitsImg },
];

export const IMPACT_STATS = {
  volunteers: "12+",
  points: "12.5k+",
};

export interface Initiative {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
}

export const INITIATIVES: Initiative[] = [
  {
    id: "ration-kits",
    title: "Ration Kits Distribution",
    description: "Monthly grocery kits for marginalized families facing food insecurity.",
    longDescription:
      "Food security is a basic right. Our Ration Kits initiative provides essential groceries to families struggling to make ends meet, delivered with dignity and consistency.",
    image: rationKitsImg,
  },
  {
    id: "street-childrens-day",
    title: "Street Children's Day",
    description: "Joy, education, and health activities for children living on the streets.",
    longDescription:
      "A dedicated initiative spent with street children — organising educational activities, health check-ups, and providing basic necessities to bring a smile to their faces.",
    image: streetChildrenImg,
  },
  {
    id: "poetry-x-pottery",
    title: "Poetry X Pottery Session",
    description: "Therapeutic creative sessions combining the art of words and clay.",
    longDescription:
      "An innovative therapeutic session bringing together the calming art of pottery with expressive poetry — designed to help individuals find peace and community support.",
    image: poetryPotteryImg,
  },
  {
    id: "previous-work",
    title: "Previous Work",
    description: "A look back at our past initiatives and the impact created together.",
    longDescription:
      "We have continuously worked for the betterment of society through various campaigns. Discover the stories, the people we've helped, and the milestones achieved by our volunteers.",
    image: previousWorkImg,
  },
];

export const FOUNDER = {
  name: "Kuber Seth",
  role: "Founder",
  quote: "We don't just provide aid; we rebuild agency in the shadow of the mountains.",
  portrait: founderImg,
};

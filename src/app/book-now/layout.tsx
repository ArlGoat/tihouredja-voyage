import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Tour | Sahara Desert Expeditions",
  description: "Check our upcoming departure dates and book your Sahara desert expedition in Algeria. Transparent pricing and secure booking.",
};

export default function BookNowLayout({ children }: { children: React.ReactNode }) {
  return children;
}

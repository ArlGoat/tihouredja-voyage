import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réservez Votre Voyage | Tihouredja Voyage",
  description: "Consultez nos dates de départ et réservez votre expédition dans le Sahara algérien. Prix transparents et réservation sécurisée.",
};

export default function BookNowFrLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { Metadata } from "next";
import { HomeContent } from "@/components/content/home-content";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Tripzy is a platform for booking flights, hotels, and buses.",
};

export default function Home() {
  return <HomeContent />;
}

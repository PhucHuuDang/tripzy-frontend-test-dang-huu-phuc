import { Metadata } from "next";
import { HomeContent } from "@/components/content/home-content";

export const metadata: Metadata = {
  title: "Home Page",
};

export default function Home() {
  return <HomeContent />;
}

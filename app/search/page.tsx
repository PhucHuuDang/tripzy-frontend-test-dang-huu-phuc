import { SearchContent } from "@/components/content/search-content";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for a flight, hotel, or bus",
};

const SearchPage = () => {
  return <SearchContent />;
};

export default SearchPage;

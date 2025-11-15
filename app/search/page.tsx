import { SearchContent } from "@/components/content/search-content";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search",
  description: "Search for a flight, hotel, or bus",
};

const SearchPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;

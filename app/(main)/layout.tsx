"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";
import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isHorizontal, setIsHorizontal] = useState(false);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  const isMobile = () => {
    const userAgent = window.navigator.userAgent;
    return /Mobi|Android/i.test(userAgent);
  };

  const isHorizontalOrientation = () => {
    if (Math.abs(screen.orientation.angle) === 90) setIsHorizontal(true);
  };

  screen.orientation.addEventListener("change", isHorizontalOrientation);

  return (
    <>
      {isMobile() && isHorizontal ? (
        <div className="h-full flex dark:bg-[#1F1F1F]">{children}</div>
      ) : (
        <div className="h-full flex dark:bg-[#1F1F1F]">
          <Navigation />
          <main className="flex-1 h-full overflow-y-auto">
            <SearchCommand />
            {children}
          </main>
        </div>
      )}
    </>
  );
};

export default MainLayout;

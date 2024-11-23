"use client";

import { useState, useEffect } from "react";

interface ReasonEntry {
  date: string;
  reason: string;
  desc: string;
}

export default function Home() {
  const [todayEntry, setTodayEntry] = useState<ReasonEntry | null>(null);

  useEffect(() => {
    const fetchReason = async () => {
      try {
        // Load the reasons JSON dynamically
        const response = await fetch("./data.json");
        const reasons: ReasonEntry[] = await response.json();

        // Get today's date in "YYYY-MM-DD" format
        const today = new Date().toISOString().split("T")[0];

        // Find the entry for today
        const entryForToday = reasons.find((item) => item.date === today);

        // Update the state with the found entry or null if not found
        setTodayEntry(entryForToday || null);
      } catch (error) {
        console.error("Error fetching reasons:", error);
      }
    };

    fetchReason();
  }, []);

  return (
    <div className="h-screen w-screen bg-[#25170f] text-[#664a39] flex flex-col font-[family-name:var(--font-geist-sans)] overflow-x-hidden overflow-y-auto lg:overflow-y-hidden">
      <div
        id="top"
        className="w-screen h-[5vh] text-lg tracking-widest font-mono uppercase font-medium antialiased flex items-center pl-8 z-20"
      >
        WhyILoveYouC
      </div>
      <div className="w-screen h-[93vh] z-10 flex flex-col items-start justify-start lg:justify-end p-8 gap-4 pr-24">
        <div
          id="date"
          className="font-mono text-xs p-0.5 px-2 rounded-full w-fit tracking-widest align-middle text-center bg-[#ff6b1a10] text-[#ff6b1a]"
        >
          {todayEntry ? todayEntry.date : "No date found"}
        </div>
        <div
          id="title"
          className=" text-7xl lg:text-9xl leading-none tracking-tight font-medium font-bricolage"
          lang="en"
        >
          {todayEntry ? todayEntry.reason : "No reason found for today."}
        </div>
        <div
          id="desc"
          className="text-xl lg:text-2xl w-full lg:w-3/6 leading-relaxed pt-4"
        >
          {todayEntry ? todayEntry.desc : "No description available."}
        </div>
      </div>
      <div className="h-[2vh] w-screen bg-[#25170f] text-[#7e5841] font-mono text-sm flex items-center justify-center">
        SAGAPO PARA POLI
      </div>
    </div>
  );
}

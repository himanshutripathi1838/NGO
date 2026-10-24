import React from "react";
import AgricultureDashboardCards from "@/components/ui/agriculture-dashboard-cards";

export default function AgricultureDashboardCardsDemo() {
  return (
    <div className="w-full min-h-screen bg-[#f8faf8] p-6 lg:p-10 flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full space-y-6">
        <div>
          <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">Smart Agriculture</span>
          <h2 className="text-2xl font-extrabold text-slate-900">Agriculture Dashboard Overview</h2>
          <p className="text-sm text-slate-500">Modern pastel cards with landscape vector illustrations.</p>
        </div>
        <AgricultureDashboardCards />
      </div>
    </div>
  );
}

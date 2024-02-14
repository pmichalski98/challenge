import React from "react";
import { db } from "@/db/db";
import { day } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as datefns from "date-fns";

interface Params {
  params: {
    id: string;
  };
}
async function Page({ params }: Params) {
  const days = await db.query.day.findMany({
    orderBy: day.date,
  });
  console.log(days.length);
  const now = new Date();
  return (
    <div className={`grid grid-cols-${days.length / 10} w-full h-screen`}>
      {days.map((day) => {
        const isDisabled = datefns.isBefore(day.date!, now);
        return (
          <button
            disabled={!isDisabled}
            className={`flex border border-black items-center justify-center ${isDisabled ? "hover:bg-slate-400" : "bg-gray-400 "}`}
            key={day.id}
          >
            {day.id}
          </button>
        );
      })}
    </div>
  );
}

export default Page;

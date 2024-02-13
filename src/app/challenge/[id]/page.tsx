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
  const days = await db
    .select()
    .from(day)
    .where(eq(day.challengeId, params.id));

  const now = new Date();
  return (
    <div className={`grid grid-cols-${days.length / 10} w-full h-screen`}>
      {days.map((day) => (
        <button
          className={`flex border border-black items-center justify-center ${datefns.isBefore(day.date!, now) ? "" : "bg-gray-400"}`}
          key={day.id}
        >
          {day.id}
        </button>
      ))}
    </div>
  );
}

export default Page;

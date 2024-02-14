import React from "react";
import { db } from "@/db/db";
import { challenge, day } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as datefns from "date-fns";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PropsModal from "@/components/propsModal";

interface Params {
  params: {
    id: string;
  };
}
async function Page({ params }: Params) {
  const days = await db.query.day.findMany({
    orderBy: day.date,
  });
  const chall = await db.query.challenge.findFirst({
    where: eq(challenge?.id, params.id),
    with: {
      props: true,
    },
  });
  if (!chall) return;
  const now = new Date();
  const grid = `grid-cols-${days.length / 10}`;
  return (
    <div className={`grid ${grid} w-full h-screen`}>
      {days.map((day) => {
        const isDisabled = datefns.isBefore(day.date!, now);
        return (
          <Dialog key={day.id}>
            <DialogTrigger
              disabled={!isDisabled}
              className={`flex border border-black items-center justify-center ${isDisabled ? "hover:bg-slate-400" : "bg-gray-400 "}`}
            >
              {day.id}
            </DialogTrigger>
            <PropsModal props={chall.props} />
          </Dialog>
        );
      })}
    </div>
  );
}

export default Page;

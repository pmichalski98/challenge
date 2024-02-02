import React from "react";
import { db } from "@/db/db";
import { challenge } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Params {
  params: {
    id: string;
  };
}
async function Page({ params }: Params) {
  const foundChallenge = await db
    .select()
    .from(challenge)
    .where(eq(challenge.id, params.id));

  return <div>{foundChallenge[0].duration}</div>;
}

export default Page;

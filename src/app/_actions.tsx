"use server";
import { auth } from "@clerk/nextjs";
import { challenge, day, prop, users } from "@/db/schema";
import { db } from "@/db/db";
import { FormSchema } from "@/components/addChallengeForm";
import { redirect } from "next/navigation";
import * as datefns from "date-fns";
export async function createChallenge(formData: FormSchema) {
  const { userId } = auth();
  if (!userId) {
    return "User is not logged in";
  }
  let challengeId;
  try {
    await upsertUser(userId);
    const createdChallenge = await insertChallenge(formData, userId);
    challengeId = createdChallenge[0].id;
    await createProperties(formData, challengeId);
    await createDays(formData, challengeId);
  } catch (e) {
    console.error(e);
    throw Error("Internal server error");
  }
  redirect(`/challenge/${challengeId}`);
}

async function createDays(formData: FormSchema, challengeId: string) {
  for (let i = 1; i <= formData.duration; ++i) {
    const date = datefns.add(new Date(), {
      days: i + 1,
    });
    await db.insert(day).values({
      challengeId,
      status: "not_done",
      id: i,
      date,
    });
  }
}
async function createProperties(formData: FormSchema, challengeId: string) {
  for (const property of formData.properties) {
    await db.insert(prop).values({
      challengeId,
      name: property.property,
    });
  }
}

function upsertUser(userId: string) {
  return db
    .insert(users)
    .values({
      id: userId,
    })
    .onConflictDoNothing();
}

async function insertChallenge(formData: FormSchema, userId: string) {
  return db
    .insert(challenge)
    .values({
      userId,
      duration: formData.duration,
    })
    .returning();
}

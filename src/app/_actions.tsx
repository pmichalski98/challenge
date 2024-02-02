"use server";
import { auth } from "@clerk/nextjs";
import { challenge, prop, users } from "@/db/schema";
import { db } from "@/db/db";
import { FormSchema } from "@/components/addChallengeForm";
import { redirect, useParams } from "next/navigation";

export async function createChallenge(formData: FormSchema) {
  const { userId } = auth();
  if (!userId) {
    return "User is not logged in";
  }
  let challengeId;
  try {
    await db
      .insert(users)
      .values({
        id: userId,
      })
      .onConflictDoNothing();
    const createdChallenge = await db
      .insert(challenge)
      .values({
        userId,
        status: "not_done",
        duration: formData.duration,
      })
      .returning();
    challengeId = createdChallenge[0].id;
    console.log(createdChallenge[0]);
    for (const property of formData.properties) {
      await db.insert(prop).values({
        challengeId,
        name: property.property,
      });
    }
  } catch (e) {
    console.error(e);
    throw Error("Internal server error");
  }
  redirect(`/challenge/${challengeId}`);
}

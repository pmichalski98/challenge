"use server";
import { auth } from "@clerk/nextjs";
import { prop, users } from "@/db/schema";
import { db } from "@/db/db";
import { randomUUID } from "node:crypto";
import { undefined } from "zod";

export async function addResolution(formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    return "User is not logged in";
  }
  console.log({ userId });
  try {
    await db.insert(users).values({
      id: userId,
    });
  } catch (e) {
    console.error(e);
    throw Error("Error creating user");
  }
  const resolution = formData.get("resolution");
  console.log(resolution);
  try {
  } catch (e) {
    console.error(e);
    throw Error("Error creating resolution");
  }
  return {};
}

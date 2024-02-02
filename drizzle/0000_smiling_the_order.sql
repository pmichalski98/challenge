CREATE TABLE IF NOT EXISTS "challenge" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" date DEFAULT now(),
	"duration" integer NOT NULL,
	"status" varchar NOT NULL,
	"userId" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prop" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"check" boolean DEFAULT false,
	"challengeId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL
);

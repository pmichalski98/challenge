CREATE TABLE IF NOT EXISTS "challenge" (
	"id" uuid PRIMARY KEY NOT NULL,
	"status" varchar NOT NULL,
	"userId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prop" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"check" boolean DEFAULT false,
	"challengeId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL
);

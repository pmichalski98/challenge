ALTER TABLE "challenge" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "prop" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
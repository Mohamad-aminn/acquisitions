ALTER TABLE "otps" ADD COLUMN "expires_in" timestamp DEFAULT '2025-10-04 09:37:36.515';--> statement-breakpoint
ALTER TABLE "otps" ADD COLUMN "created_at" timestamp DEFAULT now();
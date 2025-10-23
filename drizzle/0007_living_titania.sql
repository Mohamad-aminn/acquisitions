ALTER TABLE "otps" ALTER COLUMN "expires_in" SET DEFAULT '2025-10-12 14:49:47.674';--> statement-breakpoint
ALTER TABLE "otps" ALTER COLUMN "created_at" SET DEFAULT '2025-10-12 14:47:47.674';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "image" varchar(255) DEFAULT 'https://i.ibb.co/23BcXg5D/vecteezy-professional-male-and-female-avatar-icons-in-simple-59969623.jpg';
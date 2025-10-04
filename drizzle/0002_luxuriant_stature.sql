CREATE TABLE "otps" (
	"code" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"expires_in" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);

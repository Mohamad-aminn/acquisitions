CREATE TABLE "otps" (
	"code" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"expires_in" timestamp DEFAULT '2025-10-04 09:36:15.301',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "trashs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "trashs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "trashs_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

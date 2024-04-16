CREATE TABLE IF NOT EXISTS "verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"token" text,
	"expires" timestamp,
	CONSTRAINT "verification_email_token_pk" PRIMARY KEY("email","token")
);

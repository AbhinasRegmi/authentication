CREATE TABLE IF NOT EXISTS "reset" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "reset_token_unique" UNIQUE("token"),
	CONSTRAINT "reset_email_token_unique" UNIQUE("email","token")
);

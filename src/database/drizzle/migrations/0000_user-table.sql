CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone-number" text NOT NULL,
	CONSTRAINT "users_phone-number_unique" UNIQUE("phone-number")
);

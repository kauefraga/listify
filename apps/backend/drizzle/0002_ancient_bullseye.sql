ALTER TABLE "list" ALTER COLUMN "content" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "list" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "list" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "list" ADD CONSTRAINT "list_name_unique" UNIQUE("name");
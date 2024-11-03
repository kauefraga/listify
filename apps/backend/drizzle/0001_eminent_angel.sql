ALTER TABLE "list" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "list_tag" ALTER COLUMN "list_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "list_tag" ALTER COLUMN "tag_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tag" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag" ADD CONSTRAINT "tag_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

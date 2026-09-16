import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "resume_experience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"company" varchar NOT NULL
  );
  
  CREATE TABLE "resume_experience_locales" (
  	"role" varchar NOT NULL,
  	"period" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "resume_education" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"institution" varchar NOT NULL
  );
  
  CREATE TABLE "resume_education_locales" (
  	"title" varchar NOT NULL,
  	"period" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "resume" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "resume_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  ALTER TABLE "resume_experience" ADD CONSTRAINT "resume_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_experience_locales" ADD CONSTRAINT "resume_experience_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_education" ADD CONSTRAINT "resume_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_education_locales" ADD CONSTRAINT "resume_education_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume_education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "resume_texts" ADD CONSTRAINT "resume_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "resume_experience_order_idx" ON "resume_experience" USING btree ("_order");
  CREATE INDEX "resume_experience_parent_id_idx" ON "resume_experience" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "resume_experience_locales_locale_parent_id_unique" ON "resume_experience_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "resume_education_order_idx" ON "resume_education" USING btree ("_order");
  CREATE INDEX "resume_education_parent_id_idx" ON "resume_education" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "resume_education_locales_locale_parent_id_unique" ON "resume_education_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "resume_texts_order_parent" ON "resume_texts" USING btree ("order","parent_id");
  CREATE INDEX "resume_texts_locale_parent" ON "resume_texts" USING btree ("locale","parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "resume_experience" CASCADE;
  DROP TABLE "resume_experience_locales" CASCADE;
  DROP TABLE "resume_education" CASCADE;
  DROP TABLE "resume_education_locales" CASCADE;
  DROP TABLE "resume" CASCADE;
  DROP TABLE "resume_texts" CASCADE;`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_geography_section_stats_icon" AS ENUM('map-pin', 'building', 'truck', 'globe');
  CREATE TABLE "geography_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"label" varchar NOT NULL,
  	"icon" "enum_geography_section_stats_icon",
  	"primary" boolean DEFAULT false
  );
  
  CREATE TABLE "geography_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Работаем по всей России',
  	"subtitle" varchar DEFAULT 'Собственные склады. Отгрузка в день заказа. Доставка в любой регион.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cta_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "cta_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Готовы оптимизировать закупки?',
  	"subtitle" varchar DEFAULT 'Более 500 предприятий уже экономят с нами до 20% на ингредиентах. Присоединяйтесь.',
  	"cta_text" varchar DEFAULT 'Получить предложение',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "geography_section_stats" ADD CONSTRAINT "geography_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."geography_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cta_section_benefits" ADD CONSTRAINT "cta_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "geography_section_stats_order_idx" ON "geography_section_stats" USING btree ("_order");
  CREATE INDEX "geography_section_stats_parent_id_idx" ON "geography_section_stats" USING btree ("_parent_id");
  CREATE INDEX "cta_section_benefits_order_idx" ON "cta_section_benefits" USING btree ("_order");
  CREATE INDEX "cta_section_benefits_parent_id_idx" ON "cta_section_benefits" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "geography_section_stats" CASCADE;
  DROP TABLE "geography_section" CASCADE;
  DROP TABLE "cta_section_benefits" CASCADE;
  DROP TABLE "cta_section" CASCADE;
  DROP TYPE "public"."enum_geography_section_stats_icon";`)
}

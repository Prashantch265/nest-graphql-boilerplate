import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1681830797916 implements MigrationInterface {
    name = 'Test1681830797916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."otp_configurations_type_enum" AS ENUM('web', 'mobile')`);
        await queryRunner.query(`CREATE TABLE "otp_configurations" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" uuid, "updated_by" uuid, "is_active" boolean NOT NULL DEFAULT true, "is_permanent" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "otp_length" integer NOT NULL, "expiration_time" character varying NOT NULL, "alphabets" boolean NOT NULL DEFAULT false, "uppercase" boolean NOT NULL DEFAULT false, "special_char" boolean NOT NULL DEFAULT false, "digits" boolean NOT NULL DEFAULT false, "type" "public"."otp_configurations_type_enum" NOT NULL DEFAULT 'web', CONSTRAINT "PK_8f5031feb50ed69a1e0f7e10fcb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "otp_configurations"`);
        await queryRunner.query(`DROP TYPE "public"."otp_configurations_type_enum"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1745668076405 implements MigrationInterface {
  name = 'CreateTableUsers1745668076405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users"
        (
            "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
            "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
            "username"   character varying NOT NULL,
            "password"   character varying NOT NULL,
            "first_name" character varying NOT NULL,
            "last_name"  character varying NOT NULL,
            "patronymic" character varying,
            CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
    `);
  }
}

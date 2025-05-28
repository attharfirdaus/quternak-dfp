import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddAnswerTableMigration1730804455672 implements MigrationInterface {
  name = 'AddAnswerTableMigration1730804455672'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "answer" ("id" SERIAL NOT NULL, "answer" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "answer"')
  }

}

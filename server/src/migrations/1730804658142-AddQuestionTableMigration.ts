import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddQuestionTableMigration1730804658142 implements MigrationInterface {
  name = 'AddQuestionTableMigration1730804658142'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "question" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answerExpectation" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "question"')
  }

}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateAnswerQuestionTableMigration1731303309917 implements MigrationInterface {
  name = 'UpdateAnswerQuestionTableMigration1731303309917'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "answer_result" ("id" SERIAL NOT NULL, "result" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "answerId" integer, "questionId" integer, CONSTRAINT "PK_82577b5e2e83ffe8d36b38116ba" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "answer_result" ADD CONSTRAINT "FK_83b6fbacc414639160d3b55cdfc" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "answer_result" ADD CONSTRAINT "FK_01056ca27db08854fc2345ee6a5" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "answer_result" DROP CONSTRAINT "FK_01056ca27db08854fc2345ee6a5"')
    await queryRunner.query('ALTER TABLE "answer_result" DROP CONSTRAINT "FK_83b6fbacc414639160d3b55cdfc"')
    await queryRunner.query('DROP TABLE "answer_result"')
  }

}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateProductTableMigration1720181174398 implements MigrationInterface {
  name = 'UpdateProductTableMigration1720181174398'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product" ADD "sellerId" integer')
    await queryRunner.query('ALTER TABLE "product" ADD CONSTRAINT "FK_d5cac481d22dacaf4d53f900a3f" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product" DROP CONSTRAINT "FK_d5cac481d22dacaf4d53f900a3f"')
    await queryRunner.query('ALTER TABLE "product" DROP COLUMN "sellerId"')
  }

}

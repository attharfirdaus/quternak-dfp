import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateProductTableMigration1720360950607 implements MigrationInterface {
  name = 'UpdateProductTableMigration1720360950607'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product" ADD "stock" text')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product" DROP COLUMN "stock"')
  }

}

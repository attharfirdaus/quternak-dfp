import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserTableMigration1719668304870 implements MigrationInterface {
  name = 'AddUserTableMigration1719668304870'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying, "addres" character varying, "city" character varying, "province" character varying, "nik" character varying, "role" character varying NOT NULL DEFAULT \'customer\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user"')
  }

}

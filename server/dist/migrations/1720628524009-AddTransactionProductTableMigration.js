"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTransactionProductTableMigration1720628524009 = void 0;
class AddTransactionProductTableMigration1720628524009 {
    constructor() {
        this.name = 'AddTransactionProductTableMigration1720628524009';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('CREATE TABLE "transaction_product" ("id" SERIAL NOT NULL, "transactionProductId" character varying NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "transactionId" integer, "productId" integer, CONSTRAINT "PK_1801daeaeaaaef2aeb63ae80a67" PRIMARY KEY ("id"))');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "transactionId" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_60ae1f8b2678568d30d9bbadb26" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee"');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_60ae1f8b2678568d30d9bbadb26"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "transactionId"');
            yield queryRunner.query('DROP TABLE "transaction_product"');
        });
    }
}
exports.AddTransactionProductTableMigration1720628524009 = AddTransactionProductTableMigration1720628524009;
//# sourceMappingURL=1720628524009-AddTransactionProductTableMigration.js.map
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
exports.UpdateTransactionProductTableMigration1720880806514 = void 0;
class UpdateTransactionProductTableMigration1720880806514 {
    constructor() {
        this.name = 'UpdateTransactionProductTableMigration1720880806514';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "quantity"');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "transactionToken"');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "price"');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "variantIndex"');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "transactionId" integer');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "quantity" integer NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "price" integer NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "variantIndex" integer');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_60ae1f8b2678568d30d9bbadb26" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee"');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_60ae1f8b2678568d30d9bbadb26"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "variantIndex"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "price"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "quantity"');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "transactionId"');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "variantIndex" integer');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "price" integer NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "transactionToken" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "quantity" integer NOT NULL');
        });
    }
}
exports.UpdateTransactionProductTableMigration1720880806514 = UpdateTransactionProductTableMigration1720880806514;
//# sourceMappingURL=1720880806514-UpdateTransactionProductTableMigration.js.map
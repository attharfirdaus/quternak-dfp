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
exports.UpdateTransactionProductTableMigration1720677865457 = void 0;
class UpdateTransactionProductTableMigration1720677865457 {
    constructor() {
        this.name = 'UpdateTransactionProductTableMigration1720677865457';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "transactionProductId"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "transactionId"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "customerAddress"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "customerPhoneNumber"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "customerName"');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "transactionToken" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "price" integer NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "transactionToken" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee"');
            yield queryRunner.query('ALTER TABLE "transaction_product" ALTER COLUMN "productId" SET NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee"');
            yield queryRunner.query('ALTER TABLE "transaction_product" ALTER COLUMN "productId" DROP NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD CONSTRAINT "FK_3dc6e0b30199d17c2e027dcbdee" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "transactionToken"');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "price"');
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "transactionToken"');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "customerName" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "customerPhoneNumber" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "customerAddress" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction" ADD "transactionId" character varying NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "transactionProductId" character varying NOT NULL');
        });
    }
}
exports.UpdateTransactionProductTableMigration1720677865457 = UpdateTransactionProductTableMigration1720677865457;
//# sourceMappingURL=1720677865457-UpdateTransactionProductTableMigration.js.map
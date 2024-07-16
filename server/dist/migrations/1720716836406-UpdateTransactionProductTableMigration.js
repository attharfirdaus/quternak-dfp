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
exports.UpdateTransactionProductTableMigration1720716836406 = void 0;
class UpdateTransactionProductTableMigration1720716836406 {
    constructor() {
        this.name = 'UpdateTransactionProductTableMigration1720716836406';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction_product" ADD "variantIndex" integer');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction_product" DROP COLUMN "variantIndex"');
        });
    }
}
exports.UpdateTransactionProductTableMigration1720716836406 = UpdateTransactionProductTableMigration1720716836406;
//# sourceMappingURL=1720716836406-UpdateTransactionProductTableMigration.js.map
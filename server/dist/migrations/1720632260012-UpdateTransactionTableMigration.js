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
exports.UpdateTransactionTableMigration1720632260012 = void 0;
class UpdateTransactionTableMigration1720632260012 {
    constructor() {
        this.name = 'UpdateTransactionTableMigration1720632260012';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction" ADD "userId" integer NOT NULL');
            yield queryRunner.query('ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"');
            yield queryRunner.query('ALTER TABLE "transaction" DROP COLUMN "userId"');
        });
    }
}
exports.UpdateTransactionTableMigration1720632260012 = UpdateTransactionTableMigration1720632260012;
//# sourceMappingURL=1720632260012-UpdateTransactionTableMigration.js.map
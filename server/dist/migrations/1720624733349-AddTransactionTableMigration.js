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
exports.AddTransactionTableMigration1720624733349 = void 0;
class AddTransactionTableMigration1720624733349 {
    constructor() {
        this.name = 'AddTransactionTableMigration1720624733349';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "status" character varying NOT NULL DEFAULT \'pending\', "customerName" character varying NOT NULL, "customerPhoneNumber" character varying NOT NULL, "customerAddress" character varying NOT NULL, "snapToken" character varying, "snapRedirectUrl" character varying, "paymentMethod" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('DROP TABLE "transaction"');
        });
    }
}
exports.AddTransactionTableMigration1720624733349 = AddTransactionTableMigration1720624733349;
//# sourceMappingURL=1720624733349-AddTransactionTableMigration.js.map
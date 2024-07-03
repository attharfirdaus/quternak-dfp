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
exports.AddProductTableMigration1719929975279 = void 0;
class AddProductTableMigration1719929975279 {
    constructor() {
        this.name = 'AddProductTableMigration1719929975279';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" text NOT NULL, "variant" text, "type" character varying, "description" character varying NOT NULL, "location" character varying NOT NULL, "pictureUrl" text, "status" character varying NOT NULL DEFAULT \'not sold\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))');
            yield queryRunner.query('ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"');
            yield queryRunner.query('DROP TABLE "product"');
        });
    }
}
exports.AddProductTableMigration1719929975279 = AddProductTableMigration1719929975279;
//# sourceMappingURL=1719929975279-AddProductTableMigration.js.map
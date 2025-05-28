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
exports.UpdateAnswerQuestionTableMigration1731303309917 = void 0;
class UpdateAnswerQuestionTableMigration1731303309917 {
    constructor() {
        this.name = 'UpdateAnswerQuestionTableMigration1731303309917';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('CREATE TABLE "answer_result" ("id" SERIAL NOT NULL, "result" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "answerId" integer, "questionId" integer, CONSTRAINT "PK_82577b5e2e83ffe8d36b38116ba" PRIMARY KEY ("id"))');
            yield queryRunner.query('ALTER TABLE "answer_result" ADD CONSTRAINT "FK_83b6fbacc414639160d3b55cdfc" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
            yield queryRunner.query('ALTER TABLE "answer_result" ADD CONSTRAINT "FK_01056ca27db08854fc2345ee6a5" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "answer_result" DROP CONSTRAINT "FK_01056ca27db08854fc2345ee6a5"');
            yield queryRunner.query('ALTER TABLE "answer_result" DROP CONSTRAINT "FK_83b6fbacc414639160d3b55cdfc"');
            yield queryRunner.query('DROP TABLE "answer_result"');
        });
    }
}
exports.UpdateAnswerQuestionTableMigration1731303309917 = UpdateAnswerQuestionTableMigration1731303309917;
//# sourceMappingURL=1731303309917-UpdateAnswerQuestionTableMigration.js.map
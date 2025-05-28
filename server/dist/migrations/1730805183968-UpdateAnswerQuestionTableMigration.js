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
exports.UpdateAnswerQuestionTableMigration1730805183968 = void 0;
class UpdateAnswerQuestionTableMigration1730805183968 {
    constructor() {
        this.name = 'UpdateAnswerQuestionTableMigration1730805183968';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "answer" ADD "questionId" integer');
            yield queryRunner.query('ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"');
            yield queryRunner.query('ALTER TABLE "answer" DROP COLUMN "questionId"');
        });
    }
}
exports.UpdateAnswerQuestionTableMigration1730805183968 = UpdateAnswerQuestionTableMigration1730805183968;
//# sourceMappingURL=1730805183968-UpdateAnswerQuestionTableMigration.js.map
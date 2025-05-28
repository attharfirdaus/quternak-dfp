"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerResult = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Answer_1 = require("./Answer");
const Question_1 = require("./Question");
let AnswerResult = class AnswerResult extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AnswerResult.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AnswerResult.prototype, "result", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Answer_1.Answer),
    (0, typeorm_1.ManyToOne)(() => Answer_1.Answer, (answer) => answer.answerResult),
    __metadata("design:type", Answer_1.Answer)
], AnswerResult.prototype, "answer", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Question_1.Question),
    (0, typeorm_1.ManyToOne)(() => Question_1.Question, (question) => question.answerResult),
    __metadata("design:type", Question_1.Question)
], AnswerResult.prototype, "question", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AnswerResult.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AnswerResult.prototype, "updatedAt", void 0);
AnswerResult = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], AnswerResult);
exports.AnswerResult = AnswerResult;
//# sourceMappingURL=AnswerResult.js.map
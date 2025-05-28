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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AnswerResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Question_1 = require("../entities/Question");
const Answer_1 = require("../entities/Answer");
let AnswerInput = class AnswerInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AnswerInput.prototype, "answer", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AnswerInput.prototype, "questionId", void 0);
AnswerInput = __decorate([
    (0, type_graphql_1.InputType)()
], AnswerInput);
let AnswerResolver = class AnswerResolver {
    answers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Answer_1.Answer.find();
        });
    }
    createAnswer(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield Question_1.Question.findOne(input.questionId);
            return yield Answer_1.Answer.create(Object.assign(Object.assign({}, input), { question })).save();
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Answer_1.Answer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnswerResolver.prototype, "answers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Answer_1.Answer),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AnswerInput]),
    __metadata("design:returntype", Promise)
], AnswerResolver.prototype, "createAnswer", null);
AnswerResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AnswerResolver);
exports.AnswerResolver = AnswerResolver;
//# sourceMappingURL=answer.js.map
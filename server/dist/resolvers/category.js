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
exports.CategoryResolver = void 0;
const isAdmin_1 = require("../middleware/isAdmin");
const Category_1 = require("../entities/Category");
const type_graphql_1 = require("type-graphql");
let CategoryInput = class CategoryInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CategoryInput.prototype, "name", void 0);
CategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], CategoryInput);
let CategoryResolver = class CategoryResolver {
    categories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.find();
        });
    }
    createCategory(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.Category.create(Object.assign({}, input)).save();
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Category_1.Category]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "categories", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "createCategory", null);
CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
//# sourceMappingURL=category.js.map
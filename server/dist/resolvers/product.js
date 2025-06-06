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
exports.ProductResolver = void 0;
const Category_1 = require("../entities/Category");
const Product_1 = require("../entities/Product");
const isAdmin_1 = require("../middleware/isAdmin");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
let CreateProductInput = class CreateProductInput {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Number], { nullable: true }),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Number], { nullable: true }),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "stock", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "variant", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "categoryId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "pictureUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateProductInput.prototype, "status", void 0);
CreateProductInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateProductInput);
let ProductResolver = class ProductResolver {
    products() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Product_1.Product.find({ relations: ['category', 'seller'] });
        });
    }
    productById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.Product.findOne(id, { relations: ['category', 'seller'] });
            if (!product) {
                throw new Error('Cannot find product');
            }
            return product;
        });
    }
    createProduct(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.Category.findOne(input.categoryId);
            const seller = yield User_1.User.findOne(req.session.userId);
            if (!category) {
                throw new Error('invalid category ID');
            }
            const createdProduct = yield Product_1.Product.create(Object.assign(Object.assign({}, input), { category, seller })).save();
            return createdProduct;
        });
    }
    updateProduct(id, input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(req.session.userId);
            if ((user === null || user === void 0 ? void 0 : user.role) !== 'admin') {
                throw new Error('you are not admin');
            }
            const updatedProduct = yield Product_1.Product.findOne(id, { relations: ['category', 'seller'] });
            if (!updatedProduct) {
                throw new Error('cannot find product');
            }
            yield Product_1.Product.update({ id }, input);
            yield updatedProduct.reload();
            return updatedProduct;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Product_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "products", null);
__decorate([
    (0, type_graphql_1.Query)(() => Product_1.Product),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "productById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __param(0, (0, type_graphql_1.Arg)("input", () => CreateProductInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProductInput, Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Product_1.Product),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('input', () => CreateProductInput)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateProductInput, Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProduct", null);
ProductResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.js.map
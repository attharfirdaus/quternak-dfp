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
exports.TransactionProduct = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Transaction_1 = require("./Transaction");
const Product_1 = require("./Product");
let TransactionProduct = class TransactionProduct extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TransactionProduct.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Transaction_1.Transaction),
    (0, typeorm_1.ManyToOne)(() => Transaction_1.Transaction, (transaction) => transaction.transactionProduct),
    __metadata("design:type", Transaction_1.Transaction)
], TransactionProduct.prototype, "transaction", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TransactionProduct.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Product_1.Product),
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.transactionProduct),
    __metadata("design:type", Product_1.Product)
], TransactionProduct.prototype, "product", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TransactionProduct.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TransactionProduct.prototype, "updatedAt", void 0);
TransactionProduct = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], TransactionProduct);
exports.TransactionProduct = TransactionProduct;
//# sourceMappingURL=TransactionProduct.js.map
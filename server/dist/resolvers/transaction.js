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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResolver = void 0;
const Transaction_1 = require("../entities/Transaction");
const isAdmin_1 = require("../middleware/isAdmin");
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const TransactionProduct_1 = require("../entities/TransactionProduct");
const Product_1 = require("../entities/Product");
const nanoid_1 = require("nanoid");
const User_1 = require("../entities/User");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
let TransactionResolver = class TransactionResolver {
    constructor() {
        this.updateStatusBasedOnMidtransResponse = (transactionToken, data) => __awaiter(this, void 0, void 0, function* () {
            const hash = crypto_1.default
                .createHash('sha512')
                .update(`${transactionToken}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
                .digest('hex');
            if (data.signature_key !== hash) {
                return {
                    status: 'error',
                    message: 'invalid signature key',
                };
            }
            let responseData = null;
            const transactionStatus = data.transaction_status;
            const fraudStatus = data.fraud_status;
            if (transactionStatus === 'capture') {
                if (fraudStatus === 'accept') {
                    const transaction = yield Transaction_1.Transaction.findOne({
                        where: {
                            transactionToken: transactionToken,
                        },
                    });
                    if (!transaction) {
                        throw new Error('transaction not found');
                    }
                    yield Transaction_1.Transaction.update({
                        transactionToken: transactionToken,
                    }, {
                        status: 'paid',
                        paymentMethod: data.payment_type,
                    });
                    yield transaction.reload();
                    responseData = transaction;
                }
            }
            else if (transactionStatus === 'settlement') {
                const transaction = yield Transaction_1.Transaction.findOne({
                    where: {
                        transactionToken: transactionToken,
                    },
                });
                if (!transaction) {
                    throw new Error('transaction not found');
                }
                yield Transaction_1.Transaction.update({
                    transactionToken: transactionToken,
                }, {
                    status: 'paid',
                    paymentMethod: data.payment_type,
                });
                yield transaction.reload();
                responseData = transaction;
            }
            else if (transactionStatus === 'cancel' ||
                transactionStatus === 'deny' ||
                transactionStatus === 'expire') {
                const transaction = yield Transaction_1.Transaction.findOne({
                    where: {
                        transactionToken: transactionToken,
                    },
                });
                if (!transaction) {
                    throw new Error('transaction not found');
                }
                yield Transaction_1.Transaction.update({
                    transactionToken: transactionToken,
                }, {
                    status: 'canceled',
                });
                yield transaction.reload();
                responseData = transaction;
            }
            else if (transactionStatus === 'pending') {
                const transaction = yield Transaction_1.Transaction.findOne({
                    where: {
                        transactionToken: transactionToken,
                    },
                });
                if (!transaction) {
                    throw new Error('transaction not found');
                }
                yield Transaction_1.Transaction.update({
                    transactionToken: transactionToken,
                }, {
                    status: 'pending',
                });
                yield transaction.reload();
                responseData = transaction;
            }
            return {
                status: 'success',
                data: responseData,
            };
        });
    }
    transactions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Transaction_1.Transaction.find({
                relations: [
                    'transactionProduct',
                    'transactionProduct.product',
                    'transactionProduct.product.category',
                    'transactionProduct.product.seller',
                    'user',
                ],
            });
        });
    }
    transactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Transaction_1.Transaction.findOne(id, {
                relations: [
                    'transactionProduct',
                    'transactionProduct.product',
                    'transactionProduct.product.category',
                    'transactionProduct.product.seller',
                    'user',
                ],
            });
        });
    }
    myTransactions({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Transaction_1.Transaction.find({
                where: {
                    userId: req.session.userId,
                },
                relations: [
                    'transactionProduct',
                    'transactionProduct.product',
                    'transactionProduct.product.category',
                    'transactionProduct.product.seller',
                    'user',
                ],
            });
        });
    }
    myTransactionById(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Transaction_1.Transaction.findOne({
                where: {
                    userId: req.session.userId,
                    id: id,
                },
                relations: [
                    'transactionProduct',
                    'transactionProduct.product',
                    'transactionProduct.product.category',
                    'transactionProduct.product.seller',
                    'user',
                ],
            });
        });
    }
    myTransactionByToken(transactionToken, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Transaction_1.Transaction.findOne({
                where: {
                    userId: req.session.userId,
                    transactionToken: transactionToken,
                },
                relations: [
                    'transactionProduct',
                    'transactionProduct.product',
                    'transactionProduct.product.category',
                    'transactionProduct.product.seller',
                    'user',
                ],
            });
        });
    }
    createTransaction(productId, productPrice, productQuantity, productVariantIndex, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(req.session.userId);
            const product = yield Product_1.Product.findOne(productId);
            if (!product) {
                throw new Error('cannot find product');
            }
            const transactionToken = `QU-${(0, nanoid_1.nanoid)(4)}-${(0, nanoid_1.nanoid)(8)}`;
            const grossAmount = productPrice * productQuantity;
            const authString = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`);
            const payload = {
                transaction_details: {
                    order_id: transactionToken,
                    gross_amount: grossAmount,
                },
                product_details: {
                    id: productId,
                    title: product.title,
                    price: productPrice,
                    quantity: productQuantity,
                    variant: product.variant[productVariantIndex],
                },
                customer_details: {
                    name: user === null || user === void 0 ? void 0 : user.name,
                    address: user === null || user === void 0 ? void 0 : user.addres,
                    profilePictureUrl: user === null || user === void 0 ? void 0 : user.profilePictureUrl,
                    phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
                },
                callbacks: {
                    finish: `${process.env.WEB_URL}/order-status?transaction_token=${transactionToken}`,
                    error: `${process.env.WEB_URL}/order-status?transaction_token=${transactionToken}`,
                    pending: `${process.env.WEB_URL}/order-status?transaction_token=${transactionToken}`,
                },
            };
            const midtransAppUrl = process.env.MIDTRANS_APP_URL;
            if (!midtransAppUrl) {
                throw new Error('MIDTRANS_APP_URL environment variable is not set');
            }
            const response = yield fetch(`${midtransAppUrl}/snap/v1/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Basic ${authString}`,
                },
                body: JSON.stringify(payload),
            });
            const data = yield response.json();
            if (response.status !== 201) {
                console.error('Failed to create transaction:', data);
                throw new Error('Failed to create transaction');
            }
            console.log('Midtrans response:', data);
            if (!data.token || !data.redirect_url) {
                console.error('Unexpected Midtrans response format:', data);
                throw new Error('Failed to create transaction: Unexpected response format');
            }
            const createdTransaction = Transaction_1.Transaction.create({
                transactionToken,
                total: grossAmount,
                status: 'pending',
                userId: user === null || user === void 0 ? void 0 : user.id,
                snapToken: data.token,
                snapRedirectUrl: data.redirect_url,
                paymentMethod: '',
                quantity: productQuantity,
                price: productPrice,
                variantIndex: productVariantIndex,
            });
            const savedTransaction = yield createdTransaction.save();
            const createdTransactionProduct = TransactionProduct_1.TransactionProduct.create({
                transaction: savedTransaction,
                productId: productId,
            });
            yield createdTransactionProduct.save();
            return savedTransaction;
        });
    }
    updateTransactionStatus(token, status, quantity, variantIndex, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield Transaction_1.Transaction.findOne({
                where: {
                    transactionToken: token,
                },
                relations: ['transactionProduct', 'transactionProduct.product'],
            });
            if ((transaction === null || transaction === void 0 ? void 0 : transaction.userId) !== req.session.userId) {
                throw new Error('you are not authorized to this transaction');
            }
            yield Transaction_1.Transaction.update({
                transactionToken: token,
            }, {
                status: status,
            });
            if (status === 'paid') {
                for (const transactionProduct of transaction.transactionProduct) {
                    const product = transactionProduct.product;
                    if (product) {
                        product.stock[variantIndex] -= quantity;
                        yield product.save();
                    }
                }
            }
            yield transaction.reload();
            return transaction;
        });
    }
    midtransWebhook(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const midtransData = JSON.parse(data);
            const transactionToken = midtransData.order_id;
            yield this.updateStatusBasedOnMidtransResponse(transactionToken, midtransData);
            return 'webhook received and processed';
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Transaction_1.Transaction]),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "transactions", null);
__decorate([
    (0, type_graphql_1.Query)(() => Transaction_1.Transaction),
    (0, type_graphql_1.UseMiddleware)(isAdmin_1.isAdmin),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "transactionById", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Transaction_1.Transaction]),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "myTransactions", null);
__decorate([
    (0, type_graphql_1.Query)(() => Transaction_1.Transaction),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "myTransactionById", null);
__decorate([
    (0, type_graphql_1.Query)(() => Transaction_1.Transaction),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("transactionToken", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "myTransactionByToken", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Transaction_1.Transaction),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("productId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("productPrice", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("productQuantity", () => type_graphql_1.Int)),
    __param(3, (0, type_graphql_1.Arg)("productVariantIndex", () => type_graphql_1.Int, { nullable: true })),
    __param(4, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "createTransaction", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Transaction_1.Transaction),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)("token", () => String)),
    __param(1, (0, type_graphql_1.Arg)("status", () => String)),
    __param(2, (0, type_graphql_1.Arg)("quantity", () => type_graphql_1.Int)),
    __param(3, (0, type_graphql_1.Arg)("variantIndex", () => type_graphql_1.Int)),
    __param(4, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "updateTransactionStatus", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("data", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionResolver.prototype, "midtransWebhook", null);
TransactionResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TransactionResolver);
exports.TransactionResolver = TransactionResolver;
//# sourceMappingURL=transaction.js.map
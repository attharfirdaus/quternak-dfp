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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const types_1 = require("./types");
const user_1 = require("./resolvers/user");
const User_1 = require("./entities/User");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const Category_1 = require("./entities/Category");
const category_1 = require("./resolvers/category");
const Product_1 = require("./entities/Product");
const product_1 = require("./resolvers/product");
const TransactionProduct_1 = require("./entities/TransactionProduct");
const Transaction_1 = require("./entities/Transaction");
const transaction_1 = require("./resolvers/transaction");
const Answer_1 = require("./entities/Answer");
const Question_1 = require("./entities/Question");
const question_1 = require("./resolvers/question");
const answer_1 = require("./resolvers/answer");
const AnswerResult_1 = require("./entities/AnswerResult");
dotenv_1.default.config;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, typeorm_1.createConnection)({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'quternak',
        logging: true,
        entities: [User_1.User, Category_1.Category, Product_1.Product, Transaction_1.Transaction, TransactionProduct_1.TransactionProduct, Answer_1.Answer, Question_1.Question, AnswerResult_1.AnswerResult],
        migrations: [path_1.default.join(__dirname, './migrations/*')],
        subscribers: [],
    });
    yield conn.runMigrations();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: 'sid',
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        },
        saveUninitialized: false,
        secret: 'quternak',
        resave: false
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver, category_1.CategoryResolver, product_1.ProductResolver, transaction_1.TransactionResolver, question_1.QuestionResolver, answer_1.AnswerResolver],
            validate: false,
        }),
        context: ({ req, res }) => (0, types_1.createContext)(req, res, redis),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map
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
exports.UserResolver = exports.UserResponse = exports.FieldError = exports.EmailPasswordInput = void 0;
const isAuth_1 = require("../middleware/isAuth");
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const validateRegister_1 = require("../utils/validateRegister");
const typeorm_1 = require("typeorm");
const session_1 = require("../utils/session");
let EmailPasswordInput = class EmailPasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "passwordConfirmation", void 0);
EmailPasswordInput = __decorate([
    (0, type_graphql_1.InputType)()
], EmailPasswordInput);
exports.EmailPasswordInput = EmailPasswordInput;
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
exports.FieldError = FieldError;
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
let UserResolver = class UserResolver {
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            return User_1.User.findOne(req.session.userId);
        });
    }
    formatUsername(username) {
        return username.trim();
    }
    formatLowerCase(value) {
        return value.trim().toLowerCase();
    }
    register(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            options.email = this.formatLowerCase(options.email);
            options.username = this.formatLowerCase(options.username);
            const errors = (0, validateRegister_1.validateRegister)(options);
            if (errors) {
                return {
                    errors,
                };
            }
            const hashedPassword = yield argon2_1.default.hash(options.password);
            let user;
            try {
                const result = yield (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .insert()
                    .into(User_1.User)
                    .values({
                    name: options.name,
                    username: options.username,
                    email: options.email,
                    password: hashedPassword,
                })
                    .returning('*')
                    .execute();
                user = result.raw[0];
            }
            catch (error) {
                if (error.code === '23505') {
                    if (error.detail.includes('email')) {
                        return {
                            errors: [
                                {
                                    field: 'email',
                                    message: 'email already taken',
                                },
                            ],
                        };
                    }
                    return {
                        errors: [
                            {
                                field: 'username',
                                message: 'username already taken',
                            },
                        ],
                    };
                }
            }
            req.session.userId = user.id;
            return { user };
        });
    }
    login(usernameOrEmail, password, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            usernameOrEmail = this.formatUsername(usernameOrEmail);
            const user = yield User_1.User.findOne(usernameOrEmail.includes('@')
                ? {
                    where: {
                        email: usernameOrEmail,
                    },
                }
                : {
                    where: {
                        username: usernameOrEmail,
                    },
                });
            if (!user) {
                return {
                    errors: [
                        {
                            field: 'usernameOrEmail',
                            message: "that username or email does't exist",
                        },
                    ],
                };
            }
            const valid = yield argon2_1.default.verify(user.password, password);
            if (!valid) {
                return {
                    errors: [
                        {
                            field: 'password',
                            message: 'password invalid',
                        },
                    ],
                };
            }
            req.session.userId = user.id;
            console.log(req.session.userId);
            session_1.sessionData.saveUserSessionId({
                userId: user.id,
                sessionId: req.sessionID,
            });
            return { user };
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options", () => EmailPasswordInput)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailPasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("usernameOrEmail")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map
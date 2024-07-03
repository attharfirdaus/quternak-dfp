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
exports.sessionData = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class SessionData {
    constructor() {
        this.sessionPrefix = 'sess:';
        this.prefix = 'sessionlist:';
        this.redis = new ioredis_1.default(process.env.REDIS_URL);
    }
    saveUserSessionId(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getUserDataByUserId(param.userId);
            data.push(param.sessionId);
            this.redis.set(this.prefix + param.userId, JSON.stringify(data));
            return true;
        });
    }
    destroyAllUserSessionByUserIdExcepSessionId(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getUserDataByUserId(param.userId);
            for (const da of data) {
                if (da != param.sessionId)
                    yield this.redis.del(this.sessionPrefix + da);
            }
            yield this.redis.set(this.prefix + param.userId, JSON.stringify([param.sessionId]));
            return true;
        });
    }
    destroyUserSessionByUserId(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getUserDataByUserId(param.userId);
            yield this.redis.set(this.prefix + param.userId, JSON.stringify([data.filter((da) => da != param.sessionId)]));
            return true;
        });
    }
    getUserDataByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.redis.get(this.prefix + userId);
            if (!data)
                return [];
            else
                return JSON.parse(data);
        });
    }
}
exports.sessionData = new SessionData();
//# sourceMappingURL=session.js.map
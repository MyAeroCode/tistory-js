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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
/**
 * 티스토리 URL.
 */
var tistoryUrl = "https://tistory.com";
/**
 * Tistory API를 호출할 수 있는 객체.
 */
var TistoryApi = /** @class */ (function () {
    function TistoryApi(key) {
        this.key = key;
    }
    /**
     * 어떤 유저의 아이디와 비밀번호를 직접받아 코드를 받아온다.
     * 이 코드를 getAccessTokenViaCode에 전달하면 액세스 토큰을 얻을 수 있다.
     *
     * @param account 티스토리 계정 정보
     */
    TistoryApi.prototype.getCodeViaAccountInfo = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var loginRes, e_1, loginCookie, authRes, authCodeCandidates, authCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "POST",
                                url: "https://www.tistory.com/auth/login",
                                data: qs_1.default.stringify({
                                    fp: 1,
                                    loginId: account.id,
                                    password: account.pw,
                                    redirectUrl: tistoryUrl,
                                }),
                                //
                                // 302 응답을 캡쳐하기 위해 리다이렉트를 비활성화하고,
                                // 302 응답이 아니면 에러를 발생시키도록 한다.
                                maxRedirects: 0,
                                validateStatus: function (status) {
                                    return status === 302;
                                },
                            })];
                    case 1:
                        loginRes = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        throw "로그인에 실패했습니다.";
                    case 3:
                        loginCookie = loginRes["headers"]["set-cookie"]
                            .map(function (setCookie) {
                            var miniCookie = setCookie.split(";")[0];
                            return miniCookie;
                        })
                            .join(";");
                        //
                        // 세션이 취득되었는지 검사한다.
                        if (loginCookie.indexOf("TSSESSION") === -1) {
                            throw "세션이 반환되지 않았습니다.";
                        }
                        return [4 /*yield*/, axios_1.default({
                                method: "GET",
                                url: "https://www.tistory.com/oauth/authorize?",
                                params: {
                                    client_id: this.key.client,
                                    redirect_uri: tistoryUrl,
                                    response_type: "code",
                                },
                                headers: {
                                    cookie: loginCookie,
                                },
                            })];
                    case 4:
                        authRes = _a.sent();
                        authCodeCandidates = authRes.data.match(/code=[^&']+/gm);
                        //
                        // 코드 후보군에 값이 단 하나만 있어야 한다.
                        if (authCodeCandidates === undefined) {
                            throw "코드가 반환되지 않았습니다.";
                        }
                        if (authCodeCandidates.length > 1) {
                            throw "\uCF54\uB4DC \uD6C4\uBCF4\uAC00 \uB108\uBB34 \uB9CE\uC2B5\uB2C8\uB2E4. " + JSON.stringify(authCodeCandidates, null, 4);
                        }
                        authCode = authCodeCandidates[0].slice(5);
                        return [2 /*return*/, authCode];
                }
            });
        });
    };
    /**
     * 클라이언트가 발급받은 코드로 액세스 토큰을 취득한다.
     *
     * @param code 클라이언트가 발급받은 코드값
     */
    TistoryApi.prototype.getAccessTokenViaCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var res, access_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default({
                            method: "GET",
                            url: "https://www.tistory.com/oauth/access_token",
                            params: {
                                client_id: this.key.client,
                                client_secret: this.key.secret,
                                redirect_uri: tistoryUrl,
                                response_type: "code",
                                code: code,
                                grant_type: "authorization_code",
                            },
                        })];
                    case 1:
                        res = _a.sent();
                        access_token = res.data.access_token;
                        if (access_token === undefined) {
                            throw new Error("\uC561\uC138\uC2A4 \uD1A0\uD070\uC744 \uBC1B\uC544\uC62C \uC218 \uC5C6\uC5C8\uC2B5\uB2C8\uB2E4.");
                        }
                        return [2 /*return*/, access_token];
                }
            });
        });
    };
    return TistoryApi;
}());
exports.TistoryApi = TistoryApi;
//# sourceMappingURL=tistory-api.js.map
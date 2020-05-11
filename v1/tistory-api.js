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
var unirest = require("unirest");
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
     * 데이터에 공용 속성을 부여한다.
     */
    TistoryApi.prototype.dataMiddleware = function (data) {
        return Object.assign(data, {
            //
            // 티스토리 응답을 json 포맷으로 변환하기 위해 사용된다.
            output: "json",
        });
    };
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
    /**
     * 자신이 갖고있는 블로그 리스트를 가져옵니다.
     */
    TistoryApi.prototype.blogInfo = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "GET",
                                url: "https://www.tistory.com/apis/blog/info?",
                                params: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_1 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 블로그의 게시글 목록을 가져옵니다.
     */
    TistoryApi.prototype.listPost = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "GET",
                                url: "https://www.tistory.com/apis/post/list?",
                                params: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_2 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_2 === null || err_2 === void 0 ? void 0 : err_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 게시글 하나를 읽어옵니다.
     */
    TistoryApi.prototype.readPost = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "GET",
                                url: "https://www.tistory.com/apis/post/read?",
                                params: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_3 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_3 === null || err_3 === void 0 ? void 0 : err_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 블로그에 게시글을 작성합니다.
     */
    TistoryApi.prototype.writePost = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "POST",
                                url: "https://www.tistory.com/apis/post/write",
                                data: qs_1.default.stringify(this.dataMiddleware(arg)),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_4 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_4 === null || err_4 === void 0 ? void 0 : err_4.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 블로그에 파일을 업로드합니다.
     * 단, 사진 파일만 올릴 수 있습니다.
     */
    TistoryApi.prototype.attachPost = function (arg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /**
                 * @TODO
                 *      axios로 보내기어려워 일단 unirest를 사용했습니다.
                 *      나중에는 unirest를 제거하고 axios로만 보내야 합니다.
                 */
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                unirest("POST", "https://www.tistory.com/apis/post/attach")
                                    .field("blogName", arg.blogName)
                                    .field("access_token", arg.access_token)
                                    .field("output", "json")
                                    .attach("uploadedfile", arg.filePath)
                                    .end(function (res) {
                                    var _a, _b, _c;
                                    if (res.error) {
                                        reject(new Error(((_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.tistory) === null || _b === void 0 ? void 0 : _b.error_message) ||
                                            "네트워크 에러"));
                                    }
                                    else {
                                        resolve((_c = res === null || res === void 0 ? void 0 : res.body) === null || _c === void 0 ? void 0 : _c.tistory);
                                    }
                                });
                                return [2 /*return*/];
                            });
                        });
                    })];
            });
        });
    };
    /**
     * 특정 게시글을 수정합니다.
     */
    TistoryApi.prototype.modifyPost = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_5;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "POST",
                                url: "https://www.tistory.com/apis/post/modify",
                                data: qs_1.default.stringify(this.dataMiddleware(arg)),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_5 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_5 === null || err_5 === void 0 ? void 0 : err_5.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 블로그의 카테고리 목록을 가져옵니다.
     */
    TistoryApi.prototype.listCategory = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_6;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "GET",
                                url: "https://www.tistory.com/apis/category/list?",
                                params: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_6 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_6 === null || err_6 === void 0 ? void 0 : err_6.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 특정 블로그의 최신 댓글 목록을 가져옵니다.
     */
    TistoryApi.prototype.newestComment = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_7;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "GET",
                                url: "https://www.tistory.com/apis/comment/newest?",
                                params: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_7 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_7 === null || err_7 === void 0 ? void 0 : err_7.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 특정 게시글의 모든 댓글 목록을 가져옵니다.
     */
    TistoryApi.prototype.listComment = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_8;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "GET",
                                url: "https://www.tistory.com/apis/comment/list?",
                                params: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_8 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_8 === null || err_8 === void 0 ? void 0 : err_8.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 댓글 하나를 작성합니다.
     */
    TistoryApi.prototype.writeComment = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_9;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "POST",
                                url: "https://www.tistory.com/apis/comment/write",
                                data: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_9 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_9 === null || err_9 === void 0 ? void 0 : err_9.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 특정 댓글 하나를 수정합니다.
     */
    TistoryApi.prototype.modifyComment = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_10;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "POST",
                                url: "https://www.tistory.com/apis/comment/modify",
                                data: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_10 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_10 === null || err_10 === void 0 ? void 0 : err_10.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 특정 댓글 하나를 삭제합니다.
     */
    TistoryApi.prototype.deleteComment = function (arg) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_11;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default({
                                method: "POST",
                                url: "https://www.tistory.com/apis/comment/delete",
                                data: this.dataMiddleware(arg),
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res.data.tistory];
                    case 2:
                        err_11 = _d.sent();
                        throw new Error((_c = (_b = (_a = err_11 === null || err_11 === void 0 ? void 0 : err_11.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.tistory) === null || _c === void 0 ? void 0 : _c.error_message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TistoryApi;
}());
exports.TistoryApi = TistoryApi;
//# sourceMappingURL=tistory-api.js.map
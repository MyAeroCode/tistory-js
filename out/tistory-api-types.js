"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 게시글 발행 상태
 */
var PostVisiblity;
(function (PostVisiblity) {
    /**
     * 비공개
     */
    PostVisiblity[PostVisiblity["HIDDEN"] = 0] = "HIDDEN";
    /**
     * 보호
     */
    PostVisiblity[PostVisiblity["PROTECT"] = 1] = "PROTECT";
    /**
     * 발행
     */
    PostVisiblity[PostVisiblity["PUBLISH"] = 3] = "PUBLISH";
})(PostVisiblity = exports.PostVisiblity || (exports.PostVisiblity = {}));
//# sourceMappingURL=tistory-api-types.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tistory API V1
 */
var TistoryApiV1Types;
(function (TistoryApiV1Types) {
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
    })(PostVisiblity = TistoryApiV1Types.PostVisiblity || (TistoryApiV1Types.PostVisiblity = {}));
})(TistoryApiV1Types = exports.TistoryApiV1Types || (exports.TistoryApiV1Types = {}));
//# sourceMappingURL=tistory-api-v1-types.js.map
/**
 * 티스토리 API를 호출할 수 있는 키
 */
export interface TistoryKey {
    /**
     * 클라이언트 키 (= App ID)
     */
    client: string;
    /**
     * 시크릿 키
     */
    secret: string;
}
/**
 * 게시글 발행 상태
 */
export declare enum PostVisiblity {
    /**
     * 비공개
     */
    HIDDEN = 0,
    /**
     * 보호
     */
    PROTECT = 1,
    /**
     * 발행
     */
    PUBLISH = 3
}
/**
 * 티스토리 계정 정보
 */
export interface TistoryAccountInfo {
    /**
     * 티스토리 아이디
     */
    id: string;
    /**
     * 티스토리 비밀번호
     */
    pw: string;
}
/**
 * 모든 API에서 기본적으로 사용되는 입력
 */
export declare type CommonInput = {
    /**
     * 액세스 토큰
     */
    access_token: string;
};
//# sourceMappingURL=common.d.ts.map
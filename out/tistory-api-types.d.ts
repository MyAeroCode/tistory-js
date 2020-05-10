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
//# sourceMappingURL=tistory-api-types.d.ts.map
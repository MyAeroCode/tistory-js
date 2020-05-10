import { TistoryApiV1Types } from "./tistory-api-v1-types";
/**
 * Tistory API를 호출할 수 있는 객체.
 */
export declare class TistoryApiV1 {
    /**
     * 티스토리 API를 호출할 수 있는 키
     */
    private readonly key;
    /**
     * 데이터에 공용 속성을 부여한다.
     */
    private dataMiddleware;
    constructor(key: TistoryApiV1Types.TistoryKey);
    /**
     * 어떤 유저의 아이디와 비밀번호를 직접받아 코드를 받아온다.
     * 이 코드를 getAccessTokenViaCode에 전달하면 액세스 토큰을 얻을 수 있다.
     *
     * @param account 티스토리 계정 정보
     */
    getCodeViaAccountInfo(account: TistoryApiV1Types.TistoryAccountInfo): Promise<string>;
    /**
     * 클라이언트가 발급받은 코드로 액세스 토큰을 취득한다.
     *
     * @param code 클라이언트가 발급받은 코드값
     */
    getAccessTokenViaCode(code: string): Promise<string>;
    /**
     * 특정 게시글을 수정합니다.
     */
    modifyPost(arg: TistoryApiV1Types.ModifyPostInput): Promise<TistoryApiV1Types.ModifyPostOutput>;
}
//# sourceMappingURL=tistory-api-v1.d.ts.map
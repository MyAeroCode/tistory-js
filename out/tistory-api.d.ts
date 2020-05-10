import { TistoryKey, TistoryAccountInfo } from "./tistory-api-types";
/**
 * Tistory API를 호출할 수 있는 객체.
 */
export declare class TistoryApi {
    /**
     * 티스토리 API를 호출할 수 있는 키
     */
    private readonly key;
    constructor(key: TistoryKey);
    /**
     * 어떤 유저의 아이디와 비밀번호를 직접받아 코드를 받아온다.
     * 이 코드를 getAccessTokenViaCode에 전달하면 액세스 토큰을 얻을 수 있다.
     *
     * @param account 티스토리 계정 정보
     */
    getCodeViaAccountInfo(account: TistoryAccountInfo): Promise<string>;
    /**
     * 클라이언트가 발급받은 코드로 액세스 토큰을 취득한다.
     *
     * @param code 클라이언트가 발급받은 코드값
     */
    getAccessTokenViaCode(code: string): Promise<string>;
}
//# sourceMappingURL=tistory-api.d.ts.map
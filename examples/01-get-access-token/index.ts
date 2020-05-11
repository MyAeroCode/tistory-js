import { TistoryApi } from "../../v1";
// or
// const { TistoryApi } = require("../../v1");

/**
 * 환경변수에 등록된 키와 계정정보를 사용하여,
 * 액세스 토큰을 얻는 예제입니다.
 */
async function main() {
    try {
        //
        // 키를 사용하여 API 객체를 생성한다.
        const api = new TistoryApi();

        //
        // 계정정보를 직접 입력하여 코드를 얻는다.
        const code: string = await api.getCodeViaAccountInfo();

        //
        // 코드를 사용하여 액세스 토큰을 얻는다.
        const accessToken: string = await api.getAccessTokenViaCode(code);

        //
        // 얻은 코드와 액세스 토큰을 출력한다.
        console.log("code", code);
        console.log("accessToken", accessToken);
    } catch (e) {
        //
        // 실패
        console.error(e.message);
    }
}
main();

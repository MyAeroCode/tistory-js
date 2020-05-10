import { TistoryApi } from "../../src/v1";

async function main() {
    try {
        //
        // 키를 사용하여 API 객체를 생성한다.
        const api = new TistoryApi({
            client: "YOUR_CLIENT_KEY",
            secret: "YOUR_SECRET_KEY",
        });

        //
        // 계정정보를 직접 입력하여 코드를 얻는다.
        const code: string = await api.getCodeViaAccountInfo({
            id: "TISTORY_ID",
            pw: "TISTORY_PW",
        });

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

import { TistoryApi } from "../../src";

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
        const access_token: string = await api.getAccessTokenViaCode(code);

        //
        // 게시글을 수정한다.
        const res = await api.modifyPost({
            access_token,
            blogName: "YOUR_BLOG_ID",
            postId: "YOUR_POST_ID",

            title: "제목이 수정되었습니다!",
            content: "내용이 수정되었습니다!",
        });

        console.log("done", res);
    } catch (e) {
        console.error("err", e.message);
    }
}
main();

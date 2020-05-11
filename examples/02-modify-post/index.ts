import { TistoryApi } from "../../v1";
// or
// const { TistoryApi } = require("../../v1");

/**
 * 게시글을 수정하는 예제입니다.
 */
async function main() {
    try {
        const api = new TistoryApi();
        const code: string = await api.getCodeViaAccountInfo();
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

        //
        // 성공 응답
        console.log(res);
    } catch (e) {
        //
        // 실패 응답
        console.error(e.message);
    }
}
main();

import axios, { AxiosResponse } from "axios";
import qs from "qs";
import {
    TistoryKey,
    TistoryAccountInfo,
    ModifyPostInput,
    ModifyPostOutput,
    ListPostInput,
    ListPostOutput,
    BlogInfoOutput,
    BlogInfoInput,
    ReadPostInput,
    ReadPostOutput,
    WritePostInput,
    WritePostOutput,
    ListCategoryInput,
    ListCategoryOutput,
    AttachPostInput,
    DeleteCommentInput,
    DeleteCommentOutput,
    ModifyCommentInput,
    ModifyCommentOutput,
    WriteCommentInput,
    WriteCommentOutput,
    ListCommentInput,
    ListCommentOutput,
} from "./types";
const unirest = require("unirest");

/**
 * 티스토리 URL.
 */
const tistoryUrl = "https://tistory.com";

/**
 * Tistory API를 호출할 수 있는 객체.
 */
export class TistoryApi {
    /**
     * 티스토리 API를 호출할 수 있는 키
     */
    private readonly key: TistoryKey;

    /**
     * 데이터에 공용 속성을 부여한다.
     */
    private dataMiddleware(data: any): any {
        return Object.assign(data, {
            //
            // 티스토리 응답을 json 포맷으로 변환하기 위해 사용된다.
            output: "json",
        });
    }

    constructor(key: TistoryKey) {
        this.key = key;
    }

    /**
     * 어떤 유저의 아이디와 비밀번호를 직접받아 코드를 받아온다.
     * 이 코드를 getAccessTokenViaCode에 전달하면 액세스 토큰을 얻을 수 있다.
     *
     * @param account 티스토리 계정 정보
     */
    public async getCodeViaAccountInfo(
        account: TistoryAccountInfo
    ): Promise<string> {
        /**
         * 로그인 시도 응답
         */
        let loginRes: AxiosResponse<any>;
        try {
            loginRes = await axios({
                method: "POST",
                url: "https://www.tistory.com/auth/login",
                data: qs.stringify({
                    fp: 1,
                    loginId: account.id,
                    password: account.pw,
                    redirectUrl: tistoryUrl,
                }),

                //
                // 302 응답을 캡쳐하기 위해 리다이렉트를 비활성화하고,
                // 302 응답이 아니면 에러를 발생시키도록 한다.
                maxRedirects: 0,
                validateStatus: function (status) {
                    return status === 302;
                },
            });
        } catch (e) {
            throw "로그인에 실패했습니다.";
        }

        /**
         * 티스토리 로그인 응답에서 취득한 쿠키
         */
        const loginCookie = (loginRes["headers"]["set-cookie"] as string[])
            .map(function (setCookie) {
                const miniCookie = setCookie.split(";")[0];
                return miniCookie;
            })
            .join(";");

        //
        // 세션이 취득되었는지 검사한다.
        if (loginCookie.indexOf("TSSESSION") === -1) {
            throw "세션이 반환되지 않았습니다.";
        }

        /**
         * 코드 취득 응답
         */
        const authRes = await axios({
            method: "GET",
            url: "https://www.tistory.com/oauth/authorize?",

            params: {
                client_id: this.key.client,
                redirect_uri: tistoryUrl,
                response_type: "code",
            },

            headers: {
                cookie: loginCookie,
            },
        });

        /**
         * 코드 후보군
         */
        const authCodeCandidates: string[] | undefined = authRes.data.match(
            /code=[^&']+/gm
        );

        //
        // 코드 후보군에 값이 단 하나만 있어야 한다.
        if (authCodeCandidates === undefined) {
            throw "코드가 반환되지 않았습니다.";
        }
        if (authCodeCandidates.length > 1) {
            throw `코드 후보가 너무 많습니다. ${JSON.stringify(
                authCodeCandidates,
                null,
                4
            )}`;
        }

        /**
         * 코드
         */
        const authCode = authCodeCandidates[0].slice(5);
        return authCode;
    }

    /**
     * 클라이언트가 발급받은 코드로 액세스 토큰을 취득한다.
     *
     * @param code 클라이언트가 발급받은 코드값
     */
    public async getAccessTokenViaCode(code: string): Promise<string> {
        const res = await axios({
            method: "GET",
            url: "https://www.tistory.com/oauth/access_token",
            params: {
                client_id: this.key.client,
                client_secret: this.key.secret,
                redirect_uri: tistoryUrl,
                response_type: "code",
                code: code,
                grant_type: "authorization_code",
            },
        });

        const { access_token } = res.data;
        if (access_token === undefined) {
            throw new Error(`액세스 토큰을 받아올 수 없었습니다.`);
        }
        return access_token;
    }

    /**
     * 자신이 갖고있는 블로그 리스트를 가져옵니다.
     */
    public async blogInfo(arg: BlogInfoInput): Promise<BlogInfoOutput> {
        try {
            const res = await axios({
                method: "GET",
                url: "https://www.tistory.com/apis/blog/info?",
                params: this.dataMiddleware(arg),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 블로그의 게시글 목록을 가져옵니다.
     */
    public async listPost(arg: ListPostInput): Promise<ListPostOutput> {
        try {
            const res = await axios({
                method: "GET",
                url: "https://www.tistory.com/apis/post/list?",
                params: this.dataMiddleware(arg),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 게시글 하나를 읽어옵니다.
     */
    public async readPost(arg: ReadPostInput): Promise<ReadPostOutput> {
        try {
            const res = await axios({
                method: "GET",
                url: "https://www.tistory.com/apis/post/read?",
                params: this.dataMiddleware(arg),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 블로그에 게시글을 작성합니다.
     */
    public async writePost(arg: WritePostInput): Promise<WritePostOutput> {
        try {
            const res = await axios({
                method: "POST",
                url: "https://www.tistory.com/apis/post/write",
                data: qs.stringify(this.dataMiddleware(arg)),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 블로그에 파일을 업로드합니다.
     * 단, 사진 파일만 올릴 수 있습니다.
     */
    public async attachPost(arg: AttachPostInput): Promise<AttachPostInput> {
        /**
         * @TODO
         *      axios로 보내기어려워 일단 unirest를 사용했습니다.
         *      나중에는 unirest를 제거하고 axios로만 보내야 합니다.
         */
        return new Promise(async function (resolve, reject) {
            unirest("POST", "https://www.tistory.com/apis/post/attach")
                .field("blogName", arg.blogName)
                .field("access_token", arg.access_token)
                .field("output", "json")
                .attach("uploadedfile", arg.filePath)
                .end(function (res: any) {
                    if (res.error) {
                        reject(
                            new Error(
                                res.body?.tistory?.error_message ||
                                    "네트워크 에러"
                            )
                        );
                    } else {
                        resolve(res?.body?.tistory);
                    }
                });
        });
    }

    /**
     * 특정 게시글을 수정합니다.
     */
    public async modifyPost(arg: ModifyPostInput): Promise<ModifyPostOutput> {
        try {
            const res = await axios({
                method: "POST",
                url: "https://www.tistory.com/apis/post/modify",
                data: qs.stringify(this.dataMiddleware(arg)),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 블로그의 카테고리 목록을 가져옵니다.
     */
    public async listCategory(
        arg: ListCategoryInput
    ): Promise<ListCategoryOutput> {
        try {
            const res = await axios({
                method: "GET",
                url: "https://www.tistory.com/apis/category/list?",
                params: this.dataMiddleware(arg),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 특정 게시글의 모든 댓글 목록을 가져옵니다.
     */
    public async listComment(
        arg: ListCommentInput
    ): Promise<ListCommentOutput> {
        try {
            const res = await axios({
                method: "GET",
                url: "https://www.tistory.com/apis/comment/list?",
                params: this.dataMiddleware(arg),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 댓글 하나를 작성합니다.
     */
    public async writeComment(
        arg: WriteCommentInput
    ): Promise<WriteCommentOutput> {
        try {
            const res = await axios({
                method: "POST",
                url: "https://www.tistory.com/apis/comment/write",
                data: this.dataMiddleware(arg),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 특정 댓글 하나를 수정합니다.
     */
    public async modifyComment(
        arg: ModifyCommentInput
    ): Promise<ModifyCommentOutput> {
        try {
            const res = await axios({
                method: "POST",
                url: "https://www.tistory.com/apis/comment/modify",
                data: this.dataMiddleware(arg),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }

    /**
     * 특정 댓글 하나를 삭제합니다.
     */
    public async deleteComment(
        arg: DeleteCommentInput
    ): Promise<DeleteCommentOutput> {
        try {
            const res = await axios({
                method: "POST",
                url: "https://www.tistory.com/apis/comment/delete",
                data: this.dataMiddleware(arg),
            });
            return res.data.tistory;
        } catch (err) {
            throw new Error(err?.response?.data?.tistory?.error_message);
        }
    }
}

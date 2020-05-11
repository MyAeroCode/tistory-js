import { TistoryKey, TistoryAccountInfo, ModifyPostInput, ModifyPostOutput, ListPostInput, ListPostOutput, BlogInfoOutput, BlogInfoInput, ReadPostInput, ReadPostOutput, WritePostInput, WritePostOutput, ListCategoryInput, ListCategoryOutput, AttachPostInput } from "./types";
/**
 * Tistory API를 호출할 수 있는 객체.
 */
export declare class TistoryApi {
    /**
     * 티스토리 API를 호출할 수 있는 키
     */
    private readonly key;
    /**
     * 데이터에 공용 속성을 부여한다.
     */
    private dataMiddleware;
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
    /**
     * 자신이 갖고있는 블로그 리스트를 가져옵니다.
     */
    blogInfo(arg: BlogInfoInput): Promise<BlogInfoOutput>;
    /**
     * 블로그의 게시글 목록을 가져옵니다.
     */
    listPost(arg: ListPostInput): Promise<ListPostOutput>;
    /**
     * 게시글 하나를 읽어옵니다.
     */
    readPost(arg: ReadPostInput): Promise<ReadPostOutput>;
    /**
     * 블로그에 게시글을 작성합니다.
     */
    writePost(arg: WritePostInput): Promise<WritePostOutput>;
    /**
     * 블로그에 파일을 업로드합니다.
     * 단, 사진 파일만 올릴 수 있습니다.
     */
    attachPost(arg: AttachPostInput): Promise<AttachPostInput>;
    /**
     * 특정 게시글을 수정합니다.
     */
    modifyPost(arg: ModifyPostInput): Promise<ModifyPostOutput>;
    /**
     * 블로그의 카테고리 목록을 가져옵니다.
     */
    listCategory(arg: ListCategoryInput): Promise<ListCategoryOutput>;
}
//# sourceMappingURL=tistory-api.d.ts.map
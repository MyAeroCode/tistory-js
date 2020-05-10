import { CommonInput } from "./common";
/**
 * 게시글 쓰기 API 입력
 */
export declare type WritePostInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;
    /**
     * 게시글 제목.
     */
    title: string;
    /**
     * 게시글 내용.
     */
    content?: string;
    /**
     * 발행상태.
     *     0 : 비공개 (기본값)
     *     1 : 보호
     *     3 : 발행
     */
    visibility?: 0 | 1 | 3;
    /**
     * 카테고리 아이디. (기본값 0)
     */
    category?: string;
    /**
     * 초 단위의 타임스탬프 형식이며,
     * 미래의 시간을 넣을 경우에는 예약이 활성화됩니다.
     */
    published?: number;
    /**
     * 문자 주소
     */
    slogan?: string;
    /**
     * 콤마로 구분되는 태그 문자열
     */
    tag?: string;
    /**
     * 댓글 허용여부
     */
    acceptComment?: 0 | 1;
    /**
     * 보호글 패스워드
     */
    password?: string;
};
/**
 * 게시글 쓰기 API 출력
 */
export declare type WritePostOutput = {
    /**
     * 글 번호
     */
    postId: string;
    /**
     * 발행 주소
     */
    url: string;
};
//# sourceMappingURL=write-post.d.ts.map
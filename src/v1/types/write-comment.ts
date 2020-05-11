import { CommonInput } from "./common";

/**
 * 댓글 작성 입력
 */
export type WriteCommentInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;

    /**
     * 숫자 형식의 게시글 식별자
     */
    postId: string;

    /**
     * 부모 댓글 식별자
     * 대댓글인 경우에 사용합니다.
     */
    parentId?: string;

    /**
     * 댓글 내용
     */
    content?: string;

    /**
     * 비밀댓글 여부
     *      0 : 공개 (기본값)
     *      1 : 비밀댓글
     */
    secret?: 0 | 1;
};

/**
 * 댓글 작성 출력
 */
export type WriteCommentOutput = {
    /**
     * HTTP 응답코드
     *
     * @example
     *      "200" : 정상응답
     */
    status: string;
};

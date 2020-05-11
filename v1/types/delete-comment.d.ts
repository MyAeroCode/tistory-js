import { CommonInput } from "./common";
/**
 * 댓글 삭제 입력
 */
export declare type DeleteCommentInput = CommonInput & {
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
     * 숫자 형식의 댓글 식별자
     */
    commentId: string;
};
/**
 * 댓글 삭제 출력
 */
export declare type DeleteCommentOutput = {
    /**
     * HTTP 응답코드
     */
    status: string;
};
//# sourceMappingURL=delete-comment.d.ts.map
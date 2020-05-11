import { CommonInput } from "./common";

/**
 * 특정 게시글 댓글목록 조회 입력
 */
export type ListCommentInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;

    /**
     * 숫자 형태의 게시글 식별자
     */
    postId: string;
};

/**
 * ListCommentOutput에 포함된 각 게시글 정보
 */
export type ListCommentEachItem = {
    /**
     * 숫자 형태의 댓글 식별자
     */
    id: string;

    /**
     * 댓글이 작성된 시각
     * 초 단위의 타임스탬프로 주어집니다.
     */
    date: string;

    /**
     * 작성자 이름
     */
    name: string;

    /**
     * 부모 댓글의 식별자
     * 대댓글인 경우에만 사용되며,
     * 부모 댓글이 없다면 빈 문자열이 주어집니다.
     */
    parentId: string;

    /**
     * 댓글 작성자의 홈페이지 주소
     */
    homepage: string;

    /**
     * 댓글 승인여부
     *
     * @example
     *      "0" : 승인대기
     *      "2" : 승인
     */
    visibility: "0" | "2";

    /**
     * 댓글 내용
     */
    comment: string;

    /**
     * 댓글 공개여부
     *
     * @example
     *      "Y" : 공개
     *      "N" : 비공개
     */
    open: "Y" | "N";
};

/**
 * 특정 게시글 댓글목록 조회 출력
 */
export type ListCommentOutput = {
    item: {
        /**
         * 티스토리 도메인을 기준으로 한 게시글 url
         */
        url: string;

        /**
         * 개인 도메인을 기준으로 한 게시글 url
         * 개인 도메인이 없다면 빈 문자열이 주어집니다.
         */
        secondaryUrl: string;

        /**
         * 숫자 형태의 게시글 식별자
         */
        postId: string;

        /**
         * 해당 게시글의 전체 댓글 개수
         */
        totalCount: string;

        /**
         * 댓글 리스트
         */
        comments: {
            comment: ListCommentEachItem[];
        };
    };
};

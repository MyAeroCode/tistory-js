import { CommonInput } from "./common";
/**
 * 특정 블로그의 최근 댓글목록 조회 입력
 */
export declare type NewestCommentInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;
    /**
     * 댓글 목록을 페이징했을 때, 가져올 페이지의 번호입니다.
     * 1부터 시작합니다.
     */
    page: number;
    /**
     * 몇 개를 기준으로 페이징할것인지 설정합니다.
     * 기본값은 10이고, 최대값도 10입니다.
     */
    count?: number;
};
/**
 * NewestCommentOutput에 포함된 각 게시글 정보
 */
export declare type NewestCommentEachItem = {
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
     * 이 댓글이 포함된 게시글의 숫자형태 식별자입니다.
     */
    postId: string;
    /**
     * 댓글 작성자 이름
     */
    name: string;
    /**
     * 댓글 작성자의 홈페이지 주소
     */
    homepage: string;
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
 * 특정 블로그의 최근 댓글목록 조회 출력
 */
export declare type NewestCommentOutput = {
    item: {
        /**
         * 티스토리 도메인을 기준으로 한 블로그 url
         */
        url: string;
        /**
         * 개인 도메인을 기준으로 한 블로그 url
         * 개인 도메인이 없다면 빈 문자열이 주어집니다.
         */
        secondaryUrl: string;
        /**
         * 댓글 리스트
         */
        comments: {
            comment: NewestCommentEachItem[];
        };
    };
};
//# sourceMappingURL=newest-comment.d.ts.map
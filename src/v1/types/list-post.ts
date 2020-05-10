import { CommonInput } from "./common";

/**
 * 게시글 목록 조회 API 입력
 */
export type ListPostInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;

    /**
     * 불러올 페이지 번호.
     */
    page: string;
};

/**
 * ListPostOutput에 포함된 각 게시글 정보
 */
export type ListPostEachItem = {
    /**
     * 숫자 기반의 게시글 식별자
     */
    id: string;

    /**
     * 게시글 제목
     */
    title: string;

    /**
     * 게시글 주소
     */
    postUrl: string;

    /**
     * 게시글 공개 수준
     *     0  : 비공개
     *     15 : 보호
     *     20 : 발행
     */
    visibility: 0 | 15 | 20;

    /**
     * 이 게시글이 포함된 가장 가까운 카테고리의 식별자
     */
    categoryId: string;

    /**
     * 댓글 수
     */
    comments: string;

    /**
     * 트랙백 수
     */
    trackbacks: string;

    /**
     * 게시글 발행 일자
     * YYYY-mm-dd HH:MM:SS 형식입니다.
     */
    date: string;
};

/**
 * 게시글 수정 API 출력
 */
export type ListPostOutput = {
    item: {
        /**
         * 티스토리 도메인 기준 블로그 url
         */
        url: string;

        /**
         * 개인 도메인을 기준 블로그 url
         * 개인 도메인이 없다면 빈 문자열이 주어집니다.
         */
        secondaryUrl: string;

        /**
         * 현재 페이지 번호
         * 1부터 시작합니다.
         */
        page: string;

        /**
         * 현재 페이지의 게시글 개수
         */
        count: string;

        /**
         * 해당 블로그의 전체 게시글 개수
         */
        totalCount: string;

        /**
         * 게시글 리스트
         */
        posts: ListPostEachItem[];
    };
};

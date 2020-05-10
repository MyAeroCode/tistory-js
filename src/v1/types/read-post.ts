import { PostVisiblity, CommonInput } from "./common";

/**
 * 게시글 조회 API 입력
 */
export type ReadPostInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;

    /**
     * 글 번호
     */
    postId: string;
};

/**
 * 게시글 조회 API 출력
 */
export type ReadPostOutput = {
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
     * 글 번호
     */
    id: string;

    /**
     * 게시글 제목
     */
    title: string;

    /**
     * 게시글 내용
     */
    content: string;

    /**
     * 이 게시글이 포함된 가장 가까운 카테고리의 식별자
     */
    categoryId: string;

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
    visibility: "0" | "15" | "20";

    /**
     * 댓글 허용여부
     */
    acceptComment: "0" | "1";

    /**
     * 태그 리스트
     */
    tags: {
        /**
         * 각 태그 이름
         */
        tag: string[];
    };

    /**
     * 댓글 개수
     */
    comments: string;

    /**
     * 트랙백 개수
     */
    trackbacks: string;

    /**
     * 발행시간 타임스탬프
     */
    date: string;
};

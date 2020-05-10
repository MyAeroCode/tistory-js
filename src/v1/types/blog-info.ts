import { CommonInput } from "./common";

/**
 * 자신의 블로그 목록 조회 API 입력
 */
export type BlogInfoInput = CommonInput;

/**
 * 블로그 컨텐츠 개수
 */
export type BlogInfoStatistics = {
    /**
     * 전체 게시글 개수
     */
    post: string;

    /**
     * 전체 댓글 개수
     */
    comment: string;

    /**
     * 전체 트랙백 개수
     */
    trackback: string;

    /**
     * 전체 방명록 개수
     */
    guestbook: string;

    /**
     * 전체 초대장 개수
     */
    invitation: string;
};

/**
 * BlogInfoOutput에 포함된 각 블로그 정보
 */
export type BlogInfoEachItem = {
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
     * 블로그 타이틀
     */
    titls: string;

    /**
     * 블로그 설명
     */
    description: string;

    /**
     * 대표블로그 여부
     */
    default: "Y" | "N";

    /**
     * 블로그 아이콘 URL
     */
    blogIconUrl: string;

    /**
     * 블로그 파비콘 URL
     */
    faviconUrl: string;

    /**
     * 대표 이미지 썸네일 URL
     */
    profileThumbnailImageUrl: string;

    /**
     * 대표 이미지 URL
     */
    profileImageUrl: string;

    /**
     * 블로그 아이디
     */
    blogId: string;

    /**
     * 블로그에서의 닉네임
     */
    nickname: string;

    /**
     * 블로그 권한
     */
    role: string;

    /**
     * 블로그 컨텐츠 개수
     */
    statistics: BlogInfoStatistics;
};

/**
 * 자신의 블로그 목록 조회 API 출력
 */
export type BlogInfoOutput = {
    item: {
        /**
         * 사용자의 로그인 아이디
         * 로그인 할 때 사용되는 아이디입니다.
         */
        id: string;

        /**
         * 사용자 식별자
         * 티스토리에서 내부적으로 관리하는 숫자 형태의 식별자입니다.
         */
        userId: string;

        /**
         * 블로그 리스트
         */
        blogs: BlogInfoEachItem[];
    };
};

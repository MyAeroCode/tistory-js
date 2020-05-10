/**
 * 티스토리 API를 호출할 수 있는 키
 */
export interface TistoryKey {
    /**
     * 클라이언트 키 (= App ID)
     */
    client: string;

    /**
     * 시크릿 키
     */
    secret: string;
}

/**
 * 게시글 발행 상태
 */
export enum PostVisiblity {
    /**
     * 비공개
     */
    HIDDEN = 0,

    /**
     * 보호
     */
    PROTECT = 1,

    /**
     * 발행
     */
    PUBLISH = 3,
}

/**
 * 티스토리 계정 정보
 */
export interface TistoryAccountInfo {
    /**
     * 티스토리 아이디
     */
    id: string;

    /**
     * 티스토리 비밀번호
     */
    pw: string;
}

/**
 * 모든 API에서 기본적으로 사용되는 입력
 */
export type CommonInput = {
    /**
     * 액세스 토큰
     */
    access_token: string;
};

/**
 * 게시글 수정 API 입력
 */
export type ModifyPostInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;

    /**
     * 글 번호
     */
    postId: string;

    /**
     * 덮어쓸 제목.
     */
    title: string;

    /**
     * 덮어쓸 내용.
     */
    content?: string;

    /**
     * 덮어쓸 발행상태.
     */
    visibility?: PostVisiblity;

    /**
     * 덮어쓸 카테고리 아이디.
     * 이 필드를 지정하면 카테고리가 이동됩니다.
     */
    category?: string;

    /**
     * 타임스탬프 형식이며,
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
     * 댓글 허용
     */
    acceptComment?: 0 | 1;

    /**
     * 보호글 패스워드
     */
    password?: string;
};

/**
 * 게시글 수정 API 출력
 */
export type ModifyPostOutput = {
    /**
     * 글 번호
     */
    postId: string;

    /**
     * 발행 주소
     */
    url: string;
};

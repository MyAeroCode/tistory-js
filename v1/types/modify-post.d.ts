import { PostVisiblity, CommonInput } from "./common";
/**
 * 게시글 수정 API 입력
 */
export declare type ModifyPostInput = CommonInput & {
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
export declare type ModifyPostOutput = {
    /**
     * 글 번호
     */
    postId: string;
    /**
     * 발행 주소
     */
    url: string;
};
//# sourceMappingURL=modify-post.d.ts.map
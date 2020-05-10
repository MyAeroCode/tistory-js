import { CommonInput } from "./common";
/**
 * 게시글 목록 조회 입력
 */
export declare type ListCategoryInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;
};
/**
 * 게시글 목록 조회 출력에 포함된 각 카테고리 정보
 */
export declare type ListCategoryEachItem = {
    /**
     * 숫자 기반의 카테고리 아이디
     */
    id: string;
    /**
     * 카테고리 이름
     */
    name: string;
    /**
     * 부모 카테고리 식별자
     * 부모 카테고리가 없는경우 빈 문자열로 주어집니다.
     */
    parent: string;
    /**
     * 부모 카테고리를 포함한 전체 이름.
     * '/'로 구분합니다.
     */
    label: string;
    /**
     * 해당 카테고리의 게시글 수.
     * 하위 카테고리도 카운트됩니다.
     */
    entries: string;
    /**
     * 관리자가 본 카테고리의 게시글 수.
     * 비공개 또는 보호된 글도 카운트됩니다.
     * 마찬가지로 하위 카테고리도 카운트됩니다.
     */
    entriesInLogin: string;
};
/**
 * 카테고리 조회 출력
 */
export declare type ListCategoryOutput = {
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
         * 카테고리 리스트
         */
        categories: ListCategoryEachItem[];
    };
};
//# sourceMappingURL=list-category.d.ts.map
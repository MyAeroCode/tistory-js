import { CommonInput } from "./common";
/**
 * 파일 첨부 입력
 */
export declare type AttachPostInput = CommonInput & {
    /**
     * 블로그 식별자
     * 티스토리 주소 xxx.tistory.com에서 xxx를 나타냅니다.
     */
    blogName: string;
    /**
     * 업로드하고자 하는 파일의 경로
     * 로컬 내 파일경로와 URL 모두 사용할 수 있습니다.
     *
     * @example
     *      절대경로 : "C:/Users/AeroCode/Pictures/이미지.jpg"
     *      상대경로 : "./이미지.png"
     *      URL : "https://www.google.com/images/.../이미지.png"
     *
     * @warrning
     *      이미지만 업로드할 수 있다는것에 유의해주세요.
     */
    filePath: string;
};
/**
 * 파일 첨부 출력
 */
export declare type AttachPostOutput = {
    /**
     * 업로드된 파일의 URL
     */
    url: string;
    /**
     * 업로드된 파일의 치환자
     */
    replacer: string;
};
//# sourceMappingURL=attach-post.d.ts.map
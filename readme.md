## [Unofficial] Tistory API

`Node.JS`에서 사용할 수 있는 `Tistory API` 구현체입니다. 현재 브라우저는 지원하지 않습니다. 🙅

---

### `API version 1`

#### 구현된 기능

-   [x] 블로그 정보 조회
-   [x] 게시글
    -   [x] 게시글 목록 조회
    -   [x] 게시글 조회
    -   [x] 게시글 작성
    -   [x] 게시글 수정
    -   [x] 파일 업로드
-   [x] 모든 카테고리 조회
-   [ ] 댓글
    -   [ ] 최근 댓글 목록 조회
    -   [ ] 게시글 댓글 목록 조회
    -   [ ] 게시글 댓글 작성
    -   [ ] 게시글 댓글 수정
    -   [x] 게시글 댓글 삭제

#### 시작하기

먼저 `App ID`와 `Secret Key`를 사용하여 API 객체를 생성합니다.

```ts
import { TistoryApi } from "tistory-api/v1";

const api = new TistoryApi({
    client: "YOUR_CLIENT_KEY",
    secret: "YOUR_SECRET_KEY",
});
```

클라이언트에게서 받은 `code`값을 사용하여 `AccessToken`을 취득합니다.
이렇게 취득된 `AccessToken`은 `3600초`동안만 유효합니다.

```ts
const access_token = await api.getAccessTokenViaCode(code);
```

서버가 없다면 직접 `계정정보`를 입력하여 `code`값을 얻어올 수 있습니다.

```ts
const code: string = await api.getCodeViaAccountInfo({
    id: "TISTORY_ID",
    pw: "TISTORY_PW",
});
```

액세스 토큰도 얻었다면 이제 `API`를 호출할 수 있습니다!
API의 상세스펙은 [티스토리 공식 도큐먼트](https://tistory.github.io/document-tistory-apis/)를 참조해주세요.

```ts
const res = await api.modifyPost({
    access_token,

    blogName: "YOUR_BLOG_ID",
    postId: "YOUR_POST_ID",

    title: "제목이 수정되었습니다!",
    content: "내용이 수정되었습니다!",
});
```

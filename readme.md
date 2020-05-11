## [Unofficial] Tistory.JS

`Node.JS`에서 사용할 수 있는 비공식 `Tistory API` 구현체입니다.

브라우저는 지원하지 않습니다. 🙅

---

## Installation

```bash
$ npm install tistory-js
```

---

## Tistory API V1

`V1 API`의 상세스펙은 [티스토리 공식 도큐먼트](https://tistory.github.io/document-tistory-apis/)에서 확인할 수 있습니다.

### 구현된 기능

현재 사용할 수 있는 기능은 다음과 같습니다.

-   [x] 블로그 정보 조회
-   [x] 게시글
    -   [x] 게시글 목록 조회
    -   [x] 게시글 조회
    -   [x] 게시글 작성
    -   [x] 게시글 수정
    -   [ ] 게시글 삭제 << **티스토리에서 지원하지 않습니다.**
    -   [x] 파일 업로드
-   [x] 모든 카테고리 조회
-   [x] 댓글
    -   [x] 최근 댓글 목록 조회
    -   [x] 게시글 댓글 목록 조회
    -   [x] 게시글 댓글 작성
    -   [x] 게시글 댓글 수정
    -   [x] 게시글 댓글 삭제

<br/>

### 튜토리얼

#### 1. API 객체 생성

먼저 `App ID`와 `Secret Key`를 사용하여 API 객체를 생성합니다.

명시적으로 인자로써 넘기거나, 암묵적으로 `환경변수`를 사용할 수 있습니다.

```ts
//
// using import
import { TistoryApi } from "tistory-js/v1";

//
// using require
const TistoryApi = require("tistory-js/v1");

//
// 명시적으로 키를 넘깁니다.
const api = new TistoryApi({
    client: "YOUR_CLIENT_KEY",
    secret: "YOUR_SECRET_KEY",
});

/**
 * 암묵적으로 키를 넘깁니다.
 * 이 경우에는, 아래의 환경변수를 사용합니다.
 *
 *  "TISTORY_API_APP_CLIENT" : 클라이언트 키
 *  "TISTORY_API_APP_SECRET" : 비밀 키
 */
const api = new TistoryApi();
```

<br/>

#### 2. 코드 발급받기

티스토리에서 `AccessToken`을 발급받기 위해서는, 사용자가 동의했을때 부여되는 `Code`값이 필요합니다.

현재 `Code`값을 받아오기 위한 방법들은 아래와 같습니다.

1. 유저가 승인했을 때 발생하는 리다이렉트 경로에 포함된 `Code` 파라미터 획득.
2. `계정정보`를 직접 입력하여 `Code`값 획득.

티스토리에서 공식적으로 지원하는 방법은 `1` 뿐입니다.

`2`는 `Tistory JS` 라이브러리에서 구현한 비공식 방법입니다.

```ts
/**
 * 명시적으로 계정정보를 넘겨서 코드를 얻습니다.
 */
const code: string = await api.getCodeViaAccountInfo({
    id: "TISTORY_ID",
    pw: "TISTORY_PW",
});

/**
 * 암묵적으로 계정정보를 넘겨서 코드를 얻습니다.
 * 이 경우에는, 아래의 환경변수를 사용합니다.
 *
 *  "TISTORY_API_USER_ID" : 로그인에 사용되는 아이디
 *  "TISTORY_API_USER_PW" : 로그인에 사용되는 비밀번호
 */
const code: string = await api.getCodeViaAccountInfo();
```

<br/>

#### 3. 액세스 토큰 발급받기

위에서 얻은 `code`값을 사용하여 `AccessToken`으로 교환받을 수 있습니다.

이렇게 취득된 `AccessToken`은 `3600초`동안만 유효합니다.

```ts
//
// 토큰으로 액세스 토큰 발급.
const access_token = await api.getAccessTokenViaCode(code);
```

<br/>

#### 4. API 사용

이 발급받은 `AccessToken`을 넘겨서 `API`를 사용할 수 있습니다! 😋

아래는 발급받은 `AccessToken`을 사용하여 게시글을 수정하는 예시입니다.

```ts
const res = await api.modifyPost({
    access_token,

    blogName: "YOUR_BLOG_ID",
    postId: "YOUR_POST_ID",

    title: "제목이 수정되었습니다!",
    content: "내용이 수정되었습니다!",
});
```

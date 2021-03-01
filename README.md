# prime-number-discriminator

https://prime-number-discriminator.herokuapp.com/

<hr>

## 목차
- [사용된 기술 스택](#사용된-기술-스택)
    - [Front](#front)
    - [Server](#server)
    - [DB](#db)
    - [Cloud](#cloud)
- [개발 일지](#개발-일지)
    - [210108 웹 통신 실습](#1-210108-프론트---백-통신-실습)
    - [210118 DB 연결](#2-210118-db-연결)
    - [210124 Heroku 배포](#3-210124-heroku-연동)
    - [210127 SCSS & .env 추가](#4-210127-scss--env-추가)
    - [210130 MVC모델 적용](#5-210130-mvc모델-적용)
    - [210206 `rank` 기능 개선](#6-210206-rank-업데이트-시-깜박임-해결)
    - [210221 OAuth 구현](#7-210221-oauth-실습)
    - [210228 EJS 리팩토링 & 소인수분해 구현](#8-ejs-리팩토링--소인수분해-구현)
    - [210301 Bootstrap 적용](#9-bootstrap-적용)

<hr>

## 사용된 기술 스택

### Front
- EJS
- SCSS
- CSS
- JavaScript

### Server
- Node.js

### DB
- MongoDB

### Cloud
- Heroku

<hr>

## 개발 일지

### 1. 210108 프론트 <-> 백 통신 실습
1. 사용자가 데이터 입력 후 `Result` 클릭
2. 서버로 데이터 전송
3. 소수인지 판별 후 `alert`으로 결과 알림

### 2. 210118 DB 연결
1. 사용자가 데이터 입력 후 `Result` 클릭
2. 서버로 데이터 전송
3. 소수인지 판별 후 DB에 저장
4. 최근 검색된 10개 항목 DB로부터 가져와서 `last`에 띄우기
5. 가장 많이 참조된 10개 항목 DB로부터 가져와서 `rank`에 띄우기

### 3. 210124 Heroku 연동
- #### Node.js <-> Heroku 연동
    이제 외부에서도 내가 만든 사이트에 접근할 수 있다.

### 4. 210127 SCSS & .env 추가
- #### .env
    `require('dotenv').config()`를 이용하여 `.env`파일 내용을 `process.env`로 가져올 수 있다.
- #### SCSS
    `CSS`에 여러 프로그래밍적 요소가 추가된 것. `CSS`파일이 많지 않아서 효과적이진 않았음.

### 5. 210130 MVC모델 적용
- #### 코드 리팩토링
    `HTML`과 `JS`분리 및 `MVC`모델을 적용하여 코드를 리팩토링

### 6. 210206 `rank` 업데이트 시 깜박임 해결
- #### 수정 전

    ```javascript
        const parent = document.getElementById("rank")

        while (parent.hasChildNodes())
            parent.removeChild(parent.firstChild)

        fetch("/rank")
        .then(async (response) => {
            const result = await response.json()
    ```

    이미 존재하는 데이터를 전부 삭제 후 비동기 요청을 보냈다. 응답이 오기까지 시간이 걸리기 때문에 깜박임이 생겼다.
    
- #### 수정 후

    ```javascript
        fetch("/rank")
        .then(async (response) => {
            const result = await response.json()

            const parent = document.getElementById("rank")

            parent.innerHTML = ""
    ```

    먼저 비동기 요청을 보낸 후 요청이 오면 기존 내용을 삭제한다. 기존 내용을 삭제하는 방법도 달라졌는데, 기존에는 부모 노드를 이용하여 자식 노드를 차례로 삭제하는 방법을 사용했다. 수정 후에는 부모 노드의 `innerHTML`에 빈 데이터를 넣음으로써 기존 내용을 삭제하는 방법을 사용했다. 

### 7. 210221 OAuth 실습
- #### 카카오계정으로 로그인 구현
    소수판별기와 어울리지는 않지만 공부삼아 구현해보았다. `OAuth`의 기본 동작만 구현하였고, 기존 사이트에는 회원가입 및 로그인 기능이 없기 때문에, 현재는 `Local Repository`의 `feature/oauth`에만 유지중이다.

### 8. EJS 리팩토링 & 소인수분해 구현
- #### EJS 리팩토링
    사이트에 처음 접속 & 새로고침 시 클라이언트에게 보여지는 `last`, `rank`테이블을 `EJS 템플릿`을 이용하여 구현하였다. 기존 방식보다 `route.js`와 `updateTables.js`, `common.js`파일이 훨씬 간단해졌다.
- #### 소인수분해 구현
    `last`, `rank`테이블에 있는 `Checkbox`클릭 시 해당 숫자의 소인수분해 결과를 볼 수 있다.

### 9. Bootstrap 적용
- #### Bootstrap 5.0 적용
    현재 사이트에 `Bootstrap 5.0`버전을 적용한 브랜치 `feature/bootstrap`을 생성하였다. 기존 UI보다 썩 마음에 들지 않아 `merge`는 하지 않았다.
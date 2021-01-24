# Database

## SQL?

- Structured Query Language
- MySQL, PostgreSQL ...

## NoSQL?

- Not only Structured Query Language
- MongoDB, Redis ...


| MySQL | MongoDB |
|:---:|:---:|
| More Mature | Shiny and New |
| Table Structure | Document Structure |
| Requires a Schema | More Flexible to Changes |
| Great with Relationships | Not Great with Relationships |
| Scales Vertically | Highly Scalable |

<br>
<hr>
<br>

# 소수 판별기 사이트

- ## 목표
    __최근 10개의 결과__ 에 대한 데이터를 DB로부터 받아온 다음, __보기 좋게(Num : Outcome 형태로)__ 사용자 화면으로 출력하자.

- ## 성공
    - 최근 10개의 결과 출력
    - 보기 좋게
    - 새로고침을 해도 출력 내용이 사라지지 않게

- ## 실패
    - 에러 처리(`num`에 `Number`형이 아닌 다른 값이 들어올 경우)
    - 랭킹 실시간 업데이트(새로고침 안해도 업데이트 되게끔)

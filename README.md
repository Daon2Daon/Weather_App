# 🌤️ 날씨 정보 웹 애플리케이션

OpenWeatherMap API를 활용한 모던 날씨 정보 웹 서비스입니다.

## ✨ 주요 기능

- 🔍 **지역 검색**: 도시 이름으로 실시간 검색 및 자동완성
- 🌡️ **현재 날씨**: 온도, 체감온도, 날씨 상태, 습도, 풍속 등 상세 정보
- 📅 **주간 예보**: 향후 5일간의 날씨 예보
- 🌓 **다크 모드**: 시스템 설정 자동 감지 및 수동 전환
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경 지원

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. API 키 설정

[OpenWeatherMap](https://openweathermap.org/api)에서 무료 API 키를 발급받은 후, 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **UI 컴포넌트**: shadcn/ui
- **아이콘**: Lucide React
- **테마**: next-themes
- **API**: OpenWeatherMap API

## 📂 프로젝트 구조

```
src/
├── app/              # Next.js App Router 페이지
├── components/       # React 컴포넌트
│   ├── weather/      # 날씨 관련 컴포넌트
│   └── ui/           # shadcn/ui 컴포넌트
├── lib/              # 유틸리티 함수
├── services/         # API 서비스
├── types/            # TypeScript 타입 정의
└── hooks/            # Custom React Hooks
```

## 🌟 주요 컴포넌트

- **LocationSearch**: 지역 검색 및 자동완성
- **CurrentWeather**: 현재 날씨 표시
- **WeatherDetails**: 상세 날씨 정보 (습도, 풍속, 강수확률)
- **WeeklyForecast**: 5일 주간 예보

## 🎨 기능 상세

### 지역 검색
- 2글자 이상 입력 시 자동 검색
- 디바운싱 적용 (500ms)
- 검색 결과 드롭다운 표시

### 날씨 정보
- 실시간 온도 및 체감온도
- 최고/최저 기온
- 날씨 아이콘 및 설명
- 습도, 풍속, 강수 확률

### UI/UX
- 부드러운 애니메이션 및 트랜지션
- 로딩 스켈레톤 UI
- 에러 핸들링 및 사용자 피드백
- 다크/라이트 모드 토글

## 📱 반응형 디자인

- **모바일**: 세로 레이아웃, 가로 스크롤 테이블
- **태블릿**: 최적화된 Grid 레이아웃
- **데스크톱**: 넓은 화면 활용

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 개발 구현 단계

### **Phase 1: 개발 환경 준비 및 기본 설정** 
**예상 시간: 30분**

1. **shadcn/ui 설치 및 초기 설정**
   - shadcn/ui 초기화
   - 필요한 테마 설정 (Tailwind CSS 통합)
   
2. **필수 shadcn/ui 컴포넌트 설치**
   - Card (메인 컨테이너)
   - Input, Button (지역 검색)
   - Command (자동완성)
   - Table (주간 예보)
   - Alert (에러/안내 메시지)
   - Skeleton (로딩 상태)

3. **환경 변수 설정**
   - `.env.local` 파일 생성
   - OpenWeatherMap API 키 설정

---

### **Phase 2: 프로젝트 구조 설계 및 타입 정의**
**예상 시간: 30분**

1. **폴더 구조 생성**
   ```
   src/
   ├── app/
   ├── components/        # UI 컴포넌트
   │   ├── weather/       # 날씨 관련 컴포넌트
   │   └── ui/            # shadcn/ui 컴포넌트
   ├── lib/               # 유틸리티 함수
   ├── types/             # TypeScript 타입 정의
   └── services/          # API 서비스
   ```

2. **TypeScript 타입 정의**
   - 날씨 데이터 인터페이스
   - API 응답 타입
   - 컴포넌트 Props 타입

---

### **Phase 3: API 통합 및 데이터 레이어 구현**
**예상 시간: 1시간**

1. **날씨 API 서비스 구현** (`services/weatherApi.ts`)
   - OpenWeatherMap API 클라이언트 생성
   - 현재 날씨 조회 함수
   - 주간 예보 조회 함수
   - 지역 검색 함수

2. **에러 핸들링 및 데이터 변환**
   - API 에러 처리 로직
   - 응답 데이터를 앱에서 사용하기 쉬운 형태로 변환

---

### **Phase 4: 핵심 기능 구현 (G-001: 지역 검색)**
**예상 시간: 1.5시간**

1. **지역 검색 컴포넌트** (`components/weather/LocationSearch.tsx`)
   - Input + Button UI 구현
   - 자동완성 기능 (Command 컴포넌트 활용)
   - 디바운싱 처리 (입력 최적화)
   - 검색 결과 드롭다운

2. **상태 관리**
   - 검색어 상태
   - 검색 결과 상태
   - 선택된 지역 상태

---

### **Phase 5: 날씨 정보 시각화 (G-002)**
**예상 시간: 2시간**

1. **G-002-1: 현재 날씨 컴포넌트** (`components/weather/CurrentWeather.tsx`)
   - Card 레이아웃 구성
   - 지역명, 현재 기온 (대형 텍스트)
   - 날씨 아이콘 (조건부 렌더링)
   - 날씨 설명, 체감온도, 최고/최저 기온

2. **G-002-2: 상세 날씨 컴포넌트** (`components/weather/WeatherDetails.tsx`)
   - Grid 레이아웃 (습도, 풍속, 강수확률)
   - 아이콘 + 텍스트 조합
   - 반응형 디자인

3. **G-002-3: 주간 예보 컴포넌트** (`components/weather/WeeklyForecast.tsx`)
   - Table 컴포넌트 활용
   - 5~7일 예보 데이터 표시
   - 날짜/요일, 아이콘, 최고/최저 기온
   - 모바일 가로 스크롤 처리

---

### **Phase 6: 메인 페이지 통합 및 상태 관리**
**예상 시간: 1시간**

1. **메인 페이지 재구성** (`app/page.tsx`)
   - 모든 컴포넌트 통합
   - 전역 상태 관리 (선택된 지역, 날씨 데이터)
   - 로딩/에러 상태 처리

2. **로딩 상태 UI**
   - Skeleton 컴포넌트로 로딩 UX 개선
   - 초기 로딩 및 검색 시 로딩 처리

3. **에러 처리**
   - Alert 컴포넌트로 에러 메시지 표시
   - API 오류, 네트워크 오류 등 처리

---

### **Phase 7: UI/UX 개선 및 반응형 디자인**
**예상 시간: 1.5시간**

1. **반응형 디자인 최적화**
   - 모바일, 태블릿, 데스크톱 레이아웃
   - Tailwind 브레이크포인트 활용 (`sm`, `md`, `lg`)

2. **다크 모드 완성**
   - 테마 토글 버튼 추가 (옵션)
   - shadcn/ui 테마 시스템과 통합
   - 모든 컴포넌트 다크 모드 스타일링

3. **애니메이션 및 트랜지션**
   - 날씨 데이터 전환 시 부드러운 애니메이션
   - 검색 결과 드롭다운 애니메이션

---

### **Phase 8: 최적화 및 마무리**
**예상 시간: 1시간**

1. **성능 최적화**
   - API 호출 캐싱
   - 불필요한 리렌더링 방지 (React.memo, useMemo)
   - 이미지 최적화

2. **접근성 개선**
   - ARIA 레이블 추가
   - 키보드 네비게이션 확인
   - 스크린 리더 지원

3. **코드 정리 및 문서화**
   - 주석 추가
   - README.md 업데이트 (실행 방법 등)
   - 불필요한 코드 제거

---

### **Phase 9: 테스트 및 디버깅 (선택사항)**
**예상 시간: 1시간**

1. **수동 테스트**
   - 다양한 지역 검색 테스트
   - 에러 케이스 확인
   - 다양한 디바이스/브라우저 테스트

2. **엣지 케이스 처리**
   - 네트워크 오류
   - 잘못된 검색어
   - API 제한 도달

---

### 📌 우선순위 및 권장사항

#### 필수 구현 (MVP)
- Phase 1-6: 핵심 기능 구현
- 기본적인 반응형 디자인

#### 권장 구현
- Phase 7: UI/UX 완성도 향상
- Phase 8: 성능 및 접근성

#### 선택사항
- Phase 9: 심화 테스트
- 추가 기능 (즐겨찾기, 위치 기반 자동 감지 등)

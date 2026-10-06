# JOB:IN — AI 직무 시뮬레이션 프로토타입

졸업작품 발표용 프론트엔드 프로토타입 (React + Vite, 더미 데이터 only)

## 실행
    npm install
    npm run dev        # http://localhost:5173 (같은 와이파이의 팀원은 표시되는 Network 주소로 접속)

## 팀원에게 웹으로 공유
    npm run build      # dist/ 폴더 생성 (정적 파일)
- Vercel / Netlify: 이 폴더를 연결하거나 `dist` 폴더를 드래그&드롭
- 또는 `npx vercel` 한 줄로 배포

## 시연 흐름
메인 → 백엔드 개발자 "체험 시작" → 메신저 질문 → 선택지 선택 → 선택 완료 → AI 피드백 → 다음 업무(API 설계)

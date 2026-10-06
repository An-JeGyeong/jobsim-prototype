// 요구사항 분석 이후 단계(명세서 작성 ~ 리포트)의 더미 데이터

export const intro = {
  title: '백엔드 개발자',
  subtitle: 'Campus Order 프로젝트',
  desc: 'K 소프트웨어 회사에서 신입 백엔드 개발자로 근무하는 나는, 대학 카페 모바일 주문 서비스 "Campus Order"의 주문 기능을 맡게 되었습니다. 기획자·선임·프론트엔드 팀원과 협업하며 실제 개발 업무를 체험해보세요.',
  // state: open(체험 가능) | included(체험 세션에 포함) | soon(준비 중)
  processes: [
    { no: 1, title: '프로젝트 기획 및 제안', state: 'soon' },
    { no: 2, title: '요구사항 분석 및 API 설계', state: 'open' },
    { no: 3, title: '데이터 모델링 및 DB 설계', state: 'soon' },
    { no: 4, title: '외부 서비스·기술 선정', state: 'included' },
    { no: 5, title: '구현 및 코드 리뷰', state: 'soon' },
    { no: 6, title: '테스트 및 품질 관리', state: 'soon' },
    { no: 7, title: '배포 및 운영', state: 'soon' },
    { no: 8, title: '모니터링 및 장애 대응', state: 'soon' },
    { no: 9, title: '서비스 개선 및 유지보수', state: 'soon' },
  ],
}

// ---------- API 명세서 작성 ----------
export const specTabs = [
  { id: 'create', label: '주문 생성', endpoint: 'POST /orders' },
  { id: 'list', label: '주문 조회', endpoint: 'GET /orders' },
  { id: 'cancel', label: '주문 취소', endpoint: 'PATCH /orders/{id}/cancel' },
]

export const specFields = [
  { id: 'req', label: '요청 데이터', placeholder: '예) storeId, menuId, quantity' },
  { id: 'res', label: '응답 데이터', placeholder: '예) orderId, totalPrice' },
  { id: 'flow', label: '상태 변화', placeholder: '예) 결제 완료 → 접수 대기' },
  { id: 'error', label: '예외 처리', placeholder: '예) 품절 시 409 응답' },
]

// 일부러 "주문 상태(status)"와 "접수 후 취소 불가" 예외가 빠진 초안 → 1차 피드백과 연결
export const specExample = {
  create: {
    req: 'storeId, items[{menuId, quantity}], paymentToken',
    res: 'orderId, totalPrice',
    flow: '결제 승인 후 주문 생성 → 접수 대기',
    error: '품절 메뉴 포함 시 409, 결제 실패 시 주문 미생성',
  },
  list: {
    req: 'storeId 또는 userId, 페이지 커서',
    res: 'orders[], nextCursor',
    flow: '상태 변화 없음 (조회 전용)',
    error: '권한 없는 매장 조회 시 403',
  },
  cancel: {
    req: 'orderId',
    res: 'orderId, canceledAt',
    flow: '접수 대기 → 취소됨',
    error: '이미 취소된 주문은 400',
  },
}
export const rationaleExample =
  '결제가 승인된 뒤에만 주문을 생성해 결제 실패 시 불필요한 주문 데이터가 남지 않도록 했고, 조회 API는 매장과 사용자를 같은 구조로 재사용할 수 있게 설계했습니다.'

export const emptySpec = Object.fromEntries(
  specTabs.map((t) => [t.id, Object.fromEntries(specFields.map((f) => [f.id, '']))]),
)

// "수정 예시 반영"
export function applyReviseExample(spec) {
  return {
    ...spec,
    create: { ...spec.create, res: 'orderId, status, totalPrice' },
    cancel: { ...spec.cancel, error: '이미 취소된 주문은 400, 접수 이후 주문은 409(ORDER_ALREADY_ACCEPTED)' },
  }
}

export const review1 = {
  from: 'junho',
  note: '응답 데이터에 주문 상태(status)가 없어서 매장·사용자 화면이 지금 주문이 어떤 상태인지 알 수 없어요. 또 "접수 이후에는 취소할 수 없다"는 예외 응답이 정의되어 있지 않습니다. 상태 값과 취소 불가 응답을 보완해 주세요.',
  tag: '수정 요청: 주문 상태 값 · 취소 불가 예외 응답',
}

export const review2 = [
  {
    from: 'seoyeon',
    text: '주문 상태가 바뀔 때마다 앱이 서버를 계속 조회하면 서버 부하가 커질 수 있어요. 매장 화면에 주문이 바로 보이게 하려면 다른 방법도 생각해 주세요.',
  },
  {
    from: 'minsu',
    text: '실시간 방식에 따라 서버 비용과 운영 난이도가 크게 달라져요. 학교 카페 규모에 맞는 방식인지 확인해 주세요.',
  },
]

export const directions = [
  { id: 1, title: '주기적 조회(폴링) 유지', pros: '구현이 단순하고 구조 변경이 적음', cons: '요청 증가로 서버 부하 상승' },
  { id: 2, title: 'SSE/WebSocket 실시간 푸시', pros: '주문이 즉시 매장 화면에 반영', cons: '연결 관리·운영 난이도 증가' },
  { id: 3, title: '푸시 알림 + 필요 시 조회', pros: '연결 유지 부담이 적음', cons: '알림 지연·누락 대비 필요' },
]
export const directionReasonExample =
  '매장 직원은 주문을 즉시 확인해야 하므로 실시간 반영이 중요하다고 판단했고, 동시 접속이 많지 않은 캠퍼스 카페 규모에서는 SSE 정도의 연결 관리는 감당할 수 있다고 봤습니다.'

// ---------- 결제 대행사(PG) 비교 ----------
export const vendorRef = {
  names: ['A페이', 'B결제', 'C페이먼츠'],
  rows: [
    ['업체 소개', '간편결제 점유율 높음', '스타트업 특화 PG', '대기업 계열 PG'],
    ['연동 방식', 'REST API + SDK', 'REST API', 'SDK 중심'],
    ['연동 난이도', '쉬움', '보통', '어려움'],
    ['장애 대응', '24시간 지원', '평일 지원', '24시간 지원'],
    ['테스트 환경', '샌드박스 제공', '제한적', '샌드박스 제공'],
    ['정산 주기', 'D+2', 'D+5', 'D+1'],
    ['수수료', '2.8%', '2.2%', '3.3%'],
    ['예상 연동 기간', '5일', '8일', '12일'],
  ],
}
export const vendorInputRows = [
  { id: 'days', label: '연동 기간', unit: '일' },
  { id: 'fee', label: '수수료', unit: '%' },
  { id: 'settle', label: '정산 주기', unit: '일' },
]
export const vendorExample = {
  names: ['A페이', 'B결제', 'C페이먼츠'],
  values: [
    { days: '5', fee: '2.8', settle: '2' },
    { days: '8', fee: '2.2', settle: '5' },
    { days: '12', fee: '3.3', settle: '1' },
  ],
}

// ---------- 자기 평가 ----------
export const likertOptions = ['전혀 아니다', '아니다', '보통', '그렇다', '매우 그렇다']
export const selfQuestions = [
  '이 업무가 흥미로웠나요?',
  '수행 과정이 예상과 닮았나요?',
  '이 업무를 계속 수행하고 싶나요?',
]

// ---------- 리포트 ----------
export const burdenChips = {
  커뮤니케이션: ['요구사항 해석의 어려움', '기술 용어 이해 어려움'],
  '제약 상황': ['빠듯한 일정', '반복되는 수정', '제한적인 선택 자유도'],
}

export const nextSuggestions = ['동일 직무의 다른 업무', '유사 직무 비교', '필요한 기초 역량 체험', '현직자 인터뷰, 교육과정 추천']

// 체험 결과 → 리포트 데이터
export function buildResult({ choiceId, directionId, sent, answers, selfNote, notes }) {
  const hasty = choiceId === 3
  const interest = Math.round((((answers[0] + answers[2]) / 2 - 1) / 4) * 100)
  const confirmed = notes.filter((n) => n.done).length
  const understanding = Math.round((confirmed / notes.length) * 100)
  const dirScale = { 1: 20, 2: 80, 3: 50 }[directionId] ?? 50
  return {
    hasty,
    directionId,
    interest,
    understanding,
    selfNote,
    strengths: hasty
      ? ['"빠르게 구현을 시작하는 실행력"', '"피드백을 받은 뒤 명세를 바로 수정함"']
      : ['"구현 전에 모호한 조건을 먼저 확인함"', '"결제 실패 등 예외 상황을 먼저 떠올림"'],
    cautions: ['"실시간 반영 방식의 서버 부하를 피드백 이후에야 고려하는 경향"'],
    missed: ['"응답에 주문 상태 값을 포함하지 않음"', '"접수 이후 취소 불가 예외를 정의하지 않음"'],
    profile: [
      { left: '즉시 구현', right: '사전 확인', label: '요구사항 확인 성향', value: hasty ? 22 : 82 },
      { left: '방어적', right: '수용적', label: '피드백 대응', value: 72 },
      { left: '단순함 우선', right: '확장성 우선', label: '설계 기준', value: dirScale },
      { left: '독립 수행', right: '질문 활용', label: '협업 방식', value: Math.min(90, 20 + sent * 25) },
    ],
  }
}

export const defaultResult = buildResult({
  choiceId: 1, directionId: 2, sent: 2, answers: [3, 4, 4], selfNote: '', notes: [{ done: true }, { done: true }, { done: true }, { done: false }],
})

// 요구사항 분석 시나리오(문서 작성 ~ 리포트)의 더미 데이터
import { choices } from './dummyData.js'

export const intro = {
  title: '백엔드 개발자',
  subtitle: 'Campus Order 프로젝트',
  desc: 'K 소프트웨어 회사에 신입 백엔드 개발자로 입사한 나는, 대학 카페 모바일 주문 서비스 "Campus Order"의 주문 기능 개발 업무를 받았습니다. 팀장의 지시를 받고 기획자·선임 개발자와 소통하며 요구사항을 확인하고 문서로 정리해보세요.',
  // state: open(체험 가능) | soon(준비 중)
  processes: [
    { no: 1, title: '프로젝트 기획 및 제안', state: 'soon' },
    { no: 2, title: '요구사항 분석', state: 'open' },
    { no: 3, title: 'API 설계', state: 'soon' },
    { no: 4, title: '데이터베이스 설계', state: 'soon' },
    { no: 5, title: '구현 및 코드 리뷰', state: 'soon' },
    { no: 6, title: '테스트 및 품질 관리', state: 'soon' },
    { no: 7, title: '배포 및 운영', state: 'soon' },
    { no: 8, title: '장애 대응', state: 'soon' },
    { no: 9, title: '서비스 개선 및 유지보수', state: 'soon' },
  ],
}

// ---------- 요구사항 문서 작성 ----------
export const specLead = '기획자·선임과 확인한 내용을 기능별로 나누어 요구사항 문서를 작성하세요.'

export const specTabs = [
  { id: 'order', label: '주문 기능', scope: '사용자 → 장바구니 → 주문' },
  { id: 'store', label: '매장 확인', scope: '매장 직원 → 주문 확인' },
  { id: 'cancel', label: '취소·결제', scope: '주문 취소 · 결제 실패' },
]

export const specFields = [
  { id: 'story', label: '사용자 스토리', placeholder: '예) 사용자는 메뉴를 담아 바로 주문할 수 있다' },
  { id: 'must', label: '필수 조건', placeholder: '예) 결제가 완료된 주문만 생성한다' },
  { id: 'limit', label: '제약조건', placeholder: '예) 영업시간에만 주문 가능' },
  { id: 'edge', label: '예외 상황', placeholder: '예) 품절 메뉴가 포함되면 주문 불가' },
]

// 일부러 "주문 상태 정의"와 "접수 이후 취소 처리"가 빠진 초안 → 1차 피드백과 연결
export const specExample = {
  order: {
    story: '사용자는 메뉴를 장바구니에 담아 바로 주문할 수 있다',
    must: '결제가 완료된 주문만 생성한다',
    limit: '캠퍼스 카페 영업시간에만 주문 가능',
    edge: '품절 메뉴가 포함되면 주문할 수 없다',
  },
  store: {
    story: '매장 직원은 들어온 주문을 실시간으로 확인할 수 있다',
    must: '주문이 접수되면 사용자에게 알림을 보낸다',
    limit: '매장 태블릿 1대 기준',
    edge: '네트워크가 끊기면 재접속 후 누락 주문을 다시 보여준다',
  },
  cancel: {
    story: '사용자는 주문을 취소할 수 있다',
    must: '취소 시 결제 금액을 환불한다',
    limit: '취소 가능 시간은 추후 협의',
    edge: '결제에 실패하면 주문을 만들지 않는다',
  },
}
export const rationaleExample =
  '기획자와의 대화에서 확인한 내용을 기능별로 나누고, 결제 실패처럼 데이터 정합성에 영향을 주는 예외를 먼저 적었습니다.'

export const emptySpec = Object.fromEntries(
  specTabs.map((t) => [t.id, Object.fromEntries(specFields.map((f) => [f.id, '']))]),
)

// "수정 예시 반영"
export function applyReviseExample(spec) {
  return {
    ...spec,
    cancel: {
      ...spec.cancel,
      must: '취소 시 결제 금액을 환불한다. 주문 상태(접수 대기/접수/조리 중/완료)를 정의하고 접수 대기 상태에서만 취소할 수 있다',
      edge: '결제에 실패하면 주문을 만들지 않는다. 접수 이후 취소 요청은 거절하고 사용자에게 안내한다',
    },
  }
}

export const review1 = {
  from: 'junho',
  note: '"주문 취소" 조건에 상태 기준이 없어요. 접수 대기·접수·조리 중 같은 주문 상태 정의가 없으면 어느 시점까지 취소되는지 사람마다 다르게 해석합니다. 접수 이후 취소 요청이 들어왔을 때의 처리도 적어주세요.',
  tag: '수정 요청: 주문 상태 정의 · 접수 이후 취소 처리',
}

export const review2 = [
  {
    from: 'seoyeon',
    text: '매장에 주문이 "실시간"으로 보여야 한다고 했는데, 앱이 계속 서버를 조회하는 방식이면 부하가 커질 수 있어요. "실시간"의 기준을 어느 수준으로 정할지 정리해 주세요.',
  },
  {
    from: 'minsu',
    text: '실시간 수준에 따라 서버 비용과 운영 난이도가 크게 달라져요. 캠퍼스 카페 규모에 맞는 수준인지 확인해 주세요.',
  },
]

// 충돌하는 요구사항(기획 의도 vs 현실 제약) 해결
export const directions = [
  { id: 1, title: '수 초 간격 갱신으로 요구사항 조정', pros: '구현이 단순하고 비용이 낮음', cons: '즉시성이 떨어져 기획 의도와 차이' },
  { id: 2, title: '즉시 반영 유지, 구현 방식은 개발팀이 검토', pros: '기획 의도를 그대로 유지', cons: '비용·운영 난이도 증가' },
  { id: 3, title: '푸시 알림 중심으로 요구사항 재정의', pros: '연결 유지 부담이 적음', cons: '알림 지연·누락 대비 필요' },
]
export const directionReasonExample =
  '매장 직원이 주문을 바로 확인해야 하는 것이 핵심 요구라고 판단했고, 동시 접속이 많지 않은 캠퍼스 카페 규모에서는 즉시 반영을 유지하되 구현 방식은 개발팀과 비용을 보고 정하는 게 맞다고 봤습니다.'

// ---------- 결제 연동 제약 조사 ----------
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

const clamp = (v) => Math.max(30, Math.min(98, Math.round(v)))
const flat = (spec) => Object.values(spec).flatMap((t) => Object.values(t))

// 체험 결과 → 리포트 데이터 (규칙 기반 예시 점수: 프로토타입용)
export function buildResult({
  choiceId, directionId, directionReason = '', sent, answers, selfNote, notes,
  draftSpec, finalSpec, rationale = '', attached = false, vendorsFilled = true,
}) {
  const hasty = choiceId === 3
  const choice = choices.find((c) => c.id === choiceId)
  const dir = directions.find((d) => d.id === directionId)

  const interest = Math.round((((answers[0] + answers[2]) / 2 - 1) / 4) * 100)
  const confirmed = notes.filter((n) => n.done).length
  const understanding = Math.round((confirmed / notes.length) * 100)

  const finals = flat(finalSpec)
  const drafts = flat(draftSpec)
  const avgLen = Math.round(finals.reduce((s, v) => s + v.trim().length, 0) / finals.length)
  const changedCount = finals.filter((v, i) => v !== drafts[i]).length
  const reasonLen = directionReason.trim().length

  const scores = [
    {
      id: 'req', label: '요구사항 분석',
      score: clamp(hasty ? 45 : 68 + (confirmed / notes.length) * 25),
      evidence: hasty
        ? '확인 없이 구현부터 시작하려 해서 놓친 조건이 생길 수 있었어요.'
        : `"${choice?.title.replace(/한다\.$/, '')}"를 먼저 확인했어요. 확인된 항목은 ${confirmed}/${notes.length}개입니다.`,
    },
    {
      id: 'comm', label: '의사소통',
      score: clamp(40 + Math.min(sent, 3) * 15),
      evidence: sent >= 2
        ? `팀원에게 ${sent}번 질문하며 필요한 정보를 직접 확인했어요.`
        : `팀원에게 ${sent}번만 질문했어요. 모호한 조건은 더 물어보면 좋아요.`,
    },
    {
      id: 'solve', label: '문제 해결',
      score: clamp(55 + (reasonLen >= 40 ? 20 : 8) + (dir ? 10 : 0) + (vendorsFilled ? 8 : 0)),
      evidence: dir
        ? `충돌하는 의견 앞에서 "${dir.title}" 방향을 고르고 근거를 ${reasonLen}자로 설명했어요.`
        : '충돌하는 요구사항에 대한 방향을 정하지 않았어요.',
    },
    {
      id: 'change', label: '변화 대응',
      score: clamp(60 + (reasonLen >= 40 ? 12 : 4) + (hasty ? -8 : 6) + (vendorsFilled ? 8 : 0)),
      evidence: '2차 피드백에서 나온 새 관점(부하·비용)에 맞춰 요구 수준을 조정했어요. 돌발 요구사항 변경 이벤트는 본 개발에서 추가할 예정입니다.',
    },
    {
      id: 'doc', label: '문서 완성도',
      score: clamp(45 + Math.min(35, avgLen / 2) + (rationale.trim().length >= 30 ? 10 : 0)),
      evidence: `문서 항목 ${finals.length}개를 작성했고 평균 ${avgLen}자예요. 주문 상태 정의처럼 1차 피드백에서 빠졌던 항목이 있었습니다.`,
    },
    {
      id: 'fb', label: '피드백 반영',
      score: clamp(55 + Math.min(30, changedCount * 15) + (attached ? 8 : 0)),
      evidence: `1차 피드백 이후 ${changedCount}개 항목을 수정했고, 수정본 파일 첨부는 ${attached ? '했어요' : '하지 않았어요'}.`,
    },
  ]

  const dirScale = { 1: 80, 2: 20, 3: 55 }[directionId] ?? 50
  return {
    hasty,
    directionId,
    interest,
    understanding,
    selfNote,
    scores,
    strengths: hasty
      ? ['"빠르게 구현을 시작하는 실행력"', '"피드백을 받은 뒤 문서를 바로 수정함"']
      : ['"구현 전에 모호한 조건을 먼저 확인함"', '"결제 실패 등 예외 상황을 먼저 떠올림"'],
    cautions: ['"실시간 요구의 서버 부하·비용을 피드백 이후에야 고려하는 경향"'],
    missed: ['"주문 상태(접수 대기/접수/조리 중)를 정의하지 않음"', '"접수 이후 취소 요청 처리를 적지 않음"'],
    profile: [
      { left: '즉시 구현', right: '사전 확인', label: '요구사항 확인 성향', value: hasty ? 22 : 82 },
      { left: '방어적', right: '수용적', label: '피드백 대응', value: 72 },
      { left: '기획 의도 유지', right: '현실 제약 반영', label: '요구 조정 성향', value: dirScale },
      { left: '독립 수행', right: '질문 활용', label: '협업 방식', value: Math.min(90, 20 + sent * 25) },
    ],
  }
}

export const defaultResult = buildResult({
  choiceId: 1, directionId: 2, directionReason: directionReasonExample, sent: 2, answers: [3, 4, 4], selfNote: '',
  notes: [{ done: true }, { done: true }, { done: true }, { done: true }, { done: false }, { done: false }],
  draftSpec: specExample, finalSpec: applyReviseExample(specExample), rationale: rationaleExample, attached: true,
})

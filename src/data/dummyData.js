// 모든 데이터는 프론트엔드 하드코딩 더미 데이터입니다.

export const jobs = [
  {
    id: 'backend',
    title: '백엔드 개발자',
    desc: '서비스의 핵심 비즈니스 로직과 데이터 흐름을 설계하고 안정적인 API를 만들어보세요.',
    tags: ['API', 'Database', '요구사항분석', '문제해결'],
    active: true,
  },
  {
    id: 'frontend',
    title: '프론트엔드 개발자',
    desc: '사용자가 직접 만나는 화면을 설계하고 구현하며 경험을 다듬어보세요.',
    tags: ['UI', 'UX', '컴포넌트'],
    active: false,
  },
  {
    id: 'pm',
    title: '서비스 기획자',
    desc: '사용자 문제를 정의하고 팀이 만들 기능의 방향을 정리해보세요.',
    tags: ['기획', '커뮤니케이션'],
    active: false,
  },
  {
    id: 'data',
    title: '데이터 분석가',
    desc: '데이터를 탐색하고 의사결정에 필요한 인사이트를 찾아보세요.',
    tags: ['SQL', '분석', '시각화'],
    active: false,
  },
]

export const flow = [
  { no: '01', title: '직무 선택', desc: '체험하고 싶은 직무를 고릅니다.' },
  { no: '02', title: '가상의 프로젝트 배정', desc: '실제 회사 같은 프로젝트에 합류합니다.' },
  { no: '03', title: 'AI 팀원과 업무 수행', desc: 'AI 기획자·선임과 대화하며 일합니다.' },
  { no: '04', title: '나의 업무 행동 분석', desc: '결과뿐 아니라 과정까지 기록합니다.' },
  { no: '05', title: '직무 리포트 확인', desc: '나의 업무 방식과 직무 이해도를 확인합니다.' },
]

export const steps = ['프로젝트 배정', '요구사항 분석', 'API 설계', '피드백 수정', '기술 선택', '자기 평가', '직무 리포트']

export const project = {
  name: 'Campus Order',
  desc: '대학교 내 카페의 모바일 주문 서비스를 개발하는 프로젝트입니다.',
  role: '백엔드 개발자',
  task: '주문 API 요구사항 분석',
  situation:
    '기획자가 새로운 주문 기능을 요청했습니다. 요구사항을 확인하고 API 개발 전에 필요한 정보를 정리해보세요.',
}

export const initialMessages = [
  {
    id: 1,
    from: 'jisu',
    text: '현재 주문 기능에서는 사용자가 메뉴를 장바구니에 담고 바로 주문할 수 있도록 구현하려고 합니다.\n\n주문이 완료되면 매장에서도 실시간으로 주문 내역을 확인할 수 있었으면 합니다.',
    time: '09:32',
  },
  {
    id: 2,
    from: 'junho',
    text: '바로 구현하기 전에 기획 요구사항에서 빠진 부분이 없는지 먼저 확인해보세요.\n\n실무에서는 개발 전에 모호한 조건을 정리하는 것도 백엔드 개발자의 중요한 업무입니다.',
    time: '09:33',
  },
]

export const members = {
  jisu: { name: '김지수', role: '서비스 기획자' },
  junho: { name: '박준호', role: '백엔드 선임 개발자' },
  seoyeon: { name: '이서연', role: '프론트엔드 개발자' },
  minsu: { name: '최민수', role: '인프라 담당' },
  me: { name: '나', role: '백엔드 개발자' },
}

export const quickQuestions = [
  '주문 취소는 언제까지 가능한가요?',
  '결제가 실패하면 어떻게 처리하나요?',
  '품절 메뉴는 어떻게 하나요?',
]

// 사용자가 무엇을 입력하든 순서대로 나타나는 더미 답변
export const cannedReplies = [
  { from: 'jisu', text: '주문 취소는 매장에서 주문을 접수하기 전까지만 가능하도록 생각하고 있습니다.' },
  { from: 'jisu', text: '결제에 실패하면 주문은 만들어지지 않아야 해요. 사용자에게는 다시 시도할 수 있게 안내해주세요.' },
  { from: 'junho', text: '좋은 질문이에요. 주문 상태(접수 대기 / 접수 / 조리 중 / 완료)를 먼저 정의해두면 설계가 훨씬 쉬워집니다.' },
]

export const initialNotes = [
  { id: 'order', label: '사용자 주문 가능', done: true },
  { id: 'store', label: '매장 주문 확인', done: true },
  { id: 'cancel', label: '주문 취소 조건', done: false },
  { id: 'payment', label: '결제 실패 처리', done: false },
  { id: 'soldout', label: '품절 메뉴 처리', done: false },
  { id: 'status', label: '주문 상태 정의', done: false },
]

export const choices = [
  {
    id: 1,
    title: '주문 취소가 가능한 조건을 확인한다.',
    desc: '주문 상태에 따라 취소 가능 여부가 달라질 수 있습니다.',
    resolves: ['cancel', 'status'],
    log: '주문 취소 조건 확인',
  },
  {
    id: 2,
    title: '결제 실패 시 주문 데이터 처리 방식을 확인한다.',
    desc: '결제와 주문 생성 순서를 결정하기 위해 필요한 정보입니다.',
    resolves: ['payment'],
    log: '결제 예외 상황 확인',
  },
  {
    id: 3,
    title: '바로 주문 API 구현을 시작한다.',
    desc: '현재 확인된 요구사항을 기준으로 개발을 시작합니다.',
    resolves: [],
    log: '확인 없이 구현 시작 선택',
  },
]

export const feedbacks = {
  good: {
    title: '좋은 판단이에요.',
    body: '백엔드 개발에서는 구현 전에 예외 상황과 상태 변화를 명확하게 정의하는 것이 중요합니다.',
    behaviors: ['요구사항 분석', '사전 조건 확인', '예외 상황 고려'],
  },
  hasty: {
    title: '조금 서두른 선택일 수 있어요.',
    body: '확인되지 않은 조건이 많은 상태에서 구현을 시작하면, 나중에 API 구조를 다시 바꿔야 할 수 있습니다. 모호한 부분을 먼저 질문해보는 습관이 도움이 됩니다.',
    behaviors: ['빠른 실행력', '요구사항 확인 부족', '재작업 위험'],
  },
}

export const initialActivity = [
  { time: '09:32', text: '프로젝트 자료 확인' },
  { time: '09:34', text: '기획 요구사항 확인' },
  { time: '09:36', text: '주문 취소 조건 질문' },
  { time: '09:38', text: '결제 예외 상황 확인' },
]

export const apiDesign = {
  title: '확인한 요구사항을 바탕으로 주문 API 구조를 설계해보세요.',
  endpoints: [
    { method: 'GET', path: '/orders', desc: '내 주문 목록 / 매장 주문 목록 조회' },
    { method: 'POST', path: '/orders', desc: '장바구니 기준 주문 생성 (결제 성공 후)' },
    { method: 'PATCH', path: '/orders/{id}/cancel', desc: '접수 전 주문만 취소 가능' },
  ],
  hints: ['주문 상태 값은 무엇으로 정의할까?', '결제 실패 시 주문 데이터는 남길까?', '매장 실시간 확인은 어떤 방식이 좋을까?'],
}

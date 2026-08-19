export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  url?: string;
  github?: string;
  keyFeatures: {
    title: string;
    description: string;
    bullets: string[];
  }[];
  techStack: string[];
}

export interface SkillCategory {
  category: string;
  items: { name: string; evidence: string; desc: string }[];
}

export interface Award {
  title: string;
  organization: string;
  period: string;
  role: string;
  accomplishments: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string;
}

export const portfolioData = {
  personal: {
    name: "박성준 (Seongjun Park)",
    title: "백엔드 개발자",
    roleDescription: "Spring Boot 기반 MSA와 Node.js API 서버를 개발하고, 동시성 제어와 부하 테스트를 통해 데이터 정합성과 성능을 검증해 왔습니다. 최근에는 금융 도메인 노코드 멀티 에이전트를 기획하고 사내 Gemini Enterprise 교육 자료를 제작했습니다.",
    email: "rjqlrl30@naver.com",
    phone: "010-7723-8372",
    github: "https://github.com/seongxun",
    blog: "https://velog.io/@rjqlrl30",
    avatarSeed: "seongjun_park",
  },
  skills: [
    {
      category: "Backend",
      items: [
        { name: "Java", evidence: "FinLearn · CalIT", desc: "Spring Boot 서비스의 도메인 로직과 트랜잭션 경계를 구현했습니다." },
        { name: "Spring Boot", evidence: "FinLearn · CalIT", desc: "REST API, Gateway 연동, 서비스 디스커버리 기반 요청 흐름을 구성했습니다." },
        { name: "JPA (Hibernate)", evidence: "FinLearn · CalIT", desc: "엔티티 관계와 조회 로직을 설계하고 트랜잭션 단위의 데이터 변경을 처리했습니다." },
        { name: "Node.js", evidence: "HanArmy", desc: "Kakao Skill API 서버와 OpenAI API 비동기 콜백 흐름을 구현했습니다." }
      ]
    },
    {
      category: "Database & Cache",
      items: [
        { name: "PostgreSQL", evidence: "FinLearn · CalIT", desc: "관계형 스키마를 설계하고 계좌 단위 비관적 락으로 동시 주문을 제어했습니다." },
        { name: "Redis", evidence: "FinLearn · CalIT", desc: "로그아웃 토큰 블랙리스트와 서비스별 캐시·상태 저장 용도로 사용했습니다." }
      ]
    },
    {
      category: "Data Pipeline",
      items: [
        { name: "Kafka", evidence: "FinLearn · CalIT", desc: "서비스 간 이벤트 전달과 알림·리마인더 처리 흐름에 적용했습니다." }
      ]
    },
    {
      category: "DevOps & Infra",
      items: [
        { name: "Docker", evidence: "FinLearn · CalIT", desc: "서비스와 데이터베이스 실행 환경을 컨테이너로 구성해 개발 환경을 통일했습니다." },
        { name: "AWS", evidence: "팀 배포 환경", desc: "EC2·RDS·S3 기반 애플리케이션 배포와 외부 연결 구성을 경험했습니다." },
        { name: "GitHub Actions", evidence: "FinLearn · CalIT", desc: "빌드와 배포 단계를 자동화하고 브랜치 변경 시 검증 흐름을 구성했습니다." },
        { name: "JMeter", evidence: "FinLearn", desc: "단일 인스턴스와 Gateway 경유 시나리오를 분리해 평균·P95·처리량을 측정했습니다." }
      ]
    },
    {
      category: "AI Agent",
      items: [
        { name: "Gemini Enterprise", evidence: "GoldenPlanet", desc: "사내 교육 슬라이드를 제작하고 실습 안내를 진행했습니다." },
        { name: "No-code Multi-Agent", evidence: "GoldenPlanet", desc: "금융 도메인 적용을 가정한 노코드 멀티 에이전트 기획안을 설계했습니다." }
      ]
    }
  ] as SkillCategory[],
  projects: [
    {
      id: "finlearn",
      title: "FinLearn",
      subtitle: "금융 학습과 시즌제 모의투자를 결합한 MSA 기반 금융 플랫폼",
      period: "2026.04 ~ 2026.05 (2개월)",
      role: "팀 5인 · simulation-service 중심 백엔드 개발, user-service MVP 일부 담당",
      github: "https://github.com/F1NLEARN",
      techStack: ["Spring Boot", "Spring Cloud", "Eureka", "Kafka", "PostgreSQL", "Redis", "JMeter"],
      keyFeatures: [
        {
          title: "모의투자 도메인 API와 MSA 요청 흐름",
          description: "simulation-service 중심으로 계좌·종목·주문 도메인과 서비스 간 요청 흐름 구성",
          bullets: [
            "종목·관심종목·투자 계좌·매수 주문 API를 구현하고 PostgreSQL 기반 데이터 모델을 구성했습니다.",
            "Gateway-Eureka-service-DB 요청 흐름을 연결하고 팀의 MSA 구성 요소와 연동했습니다."
          ]
        },
        {
          title: "동시성 제어 및 부하 테스트",
          description: "동시 주문의 데이터 정합성을 보호하고 두 가지 요청 경로의 성능을 측정",
          bullets: [
            "계좌 단위 PESSIMISTIC_WRITE와 트랜잭션 처리로 동시 매수 요청 시 예수금과 주문 데이터의 정합성을 유지했습니다.",
            "단일 인스턴스 100명 요청에서 평균 23.2ms·P95 81ms·729.4 req/s·오류율 0%를 확인했고, Gateway 경유 50명·1,976건에서는 평균 4,133ms·P95 4,684ms 병목을 측정했습니다."
          ]
        }
      ]
    },
    {
      id: "calit",
      title: "CalIT",
      subtitle: "개발자 협업 및 일정 관리 서비스",
      period: "프로젝트 2024.09 ~ 2024.10 (1개월)",
      role: "한화시스템 BEYOND SW 캠프(교육 2024.04 ~ 2024.10) · 백엔드 개발자",
      techStack: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "Spring Security", "WebSocket"],
      keyFeatures: [
        {
          title: "협업 기능과 인증·인가 API 구현",
          description: "팀·일정·업무 데이터를 다루는 REST API와 권한별 접근 흐름 개발",
          bullets: [
            "Spring Boot·JPA 기반 REST API와 엔티티 관계를 설계하고 Swagger로 명세를 공유했습니다.",
            "Spring Security·JWT를 적용해 사용자와 팀 역할에 따른 접근 권한을 처리했습니다."
          ]
        },
        {
          title: "실시간 협업과 비동기 알림",
          description: "채팅·알림·업무 관리 기능을 하나의 워크스페이스로 연결",
          bullets: [
            "WebSocket/STOMP 채팅과 SSE 알림을 구현하고 Scrum·Kanban 업무 관리 흐름과 연동했습니다.",
            "Redis·Kafka·Spring Batch를 활용해 알림과 리마인더 처리 흐름을 분리했습니다."
          ]
        }
      ]
    }
  ] as Project[],
  awards: [
    {
      title: "하나 디지털 파워온 2기 | 우수상",
      organization: "하나금융그룹, 금융감독원",
      period: "2023.08 ~ 2023.12 (4개월)",
      role: "백엔드 및 AI 연동 담당",
      accomplishments: [
        "카카오 챗봇 기반 군 장병 맞춤형 휴가 준비 서비스 'HanArmy' 개발.",
        "Node.js·Express 기반 Kakao Skill API 서버와 Firestore 사용자별 휴가·입대·챗봇 상태 관리 기능을 구현했습니다.",
        "OpenAI API로 목적지·기간·예산 기반 휴가 일정을 생성하고 Kakao callbackUrl을 활용한 비동기 응답 흐름을 구성했습니다.",
        "휴가 준비 과정과 금융 상품 추천을 연결한 서비스로 하나 디지털 파워온 2기 우수상을 수상했습니다."
      ]
    }
  ] as Award[],
  educations: [
    {
      institution: "서강대학교",
      degree: "컴퓨터공학 학사",
      period: "2017.03 ~ 2024.02 졸업",
      details: "운영체제, 자료구조, 컴퓨터 네트워크 등 컴퓨터공학 기초 학습"
    }
  ] as Education[],
  qualifications: [
    { name: "ADsP (데이터분석 준전문가)", authority: "한국데이터산업진흥원", date: "2025.03" },
    { name: "TOEIC", authority: "895점", date: "2024.08.25" }
  ]
};

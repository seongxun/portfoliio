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
  items: { name: string; level: 'Expert' | 'Advanced' | 'Intermediate'; desc: string }[];
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
    title: "신뢰할 수 있는 시스템을 만드는 백엔드 개발자",
    roleDescription: "성능, 정합성, 운영 안정성을 집요하게 고민하며 단순한 기능 구현을 넘어 비즈니스의 신뢰를 지탱하는 백엔드 시스템을 만듭니다.",
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
        { name: "Java", level: "Advanced", desc: "객체지향 설계와 동작 원리를 깊이 이해하고 멀티스레드 환경을 제어합니다." },
        { name: "Spring Boot", level: "Advanced", desc: "웹 애플리케이션 프레임워크를 활용해 비즈니스 레이어를 효율적이고 정밀하게 설계합니다." },
        { name: "JPA (Hibernate)", level: "Advanced", desc: "영속성 컨텍스트, N+1 쿼리 이슈 탐색 및 지연 로딩을 통한 쿼리 최적화를 수행합니다." },
        { name: "Node.js", level: "Intermediate", desc: "이벤트 루프의 비동기 아키텍처를 이해하고 API 서버 및 파일럿 프로젝트를 탄탄히 구축합니다." }
      ]
    },
    {
      category: "Database & Cache",
      items: [
        { name: "PostgreSQL", level: "Advanced", desc: "인덱스 튜닝, 격리 수준(Isolation Level)을 고려한 동시성 제어 및 관계 설정과 스키마 설계를 진행합니다." },
        { name: "Redis", level: "Advanced", desc: "세션 보관, 분산 락, 글로벌 캐싱 레이어 활용을 통해 데이터베이스의 부하를 획기적으로 차단합니다." }
      ]
    },
    {
      category: "Data Pipeline",
      items: [
        { name: "Kafka", level: "Intermediate", desc: "이벤트 메시징 큐를 통해 마이크로서비스 간 느슨한 결합(Loose Coupling)과 이벤트 드리븐 비연동 처리를 설계합니다." }
      ]
    },
    {
      category: "DevOps & Infra",
      items: [
        { name: "Docker", level: "Advanced", desc: "컨테이너 가상화를 기반으로 애플리케이션의 이식성과 일관된 컨테이너 실행 환경을 보장합니다." },
        { name: "AWS", level: "Intermediate", desc: "EC2, RDS, S3 등 다양한 프리미엄 클라우드 서비스들의 구성 및 외부 자산 연결을 배포합니다." },
        { name: "CI/CD", level: "Intermediate", desc: "GitHub Actions를 활용하여 자동 빌드, 에러 체크 및 클라우드 즉각 배포 파이프라인을 가동합니다." }
      ]
    }
  ] as SkillCategory[],
  projects: [
    {
      id: "finlearn",
      title: "FinLearn",
      subtitle: "금융 학습과 시즌제 모의투자를 결합한 MSA 기반 금융 플랫폼",
      period: "2026.04 ~ 2026.05 (1개월)",
      role: "팀 5인 중 MSA 기반 금융 학습 플랫폼 백엔드 담당 (인증 및 모의투자 도메인 개발)",
      url: "http://finlearn.xyz",
      github: "https://github.com/F1NLEARN",
      techStack: ["Spring Boot", "Spring Cloud", "Eureka", "Kafka", "PostgreSQL", "Redis", "JMeter"],
      keyFeatures: [
        {
          title: "도메인 분리 및 비동기 이벤트 아키텍처",
          description: "소프트웨어 서비스의 확장성과 대용량 처리의 기초를 확보하기 위한 마이크로서비스 아키텍처 구축",
          bullets: [
            "Spring Boot, Spring Cloud Gateway, Eureka, Config Server를 기반으로 User, Quiz, Simulation, Season, Ranking, Achievement 서비스 전반을 철저히 분리.",
            "PostgreSQL, Redis, Kafka 활용 시드머니 자동 지급 및 랭킹/업적 반영을 위한 마이크로서비스 간 비동기 이벤트 흐름 형성."
          ]
        },
        {
          title: "동시성 제어 및 대용량 트래픽 안정성 검증",
          description: "금융 서비스에서 가장 예민하고 정합성이 중요한 거래 거래 대기 데이터 정렬 제어",
          bullets: [
            "모의투자 주문 시스템 내의 계좌 잔고 차감 및 락 걸림을 방지하기 위해 '계좌 단위 비관적 락(Pessimistic Lock)'을 적용하여 치명적인 레이스 컨디션을 전면 차단하고 데이터 정합성 완벽 보장.",
            "Apache JMeter를 통한 실무 부하 테스트 진행: 배포 서버에서 동시 사용자 50명 기준 총 1,976건의 실시간 주문 요청을 오류율 0.00%의 무결점 상태로 안정적 처리 확인."
          ]
        }
      ]
    },
    {
      id: "calit",
      title: "CalIT",
      subtitle: "개발자 협업 및 일정 관리 서비스",
      period: "2024.09 ~ 2024.10 (1개월)",
      role: "백엔드 개발자 (팀원)",
      techStack: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "Spring Security", "WebSocket"],
      keyFeatures: [
        {
          title: "핵심 API 설계 및 영속성 레이어 최적화",
          description: "팀 단위 협업 환경의 효율을 극대화하기 위한 안정적인 엔드포인트 설계",
          bullets: [
            "Spring Boot 개발 가이드라인을 준수하여 유기적인 객체 관계형 매핑 설계 및 도큐멘테이션에 특화된 Restful API 구현.",
            "사용자 및 팀 역할에 맞는 인증/인가 시스템(JWT, Security)을 배치하여 안전하고 권한에 맞는 자산 스케줄 제어 보장."
          ]
        },
        {
          title: "실시간 협업 및 동기화 구현",
          description: "일정 충돌 방지와 실시간 인터랙션 구축",
          bullets: [
            "팀원 간 일정 충돌 방지를 위한 실시간 트리거 로직 및 공동 작업 정보 전달 체계 구축 경험 내재화."
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
        "Node.js를 활용한 Kakao Skill API 서버 구축 및 Firebase Firestore 기반 실시간 사용자 휴가 상태/패턴 수집 및 상태 데이터 레이크 구현.",
        "OpenAI API 호출 연동 시 카카오톡 인터페이스에서 발생하는 치명적인 5초 응답 타임아웃 문제를 해결하기 위해, '카카오 callbackUrl' 구조의 비동기 분산 가공 방식을 적용하여 사용자 편의성(UX) 극대화.",
        "정방향 도메인 흐름 분석 및 이로부터 파생되는 장애 시나리오 극복을 위한 영리한 아키텍처 도입을 최고 등급으로 인정받아 최종 우수상(하나금융그룹 회장상 등급) 수상."
      ]
    }
  ] as Award[],
  educations: [
    {
      institution: "서강대학교",
      degree: "컴퓨터공학 학사",
      period: "2017.03 ~ 2024.02 졸업",
      details: "Sogang University - 컴퓨터 지식의 전반 및 데이터 구조와 데이터 처리에 대한 탄탄한 이론 및 설계 학습"
    }
  ] as Education[],
  qualifications: [
    { name: "ADsP (데이터분석 준전문가)", authority: "한국데이터산업진흥원", date: "2025.03" },
    { name: "영어 (English)", authority: "비즈니스 영문 커뮤니케이션 가능", date: "" }
  ]
};

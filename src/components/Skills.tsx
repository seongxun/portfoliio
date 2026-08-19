import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Database, Share2, Layers, Cpu, Compass, Info, CheckCircle2 } from "lucide-react";
import { portfolioData, SkillCategory } from "../data";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<{name: string, evidence: string, desc: string} | null>({
    name: "Spring Boot",
    evidence: "FinLearn · CalIT",
    desc: "REST API, Gateway 연동, 서비스 디스커버리 기반 요청 흐름을 구성했습니다."
  });

  // Unique project context mappings for interactive skill cards
  const skillMappings: Record<string, { applied: string; bullet: string }> = {
    "Java": {
      applied: "FinLearn / CalIT",
      bullet: "도메인 로직과 트랜잭션 경계를 구현하고 프로젝트 공통 개발 규칙에 맞춰 코드를 구성했습니다."
    },
    "Spring Boot": {
      applied: "FinLearn, CalIT",
      bullet: "REST API를 구현하고 Spring Cloud Gateway·Eureka와 서비스 요청 흐름을 연결했습니다."
    },
    "JPA (Hibernate)": {
      applied: "FinLearn / CalIT",
      bullet: "계좌·주문·팀·일정 도메인의 엔티티 관계와 트랜잭션 단위 데이터 변경을 구현했습니다."
    },
    "Node.js": {
      applied: "HanArmy 우수상 (하나 디지털 파워온)",
      bullet: "Kakao Skill API와 callbackUrl을 연결해 OpenAI 응답을 비동기로 전달했습니다."
    },
    "PostgreSQL": {
      applied: "FinLearn, CalIT",
      bullet: "관계형 스키마를 구성하고 FINLEARN 계좌 조회에 SELECT FOR UPDATE를 적용했습니다."
    },
    "Redis": {
      applied: "FinLearn / CalIT",
      bullet: "로그아웃 토큰 블랙리스트와 서비스 상태·캐시 저장 용도로 적용했습니다."
    },
    "Kafka": {
      applied: "FinLearn / CalIT",
      bullet: "서비스 간 이벤트 전달과 알림·리마인더 처리 흐름에 사용했습니다."
    },
    "Docker": {
      applied: "FinLearn / CalIT",
      bullet: "애플리케이션과 데이터 저장소를 컨테이너로 구성해 팀 개발 환경을 통일했습니다."
    },
    "AWS": {
      applied: "팀 배포 환경",
      bullet: "EC2·RDS·S3 기반 배포 구성과 애플리케이션 외부 연결을 경험했습니다."
    },
    "GitHub Actions": {
      applied: "FinLearn / CalIT",
      bullet: "브랜치 변경 시 빌드 검증과 원격 배포 단계를 자동화했습니다."
    },
    "JMeter": {
      applied: "FinLearn",
      bullet: "단일 인스턴스와 Gateway 경유 시나리오를 나눠 평균·P95·처리량·오류율을 측정했습니다."
    },
    "Gemini Enterprise": {
      applied: "GoldenPlanet",
      bullet: "Agent Designer 기반 교육자료와 Instructions·Knowledge·Preview·Guardrail·A/B Test 실습 흐름을 구성했습니다."
    },
    "Multi-Agent Design": {
      applied: "GoldenPlanet",
      bullet: "메인·하위 에이전트의 역할과 협업 규칙, 요청 기반 라우팅 구조를 설계했습니다."
    },
    "Prompt Evaluation": {
      applied: "GoldenPlanet",
      bullet: "Expected Output·근거·제약 조건을 기준으로 Test-Improve-Retest 검증을 수행했습니다."
    },
    "Product QA": {
      applied: "GoldenPlanet",
      bullet: "사내 MVP 기능을 점검하고 재현 절차와 개선안을 문서화했습니다."
    }
  };

  const categories = ["All", "Backend", "Database & Cache", "Data Pipeline", "DevOps & Infra", "AI Agent"];

  const getIconForCategory = (cat: string) => {
    switch (cat) {
      case "Backend": return <Code size={16} />;
      case "Database & Cache": return <Database size={16} />;
      case "Data Pipeline": return <Share2 size={16} />;
      case "DevOps & Infra": return <Layers size={16} />;
      default: return <Cpu size={16} />;
    }
  };

  // Get filtered items
  const allSkills = portfolioData.skills.flatMap(cat => 
    cat.items.map(item => ({ ...item, category: cat.category }))
  );

  const filteredSkills = selectedCategory === "All"
    ? allSkills
    : allSkills.filter(item => item.category === selectedCategory);

  const handleSkillClick = (skill: { name: string; evidence: string; desc: string }) => {
    setSelectedSkill(skill);
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
            TECH STACK & CAPABILITIES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-deep mt-3">
            프로젝트에서 사용한 기술과 적용 근거
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            숙련도 등급 대신 어떤 프로젝트에서 무엇을 구현했는지 설명합니다.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-semibold select-none duration-250 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-primary text-white shadow-md shadow-blue-500/10"
                  : "bg-white hover:bg-slate-100/70 border border-slate-200 text-slate-600"
              }`}
            >
              {selectedCategory === cat && getIconForCategory(cat)}
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Skill Section Grid split (List on Left, Interactive Detail on Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Grid of Skill Cards (Left) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map(skill => {
                const isSelected = selectedSkill?.name === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleSkillClick(skill)}
                    className={`p-4.5 rounded-xl border select-none cursor-pointer duration-200 transition-all ${
                      isSelected
                        ? "bg-white border-brand-primary shadow-md shadow-indigo-150/40 translate-y-[-2px]"
                        : "bg-white hover:bg-slate-50/50 border-slate-200/80 shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 capitalize">
                          {skill.category}
                        </span>
                        <h3 className="font-display font-bold text-base text-brand-deep">
                          {skill.name}
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-brand-primary">
                        {skill.evidence}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-3 line-clamp-2 leading-relaxed">
                      {skill.desc}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Interactive Skill Details Pane (Right) - Inspired by the Finexo feature list cards */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md shadow-indigo-50/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-light rounded-full blur-2xl -z-10" />
              
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-brand-light flex items-center justify-center text-brand-primary border border-indigo-100 font-bold text-sm">
                        {selectedSkill.name[0]}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-brand-deep">
                          {selectedSkill.name}
                        </h4>
                        <span className="text-xs text-brand-secondary font-semibold">
                          적용 근거: {selectedSkill.evidence}
                        </span>
                      </div>
                    </div>
                    
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                      <CheckCircle2 size={10} /> Active Stack
                    </span>
                  </div>

                  {/* Description breakdown */}
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-1">
                      기술 상세 설명 (Conceptual Overview)
                    </label>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedSkill.desc}
                    </p>
                  </div>

                  {/* Where is this applied mapped to real portfolio data */}
                  {skillMappings[selectedSkill.name] ? (
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4.5 flex flex-col gap-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase block">
                          실제 활용 프로젝트 (Project Application)
                        </span>
                        <span className="text-xs font-bold text-brand-deep">
                          {skillMappings[selectedSkill.name].applied}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 items-start text-xs text-slate-600 leading-normal">
                        <Info size={14} className="text-brand-primary shrink-0 mt-0.5" />
                        <p>{skillMappings[selectedSkill.name].bullet}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-2 text-xs text-slate-500 leading-normal select-none">
                      <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
                      <p>프로젝트 설명과 연결된 적용 사례를 정리 중입니다.</p>
                    </div>
                  )}

                  <hr className="border-slate-100" />

                  <p className="text-[11px] text-slate-400 font-mono">
                    기술별 설명은 실제 프로젝트 적용 범위를 기준으로 작성했습니다.
                  </p>
                </motion.div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-center gap-2">
                  <Compass size={28} className="animate-pulse" />
                  <p className="text-xs">기술 목록을 클릭해 프로젝트에서 사용한 방식과 근거를 살펴보세요.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

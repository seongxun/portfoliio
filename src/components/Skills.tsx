import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code, Database, Share2, Layers, Cpu, Compass, Info, CheckCircle2 } from "lucide-react";
import { portfolioData, SkillCategory } from "../data";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<{name: string, level: string, desc: string} | null>({
    name: "Spring Boot",
    level: "Advanced",
    desc: "웹 애플리케이션 프레임워크를 활용해 비즈니스 레이어를 효율적이고 정밀하게 설계합니다."
  });

  // Unique project context mappings for interactive skill cards
  const skillMappings: Record<string, { applied: string; bullet: string }> = {
    "Java": {
      applied: "FinLearn / CalIT",
      bullet: "객체 지향적 디자인 패턴 적용 및 멀티스레드 기반의 동작 흐름 완벽 제어"
    },
    "Spring Boot": {
      applied: "FinLearn, CalIT",
      bullet: "Spring Gateway 연동 및 Eureka 서비스 디스커버리, 독립 웹 MVC 라우팅 완벽 설계"
    },
    "JPA (Hibernate)": {
      applied: "FinLearn / CalIT",
      bullet: "지연 로딩과 페치 조인(Fetch Join)을 결합하여 N+1 성능 지연 원천 제거"
    },
    "Node.js": {
      applied: "HanArmy 우수상 (하나 디지털 파워온)",
      bullet: "Kakao Skill API와 비동기 콜백 큐를 연동하여 OpenAI 타임아웃 획기적 해결"
    },
    "PostgreSQL": {
      applied: "FinLearn, CalIT",
      bullet: "계좌 정합성을 위한 비관적 락(SELECT FOR UPDATE)을 걸고 동시 트레이딩을 안전 처리"
    },
    "Redis": {
      applied: "FinLearn",
      bullet: "고성능 글로벌 세션 임시 보관소 및 랭킹 산정을 위한 Sorted Set 자료구조 채용"
    },
    "Kafka": {
      applied: "FinLearn (MSA)",
      bullet: "모의투자 결과 전송 및 랭킹/업적 반영 이벤트를 비동기적으로 전파하여 결합도 최소화"
    },
    "Docker": {
      applied: "FinLearn / CalIT",
      bullet: "다양한 컨테이너별 독립 이미지 보관 및 일관적인 운영체제(OS) 중립 테스트 구축"
    },
    "AWS": {
      applied: "FinLearn 운영 서버",
      bullet: "EC2 인스턴스를 통한 Gateway, RDS 관리 및 외부 네트워크 안정 통신 구축"
    },
    "CI/CD": {
      applied: "FinLearn GitHub Actions",
      bullet: "메인 브랜치 코드 푸시 발생 시 Gradle 빌드 통과 여부 검증 후 원격 배포 자동화"
    }
  };

  const categories = ["All", "Backend", "Database & Cache", "Data Pipeline", "DevOps & Infra"];

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

  const handleSkillClick = (skill: { name: string; level: 'Expert' | 'Advanced' | 'Intermediate'; desc: string }) => {
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
            실전에서 검증된 기술들을 다룹니다
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            단순 기술 스택 나열을 넘어 실무 문제 해결을 위해 설계하고 집착스럽게 최적화한 기술들입니다.
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
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        skill.level === "Advanced"
                          ? "bg-blue-50 text-brand-primary"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {skill.level}
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
                          실전 역량: {selectedSkill.level}
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
                      <p>해당 스택은 박성준 개발자의 설계 핵심과 지반을 형성하며, 다양한 파일럿 시뮬레이션 및 API 시스템 구현에 유기적으로 배치되었습니다.</p>
                    </div>
                  )}

                  <hr className="border-slate-100" />

                  {/* Summary bullet tip */}
                  <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                    <span>* 박성준 백엔드 통합 레벨 검증필</span>
                    <span className="text-indigo-400 font-bold">STRICT_CHECK_OK</span>
                  </div>
                </motion.div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-center gap-2">
                  <Compass size={28} className="animate-pulse" />
                  <p className="text-xs">기술 목록을 클릭하여 실제 아키텍처에 구현되고 최적화된 상세 내역을 살펴보세요.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

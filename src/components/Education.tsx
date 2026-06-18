import { motion } from "motion/react";
import { GraduationCap, Award, Languages, Check, Calendar } from "lucide-react";
import { portfolioData } from "../data";

export default function Education() {
  return (
    <section id="education" className="py-20 bg-slate-50 relative border-t border-slate-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
            EDUCATION & QUALIFICATIONS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-deep mt-3">
            학습과 검증을 통한 견고한 토대
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            이론적 명료함과 성실도로 무장하여 한층 더 성숙하고 정교한 백엔드를 설계할 밑거름을 획득했습니다.
          </p>
        </div>

        {/* Qualification Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: University education */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-display font-bold flex items-center justify-center border border-indigo-100 shadow-tiny">
                <GraduationCap size={20} />
              </div>
              
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wide text-brand-secondary">SOGANG UNIV.</span>
                <h3 className="font-display font-bold text-base text-brand-deep mt-0.5">
                  서강대학교 학사 취득
                </h3>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  2017.03 ~ 2024.02 졸업
                </span>
                <p className="text-slate-600 text-xs mt-3.5 leading-relaxed">
                  컴퓨터공학과 진학을 통해 현대 운영체제(OS), 데이터 구조(Data Structure), 컴퓨터 네트워크 등 컴퓨터 사이언스의 기초 및 데이터 무결성 지식을 고전적인 대학 학습을 통해 두텁고 넓게 함양했습니다.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-[10.5px] font-mono text-brand-primary font-bold">
              <Check size={14} /> 학위 이수 완료 (BS Degree)
            </div>
          </div>

          {/* Card 2: ADsP Certificate */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-display font-bold flex items-center justify-center border border-amber-100 shadow-tiny">
                <Award size={20} />
              </div>
              
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wide text-amber-600">CERTIFICATION</span>
                <h3 className="font-display font-bold text-base text-brand-deep mt-0.5">
                  ADsP (데이터분석 준전문가)
                </h3>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  취득 시점: 2025.03
                </span>
                <p className="text-slate-600 text-xs mt-3.5 leading-relaxed">
                  한국데이터산업진흥원에서 엄격히 주관하는 공인 자격을 이수했습니다. 정형적 수치 가치, R 등 통계 메커니즘을 학습하여 시스템 내에서 일어나는 로그를 가공하거나 지표를 올바르게 측정할 분석 지반을 닦았습니다.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-[10.5px] font-mono text-amber-600 font-bold">
              <Check size={14} /> 공식 국가 공인 자격증 취득
            </div>
          </div>

          {/* Card 3: Languages & English capabilities */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-display font-bold flex items-center justify-center border border-emerald-100 shadow-tiny">
                <Languages size={20} />
              </div>
              
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wide text-emerald-700">LANGUAGES</span>
                <h3 className="font-display font-bold text-base text-brand-deep mt-0.5">
                  영어 (English Proficiency)
                </h3>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  비즈니스 및 도큐멘테이션 독해
                </span>
                <p className="text-slate-600 text-xs mt-3.5 leading-relaxed">
                  기술 서적 파헤치기, 최신 Stack의 Official Github Issue 탐방 등 글로벌 공학 아웃라인 지식을 무리 없이 독해합니다. 필요한 영문 API 명세 설계 및 외부 협업자 대응과 메일 커뮤니케이션 능력을 보유하고 있습니다.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-[10.5px] font-mono text-emerald-700 font-bold">
              <Check size={14} /> 글로벌 협업 준비 완료
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

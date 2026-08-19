import { motion } from "motion/react";
import { GraduationCap, Award, Languages, Check, BarChart3 } from "lucide-react";

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
            학력 및 자격
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            컴퓨터공학 전공 학습과 데이터 분석 자격, 공인 영어 성적을 정리했습니다.
          </p>
        </div>

        {/* Qualification Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          
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
                  컴퓨터공학과에서 운영체제, 자료구조, 컴퓨터 네트워크 등 백엔드 개발에 필요한 기초 과목을 이수했습니다.
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
                  데이터 이해, 분석 기획, 통계 분석의 기본 개념을 학습하고 자격을 취득했습니다.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-[10.5px] font-mono text-amber-600 font-bold">
              <Check size={14} /> 공식 국가 공인 자격증 취득
            </div>
          </div>

          {/* Card 3: Google Analytics */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary font-display font-bold flex items-center justify-center border border-blue-100 shadow-tiny">
                <BarChart3 size={20} />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold tracking-wide text-brand-primary">CERTIFICATION</span>
                <h3 className="font-display font-bold text-base text-brand-deep mt-0.5">
                  Google Analytics Certification
                </h3>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  취득 시점: 2026.08
                </span>
                <p className="text-slate-600 text-xs mt-3.5 leading-relaxed">
                  GA4의 이벤트·전환·획득 보고서와 탐색 분석의 기본 구조를 학습하고 인증을 취득했습니다.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-[10.5px] font-mono text-brand-primary font-bold">
              <Check size={14} /> Google Skillshop 인증
            </div>
          </div>

          {/* Card 4: TOEIC */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-display font-bold flex items-center justify-center border border-emerald-100 shadow-tiny">
                <Languages size={20} />
              </div>
              
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wide text-emerald-700">LANGUAGES</span>
                <h3 className="font-display font-bold text-base text-brand-deep mt-0.5">
                  TOEIC 895점
                </h3>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  응시일: 2024.08.25
                </span>
                <p className="text-slate-600 text-xs mt-3.5 leading-relaxed">
                  공인 성적으로 영어 독해와 청취 역량을 확인했습니다.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-[10.5px] font-mono text-emerald-700 font-bold">
              <Check size={14} /> 공인 영어 성적
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

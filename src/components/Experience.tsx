import { motion } from "motion/react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Presentation,
  SearchCheck,
  Workflow,
} from "lucide-react";

const responsibilities = [
  {
    icon: BookOpenCheck,
    title: "Gemini Enterprise 교육 콘텐츠 설계",
    description:
      "교육자료를 Agent Designer 중심으로 재구성하고, Instructions·Knowledge·Preview·Guardrail·A/B Test를 하나의 실습 흐름으로 설계했습니다.",
  },
  {
    icon: Workflow,
    title: "멀티에이전트 구조 및 라우팅 개선",
    description:
      "메인·업무파악·주간보고서 작성 에이전트의 역할과 협업 규칙을 정의하고, 고정 순차 호출을 요청 기반 동적 라우팅 방식으로 개선했습니다.",
  },
  {
    icon: SearchCheck,
    title: "프롬프트 품질 검증",
    description:
      "Expected Output·근거·제약 조건을 구체화하고 Test–Improve–Retest 방식으로 출력 형식과 제약 준수를 반복 검증했습니다.",
  },
  {
    icon: Presentation,
    title: "교육 운영 및 제품 QA",
    description:
      "교육 진행 후 참가자 피드백과 디브리핑 보고서를 정리하고, Cogito MVP QA·개선안 작성과 AI Summit 지원 준비를 맡았습니다.",
  },
];

const keywords = [
  "Gemini Enterprise",
  "Multi-Agent",
  "Prompt Design",
  "Product QA",
  "Google Cloud",
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 bg-slate-50 relative border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
            WORK EXPERIENCE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-deep mt-3">
            골든플래닛에서 수행한 AX 실무
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            AI Agent 교육 콘텐츠 설계부터 멀티에이전트 검증과 제품 QA까지 수행하고 있습니다.
          </p>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-md shadow-blue-500/10 shrink-0">
                <BriefcaseBusiness size={22} />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                  GOLDENPLANET · AX PRODUCT UNIT
                </p>
                <h3 className="font-display font-bold text-xl text-brand-deep mt-1">
                  (주)골든플래닛
                </h3>
                <p className="text-xs text-slate-500 mt-1">2026.07 ~ 현재</p>
              </div>
            </div>

            <div className="inline-flex self-start sm:self-auto items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              재직 중
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {responsibilities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="p-5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center shrink-0 border border-blue-100">
                        <Icon size={17} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-brand-deep">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed mt-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase shrink-0">
                <CheckCircle2 size={15} className="text-brand-primary" />
                Applied Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-2.5 py-1 rounded-md bg-blue-50 text-brand-primary border border-blue-100 text-[10px] font-mono font-semibold"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

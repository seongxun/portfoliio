import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Presentation,
  Workflow,
} from "lucide-react";

const responsibilities = [
  {
    icon: Workflow,
    title: "금융 도메인 노코드 멀티 에이전트 설계",
    description:
      "금융 도메인 적용을 가정한 노코드 멀티 에이전트 기획안을 설계했습니다.",
  },
  {
    icon: Presentation,
    title: "사내 Gemini Enterprise 교육 슬라이드 제작 및 실습 안내",
    description:
      "사내 Gemini Enterprise 교육 슬라이드를 제작하고 실습 안내를 진행했습니다.",
  },
];

const keywords = [
  "Gemini Enterprise",
  "No-code Multi-Agent",
  "교육 자료 제작",
  "실습 안내",
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
            노코드 멀티 에이전트 기획 및 GE 교육 자료 제작
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            금융 도메인 적용을 가정한 Gemini Enterprise 기반 기획안과 사내 교육 자료를 작성했습니다.
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
                <p className="text-xs text-slate-500 mt-1">AX Product Unit · 인턴</p>
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

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Github, BookOpen, Copy, Check, ShieldCheck, Zap, Database } from "lucide-react";
import { portfolioData } from "../data";

export default function About() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const values = [
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: "성능 (Performance)",
      desc: "불필요한 DB 쿼리와 트래픽 지연 요소를 제거하여 극한의 속도를 쫓습니다. 무거운 동기식 흐름을 비동기 이벤트(Kafka)로 풀어내 대용량 환경에서도 레이턴시를 최소화합니다.",
    },
    {
      icon: <Database className="text-brand-secondary" size={24} />,
      title: "정합성 (Consistency)",
      desc: "금융 데이터에서 타협이란 없습니다. Race Condition과 소동이 벌어지는 동시 요청 상황에서 비관적 락(Pessimistic Lock)과 분산 트랜잭션을 배치해 완벽한 정밀도를 보증합니다.",
    },
    {
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      title: "운영 안정성 (Stability)",
      desc: "배포는 시작일 뿐입니다. JMeter 부하 테스트를 통한 부하 한계를 계측하고, MSA 아키텍처 내에서 Gateway, Eureka의 헬스체크 및 서킷 브레이커 등을 고려해 무중단 운영을 희망합니다.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 px-3 py-1 rounded-full">
            ABOUT ME
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-deep mt-3">
            시스템의 신뢰를 기술로 구축합니다
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            비즈니스의 정점에 있는 금융 가치를 지키기 위해, 백엔드 아키텍처를 안전하고 빈틈없이 설계합니다.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left card: personal details card */}
          <div className="md:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100/80 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -z-10" />
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-blue-50/80 flex items-center justify-center font-display font-bold text-brand-primary text-xl border border-slate-200">
                  SJ
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-deep">
                    {portfolioData.personal.name}
                  </h3>
                  <p className="text-xs text-brand-primary font-medium">
                    Backend Engineer
                  </p>
                </div>
              </div>

              <blockquote className="text-sm font-medium italic text-slate-600 border-l-2 border-brand-primary pl-3.5 my-4 leading-normal">
                "성능, 정합성, 운영 안정성을 집요하게 고민하는 백엔드 아키텍처"
              </blockquote>
            </div>

            {/* Contacts list */}
            <div className="flex flex-col gap-3 mt-6">
              
              {/* Email */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 hover:border-indigo-100 transition-all">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="text-brand-secondary"><Mail size={16} /></div>
                  <span className="text-xs font-mono truncate text-slate-700">{portfolioData.personal.email}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.personal.email, "email")}
                  className="p-1 px-2 rounded hover:bg-slate-50 text-slate-400 hover:text-brand-primary transition-all flex items-center gap-1 cursor-pointer"
                  title="이메일 복사"
                >
                  {copiedKey === "email" ? (
                    <Check size={12} className="text-brand-accent font-bold" />
                  ) : (
                    <Copy size={12} />
                  )}
                  <span className="text-[10px] font-semibold">{copiedKey === "email" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 hover:border-indigo-100 transition-all">
                <div className="flex items-center gap-2.5">
                  <div className="text-brand-secondary"><Phone size={16} /></div>
                  <span className="text-xs font-mono text-slate-700">{portfolioData.personal.phone}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(portfolioData.personal.phone, "phone")}
                  className="p-1 px-2 rounded hover:bg-slate-50 text-slate-400 hover:text-brand-primary transition-all flex items-center gap-1 cursor-pointer"
                  title="번호 복사"
                >
                  {copiedKey === "phone" ? (
                    <Check size={12} className="text-brand-accent font-bold" />
                  ) : (
                    <Copy size={12} />
                  )}
                  <span className="text-[10px] font-semibold">{copiedKey === "phone" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* GitHub */}
              <a
                href={portfolioData.personal.github}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-2.5 p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-150 transition-all"
              >
                <div className="text-slate-800"><Github size={16} /></div>
                <span className="text-xs font-semibold text-slate-700 truncate">github.com/seongxun</span>
              </a>

              {/* Blog */}
              <a
                href={portfolioData.personal.blog}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center gap-2.5 p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-150 transition-all"
              >
                <div className="text-brand-primary"><BookOpen size={16} /></div>
                <span className="text-xs font-semibold text-slate-700 truncate">velog.io/@rjqlrl30</span>
              </a>

            </div>
          </div>

          {/* Right card: Core engineering beliefs */}
          <div className="md:col-span-8 grid gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-center">
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-primary mb-4">
                CORE STRENGTHS & PHILOSOPHY
              </h4>
              <div className="grid sm:grid-cols-3 gap-6">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex flex-col gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50/50 flex items-center justify-center transition-colors">
                      {v.icon}
                    </div>
                    <h5 className="font-display font-bold text-base text-brand-deep group-hover:text-brand-primary transition-colors">
                      {v.title}
                    </h5>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {v.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Nice extra highlight box */}
            <div className="p-5 rounded-xl bg-brand-light border border-slate-200 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <Check size={18} />
              </div>
              <p className="text-slate-600 text-xs leading-normal">
                박성준은 **비관적 락(Pessimistic Lock)**, **JVM 동기화 모니터**, **Kafka 비동기 큐잉**, **Spring Security** 등을 상황에 맞게 올바르게 적용하여 금융 및 일반 서비스의 트랜잭션 수치 손상 가능성을 물리치고 정밀하고 이상적인 시스템 동작을 창조합니다.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ExternalLink, 
  Github, 
  Check, 
  Cpu, 
  Radio, 
  Plus, 
  Trash2,
  CalendarDays
} from "lucide-react";
import { portfolioData } from "../data";

export default function Projects() {
  const currentProject = portfolioData.projects.find(p => p.id === "calit") || portfolioData.projects[1];
  
  // Interactive mock state for CalIT Schedule Demo
  const [tasks, setTasks] = useState([
    { id: 4928, title: "Spring Boot API 통합 설계", status: "COMPLETED", assignee: "박성준" },
    { id: 5001, title: "WebSocket 일정 동기화 트리거", status: "IN_PROGRESS", assignee: "박성준" },
    { id: 5012, title: "Spring Security JWT 파싱 검증", status: "COMPLETED", assignee: "김팀원" },
  ]);
  const [newTitle, setNewTitle] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks(prev => [
      ...prev,
      {
        id: Math.floor(6000 + Math.random() * 3000),
        title: newTitle,
        status: "IN_PROGRESS",
        assignee: "박성준"
      }
    ]);
    setNewTitle("");
  };

  const handleToggleStatus = (id: number) => {
    setTasks(prev => prev.map(t => 
      t.id === id 
        ? { ...t, status: t.status === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED" } 
        : t
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <section id="projects" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
            ADDITIONAL ENGINEERING PROJECTS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-deep mt-3">
            협업 기능과 실시간 통신을 구현한 CalIT
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            한화시스템 BEYOND SW 캠프에서 진행한 1개월 프로젝트로, 백엔드 API와 실시간 협업 기능을 개발했습니다.
          </p>
        </div>

        {/* Detailed Project Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Info Card (Left 7-cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 bg-slate-50/50 border border-slate-200/50 p-6 sm:p-8 rounded-2xl shadow-sm">
            
            {/* Title Block */}
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400 font-semibold">{currentProject.period}</span>
                <h3 className="font-display font-bold text-2xl text-brand-deep mt-1">{currentProject.title}</h3>
                <p className="text-[#10b981] text-xs font-medium mt-1">{currentProject.subtitle}</p>
              </div>

              {/* CTAs */}
              <div className="flex gap-2">
                {currentProject.github && (
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer border border-slate-200/40"
                  >
                    <Github size={13} /> Repo
                  </a>
                )}
                {currentProject.url && (
                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-light text-brand-primary border border-blue-100 hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    <ExternalLink size={13} /> Live
                  </a>
                )}
              </div>
            </div>

            {/* Role detail */}
            <div className="text-xs py-2 px-3 rounded-lg bg-blue-50/50 border border-slate-200/50 text-brand-primary font-medium">
              👨‍💻 <strong>담당 역할 :</strong> {currentProject.role}
            </div>

            {/* Key Accomplishments & Features List */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                KEY FEATURES & ENGINEERING ACHIEVEMENTS
              </h4>

              {currentProject.keyFeatures.map((feat, fIdx) => (
                <div key={feat.title} className="flex flex-col gap-2 bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-brand-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {fIdx + 1}
                    </span>
                    <div>
                      <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-deep">
                        {feat.title}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                        {feat.description}
                      </span>
                    </div>
                  </div>

                  <ul className="pl-8 list-none flex flex-col gap-1.5 mt-2">
                    {feat.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-600 leading-normal relative">
                        <span className="absolute left-[-12px] top-1.5 w-1.5 h-1.5 bg-brand-primary/40 rounded-full" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tech tag list */}
            <div>
              <h4 className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold mb-2.5">
                PROJECT TECH STACKS
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentProject.techStack.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase bg-white border border-slate-200 text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Technical Visualization Panel (Right 5-cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">

            {/* CalIT Interactive Workspace Showcase */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <div className="pb-3 border-b border-slate-200/60 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Radio size={14} className="text-brand-primary animate-pulse" />
                  <h4 className="font-display font-semibold text-[10px] tracking-tight uppercase text-slate-700">
                    CalIT 실시간 협업 일정 보드 (Live Demo)
                  </h4>
                </div>
                <span className="text-[10px] font-mono bg-blue-50 text-brand-primary px-2 py-0.5 rounded-full font-bold">
                  WebSocket Sim
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-normal">
                JWT 기반 권한 확인과 일정 상태 변경 흐름을 화면으로 단순화한 UI 시뮬레이션입니다.
              </p>

              {/* Task board manager demo app */}
              <div className="flex flex-col gap-2">
                <form onSubmit={handleAddTask} className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="새 일정 추가 (예: DB 영속화 설계)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="grow text-xs px-3 py-2 border rounded-lg focus:outline-none focus:border-brand-primary bg-white font-sans"
                  />
                  <button type="submit" aria-label="일정 추가" title="일정 추가" className="px-3 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-lg flex items-center justify-center cursor-pointer">
                    <Plus size={16} />
                  </button>
                </form>

                <div className="flex flex-col gap-2 mt-2">
                  <AnimatePresence initial={false}>
                    {tasks.map(t => (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="p-3 bg-white border border-slate-200/60 rounded-xl flex items-center justify-between shadow-sm relative group"
                      >
                        <div className="flex items-start gap-2.5">
                          <button
                            type="button"
                            aria-label={`${t.title} 상태 변경`}
                            title="일정 상태 변경"
                            onClick={() => handleToggleStatus(t.id)}
                            className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center mt-0.5 cursor-pointer duration-200 ${
                              t.status === "COMPLETED" 
                                ? "bg-emerald-50 border-emerald-300 text-emerald-600" 
                                : "border-slate-300 hover:border-brand-primary bg-slate-50"
                            }`}
                          >
                            {t.status === "COMPLETED" && <Check size={11} />}
                          </button>
                          
                          <div>
                            <span className={`text-[11.5px] font-bold block ${
                              t.status === "COMPLETED" ? "line-through text-slate-400" : "text-brand-deep"
                            }`}>
                              {t.title}
                            </span>
                            <span className="text-[9.5px] font-mono text-slate-400 block">
                              ID #{t.id} • 담당: {t.assignee}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleDeleteTask(t.id)}
                          aria-label={`${t.title} 삭제`}
                          title="일정 삭제"
                          className="p-1 text-slate-300 hover:text-rose-500 rounded duration-200 cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-100 text-[11px] text-orange-800 leading-relaxed font-sans">
                💡 <strong>구현 범위:</strong> Spring Security·JWT로 사용자 권한을 확인하고, WebSocket/STOMP 채팅과 SSE 알림을 업무 관리 기능에 연결했습니다.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { Github, BookOpen, Mail, ShieldCheck } from "lucide-react";
import { portfolioData } from "../data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-deep text-white border-t border-slate-900 py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-primary via-blue-500 to-emerald-400" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand/Signature */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center font-display font-medium text-white font-bold text-lg">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base tracking-tight mb-[-1px]">
                SEONGJUN.P
              </span>
              <span className="text-[9.5px] font-mono tracking-wider text-slate-400 uppercase">
                Backend Engineer
              </span>
            </div>
          </div>

          {/* Core statement */}
          <div className="text-center md:text-left max-w-sm text-xs text-slate-400 leading-normal">
            요청 흐름과 데이터 정합성을 설계하고, 테스트 결과로 성능과 개선 지점을 확인합니다.
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-brand-primary text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={portfolioData.personal.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-brand-primary text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
              title="Velog Blog"
            >
              <BookOpen size={18} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-brand-primary text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
              title="Email Park Seong-jun"
            >
              <Mail size={18} />
            </a>
          </div>

        </div>

        {/* Bottom Credits Block */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-brand-secondary" />
            <span>Backend Portfolio · Projects and Work Experience</span>
          </div>
          <div>
            &copy; {currentYear} Seongjun Park. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

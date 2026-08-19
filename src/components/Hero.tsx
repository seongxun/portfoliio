import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Download, 
  Server, 
  RefreshCw, 
  Layers, 
  Sparkles, 
  Check, 
  Database,
  Cpu,
  BarChart3,
  ExternalLink,
  Github,
  Zap,
  Lock
} from "lucide-react";
import { portfolioData } from "../data";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"trade" | "jmeter" | "msa">("trade");
  
  // Tab 1: Trade Simulator States
  const [balance, setBalance] = useState(50000000); // 50,000,000 KRW
  const [invested, setInvested] = useState(15480000);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "BUY", stock: "삼성전자", amount: 15, price: "₩72,400", time: "방금 전", status: "COMPLETED" },
    { id: 2, type: "BUY", stock: "SK하이닉스", amount: 8, price: "₩178,200", time: "10분 전", status: "COMPLETED" }
  ]);
  const [activeStock, setActiveStock] = useState<"SAMSUNG" | "SK_HYNIX" | null>(null);
  const [simLog, setSimLog] = useState<string[]>(["[System] FinLearn Engine v1.2 Initialized.", "[Database] Connected to PostgreSQL (Primary)."]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Tab 2: JMeter benchmark parameters
  const [jmeterThreads, setJmeterThreads] = useState<number>(50);

  // Background ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Randomly fluctuation invested value
      setInvested(prev => {
        const delta = Math.floor((Math.random() - 0.48) * 15000);
        return prev + delta;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const addLog = (msg: string) => {
    setSimLog(prev => [msg, ...prev.slice(0, 5)]);
  };

  const handleOrder = (stock: "SAMSUNG" | "SK_HYNIX") => {
    if (isProcessing) return;
    setIsProcessing(true);
    setActiveStock(stock);

    const price = stock === "SAMSUNG" ? 72400 : 178200;
    const qty = stock === "SAMSUNG" ? 10 : 5;
    const total = price * qty;

    addLog(`[Gateway] POST /api/simulation/order (Pending ID: ${Math.floor(1000 + Math.random() * 9000)})`);
    
    setTimeout(() => {
      addLog(`[Auth] User token verified. Permitted for Account #1372.`);
    }, 200);

    setTimeout(() => {
      addLog(`[Kafka] OrderEvent published to partition simulation-0`);
    }, 400);

    setTimeout(() => {
      addLog(`[SimulationDb] SELECT FOR UPDATE - Pessimistic Lock on Account #1372`);
    }, 600);

    setTimeout(() => {
      if (balance >= total) {
        setBalance(prev => prev - total);
        setInvested(prev => prev + total);
        setTransactions(prev => [
          {
            id: Date.now(),
            type: "BUY",
            stock: stock === "SAMSUNG" ? "삼성전자" : "SK하이닉스",
            amount: qty,
            price: `₩${price.toLocaleString()}`,
            time: "방금 전",
            status: "COMPLETED"
          },
          ...prev.slice(0, 2)
        ]);
        addLog(`[SimulationDb] Balance verified & reduced by ₩${total.toLocaleString()}`);
        addLog(`[SimulationDb] Account released. Commit OK.`);
        addLog(`[System] Transaction success. 0% Concurrency Conflict.`);
      } else {
        addLog(`[System] Transaction failed (INSUFFICIENT_FUNDS)`);
      }
      setIsProcessing(false);
      setActiveStock(null);
    }, 1000);
  };

  const getJmeterMetrics = (threads: number) => {
    if (threads <= 15) {
      return { reqs: 640, latency: 12, error: "0.00%", cpu: "14%", status: "OPTIMAL" };
    } else if (threads <= 35) {
      return { reqs: 1250, latency: 26, error: "0.00%", cpu: "38%", status: "STABLE" };
    } else if (threads <= 50) {
      return { reqs: 1976, latency: 42, error: "0.00%", cpu: "62%", status: "VERIFIED" };
    } else {
      return { reqs: 2380, latency: 110, error: "1.42%", cpu: "95%", status: "WARNING" };
    }
  };

  const metrics = getJmeterMetrics(jmeterThreads);
  const finlearnProject = portfolioData.projects.find(p => p.id === "finlearn")!;

  return (
    <section id="hero" className="relative pt-28 pb-20 md:py-32 bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-blue-100/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[400px] h-[400px] bg-indigo-50/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Developer Intro & FinLearn Showcase */}
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100"
            >
              <Sparkles size={12} className="text-brand-primary animate-pulse" />
              <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-brand-primary">
                FLAGSHIP PROJECT SHOWCASE
              </span>
            </motion.div>

            {/* Seongjun Intro Header */}
            <div className="flex flex-col gap-2">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display font-black text-3xl sm:text-4xl text-brand-deep tracking-tight leading-[1.15]"
              >
                백엔드 개발자 <span className="text-brand-primary">박성준</span>입니다.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
              >
                성능, 데이터 정합성, 운영 안정성을 치열하게 연구하며 비즈니스의 흔들리지 않는 신뢰 구조를 만들어냅니다. 모의 투자 아키텍처를 설계하고 부하를 완벽히 통제한 저의 핵심 대표작, <strong>핀러닝(FinLearn)</strong>을 통해 실증적인 기술을 보여 드립니다.
              </motion.p>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-slate-200/60 my-1" />

            {/* FinLearn Details & Role */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold block">{finlearnProject.period}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h2 className="font-display font-black text-2xl text-brand-deep">{finlearnProject.title}</h2>
                    <span className="text-[10.5px] font-bold text-emerald-500 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                      시즌제 모의투자 플랫폼
                    </span>
                  </div>
                  <p className="text-brand-secondary text-xs font-semibold mt-1">{finlearnProject.subtitle}</p>
                </div>

                <div className="flex gap-1.5">
                  {finlearnProject.github && (
                    <a
                      href={finlearnProject.github}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer border border-slate-200/50"
                    >
                      <Github size={12} /> Repo
                    </a>
                  )}
                  {finlearnProject.url && (
                    <a
                      href={finlearnProject.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-light text-brand-primary border border-blue-100 hover:bg-blue-50 transition-all cursor-pointer"
                    >
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                </div>
              </div>

              {/* Role Detail Box */}
              <div className="text-[11px] py-2 px-3 rounded-lg bg-blue-50/70 border border-blue-100/60 text-brand-primary font-semibold leading-relaxed">
                📢 {finlearnProject.role}
              </div>

              {/* Core Features list of FinLearn */}
              <div className="flex flex-col gap-3">
                {finlearnProject.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-brand-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <h4 className="font-display font-bold text-xs text-brand-deep">{feat.title}</h4>
                    </div>
                    <p className="text-[10px] text-slate-400 pl-7">{feat.description}</p>
                    <ul className="pl-7 list-none flex flex-col gap-1 mt-1">
                      {feat.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-[11px] text-slate-600 leading-relaxed relative flex items-start gap-1.5">
                          <span className="w-1 h-1 bg-brand-primary/40 rounded-full mt-1.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Technical badges */}
              <div className="flex flex-wrap gap-1 mt-1">
                {finlearnProject.techStack.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase bg-slate-100 border border-slate-200/40 text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Functional Demonstration Dashboard (기능 위주) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Tabs for Console/Simulator */}
            <div className="p-1 bg-slate-100 border border-slate-200/60 rounded-xl grid grid-cols-3 font-display">
              <button
                onClick={() => setActiveTab("trade")}
                className={`py-2 px-3 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                  activeTab === "trade" 
                    ? "bg-white text-brand-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                ⚙️ 1. 트레이딩 엔진
              </button>
              <button
                onClick={() => setActiveTab("jmeter")}
                className={`py-2 px-3 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                  activeTab === "jmeter" 
                    ? "bg-white text-brand-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                📊 2. JMeter 부하 검증
              </button>
              <button
                onClick={() => setActiveTab("msa")}
                className={`py-2 px-3 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                  activeTab === "msa" 
                    ? "bg-white text-brand-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                🛰 3. MSA 토폴로지
              </button>
            </div>

            {/* Dashboard Workspace Card Frame */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-100/80 border border-slate-200 p-6 flex flex-col gap-5 min-h-[490px] relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                
                {/* TAB 1: Live Mock Trading Simulator */}
                {activeTab === "trade" && (
                  <motion.div
                    key="trade"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-5 h-full"
                  >
                    {/* Header inside widget */}
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[10px] font-mono font-bold tracking-wider text-slate-600">
                          FINLEARN CORE LIVE ORDER GATEWAY
                        </span>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] font-mono font-semibold text-brand-primary">
                        ACCOUNT_ID #1372
                      </div>
                    </div>

                    {/* Balances Display */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Available Cash (예수금)
                        </span>
                        <span className="text-base sm:text-lg font-black text-brand-deep font-mono tracking-tight">
                          ₩{balance.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-blue-50/50 border border-blue-100/50 p-4 rounded-xl flex flex-col">
                        <span className="text-[9.5px] font-bold text-brand-primary uppercase tracking-wider mb-1">
                          Value of Investment (잔고 평가금)
                        </span>
                        <span className="text-base sm:text-lg font-black text-brand-primary font-mono tracking-tight">
                          ₩{invested.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Quick Transaction action triggers */}
                    <div>
                      <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Order Gateway Actions (트랜잭션 명령 제출)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          disabled={isProcessing}
                          onClick={() => handleOrder("SAMSUNG")}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border text-xs font-semibold select-none cursor-pointer duration-200 ${
                            activeStock === "SAMSUNG"
                              ? "bg-slate-50 border-slate-200 text-slate-400"
                              : "bg-blue-50 hover:bg-blue-100/60 border-blue-100 text-brand-primary"
                          }`}
                        >
                          <RefreshCw size={11} className={activeStock === "SAMSUNG" ? "animate-spin" : ""} />
                          삼성전자 10주 매수
                        </button>
                        <button
                          disabled={isProcessing}
                          onClick={() => handleOrder("SK_HYNIX")}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border text-xs font-semibold select-none cursor-pointer duration-200 ${
                            activeStock === "SK_HYNIX"
                              ? "bg-slate-50 border-slate-200 text-slate-400"
                              : "bg-blue-50 hover:bg-blue-100/60 border-blue-100 text-brand-primary"
                          }`}
                        >
                          <RefreshCw size={11} className={activeStock === "SK_HYNIX" ? "animate-spin" : ""} />
                          SK하이닉스 5주 매수
                        </button>
                      </div>
                    </div>

                    {/* Transactions display */}
                    <div>
                      <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Recent Transactions History (체결 목록)
                      </label>
                      <div className="flex flex-col gap-1.5">
                        <AnimatePresence initial={false}>
                          {transactions.map((tx) => (
                            <motion.div
                              key={tx.id}
                              initial={{ opacity: 0, x: -10, y: -5 }}
                              animate={{ opacity: 1, x: 0, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex justify-between items-center p-2 bg-slate-50/70 border border-slate-200/30 rounded-lg text-xs"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                  {tx.type}
                                </span>
                                <span className="font-bold text-brand-deep">{tx.stock}</span>
                                <span className="text-slate-400">{tx.amount}주</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="font-bold font-mono text-[11px]">{tx.price}</span>
                                <span className="text-[9px] text-slate-400">{tx.time}</span>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Live terminal logs showing thread interactions */}
                    <div className="bg-[#0f172a] rounded-xl p-3 flex flex-col gap-1.5 shadow-inner grow">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <Server size={11} className="text-blue-400" />
                          <span className="text-[9px] font-mono tracking-wider text-blue-200 font-bold uppercase">
                            Kafka & Pessimistic-Lock Trace Logs
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-slate-400">UTC+9 KST</span>
                      </div>
                      <div className="h-24 overflow-y-auto font-mono text-[9.5px] text-slate-300 leading-normal scrollbar-none flex flex-col gap-0.5">
                        {simLog.map((log, index) => (
                          <div
                            key={index}
                            className={`truncate ${
                              log.includes("Lock")
                                ? "text-amber-300 font-semibold"
                                : log.includes("success") || log.includes("released")
                                ? "text-emerald-400 font-semibold"
                                : log.includes("POST")
                                ? "text-sky-300"
                                : "text-slate-400"
                            }`}
                          >
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: JMeter Interactive Load Test Bench */}
                {activeTab === "jmeter" && (
                  <motion.div
                    key="jmeter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="pb-2.5 border-b border-slate-100 flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <BarChart3 size={14} className="text-brand-primary" />
                        <h4 className="font-display font-semibold text-[10px] tracking-tight uppercase text-slate-700">
                          Apache JMeter 1개월 대용량 실증 트랙터
                        </h4>
                      </div>
                      <span className="text-[9px] font-mono bg-blue-50 text-brand-primary px-2 py-0.5 rounded-full font-bold">
                        BUILT-IN AGENT
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-normal">
                      배포 환경에서 가해지는 동시성 요청을 실시간으로 추정한 가상 데이터 레이아웃입니다. 드래그하여 동시 트래픽 부하 상태를 다르게 제어할 수 있습니다.
                    </p>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-bold">동시 사용자 및 계좌 스레드 수 (Concurrent Users)</span>
                        <span className="text-xs font-mono font-bold text-brand-primary">{jmeterThreads} Users</span>
                      </div>
                      
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={jmeterThreads}
                        onChange={(e) => setJmeterThreads(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                      />

                      <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5">
                        <span>10 Users</span>
                        <span className="text-brand-primary font-bold">50 Users (검증 타겟)</span>
                        <span>100 Users</span>
                      </div>
                    </div>

                    {/* Benchmark Output Display */}
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      
                      <div className="p-3 bg-slate-50/55 rounded-xl border border-slate-100 flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                          처리 완료 요청수 (Throughput)
                        </span>
                        <span className="text-[14px] font-black text-brand-deep font-mono">
                          {metrics.reqs} Req
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50/55 rounded-xl border border-slate-100/60 flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                          평균 응답 속도 (Latency)
                        </span>
                        <span className="text-[14px] font-black text-brand-primary font-mono">
                          {metrics.latency} ms
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50/55 rounded-xl border border-slate-100/60 flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                          요청 오류율 (Error Rate)
                        </span>
                        <span className={`text-[14px] font-black font-mono ${
                          metrics.error === "0.00%" ? "text-emerald-500" : "text-amber-500"
                        }`}>
                          {metrics.error}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50/55 rounded-xl border border-slate-100/60 flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                          테스트 서버 상태 (State)
                        </span>
                        <span className={`text-[12px] font-extrabold font-mono ${
                          metrics.status === "VERIFIED"
                            ? "text-brand-primary underline decoration-blue-200"
                            : metrics.status === "OPTIMAL" || metrics.status === "STABLE"
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }`}>
                          {metrics.status} {metrics.status === "VERIFIED" ? "🏆" : ""}
                        </span>
                      </div>

                    </div>

                    <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100/50 flex gap-2.5 items-start mt-1">
                      <Lock size={14} className="text-brand-primary shrink-0 mt-0.5" />
                      <p className="text-[10.5px] text-slate-600 leading-normal font-sans">
                        <strong>데이터 정합성 완벽 입증:</strong> 동시 주문 <strong>50명</strong> 기준, 낙관적 락 대비 더 강한 데이터 충돌 저지율을 보장하는 <strong>비관적 락(Pessimistic Lock)</strong>으로 <strong>1,976건을 오류율 0%</strong>로 안전 가공 처리를 끝마쳤습니다 (JMeter 계측 데이터 결과값).
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: MSA Service Topology Map */}
                {activeTab === "msa" && (
                  <motion.div
                    key="msa"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="pb-2.5 border-b border-slate-100 flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <Cpu size={14} className="text-brand-primary" />
                        <h4 className="font-display font-semibold text-[10px] tracking-tight uppercase text-slate-700">
                          FINLEARN MSA 분산 서비스 지형도
                        </h4>
                      </div>
                      <span className="text-[9px] font-mono bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-black">
                        ACTIVE STATE
                      </span>
                    </div>

                    {/* MSA Visualizing Graphic representation */}
                    <div className="bg-[#0b0f19] rounded-xl p-4.5 text-[#a5b4fc] flex flex-col gap-2.5 font-mono text-[10.5px]">
                      
                      <div className="flex justify-center flex-col items-center">
                        <div className="bg-brand-primary text-white p-2 rounded-lg border border-blue-400 text-center text-[10px] font-bold w-full max-w-[280px] shadow">
                          🛰 Spring Cloud Gateway
                          <div className="text-[8px] text-blue-200 font-light mt-0.5">역방향 프록시 필터 | API 라우팅</div>
                        </div>
                        <div className="text-indigo-400 text-xs my-0.5 animate-pulse">↓</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-800/80 p-2 rounded border border-indigo-950 text-center flex flex-col items-center justify-center">
                          <span className="text-white font-bold text-[9.5px]">User Service</span>
                          <span className="text-[8px] text-emerald-400">JWT Token Decrypt</span>
                        </div>
                        <div className="bg-slate-800/80 p-2 rounded border border-indigo-950 text-center flex flex-col items-center justify-center">
                          <span className="text-amber-300 font-bold text-[9.5px]">Simulation Domain 🔒</span>
                          <span className="text-[8px] text-amber-400">Pessimistic Lock (DB)</span>
                        </div>
                      </div>

                      <div className="flex justify-center items-center gap-1 my-1">
                        <div className="h-[1px] bg-slate-800 grow" />
                        <span className="text-[8px] text-blue-400 uppercase font-black tracking-widest bg-[#0b0f19] px-2">
                          Kafka Pub/Sub Event Loop
                        </span>
                        <div className="h-[1px] bg-slate-800 grow" />
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-center text-[9px] text-slate-400">
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">Quiz Service</div>
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">Ranking Service</div>
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">Achievement</div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans mb-1">
                      Eureka 인프라에 각 도메인을 통합 등록하고 외부 충격 격리를 위해 Gateway를 중심부에 장착했습니다. 실시간 주문 잔고 차감과 같은 핵심 합의 연산은 강력한 보호를 위해 <strong>비관적 잠금</strong> 처리하고, 랭킹 갱신이나 업적 획득 등은 <strong>Kafka 메시지 큐</strong>를 통한 비동기 위임으로 서버 병목을 극대화하여 차단했습니다.
                    </p>

                  </motion.div>
                )}

              </AnimatePresence>

              {/* Bottom decorative color slide */}
              <div className="absolute bottom-0 right-0 left-0 h-1.5 bg-gradient-to-r from-brand-primary via-indigo-500 to-emerald-400" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

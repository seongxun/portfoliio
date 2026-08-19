import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Award, CheckCircle, ArrowRight, Hourglass, Server, Send, AlertTriangle } from "lucide-react";
import { portfolioData } from "../data";

export default function Awards() {
  const [asyncMode, setAsyncMode] = useState<"SYNC" | "ASYNC">("ASYNC");
  const [simState, setSimState] = useState<"IDLE" | "RUNNING" | "TIMEOUT_ERROR" | "SUCCESS">("IDLE");
  const [timer, setTimer] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<{ sender: "USER" | "BOT"; text: string; time: string }[]>([]);

  // Simulation timeline events
  const [stepLogs, setStepLogs] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (simState === "RUNNING") {
      interval = setInterval(() => {
        setTimer(p => p + 0.1);
      }, 100);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [simState]);

  const addLog = (msg: string) => {
    setStepLogs(p => [...p, msg]);
  };

  const handleSimulate = async () => {
    if (simState === "RUNNING") return;
    setSimState("RUNNING");
    setStepLogs([]);
    setChatMessages([
      { sender: "USER", text: "정기 휴가 일정을 고려해 가평 2박 3일 힐링 코스 추천해줘!", time: "10:04" }
    ]);

    addLog(`[Client] User inputs military custom query via Kakao Talk.`);
    addLog(`[Kakao] Redirect call to HanArmy Node.js API (POST /api/chatbot).`);

    if (asyncMode === "SYNC") {
      // Synchronous failure simulation (Timeout!)
      await new Promise(r => setTimeout(r, 1200));
      addLog(`[HanArmy] Forwarding query directly to OpenAI API (gpt-4).`);
      
      await new Promise(r => setTimeout(r, 1500));
      addLog(`[OpenAI] Thinking and generating personalized itinerary... (Wait...)`);

      await new Promise(r => setTimeout(r, 2300));
      // Exploding at exactly 5 seconds!
      addLog(`[Kakao Engine] Response limit reached: Kakao requires a response within 5.0 seconds.`);
      addLog(`[Kakao Engine] System Timeout exception. Dropped connection.`);
      
      setSimState("TIMEOUT_ERROR");
      setChatMessages(p => [
        ...p,
        { sender: "BOT", text: "⚠️ [응답 지연 오류] 카카오톡 챗봇 제한 시간(5초)을 초과하여 답변을 연결하지 못했습니다.", time: "10:04" }
      ]);
    } else {
      // Async success callback schema!
      await new Promise(r => setTimeout(r, 850));
      addLog(`[HanArmy] Node.js Skill server processes request.`);
      addLog(`[HanArmy] Extracted Kakao callbackUrl parameter from payload.`);
      
      // Send immediate progress card back to user (Response within 0.5 sec!)
      setChatMessages(p => [
        ...p,
        { sender: "BOT", text: "📝 박성준 병장님! 맞춤형 휴가 일정을 생성하고 있습니다. 잠시만 기다려 주세요. (처리 중 ⏳)", time: "10:04" }
      ]);
      addLog(`[Kakao Engine] Immediate progress message returned within 1.0s. Connection safely closed with 200 OK.`);

      await new Promise(r => setTimeout(r, 1500));
      addLog(`[HanArmy Worker] Executing asynchronous routine targeting OpenAI...`);
      addLog(`[OpenAI] Personalizing travel spots and routing paths...`);

      await new Promise(r => setTimeout(r, 2000));
      addLog(`[OpenAI] AI output successfully generated (Takes 4.5 seconds total).`);
      addLog(`[HanArmy Worker] Constructing Kakao template format.`);
      addLog(`[HanArmy Worker] Trigger HTTP POST payload to kakao callbackUrl.`);

      setChatMessages(p => [
        ...p,
        { sender: "BOT", text: "🌸 가평 2박 3일 힐링 추천 루트:\n1일차: 청평호반 레일바이크 -> 가평 잣나무 숲속 야영\n2일차: 아침고요수목원 산책 및 맞춤형 바베큐 식사.\n안전한 휴가 준비 되십시오!", time: "10:05" }
      ]);
      addLog(`[Kakao Engine] Payload successfully received via Callback Interface. Delivered to User.`);
      
      setSimState("SUCCESS");
    }
  };

  const currentAward = portfolioData.awards[0];

  return (
    <section id="awards" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
            HONORS & ACTIVITIES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-deep mt-3">
            백엔드와 AI API를 연결한 HanArmy
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            카카오 챗봇의 응답 제한을 고려해 callbackUrl 기반 비동기 응답 흐름을 구현했고, 하나 디지털 파워온 2기 우수상을 수상했습니다.
          </p>
        </div>

        {/* Award Details card & Simulator (Grid split) */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Timeline Description Block (Left 7-cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 bg-[#fcfdfe] border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center shrink-0">
                <Award size={24} />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono font-semibold">{currentAward.period}</span>
                <h3 className="font-display font-bold text-lg text-brand-deep leading-tight mt-0.5">
                  {currentAward.title}
                </h3>
                <span className="text-xs text-brand-primary font-bold">{currentAward.organization} / {currentAward.role}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 pt-4">
              <h4 className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-black">
                KEY ACCOMPLISHMENTS
              </h4>

              <div className="flex flex-col gap-3">
                {currentAward.accomplishments.map((acc, idx) => (
                  <div key={idx} className="flex gap-3 text-xs leading-relaxed text-slate-600 bg-white p-3 rounded-lg border border-slate-100 shadow-tiny">
                    <span className="text-[#10b981] font-bold shrink-0">✓</span>
                    <p>{acc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive OpenAI Kakao Callback Simulator (Right 5-cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 h-full">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              
              <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Server size={14} className="text-brand-secondary" />
                  <h4 className="font-display font-semibold text-xs text-slate-700 tracking-wide uppercase">
                    카카오 비동기 응답 UI 시뮬레이션
                  </h4>
                </div>
                <span className="text-[9px] font-mono bg-blue-50 text-brand-primary px-2 py-0.5 rounded-full font-bold">
                  Kakao Skill API
                </span>
              </div>

              {/* Mode Select */}
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setAsyncMode("SYNC")}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                    asyncMode === "SYNC" ? "bg-white text-slate-800 shadow" : "text-slate-500"
                  }`}
                >
                  동기 처리 (5초 타임아웃 오류)
                </button>
                <button
                  onClick={() => setAsyncMode("ASYNC")}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                    asyncMode === "ASYNC" ? "bg-white text-brand-primary shadow" : "text-slate-500"
                  }`}
                >
                  비동기 CallbackUrl (박성준 해법)
                </button>
              </div>

              {/* Start Sim Trigger */}
              <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100">
                <span className="text-[11px] text-slate-500 font-mono">가상 타이머: {timer.toFixed(1)}초 경과</span>
                <button
                  disabled={simState === "RUNNING"}
                  onClick={handleSimulate}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer select-none"
                >
                  <Send size={11} /> 메세지 요청 발송
                </button>
              </div>

              {/* Chat screen mockup */}
              <div className="bg-white rounded-xl border border-slate-150 p-4 h-52 overflow-y-auto flex flex-col gap-3">
                {chatMessages.length === 0 ? (
                  <div className="text-slate-300 italic text-[11px] text-center my-auto">
                    * 위 '메세지 요청 발송' 버튼을 클릭하면 AI 군장병 휴가 챗봇 'HanArmy'의 실시간 비동기 콜백 과정을 애니메이션으로 확인합니다.
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === "USER" ? "self-end items-end" : "self-start items-start"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl text-xs leading-normal font-medium ${
                        msg.sender === "USER"
                          ? "bg-slate-800 text-white rounded-br-none"
                          : msg.text.includes("지연")
                          ? "bg-red-50 text-red-800 border border-red-150"
                          : "bg-amber-100 text-slate-700 rounded-bl-none"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8.5px] text-slate-400 font-mono mt-0.5">{msg.time}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Running steps console */}
              <div className="rounded-xl bg-[#090b14] p-3 h-28 overflow-y-auto font-mono text-[9.5px] leading-relaxed text-indigo-100 scrollbar-none flex flex-col gap-1">
                {stepLogs.map((log, index) => (
                  <div
                    key={index}
                    className={
                      log.includes("TIMEOUT_ERROR") || log.includes("⚠️")
                        ? "text-red-400 font-bold"
                        : log.includes("Delivered") || log.includes("200 OK") || log.includes("Callback Interface")
                        ? "text-emerald-400"
                        : "text-slate-300"
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

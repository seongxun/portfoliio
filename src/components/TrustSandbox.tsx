import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Lock, Unlock, Database, Cpu, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";

interface Thread {
  id: number;
  name: string;
  status: "IDLE" | "PENDING" | "ACQUIRING" | "PROCESSING" | "COMMITTED" | "BLOCKED" | "FAILED";
  withdraw: number;
  readBalance: number | null;
  writtenBalance: number | null;
}

export default function TrustSandbox() {
  const [lockMode, setLockMode] = useState<"NONE" | "PESSIMISTIC">("PESSIMISTIC");
  const [isRunning, setIsRunning] = useState(false);
  const [dbBalance, setDbBalance] = useState<number>(100000); // ₩100,000 starting
  const [threads, setThreads] = useState<Thread[]>([
    { id: 1, name: "Thread-1 (주문 요청 A)", status: "IDLE", withdraw: 40000, readBalance: null, writtenBalance: null },
    { id: 2, name: "Thread-2 (주문 요청 B)", status: "IDLE", withdraw: 40000, readBalance: null, writtenBalance: null },
    { id: 3, name: "Thread-3 (주문 요청 C)", status: "IDLE", withdraw: 40000, readBalance: null, writtenBalance: null },
  ]);
  const [sandboxLogs, setSandboxLogs] = useState<string[]>([]);
  const [simStatus, setSimStatus] = useState<"IDLE" | "SUCCESS" | "CORRUPTED">("IDLE");

  const addLog = (msg: string) => {
    setSandboxLogs(prev => [...prev, msg]);
  };

  const resetSimulator = () => {
    setIsRunning(false);
    setDbBalance(100000);
    setSimStatus("IDLE");
    setSandboxLogs([]);
    setThreads([
      { id: 1, name: "Thread-1 (주문 요청 A)", status: "IDLE", withdraw: 40000, readBalance: null, writtenBalance: null },
      { id: 2, name: "Thread-2 (주문 요청 B)", status: "IDLE", withdraw: 40000, readBalance: null, writtenBalance: null },
      { id: 3, name: "Thread-3 (주문 요청 C)", status: "IDLE", withdraw: 40000, readBalance: null, writtenBalance: null },
    ]);
  };

  const updateThreadStatus = (id: number, status: Thread["status"], extra?: Partial<Thread>) => {
    setThreads(prev => prev.map(t => t.id === id ? { ...t, status, ...extra } : t));
  };

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setSandboxLogs([]);
    setSimStatus("IDLE");
    setDbBalance(100000);

    addLog(`[Simulator] Starting concurrency simulation. Mode: ${lockMode === "PESSIMISTIC" ? "PESSIMISTIC_LOCKING" : "NO_SYNCHRONIZATION"}`);
    addLog(`[Database] Account #1004 balance is ₩100,000. 3 threads attempt withdrawal of ₩40,000 each.`);
    addLog(`[Database] Total demand: ₩120,000. Expected output: 3rd thread must fail (Insufficient funds).`);

    threads.forEach(t => updateThreadStatus(t.id, "PENDING"));

    if (lockMode === "NONE") {
      // 1. Race Condition / No Lock Scenario
      // Multi-threading race! They all read ₩100,000 simultaneously
      await new Promise(r => setTimeout(r, 600));
      
      addLog(`[Race] Thread-1, Thread-2, and Thread-3 trigger simultaneous read.`);
      threads.forEach(t => {
        updateThreadStatus(t.id, "PROCESSING", { readBalance: 100000 });
      });
      addLog(`[Database] Row locked? NO. Row checks passed asynchronously.`);

      await new Promise(r => setTimeout(r, 1000));

      // All threads think they can write because readBalance was 100,000 (which is > 40,000)
      // They decrease initial balance 100,000 by 40,000. Result: 60,000.
      // But they write asynchronously, overwriting each other or executing dirty double withdraws!
      // If all 3 withdraw to bank ledger, the physical balance drops below 0: 100k - 120k = -20k, 
      // or because they read 100k and update to 60k, they overwrite each other and final balance is 60k (dirty overwrite!).
      // Let's simulate the dirty overwrite where last thread writes 60,000, meaning ₩120,000 was withdrawn, but balance is still 60,000! (BANK LOSS!)
      // This is a classic race update anomaly.
      
      setDbBalance(60000); // Thread-3 writes 60,000
      threads.forEach(t => {
        updateThreadStatus(t.id, "COMMITTED", { writtenBalance: 60000 });
      });

      addLog(`[Race] Critical Write Collision! Thread-1 wrote ₩60,000. Thread-2 wrote ₩60,000. Thread-3 wrote ₩60,000.`);
      addLog(`[Database] Data anomaly! Total ₩120,000 withdrawn, but remaining account balance is ₩60,000.`);
      addLog(`[Simulator] CRITICAL DATA CORRUPTION DETECTED (정합성 폭파). Bank deficit occurred.`);
      setSimStatus("CORRUPTED");
      setIsRunning(false);

    } else {
      // 2. Pessimistic Locking Sequence (SELECT FOR UPDATE)
      // Thread 1 locks row, Thread 2 & 3 must wait!
      addLog(`[Lock] Thread-1 requests SELECT FOR UPDATE on Account #1004.`);
      updateThreadStatus(1, "ACQUIRING");
      updateThreadStatus(2, "BLOCKED");
      updateThreadStatus(3, "BLOCKED");
      
      await new Promise(r => setTimeout(r, 800));

      // Thread 1 acquires lock, processes
      addLog(`[Lock] Thread-1 acquired Pessimistic Lock on Account #1004 row.`);
      updateThreadStatus(1, "PROCESSING", { readBalance: 100000 });
      
      await new Promise(r => setTimeout(r, 800));
      setDbBalance(60000);
      updateThreadStatus(1, "COMMITTED", { writtenBalance: 60000 });
      addLog(`[Database] Thread-1 subtracted ₩40,000. Remaining: ₩60,000. Row Lock released.`);

      // Thread 2 acquires lock, processes
      addLog(`[Lock] Thread-2 acquires lock. Checking balance...`);
      updateThreadStatus(2, "ACQUIRING");
      
      await new Promise(r => setTimeout(r, 800));
      updateThreadStatus(2, "PROCESSING", { readBalance: 60000 });

      await new Promise(r => setTimeout(r, 800));
      setDbBalance(20000);
      updateThreadStatus(2, "COMMITTED", { writtenBalance: 20000 });
      addLog(`[Database] Thread-2 subtracted ₩40,000. Remaining: ₩20,000. Row Lock released.`);

      // Thread 3 acquires lock, reads 20000. 20000 < 40000 -> insufficient funds, Fails!
      addLog(`[Lock] Thread-3 acquires lock. Checking balance...`);
      updateThreadStatus(3, "ACQUIRING");

      await new Promise(r => setTimeout(r, 800));
      addLog(`[Database] Thread-3 read balance: ₩20,000. Withdraw amount: ₩40,000.`);
      addLog(`[Database] Constraint check failed: INSUFFICIENT_FUNDS. Rollback executed.`);
      updateThreadStatus(3, "FAILED", { readBalance: 20000 });
      addLog(`[Lock] Thread-3 releases lock. Transaction safe.`);

      addLog(`[Simulator] Concurrency simulation complete successfully. No race anomalies.`);
      setSimStatus("SUCCESS");
      setIsRunning(false);
    }
  };

  return (
    <section id="sandbox" className="py-20 bg-slate-50 relative border-y border-slate-100">
      
      {/* Absolute faint decor */}
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[600px] h-[600px] bg-blue-100/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
            LIVE SYSTEM PLAYGROUND
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-deep mt-3">
            동시성 제어 오케스트레이션 검증
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            금융 트랜잭션에서 무수히 쏟아지는 동시 요청 상황을 재현하고 성능과 정합성을 어떻게 절묘하게 보존해내는지 눈으로 파악해보세요.
          </p>
        </div>

        {/* Outer Control Board Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls & Thread State Visualization (Left 7-cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Lock Mode Selector Panel */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-base text-brand-deep mb-4 flex items-center gap-1.5">
                <Cpu size={16} className="text-brand-primary" /> 동시 요청 제어 옵션 (Control Options)
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* 1. None Lock */}
                <div
                  onClick={() => !isRunning && setLockMode("NONE")}
                  className={`p-4 rounded-xl border flex flex-col gap-2 select-none duration-200 cursor-pointer ${
                    isRunning ? "opacity-60 cursor-not-allowed" : ""
                  } ${
                    lockMode === "NONE"
                      ? "bg-red-50/40 border-red-200 shadow-sm"
                      : "bg-white border-slate-100/80 hover:border-slate-200/80"
                  }`}
                >
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className={lockMode === "NONE" ? "text-red-700" : "text-slate-700"}>락 무설정 (No Locks)</span>
                    <Unlock size={14} className={lockMode === "NONE" ? "text-red-500" : "text-slate-400"} />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    어떠한 동기화 조치도 가동하지 않습니다. 프로세스들이 격리되지 않고 동시에 데이터베이스를 경합(Race Condition)하여 데이터가 무너집니다.
                  </p>
                </div>

                {/* 2. Pessimistic Lock */}
                <div
                  onClick={() => !isRunning && setLockMode("PESSIMISTIC")}
                  className={`p-4 rounded-xl border flex flex-col gap-2 select-none duration-200 cursor-pointer ${
                    isRunning ? "opacity-60 cursor-not-allowed" : ""
                  } ${
                    lockMode === "PESSIMISTIC"
                      ? "bg-emerald-50/40 border-emerald-200 shadow-sm"
                      : "bg-white border-slate-100/80 hover:border-slate-200/80"
                  }`}
                >
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className={lockMode === "PESSIMISTIC" ? "text-emerald-700 font-bold" : "text-slate-700"}>
                      비관적 락 (Pessimistic-Lock)
                    </span>
                    <Lock size={14} className={lockMode === "PESSIMISTIC" ? "text-emerald-500" : "text-slate-400"} />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    <strong>프로젝트 적용 방식.</strong> 트랜잭션 개시 시 DB 로우에 비관적 락(<code className="font-mono text-[10px] bg-emerald-50 px-1 text-emerald-800">SELECT FOR UPDATE</code>)을 적용해 동시 요청에서 발생할 수 있는 변경 충돌을 방지했습니다.
                  </p>
                </div>

              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3.5">
                <button
                  disabled={isRunning}
                  onClick={runSimulation}
                  className="px-5 py-3 rounded-xl text-xs font-bold bg-brand-primary text-white hover:bg-brand-primary/95 shadow-md hover:translate-y-[-1px] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Play size={13} /> 시뮬레이션 가동 (Run)
                </button>
                <button
                  onClick={resetSimulator}
                  className="px-4 py-3 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200/80 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw size={13} /> 리셋 (Reset)
                </button>
              </div>

            </div>

            {/* Threads Simulation Pipeline Grid */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h4 className="font-display font-semibold text-xs text-slate-400 tracking-wider uppercase mb-1">
                스레드 주문 처리 파이프라인 (Interactive Pipelines)
              </h4>

              <div className="flex flex-col gap-4">
                {threads.map((t) => {
                  let statusBg = "bg-slate-100 text-slate-500";
                  let statusLabel = "대기 안함 (IDLE)";

                  if (t.status === "PENDING") { statusBg = "bg-sky-50 text-sky-600 animate-pulse"; statusLabel = "호출 대기 (PENDING)"; }
                  else if (t.status === "ACQUIRING") { statusBg = "bg-amber-50 text-amber-600 animate-pulse"; statusLabel = "락 획득 대기 (AWAIT_LOCK)"; }
                  else if (t.status === "BLOCKED") { statusBg = "bg-red-50 text-red-500"; statusLabel = "대기 상태 (BLOCKED/WAITING)"; }
                  else if (t.status === "PROCESSING") { statusBg = "bg-[#2563eb]/20 text-[#2563eb] font-semibold"; statusLabel = "가공 중 (RUNNING)"; }
                  else if (t.status === "COMMITTED") { statusBg = "bg-emerald-50 text-emerald-600 font-bold"; statusLabel = "승인/반영 (COMMITTED)"; }
                  else if (t.status === "FAILED") { statusBg = "bg-red-100 text-red-700 font-semibold"; statusLabel = "잔액부족 실패 (REJECTED)"; }

                  return (
                    <div key={t.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-brand-deep">{t.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">시도 액션: ₩{t.withdraw.toLocaleString()} 출금</span>
                      </div>

                      {/* Display calculations */}
                      <div className="flex items-center gap-3">
                        <div className="text-right flex flex-col gap-0.5 font-mono text-[10px]">
                          <span className="text-slate-400">읽은 시점: {t.readBalance !== null ? `₩${t.readBalance.toLocaleString()}` : "N/A"}</span>
                          <span className="text-slate-500">조정 후: {t.writtenBalance !== null ? `₩${t.writtenBalance.toLocaleString()}` : "N/A"}</span>
                        </div>

                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-tight ${statusBg}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Database State Display & Real-time Log (Right 5-cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Ledger visualization */}
            <div className="bg-brand-deep text-white rounded-2xl p-5 shadow-md shadow-slate-900/10 relative overflow-hidden flex flex-col gap-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

              <div className="flex justify-between items-center border-b border-indigo-950 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Database size={14} className="text-indigo-400 animate-pulse" />
                  <span className="text-[10.5px] font-mono tracking-widest text-indigo-300 font-bold uppercase">
                    물리 데이터베이스 원장 (System DB Ledger)
                  </span>
                </div>
                {lockMode === "PESSIMISTIC" ? (
                  <span className="text-[9px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    LOCK_SECURED
                  </span>
                ) : (
                  <span className="text-[9px] font-mono font-semibold bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded">
                    NO_MUTEX
                  </span>
                )}
              </div>

              <div className="py-2.5 flex flex-col items-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  PostgreSQL Account #1004 Balance
                </span>
                <span className="text-3xl font-bold font-mono tracking-tight text-white mt-1">
                  ₩{dbBalance.toLocaleString()}
                </span>
              </div>

              {/* Status Notice Block */}
              <AnimatePresence mode="wait">
                {simStatus !== "IDLE" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`p-3.5 rounded-xl border flex gap-3 text-xs leading-normal ${
                      simStatus === "SUCCESS"
                        ? "bg-emerald-500/15 border-emerald-500/20 text-emerald-300"
                        : "bg-red-500/15 border-red-500/20 text-red-300"
                    }`}
                  >
                    <div className="mt-0.5">
                      {simStatus === "SUCCESS" ? (
                        <ShieldCheck size={16} className="text-emerald-400" />
                      ) : (
                        <AlertTriangle size={16} className="text-red-400" />
                      )}
                    </div>
                    <div>
                      <strong className="font-bold">
                        {simStatus === "SUCCESS" ? "잔액 정합성 유지 (Pessimistic lock)" : "잔액 데이터 불일치 발생"}
                      </strong>
                      <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                        {simStatus === "SUCCESS"
                          ? "비관적 락을 적용한 시뮬레이션에서는 요청을 순서대로 처리하고, 잔액이 부족한 세 번째 요청을 거부합니다."
                          : "락이 없는 시뮬레이션에서는 여러 스레드가 같은 초기 잔액을 읽어 검사를 통과해 원장 잔액과 처리 결과가 달라집니다."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Sandbox Operations Console Output */}
            <div className="bg-[#0b0f19] text-indigo-150 border border-slate-800 rounded-2xl p-5 shadow-sm">
              <label className="text-[9px] font-mono font-black tracking-widest text-brand-primary uppercase block mb-3">
                OPERATIONS CONSOLE LOGS
              </label>

              <div className="h-44 overflow-y-auto font-mono text-[10.5px] leading-relaxed scrollbar-none flex flex-col gap-1.5">
                {sandboxLogs.length === 0 ? (
                  <div className="text-slate-500/70 italic text-center py-10 select-none">
                    * 가동 버튼을 클릭하면 동시 스레드가 호출하는 원장 상태 변경 로그가 실시간 출력됩니다.
                  </div>
                ) : (
                  sandboxLogs.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.includes("CORRUPTED") || log.includes("Collision") || log.includes("[Race]")
                          ? "text-red-400 font-semibold"
                          : log.includes("complete") || log.includes("releases lock") || log.includes("Commit OK") || log.includes("secured") || log.includes("Lock] Thread-1 subtract") || log.includes("Lock] Thread-2 subtract")
                          ? "text-emerald-400 font-semibold"
                          : log.includes("SELECT FOR UPDATE") || log.includes("acquired")
                          ? "text-amber-400"
                          : "text-slate-300"
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

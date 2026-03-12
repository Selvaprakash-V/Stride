import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
const CodeEditorPanel = React.lazy(() => import("../components/CodeEditorPanel"));

import { executeCode } from "../lib/piston";
import { useProblems, useProblemById } from "../hooks/useProblems";
import { problemApi } from "../api/problems";
import { submissionApi } from "../api/submissions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [currentProblemId, setCurrentProblemId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading } = useProblems();
  const { data: problemDetail, isLoading: isLoadingDetail } = useProblemById(id);
  const allProblems = data?.problems || [];
  const currentProblem = problemDetail?.problem || allProblems.find((p) => p.slug === id || p.id === id);

  const getStarterCode = (problem, lang) => {
    if (!problem?.starterCode) return "";
    // After JSON serialization, Mongoose Maps become plain objects
    if (typeof problem.starterCode.get === "function") return problem.starterCode.get(lang) || "";
    return problem.starterCode[lang] || "";
  };

  // update problem when URL param changes or data loads
  useEffect(() => {
    if (!id || isLoading || !currentProblem) return;

    setCurrentProblemId(currentProblem.id);
    const starter = getStarterCode(currentProblem, selectedLanguage);
    // Only reset code if it's empty or problem changed fundamentally
    if (!code || currentProblemId !== currentProblem.id) {
      setCode(starter);
    }
    setOutput(null);
  }, [id, selectedLanguage, isLoading, currentProblem]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    const starter = getStarterCode(currentProblem, newLang);
    setCode(starter);
    setOutput(null);
  };

  const handleProblemChange = (newProblemSlug) => navigate(`/problem/${newProblemSlug}`);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
      const result = await executeCode(selectedLanguage, code);
      setOutput(result);
      if (result.success) {
        toast.success("Code executed successfully!");
      } else {
        toast.error("Execution failed. Check console.");
      }
    } catch (err) {
      toast.error("Failed to run code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submissionApi.submitSolution({
        problemId: currentProblem._id,
        language: selectedLanguage,
        code: code,
      });

      setOutput(res.result);

      if (res.result.status === "Accepted") {
        triggerConfetti();
        toast.success("Congratulations! All test cases passed.", {
          icon: '🚀',
          style: {
            borderRadius: '12px',
            background: '#00b8a3',
            color: '#fff',
            fontWeight: 'bold'
          },
        });
        queryClient.invalidateQueries({ queryKey: ["my-solved-problems"] });
      } else {
        toast.error(`Submission failed: ${res.result.status}`, {
          style: {
            borderRadius: '12px',
            background: '#ef4743',
            color: '#fff',
            fontWeight: 'bold'
          },
        });
      }
    } catch (err) {
      toast.error("Failed to submit solution");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-[#0d1117] flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 min-h-0 relative">
        {isLoading || isLoadingDetail || !currentProblem ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-white/40 font-black uppercase tracking-widest text-xs">Loading Problem Architecture...</p>
          </div>
        ) : (
          <PanelGroup direction="horizontal" className="h-full px-4 pb-4 gap-2">
            {/* left panel- problem desc */}
            <Panel defaultSize={40} minSize={30} className="rounded-xl overflow-hidden border border-white/5">
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblem.id}
                onProblemChange={handleProblemChange}
                allProblems={allProblems}
              />
            </Panel>

            <PanelResizeHandle className="w-1.5 transition-all hover:bg-primary/40 active:bg-primary rounded-full mx-1" />

            {/* right panel- code editor & output */}
            <Panel defaultSize={60} minSize={35} className="flex flex-col gap-2">
              <PanelGroup direction="vertical">
                {/* Top panel - Code editor */}
                <Panel defaultSize={65} minSize={30} className="rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                  <Suspense fallback={
                    <div className="h-full flex items-center justify-center bg-[#1e1e1e]">
                      <div className="h-2 w-24 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-[shimmer_1.5s_infinite]" />
                      </div>
                    </div>
                  }>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      isSubmitting={isSubmitting}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={setCode}
                      onRunCode={handleRunCode}
                      onSubmit={handleSubmit}
                    />
                  </Suspense>
                </Panel>

                <PanelResizeHandle className="h-1.5 transition-all hover:bg-primary/40 active:bg-primary rounded-full my-1" />

                {/* Bottom panel - Output Panel*/}
                <Panel defaultSize={35} minSize={20} className="rounded-xl overflow-hidden border border-white/5 bg-[#161b22] shadow-2xl">
                  <OutputPanel output={output} isRunning={isRunning} isSubmitting={isSubmitting} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        )}
      </div>
    </div>
  );
}

export default ProblemPage;

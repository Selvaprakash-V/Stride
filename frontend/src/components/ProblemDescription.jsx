import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, History, Info, ChevronDown, CheckCircle2, XCircle, Clock, Zap } from "lucide-react";
import { submissionApi } from "../api/submissions";
import { formatDistanceToNow } from "date-fns";

const tabs = [
  { id: "description", label: "Description", icon: BookOpen },
  { id: "submissions", label: "Submissions", icon: History },
  { id: "editorial", label: "Editorial", icon: Info, disabled: true },
];

const difficultyColors = {
  Easy: "text-easy bg-easy-light",
  Medium: "text-medium bg-medium-light",
  Hard: "text-hard bg-hard-light",
};

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  const [activeTab, setActiveTab] = useState("description");
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  useEffect(() => {
    if (activeTab === "submissions") {
      setLoadingSubmissions(true);
      submissionApi.getSubmissionsByProblem(problem._id || problem.id)
        .then(res => setSubmissions(res.submissions || []))
        .finally(() => setLoadingSubmissions(false));
    }
  }, [activeTab, problem.id, problem._id]);

  return (
    <div className="h-full flex flex-col bg-[#0d1117] border-r border-white/5">
      {/* Tabs Header */}
      <div className="flex items-center gap-1 px-4 pt-2 bg-[#161b22] border-b border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition-all duration-300 rounded-t-lg
              ${tab.disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
              ${activeTab === tab.id ? "text-primary bg-[#0d1117] border-t border-l border-r border-white/5" : "text-white/40 hover:text-white/60"}
            `}
          >
            <tab.icon className="size-4" />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Problem Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-black tracking-tight text-white">{problem.title}</h1>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColors[problem.difficulty] || "bg-white/5 text-white/60"}`}>
                    {problem.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {problem.tags?.map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description Body */}
              <div className="space-y-4 text-white/70 leading-relaxed font-medium">
                <p>{problem.description.text}</p>
                {problem.description.notes?.length > 0 && (
                  <ul className="space-y-2 list-disc pl-5 text-white/50 italic">
                    {problem.description.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Examples */}
              <div className="space-y-6">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <div className="size-1 bg-primary rounded-full" />
                  Examples
                </h3>
                {problem.examples?.map((example, idx) => (
                  <div key={idx} className="space-y-3">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Example {idx + 1}</p>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 font-mono text-sm group hover:border-white/10 transition-colors">
                      <div className="flex gap-4">
                        <span className="text-primary/60 font-black min-w-[60px]">Input:</span>
                        <span className="text-white/80">{example.input}</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-easy/60 font-black min-w-[60px]">Output:</span>
                        <span className="text-white/80">{example.output}</span>
                      </div>
                      {example.explanation && (
                        <div className="pt-3 border-t border-white/5 mt-1 text-white/40 font-sans italic italic">
                          <span className="text-white/60 font-bold not-italic">Explanation:</span> {example.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="space-y-4 pb-12">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <div className="size-1 bg-primary rounded-full" />
                  Constraints
                </h3>
                <ul className="space-y-3">
                  {problem.constraints?.map((constraint, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/60 font-medium">
                      <div className="mt-2 size-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                      <code className="text-xs px-2 py-0.5 bg-white/5 rounded border border-white/5 text-white/80">
                        {constraint}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === "submissions" && (
            <motion.div
              key="submissions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black text-white">Submission History</h2>

              {loadingSubmissions ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />)}
                </div>
              ) : submissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-white/20">
                  <History className="size-10 mb-4" />
                  <p className="font-bold">No submissions yet</p>
                </div>
              ) : (
                <div className="space-y-3 pb-20">
                  {submissions.map((sub) => (
                    <div key={sub._id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`size-10 rounded-xl flex items-center justify-center ${sub.status === "Accepted" ? "bg-easy-light" : "bg-hard-light"}`}>
                          {sub.status === "Accepted" ? (
                            <CheckCircle2 className="size-5 text-easy" />
                          ) : (
                            <XCircle className="size-5 text-hard" />
                          )}
                        </div>
                        <div>
                          <p className={`font-black ${sub.status === "Accepted" ? "text-easy" : "text-hard"}`}>
                            {sub.status}
                          </p>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">
                            <span className="flex items-center gap-1"><Clock className="size-3" /> {formatDistanceToNow(new Date(sub.submittedAt))} ago</span>
                            <span className="flex items-center gap-1"><Zap className="size-3" /> {sub.language}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 text-right">
                        <div className="hidden sm:block">
                          <p className="text-xs font-black text-white/80">{sub.runtime || 0}ms</p>
                          <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Runtime</p>
                        </div>
                        <div className="hidden sm:block">
                          <p className="text-xs font-black text-white/80">{sub.memory || 0}MB</p>
                          <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Memory</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProblemDescription;

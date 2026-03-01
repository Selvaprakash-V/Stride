import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: [0.2,0.9,0.2,1] } },
};

function ProblemList({ problems = [], onSelect }) {
  return (
    <motion.div
      className="space-y-2 list-stagger"
      variants={container}
      initial="hidden"
      animate={problems.length ? "show" : "hidden"}
    >
      <AnimatePresence>
        {problems.map((p) => (
          <motion.div
            key={p.id}
            className="p-3 rounded-lg hover:bg-base-200 cursor-pointer card-hover pop-in"
            onClick={() => onSelect(p.id)}
            variants={item}
            whileHover={{ scale: 1.02, translateY: -4 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-base-content/60">{p.category}</div>
              </div>
              <div className="text-sm badge badge-outline">{p.difficulty}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProblemList;

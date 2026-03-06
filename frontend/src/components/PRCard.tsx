import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  AlertCircle,
  Calendar,
  User,
  GitBranch,
} from "lucide-react";
import { RiskBadge } from "./RiskBadge";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export interface PRData {
  _id: string;
  action: string;
  repo: string;
  prNumber: number;
  title: string;
  author: string;
  aiReview: string;
  riskScore: number;
  createdAt: string;
}

export interface PRCardProps {
  pr: PRData;
  index: number;
}

export const PRCard: React.FC<PRCardProps> = ({ pr, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const githubUrl = `https://github.com/${pr.repo}/pull/${pr.prNumber}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative w-full"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all duration-300",
          "hover:bg-white/[0.04] hover:border-white/10 hover:shadow-2xl hover:shadow-emerald-900/10",
          isExpanded ? "ring-1 ring-emerald-500/30 bg-white/[0.04]" : "",
        )}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header */}
        <div
          className="relative p-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            {/* Left */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-emerald-400/80">
                  <GitBranch size={12} />
                  {pr.repo}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>#{pr.prNumber}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {new Date(pr.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white leading-tight group-hover:text-emerald-50 transition-colors">
                {pr.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User size={14} />
                <span>{pr.author}</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
              <RiskBadge score={pr.riskScore} />
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="text-gray-500 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-white/5">
                {/* AI Box */}
                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-4 text-emerald-400 text-sm font-semibold uppercase tracking-wider">
                    <AlertCircle size={16} />
                    AI Risk Analysis
                  </div>

                  <div className="text-sm md:text-base leading-relaxed text-gray-300">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-6">{children}</p>,
                        li: ({ children }) => (
                          <li className="mb-2">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-white font-semibold">
                            {children}
                          </strong>
                        ),
                      }}
                    >
                      {pr.aiReview}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-5 flex justify-end">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

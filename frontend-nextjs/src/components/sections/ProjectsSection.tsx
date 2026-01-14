"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getProjects, type Project } from "@/lib/api";
import { ArrowRight, Building2, Server, Loader2, Archive } from "lucide-react";

const ProjectsSection = () => {
  const { language, t, basePath } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const projectColors = [
    "from-cyan-500/20 to-slate-800/50",
    "from-slate-600/30 to-slate-800/50",
    "from-teal-500/20 to-slate-800/50",
    "from-slate-500/30 to-slate-800/50",
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(null, null, true, 4); // Get 4 featured projects
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 size={40} className="text-cyan-400 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Archive className="w-8 h-8 text-cyan-400" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t("projects.title")}
              </h2>
            </div>
            <p className="text-lg text-slate-400">{t("projects.subtitle")}</p>
          </div>
          <Link
            href={`${basePath}/case-studies`}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
          >
            {language === "en" ? "View all projects" : "Lihat semua proyek"}
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`${basePath}/case-studies`}
                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    projectColors[index % projectColors.length]
                  }`}
                />

                {/* Content */}
                <div className="relative p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs font-medium">
                      <Building2 size={12} />
                      {project.industry[language]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                      <Server size={12} />
                      {project.system_type[language]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                    {project.title[language]}
                  </h3>

                  {/* Scope */}
                  <p className="text-slate-400 text-sm mb-4">
                    {project.scope[language]}
                  </p>

                  {/* Outcome */}
                  <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {project.outcome[language]}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="mr-2">
                      {language === "en"
                        ? "Read case study"
                        : "Baca studi kasus"}
                    </span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">
              {language === "en"
                ? "No projects available."
                : "Tidak ada proyek tersedia."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

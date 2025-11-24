import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface Props {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<Props> = ({ project, className = "" }) => {
  return (
    <div className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 ${className}`}>
      
      {/* Image Background */}
      <div className="absolute inset-0">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-all">
              {project.title}
            </h3>
            <a href={project.link} className="p-2 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <ArrowUpRight size={20} />
            </a>
          </div>
          
          <p className="text-slate-300 mb-4 line-clamp-2 text-sm md:text-base">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
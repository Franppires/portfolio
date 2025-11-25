import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface Props {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<Props> = ({ project, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });

    // Calculate rotation for 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Slightly subtler rotation for a "heavier" premium feel
    const rotateX = ((y - centerY) / centerY) * -3.0; 
    const rotateY = ((x - centerX) / centerX) * 3.0;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 transition-all duration-200 ease-out hover:shadow-2xl hover:shadow-indigo-500/20 ${className}`}
    >
      {/* Spotlight Effect overlay */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.08), transparent 40%)`
        }}
      />

      {/* Glossy Sheen Reflection */}
      <div 
         className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
         style={{
            background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.0) 60%)`,
            transform: `translateX(${(position.x / 500) * 100 - 50}%)`
         }}
      />
      
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8 transform-gpu translate-z-10">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-all">
              {project.title}
            </h3>
            <a 
              href={project.link} 
              className="p-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 hover:scale-110"
              aria-label={`View ${project.title}`}
            >
              <ArrowUpRight size={18} />
            </a>
          </div>
          
          <p className="text-slate-300 mb-5 line-clamp-2 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-medium text-indigo-200 bg-indigo-500/10 border border-indigo-500/20 rounded-full backdrop-blur-sm group-hover:border-indigo-400/30 transition-colors">
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
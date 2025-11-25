import React from 'react';

export type Language = 'pt' | 'en';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: string; // Emoji or icon name
}

export interface SkillCategory {
  title: string; // We will treat this as a key or keep it English/PT based on data
  skills: Skill[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}
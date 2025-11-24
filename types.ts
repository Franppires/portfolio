import React from 'react';

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
  level: number; // 0-100
  icon: string; // Emoji or icon name
  category: 'frontend' | 'backend' | 'tools' | 'design';
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
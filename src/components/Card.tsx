import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass';
  animate?: boolean;
  onClick?: () => void;
  isDarkMode?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  animate = true,
  onClick,
  isDarkMode = false
}) => {
  const baseClasses = `
    rounded-xl transition-all duration-200
    ${isDarkMode 
      ? 'bg-slate-800/90 border-blue-500/20 text-gray-100' 
      : 'bg-white/90 border-gray-200'
    }
    ${onClick ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1' : ''}
    ${variant === 'gradient' && isDarkMode
      ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90'
      : variant === 'gradient'
      ? 'bg-gradient-to-br from-white to-gray-50'
      : ''
    }
    ${variant === 'glass' && isDarkMode
      ? 'backdrop-blur-md bg-slate-800/50'
      : variant === 'glass'
      ? 'backdrop-blur-md bg-white/50'
      : ''
    }
  `;

  const cardContent = (
    <div 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (!animate) return cardContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cardContent}
    </motion.div>
  );
};

export default Card;
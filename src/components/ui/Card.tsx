interface CardProps {
  children: React.ReactNode;
  className?: string;
  isDarkMode: boolean;
}

export const Card = ({ children, className = '', isDarkMode }: CardProps) => {
  return (
    <div className={`p-6 rounded-xl ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    } border ${className}`}>
      {children}
    </div>
  );
};
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  gradient?: boolean;
}

export function GlassCard({ children, className = '', glow = false, hover = false, gradient = false }: GlassCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${hover ? 'group' : ''} ${className}`}>
      {/* Main glassmorphism background */}
      <div className={`absolute inset-0 backdrop-blur-xl border border-primary/20 rounded-2xl ${
        gradient 
          ? 'bg-gradient-to-br from-primary/10 via-[#1a1410]/80 to-[#0a0a0a]/90'
          : 'bg-[#0f0c0a]/95'
      }`} />
      
      {/* Inner glow */}
      {glow && (
        <div className="absolute inset-0 opacity-20"
             style={{ 
               boxShadow: 'inset 0 0 40px rgba(255, 107, 53, 0.15)',
               background: 'radial-gradient(circle at 50% 0%, rgba(255, 107, 53, 0.08), transparent 70%)'
             }} />
      )}
      
      {/* Outer glow */}
      {glow && (
        <div className="absolute inset-0 -z-10 rounded-2xl"
             style={{ boxShadow: '0 0 30px rgba(255, 107, 53, 0.2), 0 0 60px rgba(255, 107, 53, 0.1)' }} />
      )}
      
      {/* Hover effect */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{ boxShadow: '0 0 40px rgba(255, 107, 53, 0.3), inset 0 0 30px rgba(255, 107, 53, 0.1)' }} />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
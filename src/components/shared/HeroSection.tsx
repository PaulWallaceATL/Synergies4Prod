import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  title: string;
  highlightText?: string;
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  backgroundVariant?: 'gradient' | 'solid' | 'pattern';
  customColors?: {
    background: string;
    accent: string;
    particles: string;
  };
  className?: string;
}

export default function HeroSection({
  badge,
  title,
  highlightText,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundVariant = 'gradient',
  customColors,
  className = ''
}: HeroSectionProps) {
  const getBackgroundClasses = () => {
    switch (backgroundVariant) {
      case 'solid':
        return 'bg-blue-600';
      case 'pattern':
        return 'bg-gray-50 relative overflow-hidden';
      case 'gradient':
      default:
        if (customColors) {
          return `${customColors.background} relative overflow-hidden`;
        }
        return 'bg-gradient-to-br from-blue-50 via-slate-50 to-teal-50 relative overflow-hidden';
    }
  };

  return (
    <section className={`py-20 ${getBackgroundClasses()} ${className}`}>
      {/* Background Pattern for pattern variant */}
      {backgroundVariant === 'pattern' && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      )}

      {/* Floating Background Elements for gradient variant */}
      {backgroundVariant === 'gradient' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-10 left-10 w-32 h-32 ${customColors?.accent || 'bg-gradient-to-br from-blue-400/20 to-teal-400/20'} rounded-lg blur-xl`} />
          <div className={`absolute top-32 right-20 w-24 h-24 ${customColors?.accent || 'bg-gradient-to-br from-teal-400/25 to-cyan-400/25'} rounded-full blur-lg`} />
          <div className={`absolute bottom-20 left-1/4 w-40 h-40 ${customColors?.particles || 'bg-gradient-to-br from-slate-400/15 to-blue-400/15'} rounded-2xl blur-2xl`} />
          <div className={`absolute top-1/2 right-10 w-28 h-28 ${customColors?.accent || 'bg-gradient-to-br from-cyan-400/20 to-blue-400/20'} rounded-lg blur-xl`} />
          
          {/* Mobile-optimized particles */}
          <div className="hidden md:block">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`particle-${i}`}
                className={`absolute w-2 h-2 ${customColors?.particles || 'bg-gradient-to-r from-blue-400 to-teal-400'} rounded-full opacity-40`}
                style={{
                  left: `${(i * 12) % 100}%`,
                  top: `${(i * 15) % 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        <div>
          {badge && (
            <Badge className={`mb-6 ${customColors ? 'bg-white/80 text-gray-700 hover:bg-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}>
              {badge.icon && <span className="mr-2">{badge.icon}</span>}
              {badge.text}
            </Badge>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {title}{' '}
            {highlightText && (
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                {highlightText}
              </span>
            )}
          </h1>
        </div>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryCTA && (
            primaryCTA.onClick ? (
              <Button
                onClick={primaryCTA.onClick}
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <span className="text-white font-semibold">{primaryCTA.text}</span>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <Link href={primaryCTA.href}>
                  <span className="text-white font-semibold">{primaryCTA.text}</span>
                </Link>
              </Button>
            )
          )}

          {secondaryCTA && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-white group"
            >
              <Link href={secondaryCTA.href} className="flex items-center">
                <span className="text-gray-900 group-hover:text-white font-semibold">
                  {secondaryCTA.text}
                </span>
                {secondaryCTA.icon && (
                  <span className="ml-2 text-gray-900 group-hover:text-white">
                    {secondaryCTA.icon}
                  </span>
                )}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
} 
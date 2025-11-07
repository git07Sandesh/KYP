import React from 'react';
import { Star, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export type ScoreBadgeType = 'impact' | 'scandal' | 'fulfillment' | 'popularity';

export interface ScoreBadgeProps {
  type: ScoreBadgeType;
  value: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBadge({ 
  type, 
  value, 
  className = '',
  showLabel = true,
  size = 'md'
}: ScoreBadgeProps) {
  const getConfig = () => {
    switch (type) {
      case 'impact':
        return {
          icon: Star,
          label: 'Impact Score',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          maxValue: 5,
          format: (v: number) => v.toFixed(1),
        };
      case 'scandal':
        return {
          icon: AlertTriangle,
          label: 'Scandal Score',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          maxValue: 5,
          format: (v: number) => v.toFixed(1),
        };
      case 'fulfillment':
        return {
          icon: CheckCircle,
          label: 'Fulfillment Rate',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          maxValue: 100,
          format: (v: number) => `${v.toFixed(0)}%`,
        };
      case 'popularity':
        return {
          icon: TrendingUp,
          label: 'Popularity',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          maxValue: 100,
          format: (v: number) => v.toFixed(0),
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;
  const percentage = Math.min((value / config.maxValue) * 100, 100);

  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 gap-1.5',
      icon: 'w-3 h-3',
      text: 'text-xs',
      label: 'text-[10px]',
    },
    md: {
      container: 'px-3 py-1.5 gap-2',
      icon: 'w-4 h-4',
      text: 'text-sm',
      label: 'text-xs',
    },
    lg: {
      container: 'px-4 py-2 gap-2',
      icon: 'w-5 h-5',
      text: 'text-base',
      label: 'text-sm',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`inline-flex items-center ${sizes.container} rounded-full border ${config.bgColor} ${config.borderColor} ${className}`}>
      <Icon className={`${sizes.icon} ${config.color}`} />
      <div className="flex flex-col">
        {showLabel && (
          <span className={`${sizes.label} ${config.color} font-medium leading-none mb-0.5`}>
            {config.label}
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span className={`${sizes.text} font-bold ${config.color}`}>
            {config.format(value)}
          </span>
          {type !== 'fulfillment' && type !== 'popularity' && (
            <span className={`${sizes.label} text-gray-500`}>/ {config.maxValue}</span>
          )}
        </div>
      </div>
      
      {/* Visual indicator bar */}
      {size !== 'sm' && (
        <div className="ml-2 flex-shrink-0">
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${config.color.replace('text-', 'bg-')} transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Utility component for displaying multiple scores
export interface CandidateScoresProps {
  impactScore?: number | null;
  scandalScore?: number | null;
  fulfillmentRate?: number | null;
  popularityScore?: number | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
}

export function CandidateScores({
  impactScore,
  scandalScore,
  fulfillmentRate,
  popularityScore,
  className = '',
  size = 'md',
  layout = 'horizontal',
}: CandidateScoresProps) {
  const containerClass = layout === 'horizontal' 
    ? 'flex flex-wrap gap-2' 
    : 'flex flex-col gap-2';

  return (
    <div className={`${containerClass} ${className}`}>
      {impactScore !== null && impactScore !== undefined && (
        <ScoreBadge type="impact" value={impactScore} size={size} />
      )}
      {scandalScore !== null && scandalScore !== undefined && (
        <ScoreBadge type="scandal" value={scandalScore} size={size} />
      )}
      {fulfillmentRate !== null && fulfillmentRate !== undefined && (
        <ScoreBadge type="fulfillment" value={fulfillmentRate} size={size} />
      )}
      {popularityScore !== null && popularityScore !== undefined && (
        <ScoreBadge type="popularity" value={popularityScore} size={size} />
      )}
    </div>
  );
}

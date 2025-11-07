import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign, MapPin, TrendingUp, CheckCircle2 } from 'lucide-react';

export type ImpactLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type WorkCategory = 'INFRASTRUCTURE' | 'HEALTH' | 'EDUCATION' | 'SOCIAL_PROGRAMS' | 'POLICY_WORK' | 'LEGISLATION' | 'COMMUNITY_DEVELOPMENT' | 'ENVIRONMENT' | 'OTHER';

export interface WorkCardProps {
  work: {
    id: string;
    title: string;
    description: string;
    category: WorkCategory;
    impactLevel: ImpactLevel;
    startDate: Date | string;
    endDate?: Date | string | null;
    completionPercent?: number | null;
    budget?: number | null;
    beneficiaries?: number | null;
    location?: string | null;
    sources?: Array<{
      id: string;
      title: string;
      url: string;
    }>;
  };
  onExpand?: () => void;
  expanded?: boolean;
}

export function WorkCard({ work, onExpand, expanded = false }: WorkCardProps) {
  const getImpactConfig = (level: ImpactLevel) => {
    switch (level) {
      case 'HIGH':
        return {
          label: 'High Impact',
          color: 'text-green-700',
          bgColor: 'bg-green-100',
          icon: TrendingUp,
        };
      case 'MEDIUM':
        return {
          label: 'Medium Impact',
          color: 'text-blue-700',
          bgColor: 'bg-blue-100',
          icon: TrendingUp,
        };
      case 'LOW':
        return {
          label: 'Low Impact',
          color: 'text-gray-700',
          bgColor: 'bg-gray-100',
          icon: TrendingUp,
        };
    }
  };

  const impactConfig = getImpactConfig(work.impactLevel);
  const ImpactIcon = impactConfig.icon;

  const getCategoryLabel = (category: WorkCategory) => {
    return category.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatBudget = (amount: number) => {
    if (amount >= 1_000_000_000) {
      return `NPR ${(amount / 1_000_000_000).toFixed(2)}B`;
    }
    if (amount >= 1_000_000) {
      return `NPR ${(amount / 1_000_000).toFixed(2)}M`;
    }
    if (amount >= 1_000) {
      return `NPR ${(amount / 1_000).toFixed(2)}K`;
    }
    return `NPR ${amount.toLocaleString()}`;
  };

  const isOngoing = !work.endDate || new Date(work.endDate) > new Date();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="outline" className="text-xs">
                {getCategoryLabel(work.category)}
              </Badge>
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${impactConfig.bgColor} ${impactConfig.color}`}>
                <ImpactIcon className="w-3 h-3" />
                {impactConfig.label}
              </div>
              {isOngoing && (
                <Badge variant="secondary" className="text-xs">
                  Ongoing
                </Badge>
              )}
            </div>
            <h3 className="text-base font-semibold text-gray-900 leading-tight">
              {work.title}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        <p className={`text-sm text-gray-700 leading-relaxed ${!expanded && 'line-clamp-2'}`}>
          {work.description}
        </p>

        {/* Completion Progress (if ongoing) */}
        {isOngoing && work.completionPercent !== null && work.completionPercent !== undefined && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Completion
              </span>
              <span className="font-medium text-gray-900">{work.completionPercent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${work.completionPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2">
          {/* Timeline */}
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-600">Timeline</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {formatDate(work.startDate)}
                {work.endDate && ` - ${formatDate(work.endDate)}`}
              </p>
            </div>
          </div>

          {/* Location */}
          {work.location && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Location</p>
                <p className="text-sm font-medium text-gray-900 truncate">{work.location}</p>
              </div>
            </div>
          )}

          {/* Budget */}
          {work.budget && (
            <div className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Budget</p>
                <p className="text-sm font-medium text-gray-900">{formatBudget(work.budget)}</p>
              </div>
            </div>
          )}

          {/* Beneficiaries */}
          {work.beneficiaries && (
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Beneficiaries</p>
                <p className="text-sm font-medium text-gray-900">
                  {work.beneficiaries.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sources */}
        {work.sources && work.sources.length > 0 && (
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">Sources:</span>
              <div className="flex gap-1.5">
                {work.sources.slice(0, 3).map((source, index) => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
                    title={source.title}
                  >
                    {index + 1}
                  </a>
                ))}
                {work.sources.length > 3 && (
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs text-gray-600">
                    +{work.sources.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {onExpand && (
          <button
            onClick={onExpand}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            {expanded ? 'Show less' : 'View full details'}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

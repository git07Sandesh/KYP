import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, HelpCircle, Minus } from 'lucide-react';

export type PromiseStatus = 'KEPT' | 'IN_PROGRESS' | 'BROKEN' | 'NO_EVIDENCE' | 'PARTIALLY_FULFILLED';
export type PromiseCategory = 'ECONOMY' | 'INFRASTRUCTURE' | 'HEALTH' | 'EDUCATION' | 'SOCIAL_WELFARE' | 'ENVIRONMENT' | 'GOVERNANCE' | 'SECURITY' | 'AGRICULTURE' | 'OTHER';

export interface PromiseCardProps {
  promise: {
    id: string;
    text: string;
    status: PromiseStatus;
    category: PromiseCategory;
    progressPercent?: number | null;
    electionCycle?: string | null;
    announcedDate?: Date | string | null;
    sources?: Array<{
      id: string;
      title: string;
      url: string;
      publisher: string;
    }>;
  };
  onExpand?: () => void;
  expanded?: boolean;
}

export function PromiseCard({ promise, onExpand, expanded = false }: PromiseCardProps) {
  const getStatusConfig = (status: PromiseStatus) => {
    switch (status) {
      case 'KEPT':
        return {
          icon: CheckCircle,
          label: 'Kept',
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        };
      case 'BROKEN':
        return {
          icon: XCircle,
          label: 'Broken',
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      case 'IN_PROGRESS':
        return {
          icon: Clock,
          label: 'In Progress',
          color: 'text-blue-700',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
        };
      case 'PARTIALLY_FULFILLED':
        return {
          icon: Minus,
          label: 'Partially Fulfilled',
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        };
      case 'NO_EVIDENCE':
        return {
          icon: HelpCircle,
          label: 'No Evidence',
          color: 'text-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
    }
  };

  const statusConfig = getStatusConfig(promise.status);
  const StatusIcon = statusConfig.icon;

  const getCategoryLabel = (category: PromiseCategory) => {
    return category.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <Card className={`${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2 flex-1">
            <StatusIcon className={`w-5 h-5 ${statusConfig.color} mt-0.5 flex-shrink-0`} />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge variant="outline" className="text-xs">
                  {getCategoryLabel(promise.category)}
                </Badge>
                {promise.electionCycle && (
                  <span className="text-xs text-gray-600">
                    {promise.electionCycle} Election
                  </span>
                )}
              </div>
              <CardTitle className="text-base font-semibold">
                <span className={statusConfig.color}>{statusConfig.label}</span>
              </CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-900 leading-relaxed mb-3">
          "{promise.text}"
        </p>

        {/* Progress bar for IN_PROGRESS status */}
        {promise.status === 'IN_PROGRESS' && promise.progressPercent !== null && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{promise.progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${promise.progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Sources */}
        {promise.sources && promise.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">Evidence:</span>
              <div className="flex gap-1.5">
                {promise.sources.slice(0, 3).map((source, index) => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
                    title={`${source.publisher}: ${source.title}`}
                  >
                    {index + 1}
                  </a>
                ))}
                {promise.sources.length > 3 && (
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs text-gray-600">
                    +{promise.sources.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {onExpand && (
          <button
            onClick={onExpand}
            className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            {expanded ? 'Show less' : 'Show more details'}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

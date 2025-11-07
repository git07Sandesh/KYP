import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scale, Calendar, FileText, AlertCircle } from 'lucide-react';

export type CaseStatus = 'FILED' | 'UNDER_INVESTIGATION' | 'TRIAL' | 'HEARING' | 'ACQUITTED' | 'CONVICTED' | 'WITHDRAWN' | 'CLOSED' | 'INACTIVE';

export interface CaseCardProps {
  legalCase: {
    id: string;
    allegation: string;
    caseNumber?: string | null;
    courtName?: string | null;
    severity: number; // 1-5 scale
    status: CaseStatus;
    filedDate?: Date | string | null;
    closedDate?: Date | string | null;
    verdict?: string | null;
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

export function CaseCard({ legalCase, onExpand, expanded = false }: CaseCardProps) {
  const getStatusConfig = (status: CaseStatus) => {
    switch (status) {
      case 'FILED':
      case 'UNDER_INVESTIGATION':
      case 'TRIAL':
      case 'HEARING':
        return {
          label: status.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' '),
          color: 'text-orange-700',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
        };
      case 'ACQUITTED':
      case 'WITHDRAWN':
        return {
          label: status.charAt(0) + status.slice(1).toLowerCase(),
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        };
      case 'CONVICTED':
        return {
          label: 'Convicted',
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      case 'CLOSED':
      case 'INACTIVE':
        return {
          label: status.charAt(0) + status.slice(1).toLowerCase(),
          color: 'text-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
    }
  };

  const statusConfig = getStatusConfig(legalCase.status);

  const getSeverityColor = (severity: number) => {
    if (severity >= 4) return 'bg-red-500';
    if (severity >= 3) return 'bg-orange-500';
    if (severity >= 2) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getSeverityLabel = (severity: number) => {
    if (severity === 5) return 'Very High';
    if (severity === 4) return 'High';
    if (severity === 3) return 'Medium';
    if (severity === 2) return 'Low';
    return 'Very Low';
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isActive = ['FILED', 'UNDER_INVESTIGATION', 'TRIAL', 'HEARING'].includes(legalCase.status);

  return (
    <Card className={`border ${statusConfig.borderColor} ${statusConfig.bgColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2 flex-1">
            <AlertCircle className={`w-5 h-5 ${statusConfig.color} mt-0.5 flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge className={`${statusConfig.bgColor} ${statusConfig.color} border-0`}>
                  {statusConfig.label}
                </Badge>
                {isActive && (
                  <span className="text-xs font-medium text-red-600">
                    Active
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Severity Indicator */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-600 font-medium">Severity</span>
            <span className="text-xs font-medium text-gray-900">
              {getSeverityLabel(legalCase.severity)}
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-2 flex-1 rounded-full ${
                  level <= legalCase.severity ? getSeverityColor(legalCase.severity) : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Allegation */}
        <div>
          <h4 className="text-xs text-gray-600 font-medium mb-1">Allegation</h4>
          <p className={`text-sm text-gray-900 leading-relaxed ${!expanded && 'line-clamp-2'}`}>
            {legalCase.allegation}
          </p>
        </div>

        {/* Case Details */}
        <div className="grid grid-cols-1 gap-2 pt-2 border-t border-gray-200">
          {legalCase.caseNumber && (
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Case Number</p>
                <p className="text-sm font-medium text-gray-900">{legalCase.caseNumber}</p>
              </div>
            </div>
          )}

          {legalCase.courtName && (
            <div className="flex items-start gap-2">
              <Scale className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Court</p>
                <p className="text-sm font-medium text-gray-900">{legalCase.courtName}</p>
              </div>
            </div>
          )}

          {legalCase.filedDate && (
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Filed Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(legalCase.filedDate)}
                </p>
              </div>
            </div>
          )}

          {legalCase.closedDate && (
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-600">Closed Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(legalCase.closedDate)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Verdict (if available) */}
        {expanded && legalCase.verdict && (
          <div className="pt-2 border-t border-gray-200">
            <h4 className="text-xs text-gray-600 font-medium mb-1">Verdict</h4>
            <p className="text-sm text-gray-900 leading-relaxed">{legalCase.verdict}</p>
          </div>
        )}

        {/* Sources */}
        {legalCase.sources && legalCase.sources.length > 0 && (
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">Sources:</span>
              <div className="flex gap-1.5">
                {legalCase.sources.slice(0, 3).map((source, index) => (
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
                {legalCase.sources.length > 3 && (
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs text-gray-600">
                    +{legalCase.sources.length - 3}
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
            {expanded ? 'Show less' : 'View timeline & details'}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

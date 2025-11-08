import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, TrendingUp } from 'lucide-react';

export type RumorSource = 'SOCIAL_MEDIA' | 'SPEECH' | 'HEARSAY' | 'UNVERIFIED_MEDIA' | 'OTHER';

export interface RumorCardProps {
  rumor: {
    id: string;
    text: string;
    sourceType: RumorSource;
    originDate: Date | string;
    expiryDate: Date | string;
    popularityCount: number;
    isExpired: boolean;
  };
}

export function RumorCard({ rumor }: RumorCardProps) {
  const getSourceLabel = (sourceType: RumorSource) => {
    switch (sourceType) {
      case 'SOCIAL_MEDIA':
        return 'Social Media';
      case 'SPEECH':
        return 'Public Speech';
      case 'HEARSAY':
        return 'Hearsay';
      case 'UNVERIFIED_MEDIA':
        return 'Unverified Media';
      case 'OTHER':
        return 'Other';
    }
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysRemaining = () => {
    const expiry = typeof rumor.expiryDate === 'string' ? new Date(rumor.expiryDate) : rumor.expiryDate;
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <Card className="border-2 border-yellow-300 bg-yellow-50">
      {/* Warning Banner */}
      <div className="bg-yellow-400 px-4 py-3 border-b-2 border-yellow-500">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-900 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-yellow-900 text-sm">
              UNVERIFIED CLAIM / RUMOR
            </h3>
            <p className="text-xs text-yellow-800 mt-0.5">
              This information is unproven and shown for transparency. Do not treat as fact.
            </p>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant="outline" className="border-yellow-600 text-yellow-800 bg-yellow-100">
            {getSourceLabel(rumor.sourceType)}
          </Badge>
          {rumor.isExpired ? (
            <Badge variant="outline" className="border-gray-400 text-gray-700">
              Expired
            </Badge>
          ) : (
            <div className="text-xs text-yellow-800">
              <span className="font-medium">Auto-expires in:</span>{' '}
              <span className="font-bold">
                {daysRemaining > 0 ? `${daysRemaining} days` : 'Today'}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Rumor Text */}
        <div className="p-3 bg-white border border-yellow-200 rounded-md">
          <p className="text-sm text-gray-900 leading-relaxed">
            "{rumor.text}"
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-gray-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>First seen:</span>
            <span className="font-medium">{formatDate(rumor.originDate)}</span>
          </div>
          
          {rumor.popularityCount > 0 && (
            <div className="flex items-center gap-1.5 text-gray-700">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Mentions:</span>
              <span className="font-medium">{rumor.popularityCount.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="pt-2 border-t border-yellow-200">
          <p className="text-xs text-yellow-800 leading-relaxed">
            <span className="font-semibold">Important:</span> Rumors are automatically removed after 60 days unless verified with credible sources. This platform maintains neutrality and displays unverified claims for transparency only.
          </p>
        </div>

        {rumor.isExpired && (
          <div className="p-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-700 text-center">
            This rumor has expired and will be archived soon.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

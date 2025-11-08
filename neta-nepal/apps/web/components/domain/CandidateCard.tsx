import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, AlertTriangle, CheckCircle } from 'lucide-react';

export type CandidateCardVariant = 'grid' | 'list';

export interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    photoUrl?: string | null;
    party: {
      name: string;
      symbolUrl?: string | null;
    };
    constituency: {
      name: string;
      level: string;
    };
    impactScore?: number | null;
    scandalScore?: number | null;
    fulfillmentRate?: number | null;
    isVerified?: boolean;
    hasAllegations?: boolean;
    hasCriminalCases?: boolean;
  };
  variant?: CandidateCardVariant;
  onClick?: () => void;
}

export function CandidateCard({ 
  candidate, 
  variant = 'grid',
  onClick 
}: CandidateCardProps) {
  const initials = candidate.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (variant === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Photo */}
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarImage src={candidate.photoUrl || ''} alt={candidate.name} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {candidate.party.name} | {candidate.constituency.name}
                  </p>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {candidate.isVerified && (
                  <Badge variant="verified" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {candidate.hasAllegations && (
                  <Badge variant="allegation" className="text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Allegation
                  </Badge>
                )}
                {candidate.hasCriminalCases && (
                  <Badge variant="criminal" className="text-xs">
                    Criminal Case
                  </Badge>
                )}
              </div>

              {/* Scores */}
              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                {candidate.impactScore !== null && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-700">
                      Impact: {candidate.impactScore?.toFixed(1)}/5
                    </span>
                  </div>
                )}
                {candidate.scandalScore !== null && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">
                      Scandal: {candidate.scandalScore?.toFixed(1)}/5
                    </span>
                  </div>
                )}
                {candidate.fulfillmentRate !== null && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">
                      Fulfillment: {candidate.fulfillmentRate?.toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* View Profile Button */}
            <Button variant="outline" size="sm" className="flex-shrink-0">
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid variant (compact)
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={candidate.photoUrl || ''} alt={candidate.name} />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-base line-clamp-2">{candidate.name}</h3>
          <p className="text-xs text-gray-600 mt-1">{candidate.party.name}</p>
          <p className="text-xs text-gray-500">{candidate.constituency.name}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-4">
        {/* Status Badges */}
        <div className="flex flex-wrap justify-center gap-1 mb-3">
          {candidate.isVerified && (
            <Badge variant="verified" className="text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {candidate.hasAllegations && (
            <Badge variant="allegation" className="text-xs">
              Allegation
            </Badge>
          )}
          {candidate.hasCriminalCases && (
            <Badge variant="criminal" className="text-xs">
              Case
            </Badge>
          )}
        </div>

        {/* Scores */}
        <div className="space-y-1.5 text-xs">
          {candidate.impactScore !== null && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Impact:</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{candidate.impactScore?.toFixed(1)}</span>
              </div>
            </div>
          )}
          {candidate.scandalScore !== null && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Scandal:</span>
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-orange-500" />
                <span className="font-medium">{candidate.scandalScore?.toFixed(1)}</span>
              </div>
            </div>
          )}
          {candidate.fulfillmentRate !== null && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Fulfillment:</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="font-medium">{candidate.fulfillmentRate?.toFixed(0)}%</span>
              </div>
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full mt-3">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}

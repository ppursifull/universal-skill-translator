'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TranslationResult } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';
import { Copy, Share2, Check } from 'lucide-react';

interface ResultCardProps {
  result: TranslationResult;
  sourceLadder: string;
  sourceValue: string | number;
  onShare?: () => void;
}

export function ResultCard({ result, sourceLadder, sourceValue, onShare }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${sourceValue} in ${sourceLadder} ≈ ${result.value} in ${result.ladderId}`;
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getConfidenceColor = (confidence?: string) => {
    switch (confidence) {
      case 'exact':
        return 'text-green-600';
      case 'interpolated':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getConfidenceText = (confidence?: string) => {
    switch (confidence) {
      case 'exact':
        return 'Exact match';
      case 'interpolated':
        return 'Interpolated';
      default:
        return 'Estimated';
    }
  };

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{result.value}</h3>
            <span className="text-sm text-muted-foreground capitalize">
              {result.ladderId.replace('_', ' ')}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={getConfidenceColor(result.confidence)}>
              {getConfidenceText(result.confidence)}
            </span>
            {result.p_range && (
              <span className="text-xs">
                ({((result.p_range[1] - result.p_range[0]) * 100).toFixed(1)}% range)
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 w-8 p-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          
          {onShare && (
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              className="h-8 w-8 p-0"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 
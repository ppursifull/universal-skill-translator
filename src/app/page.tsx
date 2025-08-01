'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LadderSelect } from '@/components/LadderSelect';
import { TierAutocomplete } from '@/components/TierAutocomplete';
import { ResultCard } from '@/components/ResultCard';
import { TranslationResponse, LadderOption } from '@/lib/types';
import { formatPercentile } from '@/lib/math';
import { generateShareUrl } from '@/lib/utils';
import { ArrowRight, Info, Share2 } from 'lucide-react';
import { ScrollingLogos } from '@/components/ScrollingLogos';

export default function Home() {
  const [sourceLadder, setSourceLadder] = useState('');
  const [sourceValue, setSourceValue] = useState<string | number>('');
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [availableLadders, setAvailableLadders] = useState<LadderOption[]>([]);
  const [results, setResults] = useState<TranslationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load available ladders on mount
  useEffect(() => {
    async function loadLadders() {
      try {
        const response = await fetch('/api/ladders');
        const data = await response.json();
        if (data.success) {
          setAvailableLadders(data.data);
          // Default to all ladders as targets
          setSelectedTargets(data.data.map((ladder: LadderOption) => ladder.id));
        }
      } catch (error) {
        console.error('Failed to load ladders:', error);
      }
    }
    loadLadders();
  }, []);

  // Load URL parameters for deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source');
    const value = params.get('value');
    const targets = params.get('targets');

    if (source) setSourceLadder(source);
    if (value) setSourceValue(value);
    if (targets) setSelectedTargets(targets.split(',').filter(Boolean));
  }, []);

  const handleTranslate = async () => {
    if (!sourceLadder || !sourceValue || selectedTargets.length === 0) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: {
            ladderId: sourceLadder,
            value: sourceValue,
          },
          targets: selectedTargets,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
        // Update URL for sharing
        const shareUrl = generateShareUrl(sourceLadder, sourceValue, selectedTargets);
        window.history.replaceState({}, '', shareUrl);
      } else {
        setError(data.error || 'Translation failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Universal Skill Translator',
        text: `My ${sourceValue} in ${sourceLadder} translates to:`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const isTieredLadder = availableLadders.find(l => l.id === sourceLadder)?.type === 'tiered';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
             {/* Header */}
       <div className="text-center mb-8">
         <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
           Universal Skill Translator
         </h1>
         
         {/* Scrolling Logos with Tagline */}
         <ScrollingLogos />
         
         <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
           Enter your rank or handicap in any game or sport and we'll translate it to equivalents across others.
           <span className="block mt-1 text-xs">
             <Info className="inline w-3 h-3 mr-1" />
             Distributions are approximate placeholders—will be updated with authoritative data.
           </span>
         </p>
       </div>

      {/* Translation Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Source Ladder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Source Ladder
            </label>
            <LadderSelect
              value={sourceLadder}
              onValueChange={setSourceLadder}
              placeholder="Choose your ladder..."
            />
          </div>

          {/* Source Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Rank/Score
            </label>
            {isTieredLadder ? (
              <TierAutocomplete
                ladderId={sourceLadder}
                value={sourceValue as string}
                onValueChange={setSourceValue}
                placeholder="Select your tier..."
              />
            ) : (
              <Input
                type="number"
                value={sourceValue}
                onChange={(e) => setSourceValue(e.target.value)}
                placeholder="Enter your score..."
              />
            )}
          </div>

          {/* Target Selection */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Ladders
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableLadders.map((ladder) => (
                <label key={ladder.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTargets.includes(ladder.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTargets([...selectedTargets, ladder.id]);
                      } else {
                        setSelectedTargets(selectedTargets.filter(id => id !== ladder.id));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{ladder.displayName}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Translate Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleTranslate}
            disabled={loading || !sourceLadder || !sourceValue || selectedTargets.length === 0}
            className="px-8 py-3"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Translating...
              </div>
            ) : (
              <>
                Translate <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Your Results
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                You're in the <span className="font-semibold">{formatPercentile(results.sourcePercentile)}</span>
              </p>
            </div>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.equivalents.map((result) => (
              <ResultCard
                key={result.ladderId}
                result={result}
                sourceLadder={sourceLadder}
                sourceValue={sourceValue}
                onShare={handleShare}
              />
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> These translations use placeholder distributions and are for entertainment purposes. 
              Real-world skill comparisons may vary significantly.
            </p>
          </div>
        </div>
      )}

      {/* Ad Slot */}
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Advertisement Space
        </p>
      </div>
    </div>
  );
} 
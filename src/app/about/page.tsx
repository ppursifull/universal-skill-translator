import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Translator
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About Universal Skill Translator
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <p className="mb-4">
            Universal Skill Translator uses percentile-based mapping to convert your rank, ELO, tier, or handicap 
            from one competitive system to equivalent skill levels in others. Here's the process:
          </p>

          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li><strong>Input Normalization:</strong> Your rank/score is converted to a percentile within its own system</li>
            <li><strong>Percentile Mapping:</strong> We use cumulative distribution functions (CDFs) to find where you stand</li>
            <li><strong>Cross-Mapping:</strong> Your percentile is then mapped to equivalent ranks in other systems</li>
            <li><strong>Interpolation:</strong> For continuous systems, we use linear interpolation between known data points</li>
          </ol>

          <h2 className="text-xl font-semibold mb-4">Current Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">League of Legends</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tiered system from Iron IV to Challenger with divisions
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Valorant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ranks from Iron I to Radiant with subtiers
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Chess (ELO)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Continuous rating system from 800 to 2600+
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Golf Handicap</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                USGA handicap index (lower is better)
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Data Sources & Accuracy</h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> The current distributions are placeholder estimates for demonstration purposes. 
              We plan to replace these with authoritative data from official sources, community statistics, and 
              comprehensive player surveys.
            </p>
          </div>

          <p className="mb-4">
            Our goal is to provide the most accurate skill translations possible by:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Using official rank distributions where available</li>
            <li>Incorporating community data and statistics</li>
            <li>Regularly updating distributions as systems evolve</li>
            <li>Providing confidence levels for each translation</li>
            <li>Supporting regional variations in skill distributions</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Limitations</h2>
          <p className="mb-4">
            Skill translation is inherently complex and these comparisons should be taken as entertainment 
            rather than definitive assessments. Factors that affect accuracy include:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Different skill requirements between games/sports</li>
            <li>Varying player populations and demographics</li>
            <li>Seasonal changes in rank distributions</li>
            <li>Regional differences in competitive levels</li>
            <li>Different ranking algorithms and systems</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Future Plans</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Add more competitive systems (Overwatch, Rocket League, Tennis, etc.)</li>
            <li>Implement regional variations for global games</li>
            <li>Add historical data tracking</li>
            <li>Create confidence intervals for translations</li>
            <li>Build community-driven data collection</li>
            <li>Add seasonal adjustments for rank inflation/deflation</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Have suggestions?</strong> We're always looking to improve our data and add new systems. 
              If you have access to official rank distributions or want to suggest new features, 
              please reach out to us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
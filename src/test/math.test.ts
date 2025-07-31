import { describe, it, expect } from 'vitest';
import {
  percentileFromTier,
  percentileFromValue,
  valueFromPercentile,
  tierFromPercentile,
  getPercentile,
  getEquivalentValue,
  formatPercentile,
} from '@/lib/math';
import { TieredLadder, ContinuousLadder } from '@/lib/types';

describe('Math Utilities', () => {
  const tieredLadder: TieredLadder = {
    id: 'test_tiered',
    displayName: 'Test Tiered',
    type: 'tiered',
    unitsLabel: 'Tier',
    description: 'Test tiered ladder',
    bins: [
      { label: 'Bronze', p_min: 0.0, p_max: 0.5 },
      { label: 'Silver', p_min: 0.5, p_max: 0.8 },
      { label: 'Gold', p_min: 0.8, p_max: 0.95 },
      { label: 'Platinum', p_min: 0.95, p_max: 0.99 },
      { label: 'Diamond', p_min: 0.99, p_max: 1.0 },
    ],
  };

  const continuousLadder: ContinuousLadder = {
    id: 'test_continuous',
    displayName: 'Test Continuous',
    type: 'continuous',
    unitsLabel: 'Score',
    description: 'Test continuous ladder',
    points: [
      { value: 0, p: 0.0 },
      { value: 50, p: 0.5 },
      { value: 80, p: 0.8 },
      { value: 95, p: 0.95 },
      { value: 100, p: 1.0 },
    ],
  };

  describe('percentileFromTier', () => {
    it('should return correct percentile for tier', () => {
      expect(percentileFromTier(tieredLadder, 'Bronze')).toBe(0.25);
      expect(percentileFromTier(tieredLadder, 'Silver')).toBe(0.65);
      expect(percentileFromTier(tieredLadder, 'Gold')).toBe(0.875);
    });

    it('should handle case insensitive tier names', () => {
      expect(percentileFromTier(tieredLadder, 'bronze')).toBe(0.25);
      expect(percentileFromTier(tieredLadder, 'SILVER')).toBe(0.65);
    });

    it('should throw error for non-existent tier', () => {
      expect(() => percentileFromTier(tieredLadder, 'NonExistent')).toThrow();
    });
  });

  describe('percentileFromValue', () => {
    it('should return correct percentile for value', () => {
      expect(percentileFromValue(continuousLadder, 25)).toBe(0.25);
      expect(percentileFromValue(continuousLadder, 75)).toBe(0.75);
      expect(percentileFromValue(continuousLadder, 90)).toBe(0.9);
    });

    it('should handle edge cases', () => {
      expect(percentileFromValue(continuousLadder, 0)).toBe(0.0);
      expect(percentileFromValue(continuousLadder, 100)).toBe(1.0);
      expect(percentileFromValue(continuousLadder, -10)).toBe(0.0);
      expect(percentileFromValue(continuousLadder, 150)).toBe(1.0);
    });
  });

  describe('valueFromPercentile', () => {
    it('should return correct value for percentile', () => {
      expect(valueFromPercentile(continuousLadder, 0.25)).toBe(25);
      expect(valueFromPercentile(continuousLadder, 0.75)).toBe(75);
      expect(valueFromPercentile(continuousLadder, 0.9)).toBe(90);
    });

    it('should handle edge cases', () => {
      expect(valueFromPercentile(continuousLadder, 0.0)).toBe(0);
      expect(valueFromPercentile(continuousLadder, 1.0)).toBe(100);
    });
  });

  describe('tierFromPercentile', () => {
    it('should return correct tier for percentile', () => {
      expect(tierFromPercentile(tieredLadder, 0.25)).toBe('Bronze');
      expect(tierFromPercentile(tieredLadder, 0.65)).toBe('Silver');
      expect(tierFromPercentile(tieredLadder, 0.875)).toBe('Gold');
      expect(tierFromPercentile(tieredLadder, 0.97)).toBe('Platinum');
      expect(tierFromPercentile(tieredLadder, 0.995)).toBe('Diamond');
    });
  });

  describe('getPercentile', () => {
    it('should work with tiered ladders', () => {
      expect(getPercentile(tieredLadder, 'Bronze')).toBe(0.25);
    });

    it('should work with continuous ladders', () => {
      expect(getPercentile(continuousLadder, 50)).toBe(0.5);
    });

    it('should throw error for wrong value type', () => {
      expect(() => getPercentile(tieredLadder, 123)).toThrow();
      expect(() => getPercentile(continuousLadder, 'string')).toThrow();
    });
  });

  describe('getEquivalentValue', () => {
    it('should work with tiered ladders', () => {
      expect(getEquivalentValue(tieredLadder, 0.25)).toBe('Bronze');
    });

    it('should work with continuous ladders', () => {
      expect(getEquivalentValue(continuousLadder, 0.5)).toBe(50);
    });
  });

  describe('formatPercentile', () => {
    it('should format percentiles correctly', () => {
      expect(formatPercentile(0.99)).toBe('Top 1.0%');
      expect(formatPercentile(0.95)).toBe('Top 5.0%');
      expect(formatPercentile(0.90)).toBe('Top 10.0%');
      expect(formatPercentile(0.75)).toBe('75.0th percentile');
    });
  });
}); 
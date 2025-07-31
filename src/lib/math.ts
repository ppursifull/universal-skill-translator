import { Ladder, TieredLadder, ContinuousLadder, TieredBin, ContinuousPoint } from './types';

/**
 * Get percentile from a tiered ladder value (label)
 */
export function percentileFromTier(ladder: TieredLadder, label: string): number {
  const bin = ladder.bins.find(b => b.label.toLowerCase() === label.toLowerCase());
  if (!bin) {
    throw new Error(`Tier "${label}" not found in ladder "${ladder.id}"`);
  }
  
  // Use midpoint of the bin
  return (bin.p_min + bin.p_max) / 2;
}

/**
 * Get percentile from a continuous ladder value using linear interpolation
 */
export function percentileFromValue(ladder: ContinuousLadder, value: number): number {
  const points = ladder.points;
  
  // Sort points by value
  const sortedPoints = [...points].sort((a, b) => a.value - b.value);
  
  // Handle edge cases
  if (value <= sortedPoints[0].value) {
    return sortedPoints[0].p;
  }
  if (value >= sortedPoints[sortedPoints.length - 1].value) {
    return sortedPoints[sortedPoints.length - 1].p;
  }
  
  // Find surrounding points for interpolation
  for (let i = 0; i < sortedPoints.length - 1; i++) {
    const current = sortedPoints[i];
    const next = sortedPoints[i + 1];
    
    if (value >= current.value && value <= next.value) {
      // Linear interpolation
      const ratio = (value - current.value) / (next.value - current.value);
      return current.p + ratio * (next.p - current.p);
    }
  }
  
  throw new Error(`Could not interpolate value ${value} for ladder ${ladder.id}`);
}

/**
 * Get value from percentile using inverse interpolation
 */
export function valueFromPercentile(ladder: ContinuousLadder, percentile: number): number {
  const points = ladder.points;
  
  // Sort points by percentile
  const sortedPoints = [...points].sort((a, b) => a.p - b.p);
  
  // Handle edge cases
  if (percentile <= sortedPoints[0].p) {
    return sortedPoints[0].value;
  }
  if (percentile >= sortedPoints[sortedPoints.length - 1].p) {
    return sortedPoints[sortedPoints.length - 1].value;
  }
  
  // Find surrounding points for inverse interpolation
  for (let i = 0; i < sortedPoints.length - 1; i++) {
    const current = sortedPoints[i];
    const next = sortedPoints[i + 1];
    
    if (percentile >= current.p && percentile <= next.p) {
      // Inverse linear interpolation
      const ratio = (percentile - current.p) / (next.p - current.p);
      return current.value + ratio * (next.value - current.value);
    }
  }
  
  throw new Error(`Could not interpolate percentile ${percentile} for ladder ${ladder.id}`);
}

/**
 * Get tier label from percentile for tiered ladders
 */
export function tierFromPercentile(ladder: TieredLadder, percentile: number): string {
  const bin = ladder.bins.find(b => percentile >= b.p_min && percentile <= b.p_max);
  if (!bin) {
    throw new Error(`Percentile ${percentile} not found in ladder ${ladder.id}`);
  }
  return bin.label;
}

/**
 * Get percentile from any ladder value
 */
export function getPercentile(ladder: Ladder, value: string | number): number {
  if (ladder.type === 'tiered') {
    if (typeof value !== 'string') {
      throw new Error(`Expected string value for tiered ladder, got ${typeof value}`);
    }
    return percentileFromTier(ladder, value);
  } else {
    if (typeof value !== 'number') {
      throw new Error(`Expected number value for continuous ladder, got ${typeof value}`);
    }
    return percentileFromValue(ladder, value);
  }
}

/**
 * Get equivalent value from percentile for any ladder
 */
export function getEquivalentValue(ladder: Ladder, percentile: number): string | number {
  if (ladder.type === 'tiered') {
    return tierFromPercentile(ladder, percentile);
  } else {
    let result = valueFromPercentile(ladder, percentile);
    
    // Round to appropriate precision
    if (ladder.id === 'chess_elo') {
      result = Math.round(result);
    } else if (ladder.id === 'golf_handicap') {
      result = Math.round(result * 10) / 10; // Round to 1 decimal place
    }
    
    return result;
  }
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Format percentile as human-readable string
 */
export function formatPercentile(percentile: number): string {
  const percentage = (percentile * 100).toFixed(1);
  if (percentile >= 0.99) {
    return `Top ${(100 - percentile * 100).toFixed(1)}%`;
  } else if (percentile >= 0.95) {
    return `Top ${(100 - percentile * 100).toFixed(1)}%`;
  } else if (percentile >= 0.90) {
    return `Top ${(100 - percentile * 100).toFixed(1)}%`;
  } else {
    return `${percentage}th percentile`;
  }
} 
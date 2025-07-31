// Ladder data types
export interface TieredBin {
  label: string;
  p_min: number;
  p_max: number;
}

export interface ContinuousPoint {
  value: number;
  p: number;
}

export interface TieredLadder {
  id: string;
  displayName: string;
  type: 'tiered';
  unitsLabel: string;
  description: string;
  bins: TieredBin[];
}

export interface ContinuousLadder {
  id: string;
  displayName: string;
  type: 'continuous' | 'continuous_lower_is_better';
  unitsLabel: string;
  description: string;
  points: ContinuousPoint[];
}

export type Ladder = TieredLadder | ContinuousLadder;

// API request/response types
export interface TranslationRequest {
  source: {
    ladderId: string;
    value: string | number;
  };
  targets: string[];
}

export interface TranslationResult {
  ladderId: string;
  value: string | number;
  p_range?: [number, number];
  confidence?: 'exact' | 'interpolated';
}

export interface TranslationResponse {
  sourcePercentile: number;
  equivalents: TranslationResult[];
  debug: {
    method: string;
    notes: string;
  };
}

// UI component types
export interface LadderOption {
  id: string;
  displayName: string;
  type: string;
  unitsLabel: string;
} 
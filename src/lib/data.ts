import { Ladder, LadderOption } from './types';
import fs from 'fs';
import path from 'path';

/**
 * Load all ladder data from JSON files
 */
export function loadAllLadders(): Ladder[] {
  const laddersDir = path.join(process.cwd(), 'data', 'ladders');
  const ladderFiles = fs.readdirSync(laddersDir).filter(file => file.endsWith('.json'));
  
  const ladders: Ladder[] = [];
  
  for (const file of ladderFiles) {
    const filePath = path.join(laddersDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const ladder = JSON.parse(content) as Ladder;
    ladders.push(ladder);
  }
  
  return ladders;
}

/**
 * Load a specific ladder by ID
 */
export function loadLadder(id: string): Ladder | null {
  try {
    const filePath = path.join(process.cwd(), 'data', 'ladders', `${id}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as Ladder;
  } catch (error) {
    return null;
  }
}

/**
 * Get ladder options for UI dropdowns
 */
export function getLadderOptions(): LadderOption[] {
  const ladders = loadAllLadders();
  return ladders.map(ladder => ({
    id: ladder.id,
    displayName: ladder.displayName,
    type: ladder.type,
    unitsLabel: ladder.unitsLabel,
  }));
}

/**
 * Load test fixtures for unit testing
 */
export function loadTestFixtures() {
  const fixturesPath = path.join(process.cwd(), 'data', 'test', 'fixtures.json');
  const content = fs.readFileSync(fixturesPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Get available tier options for a tiered ladder
 */
export function getTierOptions(ladderId: string): string[] {
  const ladder = loadLadder(ladderId);
  if (!ladder || ladder.type !== 'tiered') {
    return [];
  }
  
  return ladder.bins.map(bin => bin.label);
}

/**
 * Validate ladder data structure
 */
export function validateLadder(ladder: any): ladder is Ladder {
  if (!ladder || typeof ladder !== 'object') return false;
  if (!ladder.id || !ladder.displayName || !ladder.type || !ladder.unitsLabel) return false;
  
  if (ladder.type === 'tiered') {
    if (!Array.isArray(ladder.bins)) return false;
    for (const bin of ladder.bins) {
      if (!bin.label || typeof bin.p_min !== 'number' || typeof bin.p_max !== 'number') {
        return false;
      }
    }
  } else if (ladder.type === 'continuous' || ladder.type === 'continuous_lower_is_better') {
    if (!Array.isArray(ladder.points)) return false;
    for (const point of ladder.points) {
      if (typeof point.value !== 'number' || typeof point.p !== 'number') {
        return false;
      }
    }
  } else {
    return false;
  }
  
  return true;
} 
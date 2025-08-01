import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { loadLadder } from '@/lib/data';
import { getPercentile, getEquivalentValue } from '@/lib/math';
import { TranslationRequest, TranslationResponse } from '@/lib/types';

// Validation schema for translation request
const translationSchema = z.object({
  source: z.object({
    ladderId: z.string(),
    value: z.union([z.string(), z.number()]),
  }),
  targets: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = translationSchema.parse(body) as TranslationRequest;
    
    // Load source ladder
    const sourceLadder = loadLadder(validatedData.source.ladderId);
    if (!sourceLadder) {
      return NextResponse.json(
        { success: false, error: 'Source ladder not found' },
        { status: 404 }
      );
    }
    
    // Get source percentile
    const sourcePercentile = getPercentile(sourceLadder, validatedData.source.value);
    
    // Get equivalents for each target
    const equivalents = [];
    
    for (const targetId of validatedData.targets) {
      if (targetId === validatedData.source.ladderId) continue; // Skip self
      
      const targetLadder = loadLadder(targetId);
      if (!targetLadder) {
        console.warn(`Target ladder ${targetId} not found, skipping`);
        continue;
      }
      
      try {
        const equivalentValue = getEquivalentValue(targetLadder, sourcePercentile);
        
        // Determine confidence level
        let confidence: 'exact' | 'interpolated' = 'interpolated';
        if (targetLadder.type === 'tiered') {
          // For tiered ladders, check if percentile falls exactly in a bin
          const bin = targetLadder.bins.find(b => 
            sourcePercentile >= b.p_min && sourcePercentile <= b.p_max
          );
          if (bin) {
            confidence = 'exact';
          }
        }
        
        equivalents.push({
          ladderId: targetId,
          value: equivalentValue,
          confidence,
          ...(targetLadder.type === 'tiered' && {
            p_range: [targetLadder.bins.find(b => b.label === equivalentValue)?.p_min || 0, 
                     targetLadder.bins.find(b => b.label === equivalentValue)?.p_max || 1]
          }),
        });
      } catch (error) {
        console.warn(`Error calculating equivalent for ${targetId}:`, error);
        // Continue with other targets
      }
    }
    
    const response: TranslationResponse = {
      sourcePercentile,
      equivalents,
      debug: {
        method: 'linear_interpolation',
        notes: 'placeholder distributions - will be updated with authoritative data',
      },
    };
    
    return NextResponse.json({
      success: true,
      data: response,
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Translation error:', error);
    return NextResponse.json(
      { success: false, error: 'Translation failed' },
      { status: 500 }
    );
  }
} 
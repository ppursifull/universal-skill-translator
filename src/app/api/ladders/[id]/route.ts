import { NextRequest, NextResponse } from 'next/server';
import { loadLadder } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ladder = loadLadder(params.id);
    
    if (!ladder) {
      return NextResponse.json(
        { success: false, error: 'Ladder not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: ladder,
    });
  } catch (error) {
    console.error('Error loading ladder:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load ladder' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { getLadderOptions } from '@/lib/data';

export async function GET() {
  try {
    const ladders = getLadderOptions();
    
    return NextResponse.json({
      success: true,
      data: ladders,
    });
  } catch (error) {
    console.error('Error loading ladders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load ladders' },
      { status: 500 }
    );
  }
} 
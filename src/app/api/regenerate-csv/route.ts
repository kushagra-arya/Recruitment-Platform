import { NextResponse } from 'next/server';
import { regenerateMasterCsv } from '@/lib/csv-handler';

export async function POST() {
  try {
    await regenerateMasterCsv();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Master CSV regenerated successfully from database' 
    });
  } catch (error) {
    console.error('Error regenerating CSV:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

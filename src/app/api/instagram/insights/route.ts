import { NextResponse } from 'next/server';
import { getInstagramInsights } from '@/services/instagramService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '30';

  try {
    const insights = await getInstagramInsights(period);
    return NextResponse.json(insights);
  } catch (error) {
    return NextResponse.json(
      { error: 'Instagram Insights APIエラー' },
      { status: 500 }
    );
  }
}

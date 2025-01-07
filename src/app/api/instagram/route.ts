import { NextResponse } from 'next/server';
import { getInstagramPosts } from '@/services/instagramService';

export async function GET() {
  try {
    const posts = await getInstagramPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Instagram APIエラー' },
      { status: 500 }
    );
  }
}

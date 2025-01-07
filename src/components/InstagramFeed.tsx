'use client';

import { useEffect, useState } from 'react';
import { InstagramPost } from '../types/instagram';
import { getInstagramPosts } from '../services/instagramService';
import Image from 'next/image';

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getInstagramPosts();
        setPosts(response.data);
      } catch (err) {
        setError('投稿の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg overflow-hidden">
          {post.media_type === 'VIDEO' ? (
            <video
              src={post.media_url}
              controls
              className="w-full h-64 object-cover"
            />
          ) : (
            <Image
              src={post.media_url}
              alt={post.caption || ''}
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-4">
            <p className="text-sm text-gray-600">
              {new Date(post.timestamp).toLocaleDateString('ja-JP')}
            </p>
            <p className="mt-2 text-sm">
              {post.caption?.length > 100
                ? `${post.caption.slice(0, 100)}...`
                : post.caption}
            </p>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-500 hover:text-blue-700"
            >
              投稿を見る
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

import InstagramFeed from '../components/InstagramFeed';

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Instagram投稿一覧</h1>
      <InstagramFeed />
    </main>
  );
}

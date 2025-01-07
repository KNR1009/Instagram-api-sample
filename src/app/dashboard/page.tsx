import { Metadata } from 'next';
import DashboardContent from '@/components/dashboard/DashboardContent';

export const metadata: Metadata = {
  title: 'Instagram Analytics Dashboard',
  description: 'インスタグラムの分析データダッシュボード',
};

export default function DashboardPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <DashboardContent />
    </main>
  );
}

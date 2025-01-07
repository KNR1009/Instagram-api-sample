'use client';

import { Paper, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { InstagramInsights } from '@/types/instagram';
import { getInstagramInsights } from '@/services/instagramService';
import InsightsChart from '@/components/dashboard/InsightsChart';
import MetricCards from '@/components/dashboard/MetricCards';
import PeriodSelector from '@/components/dashboard/PeriodSelector';

export default function DashboardContent() {
  const [insights, setInsights] = useState<InstagramInsights[]>([]);
  const [period, setPeriod] = useState('30');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const data = await getInstagramInsights(period);
        setInsights(data.data);
      } catch (err) {
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [period]);

  if (loading) return <Box>読み込み中...</Box>;
  if (error) return <Box>{error}</Box>;

  return (
    <Box className="space-y-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4">Instagram Analytics Dashboard</Typography>
        <PeriodSelector value={period} onChange={setPeriod} />
      </Box>

      <MetricCards insights={insights} />

      <Paper className="p-4">
        <Typography variant="h6" className="mb-4">インプレッション推移</Typography>
        <InsightsChart data={insights} />
      </Paper>
    </Box>
  );
}

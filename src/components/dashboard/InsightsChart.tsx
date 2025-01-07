import { Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { InstagramInsights } from '@/types/instagram';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface InsightsChartProps {
  data: InstagramInsights[];
}

export default function InsightsChart({ data }: InsightsChartProps) {
  const formattedData = data.map((item) => ({
    ...item,
    date: format(new Date(item.date), 'MM/dd', { locale: ja }),
  }));

  return (
    <Box className="h-[400px] w-full">
      <ResponsiveContainer>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#1976d2"
            name="インプレッション"
          />
          <Line
            type="monotone"
            dataKey="reach"
            stroke="#2e7d32"
            name="リーチ"
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#ed6c02"
            name="エンゲージメント"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

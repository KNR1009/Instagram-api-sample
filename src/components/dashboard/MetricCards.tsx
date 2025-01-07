import { Paper, Typography, Grid, Box } from '@mui/material';
import { InstagramInsights } from '@/types/instagram';

interface MetricCardsProps {
  insights: InstagramInsights[];
}

export default function MetricCards({ insights }: MetricCardsProps) {
  const latestData = insights[insights.length - 1] || {
    impressions: 0,
    reach: 0,
    engagement: 0,
    likes: 0,
    comments: 0,
    saves: 0,
  };

  const metrics = [
    { title: 'インプレッション数', value: latestData.impressions },
    { title: 'リーチ数', value: latestData.reach },
    { title: 'エンゲージメント', value: latestData.engagement },
    { title: 'いいね数', value: latestData.likes },
    { title: 'コメント数', value: latestData.comments },
    { title: '保存数', value: latestData.saves },
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.title}>
          <Paper className="p-4">
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            <Typography variant="h4" className="mt-2">
              {item.value.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

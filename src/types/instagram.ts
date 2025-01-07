export interface InstagramPost {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

export interface InstagramResponse {
  data: InstagramPost[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
}

export interface InstagramInsights {
  impressions: number;
  reach: number;
  engagement: number;
  likes: number;
  comments: number;
  saves: number;
  date: string;
}

export interface InsightsResponse {
  data: InstagramInsights[];
  period: string;
}

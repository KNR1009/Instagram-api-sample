import axios from 'axios';
import { InstagramResponse } from '../types/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const INSTAGRAM_API_VERSION = 'v18.0';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;

export const getInstagramPosts = async () => {
  try {
    const response = await axios.get<InstagramResponse>(
      `${INSTAGRAM_API_URL}/me/media`,
      {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
          access_token: ACCESS_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Instagram APIエラー:', error);
    throw error;
  }
};

export const getInstagramBusinessAccount = async () => {
  try {
    const response = await axios.get(
      `${INSTAGRAM_API_URL}/me`,
      {
        params: {
          fields: 'id,username,account_type',
          access_token: ACCESS_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Instagram APIエラー:', error);
    throw error;
  }
};

export const getInstagramInsights = async (period: string = '30') => {
  try {
    // まず最近の投稿を取得
    const mediaResponse = await axios.get(
      `${INSTAGRAM_API_URL}/me/media`,
      {
        params: {
          fields: 'id,insights.metric(impressions,reach,engagement)',
          access_token: ACCESS_TOKEN,
          limit: 25, // 最近の25件の投稿を取得
        },
      }
    );

    // 投稿ごとのインサイトデータを集計
    const insights = mediaResponse.data.data.reduce((acc: any, post: any) => {
      const postInsights = post.insights?.data || [];
      postInsights.forEach((insight: any) => {
        if (!acc[insight.name]) {
          acc[insight.name] = 0;
        }
        acc[insight.name] += insight.values[0].value;
      });
      return acc;
    }, {});

    // 集計データを整形して返す
    return {
      data: [{
        impressions: insights.impressions || 0,
        reach: insights.reach || 0,
        engagement: insights.engagement || 0,
        likes: 0, // これらの値は別のAPIコールが必要
        comments: 0,
        saves: 0,
        date: new Date().toISOString(),
      }],
    };
  } catch (error) {
    console.error('Instagram Insights APIエラー:', error);
    throw error;
  }
};

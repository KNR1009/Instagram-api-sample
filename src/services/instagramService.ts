import axios from 'axios';
import { InstagramResponse } from '../types/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
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

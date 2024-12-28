import { TikTokApi } from '@/lib/services/tiktok';

export async function getTikTokProfile(accessToken: string) {
  const api = new TikTokApi(accessToken);
  return await api.getProfile();
}

export async function getTikTokVideos(accessToken: string) {
  const api = new TikTokApi(accessToken);
  return await api.getVideos();
}

export async function getTikTokAnalytics(accessToken: string) {
  const api = new TikTokApi(accessToken);
  return await api.getAnalytics();
}

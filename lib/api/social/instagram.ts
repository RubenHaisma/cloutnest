import { InstagramBasicDisplayApi } from '@/lib/services/instagram';

export async function getInstagramProfile(accessToken: string) {
  const api = new InstagramBasicDisplayApi(accessToken);
  return await api.getProfile();
}

export async function getInstagramMedia(accessToken: string) {
  const api = new InstagramBasicDisplayApi(accessToken);
  return await api.getRecentMedia();
}

export async function getInstagramInsights(accessToken: string) {
  const api = new InstagramBasicDisplayApi(accessToken);
  return await api.getInsights();
}

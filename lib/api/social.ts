import { Profile } from '../types';

export interface SocialMetrics {
  followers: number;
  engagement: number;
  recentPosts: {
    id: string;
    platform: string;
    likes: number;
    comments: number;
    shares: number;
    reach: number;
  }[];
}

export async function connectSocialAccount(platform: string, code: string) {
  // Implementation would handle OAuth flow with social platforms
  const response = await fetch(`/api/social/connect/${platform}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return response.json();
}

export async function getSocialMetrics(platform: string, userId: string): Promise<SocialMetrics> {
  const response = await fetch(`/api/social/metrics/${platform}/${userId}`);
  return response.json();
}

export async function refreshSocialMetrics(userId: string) {
  const response = await fetch(`/api/social/metrics/refresh/${userId}`, {
    method: 'POST',
  });
  return response.json();
}

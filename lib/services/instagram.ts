export class InstagramBasicDisplayApi {
  private accessToken: string;
  private baseUrl = 'https://graph.instagram.com/me';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetch(endpoint: string, params: Record<string, string> = {}) {
    const searchParams = new URLSearchParams({
      access_token: this.accessToken,
      ...params,
    });

    const response = await fetch(`${this.baseUrl}${endpoint}?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`Instagram API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getProfile() {
    return this.fetch('', {
      fields: 'id,username,account_type,media_count,followers_count',
    });
  }

  async getRecentMedia() {
    return this.fetch('/media', {
      fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username',
    });
  }

  async getInsights() {
    return this.fetch('/insights', {
      metric: 'impressions,reach,profile_views',
      period: 'day',
    });
  }
}

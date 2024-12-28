export class TikTokApi {
  private accessToken: string;
  private baseUrl = 'https://open.tiktokapis.com/v2';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetch(endpoint: string, params: Record<string, any> = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      ...params,
    });

    if (!response.ok) {
      throw new Error(`TikTok API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getProfile() {
    return this.fetch('/user/info/');
  }

  async getVideos() {
    return this.fetch('/video/list/');
  }

  async getAnalytics() {
    return this.fetch('/user/stats/');
  }
}

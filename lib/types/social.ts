export interface SocialAccount {
    id: string;
    userId: string;
    platform: string;
    platformId: string;
    username: string;
    followers: number;
    lastSync: Date;
  }
  
  export interface SocialProfile {
    username: string;
    followers_count: number;
    engagement_rate?: number;
    platform_metrics?: Record<string, any>;
  }
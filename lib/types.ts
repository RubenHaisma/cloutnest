// Common Types
export interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  requirements: {
    minFollowers: number;
    platforms: string[];
    niche: string[];
  };
  status: 'draft' | 'active' | 'completed';
  metrics?: {
    reach: number;
    engagement: number;
    clicks: number;
  };
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  bio: string;
  socialLinks: {
    platform: string;
    handle: string;
    followers: number;
    engagement: number;
  }[];
  niche: string[];
  location: string;
  profileImage?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  campaignId?: string;
}

export interface Analytics {
  period: string;
  metrics: {
    reach: number;
    engagement: number;
    clicks: number;
    conversions: number;
  };
  trends: {
    date: string;
    value: number;
  }[];
}
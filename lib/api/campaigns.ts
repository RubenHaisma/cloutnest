import { Campaign } from '../types';

// Mock data - replace with actual API calls
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Fashion Collection Launch',
    description: 'Promote our new summer collection on Instagram and TikTok',
    budget: 5000,
    requirements: {
      minFollowers: 10000,
      platforms: ['instagram', 'tiktok'],
      niche: ['fashion', 'lifestyle'],
    },
    status: 'active',
    metrics: {
      reach: 50000,
      engagement: 2500,
      clicks: 1200,
    },
  },
  // Add more mock campaigns...
];

export async function getCampaigns(): Promise<Campaign[]> {
  return mockCampaigns;
}

export async function createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
  const newCampaign = {
    ...campaign,
    id: Math.random().toString(36).substr(2, 9),
  };
  return newCampaign;
}
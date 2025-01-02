export interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'PAUSED' | string;
  requirements?: {
    minFollowers?: number | null;
    platforms: string[];
    niche: string[];
  };
  company?: {
    name: string;
    image: string;
  };
  createdAt: string;
}
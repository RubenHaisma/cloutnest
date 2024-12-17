import { Analytics } from '../types';

export interface AnalyticsFilters {
  startDate: Date;
  endDate: Date;
  platform?: string[];
  campaign?: string[];
}

export async function getAnalytics(filters: AnalyticsFilters): Promise<Analytics> {
  const response = await fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters),
  });
  return response.json();
}

export async function getRealtimeMetrics(campaignId: string) {
  const response = await fetch(`/api/analytics/realtime/${campaignId}`);
  return response.json();
}

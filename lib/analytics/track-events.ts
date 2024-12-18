declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params: {
        [key: string]: any
      }
    ) => void
  }
}

type AnalyticsEvent = {
  event: string
  properties: Record<string, any>
  userId?: string
}

export async function trackEvent(event: AnalyticsEvent) {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    try {
      window.gtag?.('event', event.event, {
        ...event.properties,
        user_id: event.userId,
      })
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  }
}

export const Events = {
  TRACK_SUBMITTED: 'track_submitted',
  TRACK_REVIEWED: 'track_reviewed',
  PLAYLIST_UPDATED: 'playlist_updated',
  PAYOUT_REQUESTED: 'payout_requested',
} as const

export type EventType = typeof Events[keyof typeof Events]
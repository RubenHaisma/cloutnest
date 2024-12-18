// Google Analytics configuration and utility functions
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

type AnalyticsEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

// Log page views
export const pageview = (url: string): void => {
  if (typeof (window as any).gtag !== 'undefined' && GA_TRACKING_ID) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({ action, category, label, value }: AnalyticsEvent): void => {
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
interface GTagEvent {
  action: string
  category: string
  label: string
  value: number
}

interface Window {
  gtag: (
    command: 'event',
    action: string,
    params: {
      [key: string]: any
    }
  ) => void
}
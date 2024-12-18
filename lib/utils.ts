export function getWindow(): Window & typeof globalThis {
  if (typeof window === 'undefined') {
    throw new Error('Window is not defined')
  }
  return window
}

export function cn(...inputs: (string | undefined)[]) {
  return inputs.filter(Boolean).join(' ')
}
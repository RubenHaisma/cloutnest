import { Message } from '../types';

export async function getMessages(conversationId: string): Promise<Message[]> {
  const response = await fetch(`/api/messages/${conversationId}`);
  return response.json();
}

export async function sendMessage(message: Omit<Message, 'id' | 'timestamp'>) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
  return response.json();
}

export function subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
  // Implementation would use WebSocket or Server-Sent Events
  const eventSource = new EventSource(`/api/messages/subscribe/${conversationId}`);
  eventSource.onmessage = (event) => {
    callback(JSON.parse(event.data));
  };
  return () => eventSource.close();
}
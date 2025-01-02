export interface Conversation {
    id: string;
    participant: {
      id: string;
      name: string;
      image: string;
    };
    lastMessage: {
      content: string;
      createdAt: string;
      read: boolean;
    };
  }
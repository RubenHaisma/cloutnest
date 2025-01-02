export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    read: boolean;
    createdAt: Date;
  }
  
  export interface Conversation {
    id: string;
    participant: {
      id: string;
      name: string;
      image: string;
    };
    lastMessage?: Message;
  }
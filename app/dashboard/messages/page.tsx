// app/dashboard/messages/page.tsx

import React from "react";
import { ConversationList } from "@/components/dashboard/messages/conversation-list";
import { Conversation } from "@/lib/types/conversation";

// Mock data or state can be added here
const conversations: Conversation[] = []; // Replace with your actual data
const selectedId: string | null = null;
const onSelect = (conversation: Conversation) => {
  console.log("Selected conversation:", conversation);
};
const isLoading = false;

const MessagesPage = () => {
  return (
    <div>
      <h1>Messages</h1>
      <ConversationList
        conversations={conversations}
        selectedId={selectedId}
        onSelect={onSelect}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MessagesPage;

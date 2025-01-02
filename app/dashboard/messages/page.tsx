"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ConversationList } from "@/components/dashboard/messages/conversation-list";
import { MessageThread } from "@/components/dashboard/messages/message-thread";
import { useSession } from "next-auth/react";

export default function MessagesPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("/api/messages/conversations");
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="h-[calc(100vh-theme(spacing.32))]">
      <div className="grid h-full lg:grid-cols-[300px_1fr] gap-4">
        <Card className="h-full">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                onChange={(e) => {
                  // Add search functionality
                }}
              />
            </div>
          </div>
          <CardContent className="p-0">
            <ConversationList
              conversations={conversations}
              selectedId={selectedConversation?.id}
              onSelect={setSelectedConversation}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        <Card className="h-full">
          {selectedConversation ? (
            <MessageThread conversation={selectedConversation} />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
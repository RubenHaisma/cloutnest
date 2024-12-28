"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Conversation {
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

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (conversation: Conversation) => void;
  isLoading: boolean;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  isLoading,
}: ConversationListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-theme(spacing.48))]">
      <div className="space-y-1 p-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation)}
            className={`w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-accent ${
              selectedId === conversation.id ? "bg-accent" : ""
            }`}
          >
            <Avatar>
              <AvatarImage
                src={conversation.participant.image}
                alt={conversation.participant.name}
              />
              <AvatarFallback>
                {conversation.participant.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {conversation.participant.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(conversation.lastMessage.createdAt))}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {conversation.lastMessage.content}
              </p>
            </div>
            {!conversation.lastMessage.read && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
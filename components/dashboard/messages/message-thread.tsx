"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

interface MessageThreadProps {
  conversation: {
    id: string;
    participant: {
      id: string;
      name: string;
      image: string;
    };
  };
}

export function MessageThread({ conversation }: MessageThreadProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/messages/${conversation.id}`
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [conversation.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversation.id,
          content: newMessage,
        }),
      });

      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-4 p-4 border-b">
        <Avatar>
          <AvatarImage
            src={conversation.participant.image}
            alt={conversation.participant.name}
          />
          <AvatarFallback>
            {conversation.participant.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{conversation.participant.name}</h3>
        </div>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwn = message.senderId === session?.user?.id;

            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70">
                    {formatTime(new Date(message.createdAt))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
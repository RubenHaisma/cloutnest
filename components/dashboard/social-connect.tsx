"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Instagram, Youtube, Twitter } from 'lucide-react';
import { connectSocialAccount } from '@/lib/api/social';
import { useToast } from '@/components/ui/use-toast';

const platforms = [
  {
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-pink-500',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-500',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'bg-blue-400',
  },
];

export function SocialConnect() {
  const [connecting, setConnecting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = async (platform: string) => {
    setConnecting(platform);
    try {
      // Implementation would handle OAuth flow
      const result = await connectSocialAccount(platform.toLowerCase(), 'dummy-code');
      toast({
        title: 'Success',
        description: `Connected to ${platform} successfully!`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to connect to ${platform}. Please try again.`,
        variant: 'destructive',
      });
    } finally {
      setConnecting(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Social Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {platforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              className="h-24 flex-col gap-2"
              onClick={() => handleConnect(platform.name)}
              disabled={connecting === platform.name}
            >
              <platform.icon className={`h-8 w-8 ${platform.color} p-1 rounded-full text-white`} />
              <span>Connect {platform.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

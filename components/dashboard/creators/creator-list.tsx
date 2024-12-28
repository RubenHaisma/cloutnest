"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatNumber } from "@/lib/utils";

interface Creator {
  id: string;
  name: string;
  image: string;
  bio: string;
  location: string;
  followers: number;
  engagementRate: number;
  platforms: string[];
  categories: string[];
}

interface CreatorListProps {
  creators: Creator[];
  isLoading: boolean;
}

export function CreatorList({ creators, isLoading }: CreatorListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full mb-4" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-40">
          <p className="text-muted-foreground">No creators found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {creators.map((creator) => (
        <Card key={creator.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={creator.image} alt={creator.name} />
                <AvatarFallback>
                  {creator.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{creator.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {creator.location}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {creator.bio}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {creator.platforms.map((platform) => (
                <Badge key={platform} variant="secondary">
                  {platform}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="font-semibold">
                  {formatNumber(creator.followers)}
                </p>
                <p className="text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="font-semibold">
                  {creator.engagementRate.toFixed(1)}%
                </p>
                <p className="text-muted-foreground">Engagement</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>View Profile</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";

interface Content {
  id: string;
  title: string;
  description: string;
  type: string;
  preview: string;
  price: number;
  creator: {
    name: string;
    image: string;
  };
  categories: string[];
}

interface ContentGridProps {
  type: string;
  filters: {
    category: string;
    priceRange: string;
  };
}

export function ContentGrid({ type, filters }: ContentGridProps) {
  const [content, setContent] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const searchParams = new URLSearchParams();
        if (type !== "all") searchParams.set("type", type);
        if (filters.category) searchParams.set("category", filters.category);
        if (filters.priceRange) searchParams.set("priceRange", filters.priceRange);

        const response = await fetch(`/api/marketplace?${searchParams}`);
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [type, filters]);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (content.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-40">
          <p className="text-muted-foreground">No content found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.preview})` }}
          />
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{item.title}</h3>
              <Badge>{item.type}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src={item.creator.image} />
                <AvatarFallback>
                  {item.creator.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{item.creator.name}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-lg font-bold">
              {formatCurrency(item.price)}
            </span>
            <Button>Purchase</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
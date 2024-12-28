"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreatorList } from "@/components/dashboard/creators/creator-list";
import { CreatorFilters } from "@/components/dashboard/creators/creator-filters";
import { Search } from "lucide-react";

export default function CreatorsPage() {
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    platform: "",
    niche: "",
    minFollowers: "",
    location: "",
  });

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const searchParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) searchParams.set(key, value);
        });

        const response = await fetch(`/api/creators?${searchParams}`);
        const data = await response.json();
        setCreators(data);
      } catch (error) {
        console.error("Error fetching creators:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, [filters]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Discover Creators</h2>
        <p className="text-muted-foreground">
          Find and connect with creators that match your brand
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search creators..."
            className="pl-8"
            onChange={(e) => {
              // Add search functionality
            }}
          />
        </div>
        <CreatorFilters filters={filters} setFilters={setFilters} />
      </div>

      <CreatorList creators={creators} isLoading={isLoading} />
    </div>
  );
}
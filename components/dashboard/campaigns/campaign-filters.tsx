"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CampaignFiltersProps {
  filters: {
    status: string;
    platform: string;
    niche: string;
  };
  setFilters: (filters: any) => void;
}

export function CampaignFilters({ filters, setFilters }: CampaignFiltersProps) {
  const platforms = ["Instagram", "TikTok", "YouTube", "Twitter"];
  const niches = ["Fashion", "Beauty", "Tech", "Food", "Travel", "Lifestyle"];

  return (
    <div className="flex gap-4">
      <Select
        value={filters.platform}
        onValueChange={(value) =>
          setFilters({ ...filters, platform: value })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Platforms</SelectItem>
          {platforms.map((platform) => (
            <SelectItem key={platform} value={platform.toLowerCase()}>
              {platform}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.niche}
        onValueChange={(value) =>
          setFilters({ ...filters, niche: value })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Niche" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Niches</SelectItem>
          {niches.map((niche) => (
            <SelectItem key={niche} value={niche.toLowerCase()}>
              {niche}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
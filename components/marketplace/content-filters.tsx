"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentFiltersProps {
  filters: {
    category: string;
    priceRange: string;
  };
  setFilters: (filters: any) => void;
}

export function ContentFilters({ filters, setFilters }: ContentFiltersProps) {
  const categories = [
    "Photography",
    "Video",
    "Graphics",
    "Templates",
    "Audio",
  ];

  const priceRanges = [
    { label: "Under $25", value: "0-25" },
    { label: "$25 - $50", value: "25-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "Over $100", value: "100+" },
  ];

  return (
    <div className="flex gap-4">
      <Select
        value={filters.category}
        onValueChange={(value) =>
          setFilters({ ...filters, category: value })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category.toLowerCase()}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.priceRange}
        onValueChange={(value) =>
          setFilters({ ...filters, priceRange: value })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Price Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Any Price</SelectItem>
          {priceRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
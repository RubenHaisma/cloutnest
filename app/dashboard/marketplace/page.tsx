"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload } from "lucide-react";
import { ContentGrid } from "@/components/marketplace/content-grid";
import { ContentFilters } from "@/components/marketplace/content-filters";
import { UploadDialog } from "@/components/marketplace/upload-dialog";

export default function MarketplacePage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    category: "",
    priceRange: "",
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
          <p className="text-muted-foreground">
            Browse and purchase pre-made content from creators
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Content
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            className="pl-8"
            onChange={(e) => {
              // Add search functionality
            }}
          />
        </div>
        <ContentFilters filters={filters} setFilters={setFilters} />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ContentGrid type="all" filters={filters} />
        </TabsContent>
        <TabsContent value="images">
          <ContentGrid type="image" filters={filters} />
        </TabsContent>
        <TabsContent value="videos">
          <ContentGrid type="video" filters={filters} />
        </TabsContent>
        <TabsContent value="templates">
          <ContentGrid type="template" filters={filters} />
        </TabsContent>
      </Tabs>

      <UploadDialog open={isUploadOpen} onOpenChange={setIsUploadOpen} />
    </div>
  );
}
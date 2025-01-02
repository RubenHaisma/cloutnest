export interface MarketplaceItem {
    id: string;
    title: string;
    description: string;
    type: 'image' | 'video' | 'template';
    price: number;
    fileUrl: string;
    previewUrl: string;
    categories: string[];
    creatorId: string;
    creator: {
      name: string;
      image: string;
    };
    downloads: number;
    rating?: number;
    createdAt: Date;
  }
  
  export interface MarketplaceFilters {
    type?: string;
    category?: string;
    priceRange?: string;
    search?: string;
  }
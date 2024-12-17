import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const posts = [
  {
    title: "How to Create Engaging Content That Converts",
    excerpt: "Learn the secrets of creating content that not only attracts viewers but also drives conversions.",
    author: "Sarah Johnson",
    date: "August 15, 2023",
    category: "Content Strategy",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    title: "The Rise of Micro-Influencers in Marketing",
    excerpt: "Why smaller, more engaged audiences are becoming increasingly valuable for brands.",
    author: "Michael Chen",
    date: "August 12, 2023",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
  },
  {
    title: "Measuring ROI in Influencer Marketing",
    excerpt: "A comprehensive guide to tracking and measuring the success of your influencer campaigns.",
    author: "Emily Rodriguez",
    date: "August 10, 2023",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    title: "Building Authentic Brand Partnerships",
    excerpt: "How to create lasting relationships with creators that benefit both parties.",
    author: "David Kim",
    date: "August 8, 2023",
    category: "Partnerships",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  },
];

export default function BlogPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            CloutNest Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Insights and tips for successful influencer marketing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Card key={post.title} className="overflow-hidden">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <CardTitle className="text-2xl">
                  <Link href="#" className="hover:text-primary">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-${post.author.toLowerCase().replace(" ", "-")})`,
                    }}
                  />
                  <span className="text-sm font-medium">{post.author}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Want to contribute to our blog?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

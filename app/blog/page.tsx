import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "CloutNest - Blog",
  description: "Explore the latest insights and strategies to elevate your influencer marketing and business growth.",
};

const heroTitle = "Insights That Transform Collaborations";
const heroSubtitle =
  "Learn from the experts! Explore articles, case studies, and best practices in influencer marketing and brand growth.";

export default async function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold">{heroTitle}</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPostsData.map(({ id, title, date, contentPreview, headerImage }) => (
              <div
                key={id}
                className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-2"
              >
                {/* Blog Image */}
                <Image
                  src={headerImage || "/images/blog/default-cover.jpg"}
                  alt={`Cover image for ${title}`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  {/* Title and Date */}
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 hover:text-emerald-500 transition">
                      <Link href={`/blog/${id}`}>{title}</Link>
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">{date}</p>
                  </div>

                  {/* Content Preview */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {contentPreview}
                  </p>

                  {/* Read More Button */}
                  <Link
                    href={`/blog/${id}`}
                    className="mt-auto inline-flex items-center text-emerald-500 font-semibold hover:text-emerald-400 transition"
                  >
                    Read More
                    <span className="ml-1 text-lg">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Elevate Your Brand?
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Subscribe to our newsletter for the latest tips, strategies, and updates in influencer marketing and business growth.
          </p>
          <Link href="/signup">
            <button className="mt-6 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-200 transition">
              Subscribe Now
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

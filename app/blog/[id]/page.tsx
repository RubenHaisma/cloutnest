import BlogPost from "@/components/blog/blogpost";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Static generation for all blog posts
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// Static generation configuration
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPostData(params.id);

  return {
    title: `${post.title} - CloutNest Blog`,
    description: post.excerpt || "Read more insights from CloutNest.",
    openGraph: {
      title: `${post.title} - CloutNest Blog`,
      description: post.excerpt || "Explore insights from CloutNest.",
      url: `https://cloutnest.com/blog/${params.id}`,
      images: [
        {
          url: post.headerImage || "/images/blog/default-cover.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function Post({ params }: { params: { id: string } }) {
  try {
    const postData = await getPostData(params.id);

    return (
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className="py-16 text-center text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-bold">{postData.title}</h1>
            <p className="mt-4 text-lg text-emerald-100">
              {postData.date} by {postData.author}
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          <article className="prose dark:prose-invert max-w-none">
            {/* Header Image */}
            {postData.headerImage && (
              <Image
                src={postData.headerImage}
                alt={postData.title}
                width={1200}
                height={630}
                className="rounded-lg mb-8"
              />
            )}

            {/* Blog Content */}
            <BlogPost
              title={postData.title}
              contentHtml={postData.contentHtml}
              date={postData.date}
              author={postData.author}
              headerImage={postData.headerImage}
            />
          </article>
        </main>

        {/* Call-to-Action Section */}
        <section className="py-12 text-center text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold">
              Want to stay updated with the latest insights?
            </h2>
            <p className="mt-4 text-lg">
              Subscribe to our newsletter and never miss an update from CloutNest.
            </p>
            <Link href="/signup">
              <button className="mt-6 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-200 transition">
                Subscribe Now
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

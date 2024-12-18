import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/lib/posts';

export const revalidate = 3600; // Revalidate every hour

export const BlogSection = () => {
  // Remove async since we're using static data
  const latestPosts = getSortedPostsData().slice(0, 3);

  return (
    <section className="relative bg-[#0A0F2C]/95 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-400">
          Insights and Success Stories
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mt-4">
          Discover the latest trends, tips, and stories from influencers and brands on CloutNest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8">
        {latestPosts.map(({ id, title, date, contentPreview, headerImage }) => (
          <div 
            key={id} 
            className="bg-gray-900 border border-white/5 rounded-xl shadow-sm overflow-hidden 
                     group hover:-translate-y-1 hover:shadow-xl 
                     transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative">
              <Image
                src={headerImage || '/images/blog/default.jpg'}
                alt={`Cover image for ${title}`}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-emerald-400 transition">
                  <Link href={`/blog/${id}`}>
                    {title}
                  </Link>
                </h3>
                <p className="text-gray-400 text-sm mb-4">{date}</p>
                <p className="text-gray-300 text-sm line-clamp-3">{contentPreview}</p>
              </div>
              <Link 
                href={`/blog/${id}`} 
                className="inline-flex items-center mt-4 text-emerald-400 font-semibold 
                         hover:text-emerald-300 transition group"
              >
                 Continue reading
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white 
                   bg-gradient-to-r from-emerald-500 to-blue-400 rounded-lg hover:from-emerald-400 hover:to-blue-300 
                   transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          See all articles
          <span className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;

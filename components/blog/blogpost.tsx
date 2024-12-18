import React from 'react';
import HeroSection from './herosection'; 
import styles from './blogpost.module.css';
import Link from 'next/link';

interface BlogPostProps {
  title: string;
  contentHtml: string;
  date: string;
  author?: string;
  headerImage?: string; 
}

const BlogPost: React.FC<BlogPostProps> = ({ title, contentHtml, date, author, headerImage }) => {
  return (
    <>

      <HeroSection 
        title={title}
        subtitle={`Published on ${new Date(date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}${author ? ` by ${author}` : ''}`}
        imageSrc={headerImage || ''}
        imageAlt='Blog post hero image'
      />
      <div className="bg-[#0A0F2C]/95 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/blog" className="text-gray-300 hover:text-blue-400 transition">
            &larr; Back to all blogs
          </Link>
        </div>
      </div>
      <section className="bg-[#0A0F2C]/95 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div
            className={`${styles.blogContent} prose prose-lg prose-invert max-w-none`}
          >
            <div 
              className="
                prose-headings:text-gray-100
                prose-a:text-blue-400 hover:prose-a:text-blue-300
                prose-strong:text-purple-400
                prose-code:text-purple-300
                prose-p:text-gray-300
                prose-ul:text-gray-300
                prose-ol:text-gray-300
                prose-li:text-gray-300
                prose-blockquote:text-gray-300
                prose-figure:text-gray-300
                prose-figcaption:text-gray-400
                prose-table:text-gray-300
                prose-th:text-gray-200
                prose-td:text-gray-300
              "
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </div>
      </section>
      {/* CTA Button */}
      <div className="bg-[#0A0F2C]/95 py-20 text-center">
        <h2 className="text-3xl text-gray-100 font-bold mb-4">Got questions?</h2>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-400 hover:from-purple-400 hover:to-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get in touch!
        </Link>
      </div>
    </>
  );
};
export default BlogPost;
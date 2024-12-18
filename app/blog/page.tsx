import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Laava - Blog',
    description: 'Read our blog to learn more about how AI can help your business grow.'
}

const heroTitle = "Read the latest from Laava";
const heroSubtitle = "View articles and knowledge about software and AI. Knowledge is worthless when it's not shared.";

export default async function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <section className="bg-[#0A0F2C]/95 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPostsData.map(({ id, title, date, contentPreview, headerImage }) => (
              <div key={id} className="bg-sky-950 border border-white/5 rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg flex flex-col">
                <Image
                  src={headerImage || '/images/blog/development.png'}
                  alt={`Cover image for ${title}`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-100 mb-2">
                      <Link href={`/blog/${id}`} className="hover:text-blue-400 transition">
                        {title}
                      </Link>
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">{date}</p>
                    <p className="text-gray-300 mb-4 line-clamp-3">{contentPreview}</p>
                  </div>
                  <Link href={`/blog/${id}`} className="text-blue-400 font-semibold hover:text-blue-300 transition mt-auto">
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

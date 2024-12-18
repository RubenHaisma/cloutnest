import BlogPost from '@/components/blog/blogpost';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { notFound } from 'next/navigation';
// Add header, hero etc


// Add static generation for all blog posts
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// Add static generation configuration
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  
  return {
    title: `${post.title} - Laava Blog`,
    description: post.excerpt ? post.excerpt : 'Meer lezen van Laava',
  };
}

export default async function Post({ params }: { params: { id: string } }) {
  try {
    const postData = await getPostData(params.id);
    
    return (
      <>
      <BlogPost 
        title={postData.title} 
        contentHtml={postData.contentHtml} 
        date={postData.date}
        author={postData.author}
        headerImage={postData.headerImage}
      />
      </>
    );
  } catch (error) {
    notFound();
  }
}
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import remarkRehype from 'remark-rehype';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'posts');

// Cache the post data
export const getPostData = cache(async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  const excerpt = matterResult.content.slice(0, 160).replace(/[#*`]/g, '') + '...';

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    author: matterResult.data.author,
    headerImage: matterResult.data.headerImage,
    excerpt,
  };
});

// Cache the posts list
export const getSortedPostsData = cache(() => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const excerpt = matterResult.content.slice(0, 100).replace(/[#*`]/g, '') + '...';
    const contentPreview = matterResult.content.slice(0, 150).replace(/[#*`]/g, '') + '...';

    return {
      id,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || 'No Date',
      excerpt,
      contentPreview,
      headerImage: matterResult.data.headerImage,
    };
  });

  return allPostsData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

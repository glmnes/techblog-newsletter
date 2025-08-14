import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  readTime: string;
  content?: string;
  contentHtml?: string;
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as Omit<PostData, 'slug'>),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
 
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    content: matterResult.content,
    ...(matterResult.data as Omit<PostData, 'slug' | 'contentHtml' | 'content'>),
  };
}

export function getAllTags(): Map<string, number> {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return tagCounts;
}

export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.tags?.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): PostData[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost || !currentPost.tags || currentPost.tags.length === 0) {
    // If no tags, return the most recent posts (excluding current)
    return allPosts
      .filter(post => post.slug !== currentSlug)
      .slice(0, limit);
  }
  
  // Calculate relevance score for each post
  const postsWithScores = allPosts
    .filter(post => post.slug !== currentSlug && post.tags && post.tags.length > 0)
    .map(post => {
      const commonTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      );
      return {
        post,
        score: commonTags.length,
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
  
  // If we have enough related posts, return them
  if (postsWithScores.length >= limit) {
    return postsWithScores.slice(0, limit).map(item => item.post);
  }
  
  // Otherwise, fill with recent posts
  const relatedPosts = postsWithScores.map(item => item.post);
  const remainingSlots = limit - relatedPosts.length;
  const additionalPosts = allPosts
    .filter(post => 
      post.slug !== currentSlug && 
      !relatedPosts.some(p => p.slug === post.slug)
    )
    .slice(0, remainingSlots);
  
  return [...relatedPosts, ...additionalPosts];
}

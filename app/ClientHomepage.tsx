'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/markdown';
import Tag from '@/components/Tag';

const POSTS_PER_PAGE = 3;

export default function ClientHomepage({ posts }: { posts: PostData[] }) {
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);

  const loadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + POSTS_PER_PAGE, posts.length));
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, visiblePosts).map((post) => (
          <article key={post.slug} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col h-full">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} tag={tag} />
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  Read more 
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* Load More Button */}
      {visiblePosts < posts.length && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            className="btn-primary"
          >
            Load More Articles
          </button>
        </div>
      )}
    </>
  );
}

import { getAllPosts, getPostsByTag, getAllTags } from '@/lib/markdown';
import BlogListing from './BlogListing';
import Tag from '@/components/Tag';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest articles on AI, entrepreneurship, and digital business.',
};

interface BlogPageProps {
  searchParams: Promise<{
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedTag = params.tag;
  const posts = selectedTag ? getPostsByTag(selectedTag) : getAllPosts();
  const allTags = getAllTags();

  return (
    <main className="min-h-screen">
      <Header />
      {/* Blog Header */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Blog</h1>
          <p className="text-xl text-gray-600 text-center">
            Insights and strategies for building digital businesses in the AI era
          </p>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="bg-gray-50 px-4 py-8">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedTag && (
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200"
              >
                ← All Posts
              </Link>
            )}
            {Array.from(allTags.entries()).map(([tag, count]) => (
              <Tag key={tag} tag={tag} count={count} isActive={selectedTag === tag} />
            ))}
          </div>
          {selectedTag && (
            <p className="text-center mt-4 text-gray-600">
              Showing {posts.length} post{posts.length !== 1 ? 's' : ''} tagged with &quot;{selectedTag}&quot;
            </p>
          )}
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="container">
          <BlogListing posts={posts} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

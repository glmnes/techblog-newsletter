import { getAllPostSlugs, getPostData, getRelatedPosts } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import BlogCTA from '@/components/BlogCTA';
import NewsletterForm from '@/components/NewsletterForm';
import Tag from '@/components/Tag';
import Link from 'next/link';
import ReadingProgress from '@/components/ReadingProgress';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import BackToTop from '@/components/BackToTop';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const postData = await getPostData(slug);
    const relatedPosts = getRelatedPosts(slug, 3);
    
    return (
      <article className="min-h-screen">
        <Header />
        {/* Article Header */}
        <header className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
          <div className="container max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{postData.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{postData.excerpt}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>{postData.author}</span>
                <span>•</span>
                <time dateTime={postData.date}>
                  {new Date(postData.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{postData.readTime}</span>
              </div>
              {postData.tags && (
                <div className="mt-4 flex justify-center gap-2">
                  {postData.tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Reading Progress */}
        <ReadingProgress />

        {/* Article Content */}
        <div className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              {/* Main content */}
              <div className="lg:col-span-3">
                {/* Share Buttons */}
                <div className="mb-8 pb-8 border-b">
                  <ShareButtons 
                    url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourblog.com'}/blog/${slug}`} 
                    title={postData.title} 
                    description={postData.excerpt} 
                  />
                </div>
                
                <div 
                  className="prose prose-lg prose-gray max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-gray-700 prose-p:leading-relaxed
                    prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-code:text-primary-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-gray-900 prose-pre:text-gray-100
                    prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-4 prose-blockquote:italic
                    prose-ul:list-disc prose-ol:list-decimal
                    prose-li:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
                />
              </div>
              
              {/* Sidebar with Table of Contents */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents content={postData.contentHtml || ''} />
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <BackToTop />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 px-4">
            <div className="container max-w-4xl">
              <h2 className="text-2xl font-bold mb-8 text-center">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.readTime}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container max-w-2xl">
            <NewsletterForm 
              title="Enjoyed this article?"
              description="Get more insights like this delivered to your inbox every week."
              formId="blog-footer"
              placeholder="Your email address"
              buttonText="Join the newsletter"
            />
          </div>
        </section>
        <Footer />
      </article>
    );
  } catch (error) {
    notFound();
  }
}

import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';
import ClientHomepage from './ClientHomepage';
import NewsletterForm from '@/components/NewsletterForm';
import PageWrapper from '@/components/PageWrapper';

export default async function Home() {
  const posts = getAllPosts();
  
  return (
    <PageWrapper>
      <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="gradient-text">TechBlog</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the latest in technology, web development, and digital innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="btn-primary">
                Start Reading
              </Link>
              <Link href="/newsletter" className="btn-secondary">
                Join Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
          <ClientHomepage posts={posts} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-primary-900 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join our community for weekly tech insights and tutorials.
            </p>
            <div className="newsletter-white">
              <NewsletterForm compact />
            </div>
          </div>
        </div>
      </section>
      </main>
    </PageWrapper>
  )
}

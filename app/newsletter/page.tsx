import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import Link from 'next/link';
import Header from '@/components/Header';

export default function NewsletterPage() {

  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20 px-4">
        <div className="container max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The TechBlog Weekly
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Every week, get the latest in web development, AI, and technology trends delivered straight to your inbox.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-8">
            <span className="font-semibold text-gray-900">10,000+</span> developers
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-gray-900">100+</span> issues published
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-gray-900">95%</span> open rate
          </div>
        </div>
      </section>

      {/* Newsletter Form */}
      <section id="newsletter-form" className="py-16 px-4">
        <div className="container max-w-2xl">
          <div className="card p-8">
            <NewsletterForm 
              title="Join Our Community"
              description=""
            />
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">What You&apos;ll Get</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-semibold mb-2">Weekly Insights</h3>
              <p className="text-gray-600">
                Curated insights on the latest frameworks, tools, and development trends.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Real Projects</h3>
              <p className="text-gray-600">
                Learn from real-world projects and open source contributions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Code Examples</h3>
              <p className="text-gray-600">
                Practical code snippets and tutorials you can use in your projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Issues</h2>
          <div className="space-y-6">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                Issue #102: Building Scalable React Applications in 2025
              </h3>
              <p className="text-gray-600 mb-2">
                Best practices for architecting large-scale React apps with Next.js 15 and modern tooling...
              </p>
              <p className="text-sm text-gray-500">January 28, 2025</p>
            </div>
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                Issue #101: AI-Powered Development Tools That Actually Work
              </h3>
              <p className="text-gray-600 mb-2">
                A comprehensive review of AI coding assistants and how to integrate them into your workflow...
              </p>
              <p className="text-sm text-gray-500">January 21, 2025</p>
            </div>
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                Issue #100: The State of Web Development in 2025
              </h3>
              <p className="text-gray-600 mb-2">
                Our annual report on emerging technologies, frameworks, and what&apos;s next for web developers...
              </p>
              <p className="text-sm text-gray-500">January 14, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">What Readers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-6">
              <p className="text-gray-700 mb-4 italic">
                &quot;The most actionable newsletter I read. Every issue has at least one idea I can implement immediately.&quot;
              </p>
              <p className="font-semibold">Alex M.</p>
              <p className="text-sm text-gray-500">Senior Developer</p>
            </div>
            <div className="card p-6">
              <p className="text-gray-700 mb-4 italic">
                &quot;The best technical newsletter I subscribe to. Always learn something new each week.&quot;
              </p>
              <p className="font-semibold">Jamie L.</p>
              <p className="text-sm text-gray-500">Full Stack Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-primary-900 text-white">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join 10,000+ developers staying ahead of the curve.
          </p>
          <Link 
            href="#newsletter-form"
            className="inline-block bg-white text-primary-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Subscribe Now
          </Link>
        </div>
       
      </section>
      <Footer />
    </main>
  );
}

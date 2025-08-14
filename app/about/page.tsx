import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about TechBlog and our mission to share knowledge with developers.'
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">About TechBlog</h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Sharing knowledge with the tech community
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl">
          <div className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              TechBlog is a simple blog platform for sharing tech stuff. Nothing fancy, just a place to write about code, tools, and whatever else is interesting in tech.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              We write about things we actually use and problems we&apos;ve solved. No fluff, just practical content that might help someone else.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-900 text-white">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of developers getting weekly tech insights and tutorials.
          </p>
          <Link 
            href="/newsletter" 
            className="inline-block bg-white text-primary-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
          >
            Join Our Newsletter
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}


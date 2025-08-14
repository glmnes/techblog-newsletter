import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you&apos;ve ventured into uncharted territory. This page doesn&apos;t exist, but don&apos;t worry—we&apos;ve got plenty of great content for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary"
          >
            Go to Homepage
          </Link>
          <Link
            href="/blog"
            className="btn-secondary"
          >
            Browse Articles
          </Link>
        </div>
        
        {/* Suggested Content */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-4">Popular Articles</h3>
          <div className="grid gap-4 max-w-2xl mx-auto text-left">
            <Link 
              href="/blog/ai-automation-guide" 
              className="card p-4 hover:shadow-lg transition-shadow block"
            >
              <h4 className="font-semibold text-primary-600 mb-1">
                The Complete Guide to AI Automation for Small Businesses
              </h4>
              <p className="text-sm text-gray-600">
                Learn how to leverage AI tools to automate repetitive tasks and save 10+ hours per week.
              </p>
            </Link>
            <Link 
              href="/blog/building-in-public-playbook" 
              className="card p-4 hover:shadow-lg transition-shadow block"
            >
              <h4 className="font-semibold text-primary-600 mb-1">
                The Building in Public Playbook
              </h4>
              <p className="text-sm text-gray-600">
                Real strategies from entrepreneurs who built 6-figure businesses by sharing their journey publicly.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

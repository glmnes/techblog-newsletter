import Link from 'next/link';
import MobileMenuButton from './MobileMenuButton';

export default function Header() {

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">TechBlog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/newsletter" className="text-gray-700 hover:text-primary-600 transition-colors">
              Newsletter
            </Link>
            <Link href="/newsletter" className="btn-primary text-sm">
              Subscribe
            </Link>
          </div>

          <MobileMenuButton />
        </div>
      </nav>
    </header>
  );
}

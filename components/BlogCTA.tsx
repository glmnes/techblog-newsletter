'use client';

import { useState } from 'react';
import NewsletterForm from './NewsletterForm';

interface BlogCTAProps {
  variant?: 'inline' | 'box';
  title?: string;
  description?: string;
}

export default function BlogCTA({ 
  variant = 'box',
  title = "Stay Updated",
  description = "Get the latest insights on digital efficiency delivered to your inbox."
}: BlogCTAProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (variant === 'inline') {
    return (
      <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <NewsletterForm 
            formId="blog-inline"
            placeholder="Your best email"
            buttonText="Subscribe"
            compact={true}
            successMessage="Success! Check your inbox to confirm."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-12 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        
        {!isExpanded ? (
          <div className="text-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Join Our Newsletter
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        ) : (
          <NewsletterForm 
            formId="blog-box"
            placeholder="Your email address"
            buttonText="Get Started"
            successMessage="Awesome! Check your inbox to confirm your subscription."
          />
        )}
      </div>
    </div>
  );
}

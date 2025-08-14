'use client';

import { useState } from 'react';

interface NewsletterFormProps {
  title?: string;
  description?: string;
  compact?: boolean;
  formId?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  onSuccess?: () => void;
}

export default function NewsletterForm({ 
  title = "Join Our Newsletter",
  description = "Get weekly insights on AI and digital business.",
  compact = false,
  formId = "newsletter-form",
  placeholder = "Enter your email",
  buttonText = "Subscribe for Free",
  successMessage = "Successfully subscribed!",
  onSuccess
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setMessage(data.message || successMessage);
      setEmail('');
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  if (compact) {
    return (
      <div>
        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
            <p className="font-medium">🎉 {message}</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                required
                disabled={status === 'loading'}
                autoComplete="email"
                name="email"
                id={`${formId}-email`}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {status === 'loading' ? 'Subscribing...' : buttonText}
              </button>
            </form>
            {status === 'error' && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                <p>{message}</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
          <p className="font-medium">🎉 {message}</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              required
              disabled={status === 'loading'}
              autoComplete="email"
              name="email"
              id={`${formId}-email`}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : buttonText}
            </button>
          </form>
          
          {status === 'error' && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <p>{message}</p>
            </div>
          )}
          
          <p className="mt-4 text-sm text-gray-500 text-center">
            No spam, unsubscribe anytime.
          </p>
        </>
      )}
    </div>
  );
}

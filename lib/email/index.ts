import { EmailProvider } from './types';
import { ConvertKitProvider } from './providers/convertkit';
import { MailchimpProvider } from './providers/mailchimp';

export * from './types';

export function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || 'convertkit';

  switch (provider.toLowerCase()) {
    case 'convertkit':
      return new ConvertKitProvider();
    case 'mailchimp':
      return new MailchimpProvider();
    default:
      throw new Error(`Unsupported email provider: ${provider}`);
  }
}

// Helper function to validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

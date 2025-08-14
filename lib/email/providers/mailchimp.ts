import axios from 'axios';
import crypto from 'crypto';
import { EmailProvider, EmailResponse } from '../types';

export class MailchimpProvider implements EmailProvider {
  private apiKey: string;
  private listId: string;
  private serverPrefix: string;
  private baseUrl: string;

  constructor() {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || 'us1';

    if (!apiKey || !listId) {
      throw new Error('Mailchimp API key and List ID are required');
    }

    this.apiKey = apiKey;
    this.listId = listId;
    this.serverPrefix = serverPrefix;
    this.baseUrl = `https://${serverPrefix}.api.mailchimp.com/3.0`;
  }

  private getSubscriberHash(email: string): string {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  }

  async subscribe(email: string, metadata?: Record<string, any>): Promise<EmailResponse> {
    try {
      const subscriberHash = this.getSubscriberHash(email);
      
      // First, try to update existing subscriber
      try {
        await axios.put(
          `${this.baseUrl}/lists/${this.listId}/members/${subscriberHash}`,
          {
            email_address: email,
            status: 'subscribed',
            merge_fields: metadata?.merge_fields || {}
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`
            }
          }
        );
      } catch (putError) {
        // If subscriber doesn't exist, create new one
        if (axios.isAxiosError(putError) && putError.response?.status === 404) {
          await axios.post(
            `${this.baseUrl}/lists/${this.listId}/members`,
            {
              email_address: email,
              status: 'subscribed',
              merge_fields: metadata?.merge_fields || {}
            },
            {
              headers: {
                Authorization: `Bearer ${this.apiKey}`
              }
            }
          );
        } else {
          throw putError;
        }
      }

      return {
        success: true,
        message: 'Successfully subscribed to newsletter!'
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          return {
            success: false,
            message: 'Invalid email address'
          };
        }
        if (error.response?.data?.detail) {
          return {
            success: false,
            message: error.response.data.detail
          };
        }
      }

      return {
        success: false,
        message: 'Failed to subscribe. Please try again later.'
      };
    }
  }
}

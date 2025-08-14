import axios from 'axios';
import { EmailProvider, EmailResponse } from '../types';

export class ConvertKitProvider implements EmailProvider {
  private apiKey: string;
  private formId?: string;
  private baseUrl = 'https://api.kit.com/v4';

  constructor() {
    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiKey) {
      throw new Error('ConvertKit API key is required');
    }

    this.apiKey = apiKey;
    this.formId = formId; // Optional - will use direct subscriber API if not provided
  }

  async subscribe(email: string, metadata?: Record<string, any>): Promise<EmailResponse> {
    try {
      // Use the subscribers endpoint with Bearer auth
      const response = await axios.post(
        `${this.baseUrl}/subscribers`,
        {
          email_address: email,
          state: 'active',
          fields: metadata?.fields || {},
          tags: metadata?.tags || []
        },
        {
          headers: {
            'X-Kit-Api-Key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
        data: response.data
      };
    } catch (error) {
      console.error('ConvertKit API Error:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
        
        // Handle specific ConvertKit errors
        if (error.response?.status === 401) {
          return {
            success: false,
            message: 'Invalid API key. Please check your ConvertKit configuration.'
          };
        }
        if (error.response?.status === 400) {
          return {
            success: false,
            message: error.response?.data?.message || 'Invalid email address'
          };
        }
        if (error.response?.data?.error?.message) {
          return {
            success: false,
            message: error.response.data.error.message
          };
        }
        if (error.response?.data?.message) {
          return {
            success: false,
            message: error.response.data.message
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

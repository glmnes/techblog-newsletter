export interface EmailProvider {
  subscribe(email: string, metadata?: Record<string, any>): Promise<EmailResponse>;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

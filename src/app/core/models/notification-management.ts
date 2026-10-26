export interface NotificationCategory {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface NotificationConfig {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  severity: 'Critical' | 'Warn' | 'Info';
  conditionText: string;
  isEnabled: boolean;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  // Integration fields (joined from the API)
  integrationId?: string;
  emailEnabled?: boolean;
  emailTemplate?: string;
  emailRecipients?: string[];
  webhookEnabled?: boolean;
  webhookUrl?: string;
  integrationCreatedAt?: Date;
  integrationUpdatedAt?: Date;
}

export interface NotificationIntegration {
  id: number;
  notificationConfigId: number;
  emailRecipients?: string[];
  emailTemplate?: string;
  emailEnabled: boolean;
  webhookEnabled: boolean;
  webhookUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationIntegrationDTO {
  id: string;
  emailEnabled: boolean;
  emailTemplate: string;
  emailRecipients: string[];
  webhookEnabled: boolean;
  webhookUrl: string;
}

export interface AdditionalConfig {
  email: EmailConfig;
}

export interface EmailConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

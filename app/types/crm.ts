export enum ChannelType {
  WHATSAPP = 'whatsapp',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TELEGRAM = 'telegram',
  TIKTOK = 'tiktok',
  SMS = 'sms',
  EMAIL = 'email',
}

export enum MessageDirection {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
}

export enum MessageStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  FAILED = 'failed',
}

export interface Conversation {
  id: string;
  tenantId: number;
  customerId?: string;
  channel: ChannelType;
  channelUserId: string;
  channelUsername?: string;
  isActive: boolean;
  lastMessageAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  customer?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  lastMessage?: Message;
}

export interface Message {
  id: string;
  tenantId: number;
  conversationId: string;
  direction: MessageDirection;
  content: string;
  mediaUrl?: string;
  channel: ChannelType;
  status: MessageStatus;
  externalId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
}

export type UserRole = "CLIENT" | "WORKER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  createdAt?: string;
}

export interface Worker {
  id: string;
  userId: string;
  user: User;
  bio: string;
  businessName?: string;
  cities: string[];
  categories: string[];
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  startsAt?: number;
  verified: boolean;
  idUploaded: boolean;
  subscription?: Subscription;
}

export type JobStatus = "OPEN" | "CLOSED" | "EXPIRED";

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  status: JobStatus;
  expiresAt: string;
  clientId: string;
  client?: User;
  proposalCount?: number;
  createdAt: string;
}

export type ProposalStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface Proposal {
  id: string;
  jobId: string;
  workerId: string;
  worker?: Worker;
  message: string;
  priceEstimate: number;
  status: ProposalStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  workerId: string;
  clientId: string;
  client?: User;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  jobId?: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  otherUser: User;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export type SubscriptionTier = "BASIC" | "PRO";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "EXPIRED";

export interface Subscription {
  id: string;
  workerId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodEnd: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

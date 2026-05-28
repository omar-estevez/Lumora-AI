import type { ChannelType } from "./channel"

export type ConversationStatus = "active" | "pending" | "resolved"

export type Sentiment = "positive" | "neutral" | "negative"

export type Urgency = "low" | "medium" | "high"

export interface ConversationAIInsights {
    intent: string
    sentiment: Sentiment
    urgency: Urgency
    leadScore: number
    purchaseIntent: number
    aiSummary: string
    suggestedAction: string
}

export interface Conversation {
    id: string
    businessId: string
    customerName: string
    avatar: string
    channel: ChannelType
    status: ConversationStatus
    message: string
    time: string
    unread: boolean
    aiInsights: ConversationAIInsights
}
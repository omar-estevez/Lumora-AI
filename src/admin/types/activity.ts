export type AIActivityType =
    | "booking"
    | "response"
    | "lead"
    | "voice"
    | "followup"
    | "escalation"
    | "quote"

export type AIActivityStatus = "completed" | "pending" | "escalated"

export interface AIActivity {
    id: string
    businessId: string
    type: AIActivityType
    status: AIActivityStatus
    action: string
    customer: string
    details: string
    time: string
    channel: "whatsapp" | "sms" | "webchat" | "voice" | "email"
    confidence: number
}
export type TemplateStatus = "active" | "paused"

export type TemplateCategory =
    | "welcome"
    | "sales"
    | "booking"
    | "reminder"
    | "follow_up"
    | "support"

export interface MessageTemplate {
    id: string
    businessId: string
    name: string
    category: TemplateCategory
    status: TemplateStatus
    uses: number
    subject?: string
    content: string
    channels: ("whatsapp" | "sms" | "webchat" | "email")[]
    createdAt: string
}
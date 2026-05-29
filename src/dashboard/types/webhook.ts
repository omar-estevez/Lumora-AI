export type WebhookStatus = "active" | "paused" | "failed"

export type WebhookEvent =
    | "booking.created"
    | "lead.created"
    | "message.received"
    | "conversation.resolved"
    | "call.completed"
    | "payment.succeeded"

export interface Webhook {
    id: string
    businessId: string
    name: string
    url: string
    status: WebhookStatus
    events: WebhookEvent[]
    secret: string
    lastTriggered: string
    lastStatusCode: number | null
    createdAt: string
}
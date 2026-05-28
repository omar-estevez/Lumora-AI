export type NotificationChannel = "email" | "push" | "sms"

export type NotificationCategory =
    | "conversations"
    | "bookings"
    | "leads"
    | "voice"
    | "billing"
    | "system"

export interface NotificationPreference {
    id: string
    businessId: string
    event: string
    description: string
    category: NotificationCategory
    email: boolean
    push: boolean
    sms: boolean
}
export type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed"

export interface Booking {
    id: string
    businessId: string
    customerName: string
    serviceName: string
    date: string
    time: string
    price: number
    status: BookingStatus
    channel: "whatsapp" | "sms" | "webchat" | "voice" | "email"
}
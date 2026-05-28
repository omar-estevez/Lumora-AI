import { currentBusinessId } from "./mockBusiness"
import type { Webhook } from "@/admin/types/webhook"

export const mockWebhooks: Webhook[] = [
    {
        id: "wh_001",
        businessId: currentBusinessId,
        name: "New Booking",
        url: "https://api.myapp.com/bookings",
        status: "active",
        events: ["booking.created"],
        secret: "whsec_booking_123",
        lastTriggered: "5 min ago",
        lastStatusCode: 200,
        createdAt: "Jan 10, 2024",
    },
    {
        id: "wh_002",
        businessId: currentBusinessId,
        name: "Lead Captured",
        url: "https://api.myapp.com/leads",
        status: "active",
        events: ["lead.created"],
        secret: "whsec_leads_456",
        lastTriggered: "15 min ago",
        lastStatusCode: 200,
        createdAt: "Jan 12, 2024",
    },
    {
        id: "wh_003",
        businessId: currentBusinessId,
        name: "Message Received",
        url: "https://api.myapp.com/messages",
        status: "paused",
        events: ["message.received", "conversation.resolved"],
        secret: "whsec_messages_789",
        lastTriggered: "2 hours ago",
        lastStatusCode: 202,
        createdAt: "Jan 15, 2024",
    },
]
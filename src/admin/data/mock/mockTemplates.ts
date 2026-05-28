import { currentBusinessId } from "./mockBusiness"
import type { MessageTemplate } from "@/admin/types/template"

export const mockTemplates: MessageTemplate[] = [
    {
        id: "tpl_001",
        businessId: currentBusinessId,
        name: "Welcome Greeting",
        category: "welcome",
        uses: 1250,
        status: "active",
        content:
            "Hi! Thanks for contacting us. How can we help you today?",
        channels: ["whatsapp", "sms", "webchat"],
        createdAt: "Jan 10, 2024",
    },
    {
        id: "tpl_002",
        businessId: currentBusinessId,
        name: "Price List",
        category: "sales",
        uses: 890,
        status: "active",
        content:
            "Our services start at $49. Tell us your vehicle type and what service you need, and we’ll send you the best option.",
        channels: ["whatsapp", "sms"],
        createdAt: "Jan 12, 2024",
    },
    {
        id: "tpl_003",
        businessId: currentBusinessId,
        name: "Appointment Confirmation",
        category: "booking",
        uses: 567,
        status: "active",
        content:
            "Your appointment is confirmed. We’ll send you a reminder before your booking.",
        channels: ["whatsapp", "sms", "email"],
        createdAt: "Jan 15, 2024",
    },
    {
        id: "tpl_004",
        businessId: currentBusinessId,
        name: "24h Reminder",
        category: "reminder",
        uses: 432,
        status: "active",
        content:
            "Reminder: your appointment is scheduled for tomorrow. Reply YES to confirm or let us know if you need to reschedule.",
        channels: ["sms", "whatsapp"],
        createdAt: "Jan 18, 2024",
    },
    {
        id: "tpl_005",
        businessId: currentBusinessId,
        name: "Review Request",
        category: "follow_up",
        uses: 234,
        status: "paused",
        content:
            "Thanks for choosing us! If you enjoyed the service, we’d really appreciate a quick review.",
        channels: ["sms", "email"],
        createdAt: "Jan 20, 2024",
    },
]
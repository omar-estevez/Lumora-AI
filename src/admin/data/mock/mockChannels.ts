import type { Channel } from "@/admin/types/channel"
import { currentBusinessId } from "./mockBusiness"

export const mockChannels: Channel[] = [
    {
        id: "whatsapp",
        businessId: currentBusinessId,
        name: "WhatsApp",
        status: "online",
        enabled: true,
        connected: true,
    },
    {
        id: "sms",
        businessId: currentBusinessId,
        name: "SMS",
        status: "online",
        enabled: true,
        connected: true,
    },
    {
        id: "webchat",
        businessId: currentBusinessId,
        name: "Web Chat",
        status: "online",
        enabled: true,
        connected: true,
    },
    {
        id: "voice",
        businessId: currentBusinessId,
        name: "Voice AI",
        status: "upgrade",
        enabled: false,
        connected: false,
    },
    {
        id: "email",
        businessId: currentBusinessId,
        name: "Email",
        status: "not_connected",
        enabled: false,
        connected: false,
    },
]
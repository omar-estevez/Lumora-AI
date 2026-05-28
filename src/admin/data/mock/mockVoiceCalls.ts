import { currentBusinessId } from "./mockBusiness"
import type { VoiceCall } from "@/admin/types/voice"

export const mockVoiceCalls: VoiceCall[] = [
    {
        id: "voice_001",
        businessId: currentBusinessId,
        customer: "Gabriel Torres",
        phone: "+1 555-123-4567",
        duration: "3:45",
        status: "completed",
        sentiment: "positive",
        aiSummary: "Booking confirmed for full polish.",
        transcript: true,
        transcriptText:
            "Customer asked about full polish availability. AI confirmed service details, pricing, and booked the appointment.",
        recordingUrl: "#",
        time: "10 min ago",
    },
    {
        id: "voice_002",
        businessId: currentBusinessId,
        customer: "Isabella Mendez",
        phone: "+1 555-234-5678",
        duration: "1:20",
        status: "completed",
        sentiment: "neutral",
        aiSummary: "Price information request.",
        transcript: true,
        transcriptText:
            "Customer requested pricing for full detail. AI explained starting prices and offered booking options.",
        recordingUrl: "#",
        time: "30 min ago",
    },
    {
        id: "voice_003",
        businessId: currentBusinessId,
        customer: "Sebastian Ortiz",
        phone: "+1 555-345-6789",
        duration: "-",
        status: "missed",
        sentiment: null,
        aiSummary: null,
        transcript: false,
        time: "1 hour ago",
    },
    {
        id: "voice_004",
        businessId: currentBusinessId,
        customer: "Valentina Castro",
        phone: "+1 555-456-7890",
        duration: "5:12",
        status: "completed",
        sentiment: "positive",
        aiSummary: "VIP customer - Premium booking scheduled.",
        transcript: true,
        transcriptText:
            "Customer requested premium service. AI identified VIP intent and scheduled a premium booking.",
        recordingUrl: "#",
        time: "2 hours ago",
    },
]
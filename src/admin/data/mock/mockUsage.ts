import type { BusinessUsage } from "@/admin/types/usage"
import { currentBusinessId } from "./mockBusiness"
import { MessageSquare, Phone, Users, Brain, Zap, Database } from "lucide-react"

export const mockUsage: BusinessUsage = {
    businessId: currentBusinessId,
    plan: "growth",
    metrics: [
        {
            id: "messages",
            label: "Messages",
            used: 3247,
            limit: 5000,
            icon: MessageSquare
        },
        {
            id: "voice_minutes",
            label: "Voice Minutes",
            used: 234,
            limit: 500,
            icon: Phone
        },
        {
            id: "users",
            label: "Users",
            used: 3,
            limit: 5,
            icon: Users
        },
        {
            id: "ai_credits",
            label: "AI Credits",
            used: 8500,
            limit: 10000,
            icon: Brain
        },
        {
            id: "automations",
            label: "Automations",
            used: 45,
            limit: 50,
            icon: Zap
        },
        {
            id: "storage",
            label: "Storage",
            used: 2.4,
            limit: 5,
            unit: "GB",
            icon: Database
        },
    ],
}
import type { Business } from "@/admin/types"

export const currentBusinessId = "biz_001"

export const mockBusinesses: Business[] = [
    {
        id: "biz_001",
        ownerId: "user_001",
        name: "Auto Pro Detailing",
        plan: "growth",
        industry: "auto_detailing",
        email: "info@autopro.com",
        phone: "+1 (555) 123-4567",
        website: "https://www.autopro-detailing.com",
        address: "Houston, TX",
        serviceArea: "Houston, TX and surrounding areas",
        timezone: "America/Chicago",
        createdAt: "2026-05-01T10:00:00Z",
    },
]
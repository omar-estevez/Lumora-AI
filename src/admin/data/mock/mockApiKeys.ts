import { currentBusinessId } from "./mockBusiness"
import type { ApiKey } from "@/admin/types/apiKey"

export const mockApiKeys: ApiKey[] = [
    {
        id: "key_001",
        businessId: currentBusinessId,
        name: "Production Key",
        key: "sk_live_51H8Lm...abc123",
        environment: "live",
        status: "active",
        permissions: [
            "read:leads",
            "write:leads",
            "read:conversations",
            "read:bookings",
            "write:bookings",
            "read:analytics",
        ],
        createdAt: "Jan 15, 2024",
        lastUsed: "5 min ago",
    },
    {
        id: "key_002",
        businessId: currentBusinessId,
        name: "Development Key",
        key: "sk_test_92KpLm...xyz789",
        environment: "test",
        status: "active",
        permissions: ["read:leads", "write:leads", "read:conversations"],
        createdAt: "Jan 10, 2024",
        lastUsed: "2 days ago",
    },
]
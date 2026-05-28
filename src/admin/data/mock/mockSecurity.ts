import { currentBusinessId } from "./mockBusiness"
import type { SecurityActivity, SecuritySession } from "@/admin/types/security"

export const mockSecuritySessions: SecuritySession[] = [
    {
        id: "session_001",
        businessId: currentBusinessId,
        device: "MacBook Pro",
        browser: "Chrome",
        location: "Miami, FL",
        ipAddress: "192.168.1.1",
        lastActive: "Active now",
        status: "current",
    },
    {
        id: "session_002",
        businessId: currentBusinessId,
        device: "iPhone 15",
        browser: "Safari",
        location: "Miami, FL",
        ipAddress: "192.168.1.25",
        lastActive: "2 hours ago",
        status: "active",
    },
    {
        id: "session_003",
        businessId: currentBusinessId,
        device: "Windows PC",
        browser: "Edge",
        location: "Houston, TX",
        ipAddress: "192.168.1.44",
        lastActive: "1 day ago",
        status: "active",
    },
]

export const mockSecurityActivities: SecurityActivity[] = [
    {
        id: "act_001",
        businessId: currentBusinessId,
        type: "login",
        action: "Successful login",
        time: "5 min ago",
        ipAddress: "192.168.1.1",
        location: "Miami, FL",
    },
    {
        id: "act_002",
        businessId: currentBusinessId,
        type: "settings",
        action: "Business settings updated",
        time: "1 hour ago",
        ipAddress: "192.168.1.1",
        location: "Miami, FL",
    },
    {
        id: "act_003",
        businessId: currentBusinessId,
        type: "api_key",
        action: "API key created",
        time: "2 days ago",
        ipAddress: "192.168.1.1",
        location: "Miami, FL",
    },
    {
        id: "act_004",
        businessId: currentBusinessId,
        type: "password",
        action: "Password changed",
        time: "30 days ago",
        ipAddress: "192.168.1.1",
        location: "Miami, FL",
    },
]
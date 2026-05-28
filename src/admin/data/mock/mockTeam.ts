import { currentBusinessId } from "./mockBusiness"
import type { TeamMember } from "@/admin/types/team"

export const mockTeamMembers: TeamMember[] = [
    {
        id: "team_001",
        businessId: currentBusinessId,
        name: "Juan Delgado",
        email: "juan@autopro.com",
        role: "owner",
        avatar: "JD",
        status: "online",
        lastActive: "Active now",
        joinedAt: "Jan 5, 2024",
    },
    {
        id: "team_002",
        businessId: currentBusinessId,
        name: "Maria Gonzalez",
        email: "maria@autopro.com",
        role: "admin",
        avatar: "MG",
        status: "online",
        lastActive: "5 min ago",
        joinedAt: "Jan 8, 2024",
    },
    {
        id: "team_003",
        businessId: currentBusinessId,
        name: "Carlos Ruiz",
        email: "carlos@autopro.com",
        role: "agent",
        avatar: "CR",
        status: "offline",
        lastActive: "2 hours ago",
        joinedAt: "Jan 12, 2024",
    },
    {
        id: "team_004",
        businessId: currentBusinessId,
        name: "Ana Torres",
        email: "ana@autopro.com",
        role: "agent",
        avatar: "AT",
        status: "online",
        lastActive: "15 min ago",
        joinedAt: "Jan 15, 2024",
    },
]
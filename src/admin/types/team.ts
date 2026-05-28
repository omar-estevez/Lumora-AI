export type TeamRole = "owner" | "admin" | "manager" | "agent" | "viewer"

export type TeamMemberStatus = "online" | "offline" | "invited"

export interface TeamMember {
    id: string
    businessId: string
    name: string
    email: string
    role: TeamRole
    avatar: string
    status: TeamMemberStatus
    lastActive: string
    joinedAt: string
}
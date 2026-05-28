import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Plus,
    Trash2,
    Search,
    Users,
    ShieldCheck,
    UserCheck,
    Clock,
} from "lucide-react"

import { currentBusinessId, mockTeamMembers } from "@/admin/data/mock"
import type { TeamMember, TeamMemberStatus, TeamRole } from "@/admin/types/team"
import InviteMemberModal from "./invite-member/InviteMemberModal"

const roleFilters: { label: string; value: "all" | TeamRole }[] = [
    { label: "All Roles", value: "all" },
    { label: "Owner", value: "owner" },
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "Agent", value: "agent" },
    { label: "Viewer", value: "viewer" },
]

const statusFilters: { label: string; value: "all" | TeamMemberStatus }[] = [
    { label: "All Status", value: "all" },
    { label: "Online", value: "online" },
    { label: "Offline", value: "offline" },
    { label: "Invited", value: "invited" },
]

const roleOptions: TeamRole[] = ["owner", "admin", "manager", "agent", "viewer"]

// ***************************************************************
// ***** Owner: dueño del negocio ********************************
// ***** Admin: configura negocio, canales, pagos, equipo ********
// ***** Manager: maneja leads, bookings, conversations **********
// ***** Agent: responde conversaciones y toma control humano ****
// ***** Viewer: solo mira métricas ******************************
// ***************************************************************

export const TeamPage = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
        mockTeamMembers.filter((member) => member.businessId === currentBusinessId)
    )

    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState<"all" | TeamRole>("all")
    const [statusFilter, setStatusFilter] =
        useState<"all" | TeamMemberStatus>("all")
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

    const filteredMembers = useMemo(() => {
        return teamMembers.filter((member) => {
            const matchesSearch =
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.email.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesRole = roleFilter === "all" || member.role === roleFilter

            const matchesStatus =
                statusFilter === "all" || member.status === statusFilter

            return matchesSearch && matchesRole && matchesStatus
        })
    }, [teamMembers, searchTerm, roleFilter, statusFilter])

    const onlineMembers = teamMembers.filter(
        (member) => member.status === "online"
    ).length

    const invitedMembers = teamMembers.filter(
        (member) => member.status === "invited"
    ).length

    const agentsCount = teamMembers.filter(
        (member) => member.role === "agent"
    ).length

    const changeRole = (memberId: string, role: TeamRole) => {
        setTeamMembers((current) =>
            current.map((member) =>
                member.id === memberId ? { ...member, role } : member
            )
        )
    }

    const deleteMember = (memberId: string) => {
        setTeamMembers((current) =>
            current.filter((member) => member.id !== memberId)
        )
    }

    const inviteMember = (member: TeamMember) => {
        setTeamMembers((current) => [member, ...current])
    }

    const formatRole = (role: TeamRole) => {
        return role.charAt(0).toUpperCase() + role.slice(1)
    }

    const getStatusDot = (status: TeamMemberStatus) => {
        if (status === "online") return "bg-emerald-400"
        if (status === "invited") return "bg-amber-400"
        return "bg-muted-foreground"
    }

    const getStatusClass = (status: TeamMemberStatus) => {
        if (status === "online") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        if (status === "invited") {
            return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        }

        return "bg-secondary text-muted-foreground border-border/50"
    }

    const getRoleClass = (role: TeamRole) => {
        if (role === "owner") {
            return "bg-primary/20 text-primary border-primary/30"
        }

        if (role === "admin") {
            return "bg-purple-500/20 text-purple-400 border-purple-500/30"
        }

        if (role === "manager") {
            return "bg-blue-500/20 text-blue-400 border-blue-500/30"
        }

        return "bg-secondary text-muted-foreground border-border/50"
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Team</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage users, roles, and access for this business workspace.
                    </p>
                </div>

                <Button
                    size="sm"
                    onClick={() => setIsInviteModalOpen(true)}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Invite Member
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Total Members</p>
                    </div>
                    <p className="text-3xl font-bold">{teamMembers.length}</p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">
                        {onlineMembers}
                    </p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <p className="text-sm text-muted-foreground">Invited</p>
                    </div>
                    <p className="text-3xl font-bold text-amber-400">
                        {invitedMembers}
                    </p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-400" />
                        <p className="text-sm text-muted-foreground">Agents</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-400">{agentsCount}</p>
                </Card>
            </div>

            {/* Filters */}
            <Card className="border-border/50 p-4">
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search team members..."
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {roleFilters.map((filter) => (
                            <Button
                                key={filter.value}
                                variant={roleFilter === filter.value ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => setRoleFilter(filter.value)}
                                className={
                                    roleFilter === filter.value
                                        ? "border-primary text-primary"
                                        : ""
                                }
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {statusFilters.map((filter) => (
                            <Button
                                key={filter.value}
                                variant={statusFilter === filter.value ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => setStatusFilter(filter.value)}
                                className={
                                    statusFilter === filter.value
                                        ? "border-primary text-primary"
                                        : ""
                                }
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Team List */}
            <Card className="border-border/50 overflow-hidden">
                <div className="divide-y divide-border/50">
                    {filteredMembers.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                                <Users className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <h3 className="font-semibold">No team members found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing the search, role, or status filters.
                            </p>
                        </div>
                    ) : (
                        filteredMembers.map((member) => (
                            <div
                                key={member.id}
                                className="p-4 hover:bg-secondary/30 transition-colors"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20">
                                                <span className="font-medium">{member.avatar}</span>
                                            </div>

                                            <span
                                                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusDot(
                                                    member.status
                                                )}`}
                                            />
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="font-semibold">{member.name}</p>

                                                <span
                                                    className={`rounded-full border px-2 py-0.5 text-xs capitalize ${getStatusClass(
                                                        member.status
                                                    )}`}
                                                >
                                                    {member.status}
                                                </span>

                                                <span
                                                    className={`rounded-full border px-2 py-0.5 text-xs capitalize ${getRoleClass(
                                                        member.role
                                                    )}`}
                                                >
                                                    {formatRole(member.role)}
                                                </span>
                                            </div>

                                            <p className="text-sm text-muted-foreground">
                                                {member.email}
                                            </p>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Joined: {member.joinedAt} · Last active:{" "}
                                                {member.lastActive}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <select
                                            value={member.role}
                                            disabled={member.role === "owner"}
                                            onChange={(event) =>
                                                changeRole(member.id, event.target.value as TeamRole)
                                            }
                                            className="rounded-lg border border-border/50 bg-secondary px-3 py-2 text-sm capitalize outline-none disabled:opacity-50"
                                        >
                                            {roleOptions.map((role) => (
                                                <option key={role} value={role}>
                                                    {formatRole(role)}
                                                </option>
                                            ))}
                                        </select>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={member.role === "owner"}
                                            onClick={() => deleteMember(member.id)}
                                            className="text-red-400 hover:text-red-300 disabled:opacity-30"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>

            <InviteMemberModal
                open={isInviteModalOpen}
                businessId={currentBusinessId}
                onClose={() => setIsInviteModalOpen(false)}
                onInvite={inviteMember}
            />
        </div>
    )
}

export default TeamPage
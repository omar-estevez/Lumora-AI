import { useState } from "react"
import { MailPlus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TeamMember, TeamRole } from "@/admin/types/team"

interface InviteMemberModalProps {
    open: boolean
    businessId: string
    onClose: () => void
    onInvite: (member: TeamMember) => void
}

const roleOptions: { label: string; value: TeamRole; description: string }[] = [
    {
        label: "Admin",
        value: "admin",
        description: "Can manage team, settings, and business configuration.",
    },
    {
        label: "Manager",
        value: "manager",
        description: "Can manage conversations, leads, bookings, and workflows.",
    },
    {
        label: "Agent",
        value: "agent",
        description: "Can reply to customers and manage assigned conversations.",
    },
    {
        label: "Viewer",
        value: "viewer",
        description: "Can view data but cannot make changes.",
    },
]

const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
}

export const InviteMemberModal = ({
    open,
    businessId,
    onClose,
    onInvite,
}: InviteMemberModalProps) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState<TeamRole>("agent")

    if (!open) return null

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name.trim() || !email.trim()) return

        const newMember: TeamMember = {
            id: `team_${Date.now()}`,
            businessId,
            name,
            email,
            role,
            avatar: getInitials(name),
            status: "invited",
            lastActive: "Invitation sent",
            joinedAt: "Pending",
        }

        onInvite(newMember)

        setName("")
        setEmail("")
        setRole("agent")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <MailPlus className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Invite Team Member</h2>
                            <p className="text-sm text-muted-foreground">
                                Add someone to help manage conversations, bookings, and leads.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Full Name</label>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Example: Sofia Ramirez"
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="sofia@business.com"
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Role</label>

                        <div className="grid grid-cols-1 gap-2">
                            {roleOptions.map((option) => {
                                const selected = role === option.value

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setRole(option.value)}
                                        className={`rounded-lg border px-3 py-3 text-left transition-colors ${selected
                                                ? "border-primary bg-primary/20"
                                                : "border-border/60 bg-secondary/30 hover:border-primary/60"
                                            }`}
                                    >
                                        <p
                                            className={`text-sm font-medium ${selected ? "text-primary" : ""
                                                }`}
                                        >
                                            {option.label}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {option.description}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <p className="text-sm text-muted-foreground">
                            This will create a pending invitation. Later, with Supabase, the
                            user will receive an email invite and create their account.
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-border/60 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!name.trim() || !email.trim()}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Invite Member
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InviteMemberModal
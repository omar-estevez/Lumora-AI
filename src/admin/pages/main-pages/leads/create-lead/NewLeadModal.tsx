import { useState } from "react"
import { X, Plus, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Lead, LeadStatus, LeadTemperature } from "@/admin/types/lead"
import type { ChannelType } from "@/admin/types/channel"

interface NewLeadModalProps {
    open: boolean
    businessId: string
    onClose: () => void
    onCreate: (lead: Lead) => void
}

const sourceOptions: { label: string; value: ChannelType }[] = [
    { label: "WhatsApp", value: "whatsapp" },
    { label: "SMS", value: "sms" },
    { label: "Web Chat", value: "webchat" },
    { label: "Voice AI", value: "voice" },
    { label: "Email", value: "email" },
]

const temperatureOptions: { label: string; value: LeadTemperature }[] = [
    { label: "Hot", value: "hot" },
    { label: "Warm", value: "warm" },
    { label: "Cold", value: "cold" },
]

const statusOptions: { label: string; value: LeadStatus }[] = [
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Follow Up", value: "follow_up" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
]

export const NewLeadModal = ({
    open,
    businessId,
    onClose,
    onCreate,
}: NewLeadModalProps) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [source, setSource] = useState<ChannelType>("whatsapp")
    const [temperature, setTemperature] = useState<LeadTemperature>("hot")
    const [status, setStatus] = useState<LeadStatus>("new")
    const [aiScore, setAiScore] = useState(80)
    const [value, setValue] = useState(150)

    if (!open) return null

    const resetForm = () => {
        setName("")
        setEmail("")
        setPhone("")
        setSource("whatsapp")
        setTemperature("hot")
        setStatus("new")
        setAiScore(80)
        setValue(150)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name.trim() || !email.trim() || !phone.trim()) return

        const newLead: Lead = {
            id: `lead_${Date.now()}`,
            businessId,
            name,
            email,
            phone,
            source,
            temperature,
            status,
            aiScore,
            value,
            createdAt: "Just now",
        }

        onCreate(newLead)
        resetForm()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <UserPlus className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">New Lead</h2>
                            <p className="text-sm text-muted-foreground">
                                Add a new lead manually to your pipeline.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Name</label>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Customer name"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Email</label>
                            <input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="customer@email.com"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Phone</label>
                            <input
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Source</label>
                            <select
                                value={source}
                                onChange={(event) => setSource(event.target.value as ChannelType)}
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            >
                                {sourceOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Temperature
                            </label>
                            <select
                                value={temperature}
                                onChange={(event) =>
                                    setTemperature(event.target.value as LeadTemperature)
                                }
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            >
                                {temperatureOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Status</label>
                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value as LeadStatus)}
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                AI Score: {aiScore}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={aiScore}
                                onChange={(event) => setAiScore(Number(event.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Value</label>
                            <input
                                type="number"
                                value={value}
                                onChange={(event) => setValue(Number(event.target.value))}
                                placeholder="150"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!name.trim() || !email.trim() || !phone.trim()}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Lead
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewLeadModal
import { useState } from "react"
import { X, Plus, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AIFlow, FlowStatus, FlowTrigger } from "@/admin/types/flow"
import type { ChannelType } from "@/admin/types/channel"

interface CreateFlowModalProps {
    open: boolean
    businessId: string
    onClose: () => void
    onCreate: (flow: AIFlow) => void
}

const triggerOptions: { label: string; value: FlowTrigger }[] = [
    { label: "New Message", value: "new_message" },
    { label: "Missed Call", value: "missed_call" },
    { label: "New Lead", value: "new_lead" },
    { label: "Booking Created", value: "booking_created" },
    { label: "No Response", value: "no_response" },
    { label: "Manual", value: "manual" },
]

const channelOptions: { label: string; value: ChannelType }[] = [
    { label: "WhatsApp", value: "whatsapp" },
    { label: "SMS", value: "sms" },
    { label: "Web Chat", value: "webchat" },
    { label: "Voice AI", value: "voice" },
    { label: "Email", value: "email" },
]

export const CreateFlowModal = ({
    open,
    businessId,
    onClose,
    onCreate,
}: CreateFlowModalProps) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [trigger, setTrigger] = useState<FlowTrigger>("new_message")
    const [goal, setGoal] = useState("")
    const [status, setStatus] = useState<FlowStatus>("active")
    const [channels, setChannels] = useState<ChannelType[]>(["whatsapp"])

    if (!open) return null

    const toggleChannel = (channel: ChannelType) => {
        setChannels((current) => {
            if (current.includes(channel)) {
                return current.filter((item) => item !== channel)
            }

            return [...current, channel]
        })
    }

    const resetForm = () => {
        setName("")
        setDescription("")
        setTrigger("new_message")
        setGoal("")
        setStatus("active")
        setChannels(["whatsapp"])
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name.trim() || !description.trim() || !goal.trim()) return

        const newFlow: AIFlow = {
            id: `flow_${Date.now()}`,
            businessId,
            name,
            description,
            status,
            trigger,
            goal,
            channels,
            nodes: 3,
            runs: 0,
            conversionRate: 0,
            lastRun: "Never",
        }

        onCreate(newFlow)
        resetForm()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <Workflow className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Create AI Flow</h2>
                            <p className="text-sm text-muted-foreground">
                                Build a new automation for conversations, bookings, or follow-ups.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Flow name */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Flow Name
                            </label>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Example: Smart Welcome Flow"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder="Describe what this flow does..."
                                rows={3}
                                className="w-full resize-none rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        {/* Trigger */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Trigger
                            </label>
                            <select
                                value={trigger}
                                onChange={(event) =>
                                    setTrigger(event.target.value as FlowTrigger)
                                }
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            >
                                {triggerOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(event) =>
                                    setStatus(event.target.value as FlowStatus)
                                }
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            >
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        {/* Goal */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Goal
                            </label>
                            <input
                                value={goal}
                                onChange={(event) => setGoal(event.target.value)}
                                placeholder="Example: Capture lead and book appointment"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Channels */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Channels
                        </label>

                        <div className="flex flex-wrap gap-2">
                            {channelOptions.map((channel) => {
                                const selected = channels.includes(channel.value)

                                return (
                                    <button
                                        key={channel.value}
                                        type="button"
                                        onClick={() => toggleChannel(channel.value)}
                                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${selected
                                                ? "border-primary bg-primary/20 text-primary"
                                                : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-primary"
                                            }`}
                                    >
                                        {channel.label}
                                    </button>
                                )
                            })}
                        </div>

                        {channels.length === 0 && (
                            <p className="mt-2 text-xs text-red-400">
                                Select at least one channel.
                            </p>
                        )}
                    </div>

                    {/* Preview */}
                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                        <p className="mb-2 text-xs text-muted-foreground">
                            Flow Preview
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/20 text-primary">
                                1
                            </div>
                            <span className="text-muted-foreground">Trigger</span>
                            <span>→</span>
                            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/20 text-primary">
                                2
                            </div>
                            <span className="text-muted-foreground">AI Response</span>
                            <span>→</span>
                            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/20 text-primary">
                                3
                            </div>
                            <span className="text-muted-foreground">Goal</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!name.trim() || !description.trim() || !goal.trim() || channels.length === 0}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Flow
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateFlowModal
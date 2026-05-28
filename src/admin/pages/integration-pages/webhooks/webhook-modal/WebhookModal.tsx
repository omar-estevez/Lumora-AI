import { useEffect, useState } from "react"
import { X, Plus, Save, Webhook as WebhookIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Webhook, WebhookEvent, WebhookStatus } from "@/admin/types/webhook"

interface WebhookModalProps {
    open: boolean
    businessId: string
    webhook: Webhook | null
    mode: "create" | "edit"
    onClose: () => void
    onSave: (webhook: Webhook) => void
}

const eventOptions: { label: string; value: WebhookEvent }[] = [
    { label: "Booking Created", value: "booking.created" },
    { label: "Lead Created", value: "lead.created" },
    { label: "Message Received", value: "message.received" },
    { label: "Conversation Resolved", value: "conversation.resolved" },
    { label: "Call Completed", value: "call.completed" },
    { label: "Payment Succeeded", value: "payment.succeeded" },
]

export const WebhookModal = ({
    open,
    businessId,
    webhook,
    mode,
    onClose,
    onSave,
}: WebhookModalProps) => {
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [status, setStatus] = useState<WebhookStatus>("active")
    const [events, setEvents] = useState<WebhookEvent[]>(["booking.created"])

    useEffect(() => {
        if (!open) return

        if (webhook) {
            setName(webhook.name)
            setUrl(webhook.url)
            setStatus(webhook.status)
            setEvents(webhook.events)
            return
        }

        setName("")
        setUrl("")
        setStatus("active")
        setEvents(["booking.created"])
    }, [open, webhook])

    if (!open) return null

    const toggleEvent = (event: WebhookEvent) => {
        setEvents((current) => {
            if (current.includes(event)) {
                return current.filter((item) => item !== event)
            }

            return [...current, event]
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name.trim() || !url.trim() || events.length === 0) return

        const savedWebhook: Webhook = {
            id: webhook?.id || `wh_${Date.now()}`,
            businessId,
            name,
            url,
            status,
            events,
            secret: webhook?.secret || `whsec_${Date.now()}`,
            lastTriggered: webhook?.lastTriggered || "Never",
            lastStatusCode: webhook?.lastStatusCode || null,
            createdAt: webhook?.createdAt || "Just now",
        }

        onSave(savedWebhook)
        onClose()
    }

    const title = mode === "create" ? "New Webhook" : "Edit Webhook"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <WebhookIcon className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">{title}</h2>
                            <p className="text-sm text-muted-foreground">
                                Send Lumora events to your own app, CRM, or automation tools.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Webhook Name</label>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Example: New Booking"
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Endpoint URL</label>
                        <input
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                            placeholder="https://api.yourapp.com/webhooks/lumora"
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Status</label>
                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value as WebhookStatus)}
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                        >
                            <option value="active">Active</option>
                            <option value="paused">Paused</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Events</label>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {eventOptions.map((option) => {
                                const selected = events.includes(option.value)

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => toggleEvent(option.value)}
                                        className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${selected
                                                ? "border-primary bg-primary/20 text-primary"
                                                : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-primary"
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                )
                            })}
                        </div>

                        {events.length === 0 && (
                            <p className="mt-2 text-xs text-red-400">
                                Select at least one event.
                            </p>
                        )}
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <p className="text-sm text-muted-foreground">
                            Lumora will send a POST request to this endpoint whenever the selected events happen.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!name.trim() || !url.trim() || events.length === 0}
                            className="bg-primary hover:bg-primary/90"
                        >
                            {mode === "create" ? (
                                <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Webhook
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WebhookModal
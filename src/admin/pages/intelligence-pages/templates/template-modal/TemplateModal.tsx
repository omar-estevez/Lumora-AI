import { useEffect, useState } from "react"
import { X, FileText, Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import type {
    MessageTemplate,
    TemplateCategory,
    TemplateStatus,
} from "@/admin/types/template"

interface TemplateModalProps {
    open: boolean
    businessId: string
    mode: "create" | "edit" | "view"
    template: MessageTemplate | null
    onClose: () => void
    onSave: (template: MessageTemplate) => void
}

const categoryOptions: { label: string; value: TemplateCategory }[] = [
    { label: "Welcome", value: "welcome" },
    { label: "Sales", value: "sales" },
    { label: "Booking", value: "booking" },
    { label: "Reminder", value: "reminder" },
    { label: "Follow-up", value: "follow_up" },
    { label: "Support", value: "support" },
]

const channelOptions: {
    label: string
    value: MessageTemplate["channels"][number]
}[] = [
        { label: "WhatsApp", value: "whatsapp" },
        { label: "SMS", value: "sms" },
        { label: "Web Chat", value: "webchat" },
        { label: "Email", value: "email" },
    ]

export const TemplateModal = ({
    open,
    businessId,
    mode,
    template,
    onClose,
    onSave,
}: TemplateModalProps) => {
    const [name, setName] = useState("")
    const [category, setCategory] = useState<TemplateCategory>("welcome")
    const [status, setStatus] = useState<TemplateStatus>("active")
    const [content, setContent] = useState("")
    const [channels, setChannels] = useState<MessageTemplate["channels"]>([
        "whatsapp",
    ])

    const readOnly = mode === "view"

    useEffect(() => {
        if (!open) return

        if (template) {
            setName(template.name)
            setCategory(template.category)
            setStatus(template.status)
            setContent(template.content)
            setChannels(template.channels)
            return
        }

        setName("")
        setCategory("welcome")
        setStatus("active")
        setContent("")
        setChannels(["whatsapp"])
    }, [open, template])

    if (!open) return null

    const toggleChannel = (channel: MessageTemplate["channels"][number]) => {
        setChannels((current) => {
            if (current.includes(channel)) {
                return current.filter((item) => item !== channel)
            }

            return [...current, channel]
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (readOnly || !name.trim() || !content.trim() || channels.length === 0) {
            return
        }

        const savedTemplate: MessageTemplate = {
            id: template?.id || `tpl_${Date.now()}`,
            businessId,
            name,
            category,
            status,
            uses: template?.uses || 0,
            content,
            channels,
            createdAt: template?.createdAt || "Just now",
        }

        onSave(savedTemplate)
        onClose()
    }

    const title =
        mode === "create"
            ? "New Template"
            : mode === "edit"
                ? "Edit Template"
                : "Template Details"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <FileText className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">{title}</h2>
                            <p className="text-sm text-muted-foreground">
                                Create reusable messages for AI replies, bookings, and follow-ups.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Template Name
                            </label>
                            <input
                                value={name}
                                disabled={readOnly}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Example: Appointment Confirmation"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary disabled:opacity-60"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Category</label>
                            <select
                                value={category}
                                disabled={readOnly}
                                onChange={(event) =>
                                    setCategory(event.target.value as TemplateCategory)
                                }
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary disabled:opacity-60"
                            >
                                {categoryOptions.map((option) => (
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
                                disabled={readOnly}
                                onChange={(event) =>
                                    setStatus(event.target.value as TemplateStatus)
                                }
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary disabled:opacity-60"
                            >
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Channels</label>

                            <div className="flex flex-wrap gap-2">
                                {channelOptions.map((channel) => {
                                    const selected = channels.includes(channel.value)

                                    return (
                                        <button
                                            key={channel.value}
                                            type="button"
                                            disabled={readOnly}
                                            onClick={() => toggleChannel(channel.value)}
                                            className={`rounded-full border px-3 py-1.5 text-xs transition-colors disabled:opacity-60 ${selected
                                                    ? "border-primary bg-primary/20 text-primary"
                                                    : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-primary"
                                                }`}
                                        >
                                            {channel.label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Message Content
                            </label>
                            <textarea
                                value={content}
                                disabled={readOnly}
                                onChange={(event) => setContent(event.target.value)}
                                rows={6}
                                placeholder="Write the message template..."
                                className="w-full resize-none rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary disabled:opacity-60"
                            />
                        </div>
                    </div>

                    {!readOnly && (
                        <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={!name.trim() || !content.trim() || channels.length === 0}
                                className="bg-primary hover:bg-primary/90"
                            >
                                {mode === "create" ? (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Template
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default TemplateModal
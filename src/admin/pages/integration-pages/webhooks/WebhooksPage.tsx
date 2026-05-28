import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Plus,
    Edit3,
    Trash2,
    Webhook as WebhookIcon,
    Play,
    Copy,
    CheckCircle,
    AlertTriangle,
    PauseCircle,
} from "lucide-react"

import { currentBusinessId, mockWebhooks } from "@/admin/data/mock"
import type { Webhook, WebhookEvent, WebhookStatus } from "@/admin/types/webhook"
import WebhookModal from "./webhook-modal/WebhookModal"

const statusFilters: { label: string; value: "all" | WebhookStatus }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Paused", value: "paused" },
    { label: "Failed", value: "failed" },
]

const eventFilters: { label: string; value: "all" | WebhookEvent }[] = [
    { label: "All Events", value: "all" },
    { label: "Bookings", value: "booking.created" },
    { label: "Leads", value: "lead.created" },
    { label: "Messages", value: "message.received" },
    { label: "Calls", value: "call.completed" },
]

export const WebhooksPage = () => {
    const [webhooks, setWebhooks] = useState<Webhook[]>(
        mockWebhooks.filter((item) => item.businessId === currentBusinessId)
    )

    const [statusFilter, setStatusFilter] = useState<"all" | WebhookStatus>("all")
    const [eventFilter, setEventFilter] = useState<"all" | WebhookEvent>("all")

    const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null)
    const [modalMode, setModalMode] = useState<"create" | "edit">("create")
    const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false)

    const filteredWebhooks = useMemo(() => {
        return webhooks.filter((webhook) => {
            const matchesStatus =
                statusFilter === "all" || webhook.status === statusFilter

            const matchesEvent =
                eventFilter === "all" || webhook.events.includes(eventFilter)

            return matchesStatus && matchesEvent
        })
    }, [webhooks, statusFilter, eventFilter])

    const activeWebhooks = webhooks.filter((item) => item.status === "active").length
    const pausedWebhooks = webhooks.filter((item) => item.status === "paused").length
    const failedWebhooks = webhooks.filter((item) => item.status === "failed").length

    const openCreateModal = () => {
        setSelectedWebhook(null)
        setModalMode("create")
        setIsWebhookModalOpen(true)
    }

    const openEditModal = (webhook: Webhook) => {
        setSelectedWebhook(webhook)
        setModalMode("edit")
        setIsWebhookModalOpen(true)
    }

    const saveWebhook = (webhook: Webhook) => {
        setWebhooks((current) => {
            const exists = current.some((item) => item.id === webhook.id)

            if (exists) {
                return current.map((item) => (item.id === webhook.id ? webhook : item))
            }

            return [webhook, ...current]
        })
    }

    const deleteWebhook = (webhookId: string) => {
        setWebhooks((current) => current.filter((item) => item.id !== webhookId))
    }

    const toggleWebhookStatus = (webhook: Webhook) => {
        setWebhooks((current) =>
            current.map((item) =>
                item.id === webhook.id
                    ? {
                        ...item,
                        status: item.status === "active" ? "paused" : "active",
                    }
                    : item
            )
        )
    }

    const testWebhook = (webhook: Webhook) => {
        setWebhooks((current) =>
            current.map((item) =>
                item.id === webhook.id
                    ? {
                        ...item,
                        lastTriggered: "Just now",
                        lastStatusCode: 200,
                    }
                    : item
            )
        )
    }

    const copySecret = (secret: string) => {
        navigator.clipboard.writeText(secret)
    }

    const formatEvent = (event: WebhookEvent) => {
        return event
            .replace(".", " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    }

    const getStatusClass = (status: WebhookStatus) => {
        if (status === "active") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        if (status === "paused") {
            return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        }

        return "bg-red-500/20 text-red-400 border-red-500/30"
    }

    const getStatusDot = (status: WebhookStatus) => {
        if (status === "active") return "bg-emerald-400"
        if (status === "paused") return "bg-amber-400"
        return "bg-red-400"
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Webhooks</h2>
                    <p className="text-sm text-muted-foreground">
                        Send Lumora events to external apps, CRMs, and automation tools.
                    </p>
                </div>

                <Button
                    size="sm"
                    onClick={openCreateModal}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Webhook
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <Card className="border-border/50 p-5">
                    <p className="text-sm text-muted-foreground">Total Webhooks</p>
                    <p className="mt-1 text-3xl font-bold">{webhooks.length}</p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">
                        {activeWebhooks}
                    </p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <PauseCircle className="h-4 w-4 text-amber-400" />
                        <p className="text-sm text-muted-foreground">Paused</p>
                    </div>
                    <p className="text-3xl font-bold text-amber-400">
                        {pausedWebhooks}
                    </p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <p className="text-sm text-muted-foreground">Failed</p>
                    </div>
                    <p className="text-3xl font-bold text-red-400">{failedWebhooks}</p>
                </Card>
            </div>

            {/* Filters */}
            <Card className="border-border/50 p-4">
                <div className="flex flex-col gap-4">
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

                    <div className="flex flex-wrap items-center gap-2">
                        {eventFilters.map((filter) => (
                            <Button
                                key={filter.value}
                                variant={eventFilter === filter.value ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => setEventFilter(filter.value)}
                                className={
                                    eventFilter === filter.value
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

            {/* Webhooks List */}
            <Card className="border-border/50 overflow-hidden">
                <div className="divide-y divide-border/50">
                    {filteredWebhooks.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                                <WebhookIcon className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <h3 className="font-semibold">No webhooks found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing the filters or create a new webhook.
                            </p>
                        </div>
                    ) : (
                        filteredWebhooks.map((webhook) => (
                            <div
                                key={webhook.id}
                                className="p-5 hover:bg-secondary/30 transition-colors"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex flex-wrap items-center gap-3">
                                            <div
                                                className={`h-2 w-2 rounded-full ${getStatusDot(
                                                    webhook.status
                                                )}`}
                                            />

                                            <p className="font-semibold">{webhook.name}</p>

                                            <button
                                                onClick={() => toggleWebhookStatus(webhook)}
                                                className={`rounded-full border px-2 py-1 text-xs capitalize ${getStatusClass(
                                                    webhook.status
                                                )}`}
                                            >
                                                {webhook.status}
                                            </button>

                                            {webhook.lastStatusCode && (
                                                <span className="rounded-full bg-secondary/40 px-2 py-1 text-xs text-muted-foreground">
                                                    HTTP {webhook.lastStatusCode}
                                                </span>
                                            )}
                                        </div>

                                        <p className="font-mono text-sm text-muted-foreground break-all">
                                            {webhook.url}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {webhook.events.map((event) => (
                                                <span
                                                    key={event}
                                                    className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                                                >
                                                    {formatEvent(event)}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                            <span>Last trigger: {webhook.lastTriggered}</span>
                                            <span>Created: {webhook.createdAt}</span>
                                            <button
                                                onClick={() => copySecret(webhook.secret)}
                                                className="text-primary hover:underline"
                                            >
                                                Copy secret
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => testWebhook(webhook)}
                                        >
                                            <Play className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openEditModal(webhook)}
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copySecret(webhook.secret)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteWebhook(webhook.id)}
                                            className="text-red-400 hover:text-red-300"
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

            <WebhookModal
                open={isWebhookModalOpen}
                businessId={currentBusinessId}
                mode={modalMode}
                webhook={selectedWebhook}
                onClose={() => {
                    setIsWebhookModalOpen(false)
                    setSelectedWebhook(null)
                }}
                onSave={saveWebhook}
            />
        </div>
    )
}

export default WebhooksPage
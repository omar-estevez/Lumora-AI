import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Brain,
    Calendar,
    CheckCircle,
    CreditCard,
    Crown,
    Database,
    MessageSquare,
    Phone,
    PlugZap,
    Search,
    Volume2,
    Zap,
} from "lucide-react"

import { currentBusinessId, mockIntegrations } from "@/admin/data/mock"
import type {
    Integration,
    IntegrationCategory,
    IntegrationStatus,
} from "@/admin/types/integration"
import IntegrationModal from "./integration-modal/IntegrationModal"

const categoryFilters: { label: string; value: "all" | IntegrationCategory }[] = [
    { label: "All", value: "all" },
    { label: "Calendar", value: "calendar" },
    { label: "Payments", value: "payments" },
    { label: "Automation", value: "automation" },
    { label: "CRM", value: "crm" },
    { label: "Communication", value: "communication" },
    { label: "AI", value: "ai" },
]

const statusFilters: { label: string; value: "all" | IntegrationStatus }[] = [
    { label: "All Status", value: "all" },
    { label: "Connected", value: "connected" },
    { label: "Available", value: "available" },
    { label: "Upgrade Required", value: "upgrade_required" },
]

const iconMap = {
    google_calendar: Calendar,
    stripe: CreditCard,
    zapier: Zap,
    hubspot: Database,
    slack: MessageSquare,
    twilio: Phone,
    openai: Brain,
    elevenlabs: Volume2,
}

export const IntegrationsPage = () => {
    const [integrations, setIntegrations] = useState<Integration[]>(
        mockIntegrations.filter((item) => item.businessId === currentBusinessId)
    )

    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] =
        useState<"all" | IntegrationCategory>("all")
    const [statusFilter, setStatusFilter] =
        useState<"all" | IntegrationStatus>("all")

    const [selectedIntegration, setSelectedIntegration] =
        useState<Integration | null>(null)
    const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false)

    const filteredIntegrations = useMemo(() => {
        return integrations.filter((integration) => {
            const matchesSearch =
                integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                integration.description.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesCategory =
                categoryFilter === "all" || integration.category === categoryFilter

            const matchesStatus =
                statusFilter === "all" || integration.status === statusFilter

            return matchesSearch && matchesCategory && matchesStatus
        })
    }, [integrations, searchTerm, categoryFilter, statusFilter])

    const connectedCount = integrations.filter(
        (item) => item.status === "connected"
    ).length

    const availableCount = integrations.filter(
        (item) => item.status === "available"
    ).length

    const premiumCount = integrations.filter((item) => item.premium).length

    const openIntegration = (integration: Integration) => {
        setSelectedIntegration(integration)
        setIsIntegrationModalOpen(true)
    }

    const connectIntegration = (integration: Integration) => {
        setIntegrations((current) =>
            current.map((item) =>
                item.id === integration.id
                    ? {
                        ...item,
                        status: "connected",
                        connectedAt: "Just now",
                    }
                    : item
            )
        )
    }

    const disconnectIntegration = (integration: Integration) => {
        setIntegrations((current) =>
            current.map((item) =>
                item.id === integration.id
                    ? {
                        ...item,
                        status: "available",
                        connectedAt: undefined,
                    }
                    : item
            )
        )
    }

    const getStatusClass = (status: IntegrationStatus) => {
        if (status === "connected") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        if (status === "upgrade_required") {
            return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        }

        return "bg-secondary text-muted-foreground border-border/50"
    }

    const getStatusLabel = (status: IntegrationStatus) => {
        if (status === "upgrade_required") return "Scale"
        return status.replace("_", " ")
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold">Integrations</h2>
                <p className="text-sm text-muted-foreground">
                    Connect Lumora with your calendar, payments, CRM, messaging, and AI tools.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">
                        {connectedCount}
                    </p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <PlugZap className="h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Available</p>
                    </div>
                    <p className="text-3xl font-bold">{availableCount}</p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <Crown className="h-4 w-4 text-amber-400" />
                        <p className="text-sm text-muted-foreground">Premium</p>
                    </div>
                    <p className="text-3xl font-bold text-amber-400">{premiumCount}</p>
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
                            placeholder="Search integrations..."
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {categoryFilters.map((filter) => (
                            <Button
                                key={filter.value}
                                variant={categoryFilter === filter.value ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => setCategoryFilter(filter.value)}
                                className={
                                    categoryFilter === filter.value
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

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredIntegrations.map((integration) => {
                    const Icon =
                        iconMap[integration.providerKey as keyof typeof iconMap] || PlugZap

                    const isConnected = integration.status === "connected"
                    const isUpgradeRequired = integration.status === "upgrade_required"

                    return (
                        <Card
                            key={integration.id}
                            className={`border-border/50 p-5 ${integration.premium
                                ? "bg-linear-to-r from-amber-500/5 to-transparent"
                                : ""
                                }`}
                        >
                            <div className="mb-5 flex items-start justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>

                                <div className="flex items-center gap-2">
                                    {integration.premium && (
                                        <Crown className="h-4 w-4 text-amber-400" />
                                    )}

                                    <span
                                        className={`rounded-full border px-2 py-1 text-xs capitalize ${getStatusClass(
                                            integration.status
                                        )}`}
                                    >
                                        {getStatusLabel(integration.status)}
                                    </span>
                                </div>
                            </div>

                            <h3 className="mb-1 font-semibold">{integration.name}</h3>

                            <p className="mb-4 text-sm text-muted-foreground">
                                {integration.description}
                            </p>

                            {integration.connectedAt && (
                                <p className="mb-4 text-xs text-muted-foreground">
                                    Connected: {integration.connectedAt}
                                </p>
                            )}

                            <Button
                                variant={isConnected ? "outline" : "default"}
                                size="sm"
                                className="w-full"
                                onClick={() => openIntegration(integration)}
                            >
                                {isUpgradeRequired
                                    ? "Upgrade to Scale"
                                    : isConnected
                                        ? "Configure"
                                        : "Connect"}
                            </Button>
                        </Card>
                    )
                })}
            </div>

            {filteredIntegrations.length === 0 && (
                <Card className="border-border/50 p-10 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                        <PlugZap className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <h3 className="font-semibold">No integrations found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Try changing the search, category, or status filters.
                    </p>
                </Card>
            )}

            <IntegrationModal
                open={isIntegrationModalOpen}
                integration={selectedIntegration}
                onClose={() => {
                    setIsIntegrationModalOpen(false)
                    setSelectedIntegration(null)
                }}
                onConnect={connectIntegration}
                onDisconnect={disconnectIntegration}
            />
        </div>
    )
}

export default IntegrationsPage
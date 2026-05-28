import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Plus,
    Workflow,
    ChevronRight,
    MoreVertical,
    Edit3,
    Copy,
    Pause,
    Play,
    Trash2,
    BarChart3,
} from "lucide-react"

import { mockFlows, currentBusinessId } from "@/admin/data/mock"
import CreateFlowModal from "./create-flow/CreateFlowModal"
import type { AIFlow } from "@/admin/types"

export const FlowsPage = () => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [flows, setFlows] = useState<AIFlow[]>(mockFlows.filter((item) => item.businessId === currentBusinessId))

    const getStatusClass = (status: string) => {
        switch (status) {
            case "active":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            case "paused":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
            default:
                return "bg-muted text-muted-foreground border-border"
        }
    }

    const formatTrigger = (trigger: string) => {
        return trigger
            .replaceAll("_", " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase())
    }

    const handleAction = (action: string, flowName: string) => {
        console.log(`${action}: ${flowName}`)
        setOpenMenuId(null)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">AI Flows</h2>
                    <p className="text-muted-foreground">
                        AI-powered automations for conversations, bookings, and follow-ups.
                    </p>
                </div>

                <Button
                    size="sm"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Flow
                </Button>
            </div>

            {/* Workflow Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {flows.map((flow) => (
                    <Card
                        key={flow.id}
                        className="border-border/50 overflow-visible bg-linear-to-r from-primary/5 to-accent/5"
                    >
                        <div className="p-4">
                            {/* Top */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-r from-primary to-accent">
                                        <Workflow className="w-5 h-5" />
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-semibold">{flow.name}</h3>

                                            <span className="px-1.5 py-0.5 text-[10px] bg-primary/20 text-primary rounded font-medium">
                                                AI
                                            </span>

                                            <span
                                                className={`px-2 py-0.5 text-xs rounded-full border capitalize ${getStatusClass(
                                                    flow.status
                                                )}`}
                                            >
                                                {flow.status}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mt-1">
                                            {flow.description}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`w-2 h-2 rounded-full mt-2 ${flow.status === "active"
                                        ? "bg-emerald-400"
                                        : flow.status === "paused"
                                            ? "bg-yellow-400"
                                            : "bg-muted-foreground"
                                        }`}
                                />
                            </div>

                            {/* Flow details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                                <div className="rounded-lg border border-border/50 bg-background/40 p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Trigger</p>
                                    <p className="text-sm font-medium">{formatTrigger(flow.trigger)}</p>
                                </div>

                                <div className="rounded-lg border border-border/50 bg-background/40 p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Goal</p>
                                    <p className="text-sm font-medium line-clamp-1">{flow.goal}</p>
                                </div>

                                <div className="rounded-lg border border-border/50 bg-background/40 p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Last Run</p>
                                    <p className="text-sm font-medium">{flow.lastRun}</p>
                                </div>
                            </div>

                            {/* Channels */}
                            <div className="mb-4">
                                <p className="text-xs text-muted-foreground mb-2">Channels</p>

                                <div className="flex flex-wrap gap-2">
                                    {flow.channels.map((channel) => (
                                        <span
                                            key={channel}
                                            className="px-2 py-1 text-xs rounded-full bg-secondary/50 border border-border/50 capitalize"
                                        >
                                            {channel === "webchat" ? "Web Chat" : channel}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Mini flow visualization */}
                            <div className="flex items-center gap-1 mb-4 px-2 py-3 rounded-lg bg-background/50 border border-border/50">
                                {Array.from({ length: Math.min(flow.nodes, 6) }).map((_, i) => (
                                    <div key={i} className="flex items-center">
                                        <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] bg-primary/20 text-primary">
                                            {i + 1}
                                        </div>

                                        {i < Math.min(flow.nodes, 6) - 1 && (
                                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                                        )}
                                    </div>
                                ))}

                                {flow.nodes > 6 && (
                                    <span className="text-xs text-muted-foreground">
                                        +{flow.nodes - 6}
                                    </span>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">
                                            {flow.runs.toLocaleString()}
                                        </span>
                                        <span className="text-muted-foreground ml-1">runs</span>
                                    </div>

                                    <div>
                                        <span className="font-medium text-emerald-400">
                                            {flow.conversionRate}%
                                        </span>
                                        <span className="text-muted-foreground ml-1">
                                            conversion
                                        </span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setOpenMenuId(openMenuId === flow.id ? null : flow.id)
                                        }
                                    >
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>

                                    {openMenuId === flow.id && (
                                        <div className="absolute right-0 top-9 z-50 w-48 rounded-lg border border-border/60 bg-background shadow-xl overflow-hidden">
                                            <button
                                                onClick={() => handleAction("Edit Flow", flow.name)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                            >
                                                <Edit3 className="w-4 h-4 text-primary" />
                                                Edit Flow
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleAction(
                                                        flow.status === "active" ? "Pause Flow" : "Activate Flow",
                                                        flow.name
                                                    )
                                                }
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                            >
                                                {flow.status === "active" ? (
                                                    <Pause className="w-4 h-4 text-yellow-400" />
                                                ) : (
                                                    <Play className="w-4 h-4 text-emerald-400" />
                                                )}
                                                {flow.status === "active" ? "Pause Flow" : "Activate Flow"}
                                            </button>

                                            <button
                                                onClick={() => handleAction("Duplicate Flow", flow.name)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                            >
                                                <Copy className="w-4 h-4 text-blue-400" />
                                                Duplicate
                                            </button>

                                            <button
                                                onClick={() => handleAction("View Analytics", flow.name)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                            >
                                                <BarChart3 className="w-4 h-4 text-emerald-400" />
                                                View Analytics
                                            </button>

                                            <button
                                                onClick={() => handleAction("Delete Flow", flow.name)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <CreateFlowModal
                open={isCreateModalOpen}
                businessId={currentBusinessId}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={(newFlow) => {
                    setFlows((current) => [newFlow, ...current])
                }}
            />
        </div>
    )
}

export default FlowsPage
import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
    Activity,
    AlertTriangle,
    Brain,
    Calendar,
    Eye,
    FileText,
    MessageSquare,
    Phone,
    Send,
    Users,
} from "lucide-react"

import { currentBusinessId, mockActivities } from "@/admin/data/mock"
import type { AIActivity, AIActivityType } from "@/admin/types/activity"
import ViewActivityModal from "./view-activity/ViewActivityModal"

const activityFilters: { label: string; value: "all" | AIActivityType }[] = [
    { label: "All", value: "all" },
    { label: "Bookings", value: "booking" },
    { label: "Responses", value: "response" },
    { label: "Leads", value: "lead" },
    { label: "Voice", value: "voice" },
    { label: "Follow-ups", value: "followup" },
    { label: "Escalations", value: "escalation" },
    { label: "Quotes", value: "quote" },
]

export const ActivityPage = () => {
    const [liveActivityIndex, setLiveActivityIndex] = useState(0)
    const [activeFilter, setActiveFilter] = useState<"all" | AIActivityType>("all")
    const [selectedActivity, setSelectedActivity] = useState<AIActivity | null>(null)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)

    const activities = mockActivities.filter(
        (activity) => activity.businessId === currentBusinessId
    )

    const filteredActivities = useMemo(() => {
        return activities.filter((activity) => {
            return activeFilter === "all" || activity.type === activeFilter
        })
    }, [activities, activeFilter])

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveActivityIndex((prev) =>
                filteredActivities.length > 0
                    ? (prev + 1) % filteredActivities.length
                    : 0
            )
        }, 3000)

        return () => clearInterval(interval)
    }, [filteredActivities.length])

    const getActivityIcon = (type: AIActivityType) => {
        switch (type) {
            case "booking":
                return Calendar
            case "response":
                return MessageSquare
            case "lead":
                return Users
            case "voice":
                return Phone
            case "followup":
                return Send
            case "escalation":
                return AlertTriangle
            case "quote":
                return FileText
            default:
                return Brain
        }
    }

    const getActivityColor = (type: AIActivityType) => {
        switch (type) {
            case "booking":
                return "text-emerald-400"
            case "response":
                return "text-blue-400"
            case "lead":
                return "text-amber-400"
            case "voice":
                return "text-purple-400"
            case "followup":
                return "text-cyan-400"
            case "escalation":
                return "text-red-400"
            case "quote":
                return "text-teal-400"
            default:
                return "text-primary"
        }
    }

    const getStatusClass = (status: AIActivity["status"]) => {
        if (status === "completed") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        if (status === "pending") {
            return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        }

        return "bg-red-500/20 text-red-400 border-red-500/30"
    }

    const openActivity = (activity: AIActivity) => {
        setSelectedActivity(activity)
        setIsViewModalOpen(true)
    }

    const actionsToday = activities.length * 35
    const escalations = activities.filter((item) => item.status === "escalated").length
    const avgConfidence = Math.round(
        activities.reduce((total, item) => total + item.confidence, 0) /
        activities.length
    )

    return (
        <div className="space-y-6">
            {/* AI Activity Hero */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-6">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-primary to-accent flex items-center justify-center">
                                <Brain className="w-8 h-8 text-white" />
                            </div>

                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-1">AI Activity Center</h2>
                            <p className="text-muted-foreground">
                                Real-time monitoring of all AI actions
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50">
                            <p className="text-3xl font-bold text-primary">{actionsToday}</p>
                            <p className="text-sm text-muted-foreground">Actions today</p>
                        </div>

                        <div className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50">
                            <p className="text-3xl font-bold text-emerald-400">{avgConfidence}%</p>
                            <p className="text-sm text-muted-foreground">Avg. confidence</p>
                        </div>

                        <div className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50">
                            <p className="text-3xl font-bold text-amber-400">1.2s</p>
                            <p className="text-sm text-muted-foreground">Resp. time</p>
                        </div>

                        <div className="p-4 rounded-xl bg-background/50 backdrop-blur border border-border/50">
                            <p className="text-3xl font-bold text-purple-400">{escalations}</p>
                            <p className="text-sm text-muted-foreground">Escalations</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                {activityFilters.map((filter) => (
                    <Button
                        key={filter.value}
                        variant={activeFilter === filter.value ? "outline" : "ghost"}
                        size="sm"
                        onClick={() => setActiveFilter(filter.value)}
                        className={
                            activeFilter === filter.value ? "border-primary text-primary" : ""
                        }
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>

            {/* Live Activity Feed */}
            <Card className="border-border/50 overflow-hidden">
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Real-Time Activity Feed</h3>
                    </div>

                    <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full font-medium animate-pulse">
                        Live
                    </span>
                </div>

                <div className="divide-y divide-border/50">
                    {filteredActivities.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                                <Activity className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <h3 className="font-semibold">No activity found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing the activity filter.
                            </p>
                        </div>
                    ) : (
                        filteredActivities.map((activity, index) => {
                            const Icon = getActivityIcon(activity.type)

                            return (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`p-4 hover:bg-secondary/30 transition-colors ${index === liveActivityIndex
                                            ? "bg-primary/5 border-l-2 border-primary"
                                            : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center">
                                            <Icon className={`w-5 h-5 ${getActivityColor(activity.type)}`} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="font-medium">{activity.action}</p>

                                                <span className="px-2 py-0.5 text-xs bg-secondary/50 rounded-full capitalize">
                                                    {activity.type}
                                                </span>

                                                <span
                                                    className={`px-2 py-0.5 text-xs rounded-full border capitalize ${getStatusClass(
                                                        activity.status
                                                    )}`}
                                                >
                                                    {activity.status}
                                                </span>
                                            </div>

                                            <p className="text-sm text-muted-foreground">
                                                {activity.customer} - {activity.details}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-muted-foreground">
                                                {activity.time}
                                            </span>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openActivity(activity)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    )}
                </div>
            </Card>

            <ViewActivityModal
                open={isViewModalOpen}
                activity={selectedActivity}
                onClose={() => {
                    setIsViewModalOpen(false)
                    setSelectedActivity(null)
                }}
            />
        </div>
    )
}

export default ActivityPage
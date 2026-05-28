import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    MessageSquare,
    Phone,
    Calendar,
    Users,
    Plus,
    FileText,
    ArrowUpRight,
    ArrowDownRight,
    Send,
    ExternalLink,
    Activity,
    Brain,
    Target,
    DollarSign,
    Workflow,
    ThumbsUp,
    ThumbsDown,
    Meh,
    AlertTriangle,
    RotateCcw,
    CirclePower,
    Crown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import {
    currentBusinessId,
    mockActivities,
    mockAnalytics,
    mockBookings,
    mockChannels,
    mockConversations,
    mockFlows,
    mockUsage,
} from "@/admin/data/mock"

import type { AIActivityType } from "@/admin/types/activity"

const statIcons = {
    conversations: Brain,
    revenue: DollarSign,
    conversion: Target,
    recovered: RotateCcw,
}

export const MainPage = () => {
    const [liveActivityIndex, setLiveActivityIndex] = useState(0)

    const conversations = mockConversations.filter(
        (item) => item.businessId === currentBusinessId
    )

    const flows = mockFlows.filter((item) => item.businessId === currentBusinessId)

    const bookings = mockBookings.filter(
        (item) => item.businessId === currentBusinessId
    )

    const channels = mockChannels.filter(
        (item) => item.businessId === currentBusinessId
    )

    const activities = mockActivities.filter(
        (item) => item.businessId === currentBusinessId
    )

    const usage = mockUsage.metrics

    const analytics = mockAnalytics.find((item) => item.range === "today") || mockAnalytics[0]

    const intelligentConversations = conversations.slice(0, 4)
    const upcomingBookings = bookings.slice(0, 4)
    const activeFlows = flows.slice(0, 4)

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveActivityIndex((prev) =>
                activities.length > 0 ? (prev + 1) % activities.length : 0
            )
        }, 3000)

        return () => clearInterval(interval)
    }, [activities.length])

    const getChannelStatusIcon = (status: string) => {
        switch (status) {
            case "online":
                return <CirclePower className="w-4 h-4 text-emerald-400" />
            case "upgrade":
                return <CirclePower className="w-4 h-4 text-orange-400" />
            case "not_connected":
                return <CirclePower className="w-4 h-4 text-red-400" />
            default:
                return <CirclePower className="w-4 h-4 text-muted-foreground" />
        }
    }

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "positive":
                return <ThumbsUp className="w-4 h-4 text-emerald-400" />
            case "negative":
                return <ThumbsDown className="w-4 h-4 text-red-400" />
            default:
                return <Meh className="w-4 h-4 text-amber-400" />
        }
    }

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case "high":
                return "bg-red-500/20 text-red-400 border-red-500/30"
            case "medium":
                return "bg-amber-500/20 text-amber-400 border-amber-500/30"
            default:
                return "bg-blue-500/20 text-blue-400 border-blue-500/30"
        }
    }

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

    const getUsagePercentage = (used: number, limit: number) => {
        return Math.min((used / limit) * 100, 100)
    }

    return (
        <div className="space-y-6">
            {/* AI Status Banner */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-4"
            >
                <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-accent/5" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

                <div className="relative flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-primary to-accent flex items-center justify-center">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Lumora AI is active and responding
                            </p>
                            <h2 className="text-lg font-semibold">
                                Your AI assistant is handling conversations across your enabled channels
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 text-sm">
                        {channels.map((channel) => (
                            <div key={channel.id} className="grid justify-items-center">
                                {getChannelStatusIcon(channel.status)}
                                <p className="text-muted-foreground">{channel.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {analytics.stats.map((stat, index) => {
                    const Icon = statIcons[stat.id as keyof typeof statIcons] || Brain

                    return (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                        >
                            <Card className="relative overflow-hidden p-5 border-border/50 bg-linear-to-r from-primary/10 to-accent/5 backdrop-blur-xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-background/50 backdrop-blur flex items-center justify-center border border-border/50">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>

                                        <div
                                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stat.trend === "up"
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-red-500/20 text-red-400"
                                                }`}
                                        >
                                            {stat.trend === "up" ? (
                                                <ArrowUpRight className="w-3 h-3" />
                                            ) : (
                                                <ArrowDownRight className="w-3 h-3" />
                                            )}
                                            {stat.change}
                                        </div>
                                    </div>

                                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {stat.label}
                                    </p>

                                    <div className="flex items-end gap-0.5 h-8">
                                        {[30, 45, 35, 50, 40, 100, 70, 65, 80, 75, 90, 85].map(
                                            (value, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${value}%` }}
                                                    transition={{ delay: 0.4 + i * 0.04 }}
                                                    className="flex-1 bg-primary/30 rounded-sm min-h-[2px]"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Activity */}
                <Card className="lg:col-span-1 border-border/50 overflow-hidden">
                    <div className="p-4 border-b border-border/50 flex items-center justify-between bg-linear-to-r from-primary/5 to-transparent">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Activity className="w-5 h-5 text-primary" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            </div>
                            <h3 className="font-semibold">AI Activity Center</h3>
                        </div>

                        <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full font-medium">
                            Live
                        </span>
                    </div>

                    <div className="divide-y divide-border/50 max-h-120 overflow-y-auto">
                        <AnimatePresence mode="popLayout">
                            {activities.map((activity, index) => {
                                const Icon = getActivityIcon(activity.type)

                                return (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`p-4 hover:bg-secondary/30 transition-colors ${index === liveActivityIndex
                                            ? "bg-primary/5 border-l-2 border-primary"
                                            : ""
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-background/50 border border-border/50 flex items-center justify-center shrink-0">
                                                <Icon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium">{activity.action}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {activity.customer}
                                                </p>
                                                <p className="text-xs text-muted-foreground/70 mt-1">
                                                    {activity.details}
                                                </p>
                                            </div>

                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {activity.time}
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                </Card>

                {/* Intelligent Conversations */}
                <Card className="lg:col-span-2 border-border/50 overflow-hidden">
                    <div className="p-4 border-b border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Workflow className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">Intelligent Conversations</h3>
                        </div>

                        <Button variant="ghost" size="sm">
                            View all
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                    <div className="divide-y divide-border/50">
                        {intelligentConversations.map((conversation) => (
                            <div key={conversation.id} className="p-4 hover:bg-secondary/30">
                                <div className="flex items-start gap-4">
                                    <div className="relative shrink-0">
                                        <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center">
                                            <span className="font-medium">{conversation.avatar}</span>
                                        </div>

                                        {conversation.unread && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center">
                                                !
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-semibold">{conversation.customerName}</p>
                                            <span className="text-xs text-muted-foreground">
                                                {conversation.time}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-2">
                                            {conversation.message}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                                                {conversation.aiInsights.intent}
                                            </span>

                                            <span
                                                className={`px-2 py-1 text-xs rounded-full border ${getUrgencyColor(
                                                    conversation.aiInsights.urgency
                                                )}`}
                                            >
                                                {conversation.aiInsights.urgency === "high"
                                                    ? "High Urgency"
                                                    : conversation.aiInsights.urgency === "medium"
                                                        ? "Medium"
                                                        : "Low"}
                                            </span>

                                            <div className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-secondary/50">
                                                {getSentimentIcon(conversation.aiInsights.sentiment)}
                                                <span className="capitalize">
                                                    {conversation.aiInsights.sentiment}
                                                </span>
                                            </div>

                                            <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400">
                                                Score: {conversation.aiInsights.leadScore}%
                                            </span>
                                        </div>

                                        <div className="p-3 rounded-lg bg-background/40 border border-border/50">
                                            <div className="flex items-center gap-1 text-xs text-primary mb-1">
                                                <Brain className="w-3 h-3" />
                                                <span className="font-medium">AI Summary</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {conversation.aiInsights.aiSummary}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Bookings */}
                <Card className="border-border/50 overflow-hidden">
                    <div className="p-4 border-b border-border/50 flex items-center justify-between">
                        <h3 className="font-semibold">Upcoming Bookings</h3>
                        <Button variant="ghost" size="sm">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="divide-y divide-border/50">
                        {upcomingBookings.map((booking) => (
                            <div key={booking.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{booking.customerName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {booking.serviceName}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {booking.date}, {booking.time}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-medium text-emerald-400">
                                        ${booking.price}
                                    </p>
                                    <span className="text-xs capitalize text-muted-foreground">
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Active AI Flows */}
                <Card className="lg:col-span-2 border-border/50 overflow-hidden">
                    <div className="p-4 border-b border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Workflow className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">Active AI Flows</h3>
                        </div>

                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Plus className="w-4 h-4 mr-2" />
                            New Flow
                        </Button>
                    </div>

                    <div className="divide-y divide-border/50">
                        {activeFlows.map((flow) => (
                            <div key={flow.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <Brain className="w-4 h-4 text-primary" />
                                    </div>

                                    <div>
                                        <p className="font-medium">{flow.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {flow.nodes} nodes · {flow.lastRun}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">
                                        {flow.runs.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">runs</p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-emerald-400">
                                        {flow.conversionRate}%
                                    </p>
                                    <p className="text-xs text-muted-foreground">conversion</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Usage */}
            <Card className="border-border/50">
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">Growth Plan Usage</h3>
                        <p className="text-sm text-muted-foreground">
                            Current monthly usage across your plan limits.
                        </p>
                    </div>

                    <Button variant="outline" size="sm">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade Plan
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5 p-5">
                    {usage.map((metric) => {
                        const percentage = getUsagePercentage(metric.used, metric.limit)

                        return (
                            <div key={metric.id} className="space-y-2">
                                <p className="text-sm text-muted-foreground">{metric.label}</p>

                                <div className="flex items-end justify-between gap-2">
                                    <p className="font-bold">
                                        {metric.used.toLocaleString()}
                                        {metric.unit ? ` ${metric.unit}` : ""}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        / {metric.limit.toLocaleString()}
                                        {metric.unit ? ` ${metric.unit}` : ""}
                                    </p>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full rounded-full ${percentage >= 85 ? "bg-amber-400" : "bg-primary"
                                            }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    {Math.round(percentage)}% used
                                </p>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}

export default MainPage
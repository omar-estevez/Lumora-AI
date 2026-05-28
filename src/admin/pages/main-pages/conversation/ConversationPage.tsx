import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Brain,
    Filter,
    Download,
    Target,
    DollarSign,
    Eye,
    MoreVertical,
    Globe,
    Mail,
    Meh,
    MessageCircle,
    MessageSquare,
    Phone,
    Smartphone,
    ThumbsDown,
    ThumbsUp,
    CheckCircle,
    UserCheck,
    CalendarPlus,
    Reply,
} from "lucide-react"

import {
    currentBusinessId,
    mockChannels,
    mockConversations,
} from "@/admin/data/mock"

import type { ChannelType } from "@/admin/types/channel"
import type { Conversation, ConversationStatus } from "@/admin/types/conversation"
import ConversationFiltersPanel, { defaultConversationAdvancedFilters, type ConversationAdvancedFilters } from "./filter-panel/ConversationFiltersPanel"

export const ConversationPage = () => {
    const [activeStatus, setActiveStatus] =
        useState<"all" | ConversationStatus>("all")

    const [activeChannel, setActiveChannel] =
        useState<"all" | ChannelType>("all")

    const [aiFilterEnabled, setAiFilterEnabled] = useState(false)
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

    const [advancedFilters, setAdvancedFilters] =
        useState<ConversationAdvancedFilters>(
            defaultConversationAdvancedFilters
        )

    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const conversations = mockConversations.filter(
        (conversation) => conversation.businessId === currentBusinessId
    )

    const channels = mockChannels.filter(
        (channel) => channel.businessId === currentBusinessId
    )

    const getChannelIcon = (channel: string) => {
        switch (channel) {
            case "whatsapp":
                return <MessageCircle className="w-4 h-4 text-green-400" />
            case "sms":
                return <Smartphone className="w-4 h-4 text-blue-400" />
            case "webchat":
                return <Globe className="w-4 h-4 text-purple-400" />
            case "voice":
                return <Phone className="w-4 h-4 text-orange-400" />
            case "email":
                return <Mail className="w-4 h-4 text-red-400" />
            default:
                return <MessageSquare className="w-4 h-4" />
        }
    }

    const getChannelName = (channelId: string) => {
        if (channelId === "webchat") return "Web Chat"
        if (channelId === "voice") return "Voice AI"

        return channels.find((channel) => channel.id === channelId)?.name || channelId
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

    const getStatusClass = (status: string) => {
        switch (status) {
            case "resolved":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            case "pending":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
            default:
                return "bg-primary/10 text-primary border-primary/20"
        }
    }

    const filteredConversations = useMemo(() => {
        return conversations.filter((conversation) => {
            const matchesStatus =
                activeStatus === "all" || conversation.status === activeStatus

            const matchesChannel =
                activeChannel === "all" || conversation.channel === activeChannel

            const matchesAiFilter =
                !aiFilterEnabled ||
                conversation.aiInsights.leadScore >= 70 ||
                conversation.aiInsights.purchaseIntent >= 70

            const matchesAdvancedStatus =
                advancedFilters.status === "all" ||
                conversation.status === advancedFilters.status

            const matchesAdvancedChannel =
                advancedFilters.channel === "all" ||
                conversation.channel === advancedFilters.channel

            const matchesAdvancedSentiment =
                advancedFilters.sentiment === "all" ||
                conversation.aiInsights.sentiment === advancedFilters.sentiment

            const matchesAdvancedUrgency =
                advancedFilters.urgency === "all" ||
                conversation.aiInsights.urgency === advancedFilters.urgency

            const matchesLeadScore =
                conversation.aiInsights.leadScore >= advancedFilters.minLeadScore

            const matchesPurchaseIntent =
                conversation.aiInsights.purchaseIntent >=
                advancedFilters.minPurchaseIntent

            const matchesUnread =
                !advancedFilters.unreadOnly || conversation.unread

            return (
                matchesStatus &&
                matchesChannel &&
                matchesAiFilter &&
                matchesAdvancedStatus &&
                matchesAdvancedChannel &&
                matchesAdvancedSentiment &&
                matchesAdvancedUrgency &&
                matchesLeadScore &&
                matchesPurchaseIntent &&
                matchesUnread
            )
        })
    }, [
        conversations,
        activeStatus,
        activeChannel,
        aiFilterEnabled,
        advancedFilters,
    ])

    const exportConversations = () => {
        const headers = [
            "Customer",
            "Channel",
            "Status",
            "Message",
            "Intent",
            "Sentiment",
            "Urgency",
            "Lead Score",
            "Purchase Intent",
            "AI Summary",
            "Suggested Action",
        ]

        const rows = filteredConversations.map((conversation) => [
            conversation.customerName,
            getChannelName(conversation.channel),
            conversation.status,
            conversation.message,
            conversation.aiInsights.intent,
            conversation.aiInsights.sentiment,
            conversation.aiInsights.urgency,
            `${conversation.aiInsights.leadScore}%`,
            `${conversation.aiInsights.purchaseIntent}%`,
            conversation.aiInsights.aiSummary,
            conversation.aiInsights.suggestedAction,
        ])

        const csvContent = [headers, ...rows]
            .map((row) =>
                row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
            )
            .join("\n")

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")

        link.href = url
        link.download = "lumora-conversations.csv"
        link.click()

        URL.revokeObjectURL(url)
    }

    const handleMenuAction = (action: string, conversation: Conversation) => {
        console.log(`${action}:`, conversation)
        setOpenMenuId(null)
    }

    const resetAllFilters = () => {
        setAdvancedFilters(defaultConversationAdvancedFilters)
    }

    return (
        <div className="space-y-6">
            {/* Top Filters */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        {[
                            { id: "all", label: "All" },
                            { id: "active", label: "Active" },
                            { id: "pending", label: "Pending" },
                            { id: "resolved", label: "Resolved" },
                        ].map((tab) => (
                            <Button
                                key={tab.id}
                                variant={activeStatus === tab.id ? "outline" : "ghost"}
                                size="sm"
                                onClick={() =>
                                    setActiveStatus(tab.id as "all" | ConversationStatus)
                                }
                                className={
                                    activeStatus === tab.id
                                        ? "border-primary text-primary"
                                        : ""
                                }
                            >
                                {tab.label}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant={aiFilterEnabled ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAiFilterEnabled((current) => !current)}
                        >
                            <Brain className="w-4 h-4 mr-2" />
                            AI Filter
                        </Button>

                        <Button
                            variant={showAdvancedFilters ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowAdvancedFilters((current) => !current)}
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </Button>

                        <Button variant="outline" size="sm" onClick={exportConversations}>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Channel Legend + Channel Filter */}
                <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
                    <button
                        onClick={() => setActiveChannel("all")}
                        className={`flex items-center gap-1.5 transition-colors ${activeChannel === "all" ? "text-primary" : "hover:text-primary"
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>All Channels</span>
                    </button>

                    {channels.map((channel) => (
                        <button
                            key={channel.id}
                            onClick={() => setActiveChannel(channel.id)}
                            className={`flex items-center gap-1.5 transition-colors ${activeChannel === channel.id
                                ? "text-primary"
                                : "hover:text-primary"
                                }`}
                        >
                            {getChannelIcon(channel.id)}
                            <span>{channel.name}</span>
                        </button>
                    ))}
                </div>

                <ConversationFiltersPanel
                    open={showAdvancedFilters}
                    filters={advancedFilters}
                    onChange={setAdvancedFilters}
                    onReset={resetAllFilters}
                />
            </div>

            {/* Conversations List */}
            <Card className="border-border/50 overflow-visible">
                <div className="divide-y divide-border/50">
                    {filteredConversations.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <h3 className="font-semibold">No conversations found</h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing the status, channel, or advanced filters.
                            </p>
                        </div>
                    ) : (
                        filteredConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className="p-4 lg:p-5 hover:bg-secondary/30 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="relative shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                                            <span className="font-medium">
                                                {conversation.avatar}
                                            </span>
                                        </div>

                                        {conversation.unread && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] text-white">
                                                !
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Header */}
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="font-semibold">
                                                {conversation.customerName}
                                            </span>

                                            <span title={getChannelName(conversation.channel)}>
                                                {getChannelIcon(conversation.channel)}
                                            </span>

                                            <span className="text-xs text-muted-foreground">•</span>

                                            <span className="text-xs text-muted-foreground">
                                                {conversation.time}
                                            </span>

                                            <span
                                                className={`text-xs px-2 py-0.5 rounded-full border capitalize ${getStatusClass(
                                                    conversation.status
                                                )}`}
                                            >
                                                {conversation.status}
                                            </span>
                                        </div>

                                        {/* Message */}
                                        <p className="text-muted-foreground mb-3">
                                            {conversation.message}
                                        </p>

                                        {/* AI Insights Row */}
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
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
                                                {getSentimentIcon(
                                                    conversation.aiInsights.sentiment
                                                )}
                                                <span className="capitalize">
                                                    {conversation.aiInsights.sentiment}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400">
                                                <Target className="w-3 h-3" />
                                                <span>
                                                    Lead: {conversation.aiInsights.leadScore}%
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                                                <DollarSign className="w-3 h-3" />
                                                <span>
                                                    Purchase:{" "}
                                                    {conversation.aiInsights.purchaseIntent}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* AI Summary + Suggested Action */}
                                        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3">
                                            <div className="p-3 rounded-lg bg-linear-to-r from-primary/5 to-accent/5 border border-border/50">
                                                <div className="flex items-center gap-1 text-xs text-primary mb-1">
                                                    <Brain className="w-3 h-3" />
                                                    <span className="font-medium">AI Summary</span>
                                                </div>

                                                <p className="text-sm text-muted-foreground">
                                                    {conversation.aiInsights.aiSummary}
                                                </p>
                                            </div>

                                            <div className="p-3 rounded-lg bg-secondary/20 border border-border/50">
                                                <div className="flex items-center gap-1 text-xs text-emerald-400 mb-1">
                                                    <Target className="w-3 h-3" />
                                                    <span className="font-medium">
                                                        Suggested Action
                                                    </span>
                                                </div>

                                                <p className="text-sm text-muted-foreground">
                                                    {conversation.aiInsights.suggestedAction}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Actions */}
                                    <div className="relative flex items-center gap-2 shrink-0">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleMenuAction("View Conversation", conversation)
                                            }
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                setOpenMenuId(
                                                    openMenuId === conversation.id
                                                        ? null
                                                        : conversation.id
                                                )
                                            }
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>

                                        {openMenuId === conversation.id && (
                                            <div className="absolute right-0 top-9 z-50 w-48 rounded-lg border border-border/60 bg-background shadow-xl overflow-hidden">
                                                <button
                                                    onClick={() =>
                                                        handleMenuAction("Reply", conversation)
                                                    }
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                >
                                                    <Reply className="w-4 h-4 text-primary" />
                                                    Reply
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleMenuAction("Take Over", conversation)
                                                    }
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                >
                                                    <UserCheck className="w-4 h-4 text-amber-400" />
                                                    Take Over
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleMenuAction("Create Booking", conversation)
                                                    }
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                >
                                                    <CalendarPlus className="w-4 h-4 text-emerald-400" />
                                                    Create Booking
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleMenuAction("Mark Resolved", conversation)
                                                    }
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                >
                                                    <CheckCircle className="w-4 h-4 text-blue-400" />
                                                    Mark Resolved
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    )
}

export default ConversationPage
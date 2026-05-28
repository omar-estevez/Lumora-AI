import { Button } from "@/components/ui/button"
import type { ChannelType } from "@/admin/types/channel"
import type {
    ConversationStatus,
    Sentiment,
    Urgency,
} from "@/admin/types/conversation"

export interface ConversationAdvancedFilters {
    sentiment: "all" | Sentiment
    urgency: "all" | Urgency
    minLeadScore: number
    minPurchaseIntent: number
    unreadOnly: boolean
    channel: "all" | ChannelType
    status: "all" | ConversationStatus
}

interface ConversationFiltersPanelProps {
    open: boolean
    filters: ConversationAdvancedFilters
    onChange: (filters: ConversationAdvancedFilters) => void
    onReset: () => void
}

export const defaultConversationAdvancedFilters: ConversationAdvancedFilters = {
    sentiment: "all",
    urgency: "all",
    minLeadScore: 0,
    minPurchaseIntent: 0,
    unreadOnly: false,
    channel: "all",
    status: "all",
}

const sentimentOptions: { label: string; value: ConversationAdvancedFilters["sentiment"] }[] = [
    { label: "All Sentiments", value: "all" },
    { label: "Positive", value: "positive" },
    { label: "Neutral", value: "neutral" },
    { label: "Negative", value: "negative" },
]

const urgencyOptions: { label: string; value: ConversationAdvancedFilters["urgency"] }[] = [
    { label: "All Urgency", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
]

// const statusOptions: { label: string; value: ConversationAdvancedFilters["status"] }[] = [
//     { label: "All Statuses", value: "all" },
//     { label: "Active", value: "active" },
//     { label: "Pending", value: "pending" },
//     { label: "Resolved", value: "resolved" },
// ]

// const channelOptions: { label: string; value: ConversationAdvancedFilters["channel"] }[] = [
//     { label: "All Channels", value: "all" },
//     { label: "WhatsApp", value: "whatsapp" },
//     { label: "SMS", value: "sms" },
//     { label: "Web Chat", value: "webchat" },
//     { label: "Voice AI", value: "voice" },
//     { label: "Email", value: "email" },
// ]

export const ConversationFiltersPanel = ({
    open,
    filters,
    onChange,
    onReset,
}: ConversationFiltersPanelProps) => {
    if (!open) return null

    return (
        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h4 className="font-semibold">Advanced Filters</h4>
                    <p className="text-sm text-muted-foreground">
                        Narrow conversations by channel, status, urgency, sentiment, and AI scores.
                    </p>
                </div>

                <Button variant="ghost" size="sm" onClick={onReset}>
                    Reset
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
                {/* <div>
                    <label className="mb-2 block text-sm font-medium">Status</label>
                    <select
                        value={filters.status}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                status: event.target.value as ConversationAdvancedFilters["status"],
                            })
                        }
                        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Channel</label>
                    <select
                        value={filters.channel}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                channel: event.target.value as ConversationAdvancedFilters["channel"],
                            })
                        }
                        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                        {channelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div> */}

                <div>
                    <label className="mb-2 block text-sm font-medium">Sentiment</label>
                    <select
                        value={filters.sentiment}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                sentiment: event.target.value as ConversationAdvancedFilters["sentiment"],
                            })
                        }
                        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                        {sentimentOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Urgency</label>
                    <select
                        value={filters.urgency}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                urgency: event.target.value as ConversationAdvancedFilters["urgency"],
                            })
                        }
                        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                        {urgencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Min Lead: {filters.minLeadScore}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.minLeadScore}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                minLeadScore: Number(event.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Min Purchase: {filters.minPurchaseIntent}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.minPurchaseIntent}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                minPurchaseIntent: Number(event.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() =>
                        onChange({
                            ...filters,
                            unreadOnly: !filters.unreadOnly,
                        })
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${filters.unreadOnly
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border/60 bg-background text-muted-foreground hover:text-primary"
                        }`}
                >
                    Unread only
                </button>
            </div>
        </div>
    )
}

export default ConversationFiltersPanel
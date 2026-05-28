import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Brain,
    DollarSign,
    RotateCcw,
    Target,
    MessageCircle,
    BarChart3,
    Workflow,
} from "lucide-react"
import { mockAnalytics } from "@/admin/data/mock"
import type { AnalyticsRange } from "@/admin/types/analytics"

const rangeButtons: { label: string; value: AnalyticsRange }[] = [
    { label: "Today", value: "today" },
    { label: "7 days", value: "7d" },
    { label: "30 days", value: "30d" },
    { label: "90 days", value: "90d" },
]

const statIcons = {
    conversations: Brain,
    revenue: DollarSign,
    conversion: Target,
    recovered: RotateCcw,
}

export const AnalyticsPage = () => {
    const [activeRange, setActiveRange] = useState<AnalyticsRange>("today")

    const analytics = useMemo(() => {
        return (
            mockAnalytics.find((item) => item.range === activeRange) ||
            mockAnalytics[0]
        )
    }, [activeRange])

    const maxConversationValue = Math.max(
        ...analytics.conversationsByHour.map((item) => item.conversations)
    )

    const exportReport = () => {
        const rows = [
            ["Metric", "Value", "Change"],
            ...analytics.stats.map((stat) => [stat.label, stat.value, stat.change]),
        ]

        const csvContent = rows.map((row) => row.join(",")).join("\n")
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")

        link.href = url
        link.download = `lumora-analytics-${activeRange}.csv`
        link.click()

        URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-6">
            {/* Date Range */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {rangeButtons.map((range) => (
                        <Button
                            key={range.value}
                            variant={activeRange === range.value ? "outline" : "ghost"}
                            size="sm"
                            onClick={() => setActiveRange(range.value)}
                            className={
                                activeRange === range.value ? "border-primary text-primary" : ""
                            }
                        >
                            {range.label}
                        </Button>
                    ))}
                </div>

                <Button variant="outline" size="sm" onClick={exportReport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </div>

            {/* AI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {analytics.stats.map((stat) => {
                    const Icon = statIcons[stat.id as keyof typeof statIcons] || Brain

                    return (
                        <Card key={stat.id} className="p-5 border-border/50">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="text-3xl font-bold mt-1">{stat.value}</p>

                                    <div
                                        className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                                            }`}
                                    >
                                        {stat.trend === "up" ? (
                                            <ArrowUpRight className="w-4 h-4" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4" />
                                        )}
                                        {stat.change}
                                    </div>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </div>

                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Conversations Chart */}
                <Card className="border-border/50">
                    <div className="p-4 border-b border-border/50">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold">Conversations by Time</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            AI-handled conversations during the selected period.
                        </p>
                    </div>

                    <div className="p-5">
                        <div className="flex h-64 items-end gap-3">
                            {analytics.conversationsByHour.map((item) => {
                                const height = (item.conversations / maxConversationValue) * 100

                                return (
                                    <div
                                        key={item.hour}
                                        className="flex flex-1 flex-col items-center gap-2"
                                    >
                                        <div className="flex h-48 w-full items-end rounded-lg bg-secondary/30 px-1">
                                            <div
                                                className="w-full rounded-md bg-primary/70 hover:bg-primary transition-colors"
                                                style={{ height: `${height}%` }}
                                            />
                                        </div>

                                        <span className="text-xs text-muted-foreground">
                                            {item.hour}
                                        </span>

                                        <span className="text-xs font-medium">
                                            {item.conversations}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Card>

                {/* Channel Distribution */}
                <Card className="border-border/50">
                    <div className="p-4 border-b border-border/50">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold">Channel Distribution</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Where customer conversations are coming from.
                        </p>
                    </div>

                    <div className="space-y-4 p-5">
                        {analytics.channelDistribution.map((channel) => (
                            <div key={channel.channel} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{channel.channel}</span>

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-muted-foreground">
                                            {channel.value.toLocaleString()}
                                        </span>
                                        <span className="text-sm font-semibold">
                                            {channel.percentage}%
                                        </span>
                                    </div>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: `${channel.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Extra Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Flows */}
                <Card className="border-border/50">
                    <div className="p-4 border-b border-border/50">
                        <div className="flex items-center gap-2">
                            <Workflow className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold">Top Performing AI Flows</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Flows with the strongest automation performance.
                        </p>
                    </div>

                    <div className="divide-y divide-border/50">
                        {analytics.topFlows.map((flow) => (
                            <div
                                key={flow.name}
                                className="flex items-center justify-between p-4"
                            >
                                <div>
                                    <p className="font-medium">{flow.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {flow.runs.toLocaleString()} runs
                                    </p>
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

                {/* AI Insights */}
                <Card className="border-border/50">
                    <div className="p-4 border-b border-border/50">
                        <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold">AI Insights</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Key recommendations based on current activity.
                        </p>
                    </div>

                    <div className="space-y-3 p-5">
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <p className="font-medium text-emerald-400">
                                WhatsApp is your strongest channel
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                It is generating the highest conversation volume and should stay
                                prioritized in follow-up flows.
                            </p>
                        </div>

                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                            <p className="font-medium text-primary">
                                Booking flows are converting well
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Multi-Channel Booking is outperforming other automations with a
                                strong conversion rate.
                            </p>
                        </div>

                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                            <p className="font-medium text-amber-400">
                                Follow-up opportunities detected
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Warm leads should receive a limited-time offer within the next
                                24 hours.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AnalyticsPage
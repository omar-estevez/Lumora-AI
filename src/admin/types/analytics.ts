export type AnalyticsRange = "today" | "7d" | "30d" | "90d"

export interface AnalyticsStat {
    id: string
    label: string
    value: string
    change: string
    trend: "up" | "down"
    description: string
}

export interface HourlyConversation {
    hour: string
    conversations: number
}

export interface ChannelAnalytics {
    channel: string
    value: number
    percentage: number
}

export interface FlowPerformance {
    name: string
    runs: number
    conversionRate: number
}

export interface AnalyticsData {
    range: AnalyticsRange
    stats: AnalyticsStat[]
    conversationsByHour: HourlyConversation[]
    channelDistribution: ChannelAnalytics[]
    topFlows: FlowPerformance[]
}
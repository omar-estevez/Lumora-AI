import type { ChannelType } from "./channel"

export type FlowStatus = "active" | "paused" | "draft"

export type FlowTrigger =
    | "new_message"
    | "missed_call"
    | "new_lead"
    | "booking_created"
    | "no_response"
    | "manual"

export interface AIFlow {
    id: string
    businessId: string
    name: string
    description: string
    status: FlowStatus
    trigger: FlowTrigger
    goal: string
    channels: ChannelType[]
    nodes: number
    runs: number
    conversionRate: number
    lastRun: string
}
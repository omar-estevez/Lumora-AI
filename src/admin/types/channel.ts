export type ChannelType = "whatsapp" | "sms" | "webchat" | "voice" | "email"

export type ChannelStatus = "online" | "offline" | "upgrade" | "not_connected"

export interface Channel {
    id: ChannelType
    businessId: string
    name: string
    status: ChannelStatus
    enabled: boolean
    connected: boolean
}
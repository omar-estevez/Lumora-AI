export type VoiceCallStatus = "completed" | "missed" | "failed"

export type VoiceSentiment = "positive" | "neutral" | "negative" | null

export interface VoiceCall {
    id: string
    businessId: string
    customer: string
    phone: string
    duration: string
    status: VoiceCallStatus
    sentiment: VoiceSentiment
    aiSummary: string | null
    transcript: boolean
    transcriptText?: string
    recordingUrl?: string
    time: string
}
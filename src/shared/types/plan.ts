export type PlanId = "starter" | "growth" | "scale"

export interface Plan {
    id: PlanId
    name: string
    price: number
    description: string
    popular?: boolean
    features: string[]
    limits: {
        messages: number | "unlimited"
        voiceMinutes: number | "unlimited"
        users: number | "unlimited"
        aiCredits: number | "unlimited"
        automations: number | "unlimited"
        storageGB: number | "unlimited"
        connectedChannels: number | "unlimited"
    }
}
export type IntegrationStatus = "connected" | "available" | "upgrade_required"

export type IntegrationCategory =
    | "calendar"
    | "payments"
    | "automation"
    | "crm"
    | "communication"
    | "ai"

export interface Integration {
    id: string
    businessId: string
    name: string
    description: string
    status: IntegrationStatus
    category: IntegrationCategory
    premium?: boolean
    providerKey: string
    connectedAt?: string
}
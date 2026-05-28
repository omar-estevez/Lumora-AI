export type ApiKeyEnvironment = "live" | "test"

export type ApiKeyStatus = "active" | "revoked"

export type ApiKeyPermission =
    | "read:leads"
    | "write:leads"
    | "read:conversations"
    | "write:conversations"
    | "read:bookings"
    | "write:bookings"
    | "read:analytics"

export interface ApiKey {
    id: string
    businessId: string
    name: string
    key: string
    environment: ApiKeyEnvironment
    status: ApiKeyStatus
    permissions: ApiKeyPermission[]
    createdAt: string
    lastUsed: string
}
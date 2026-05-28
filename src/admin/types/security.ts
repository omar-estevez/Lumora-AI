export type SecuritySessionStatus = "current" | "active"

export interface SecuritySession {
    id: string
    businessId: string
    device: string
    browser: string
    location: string
    ipAddress: string
    lastActive: string
    status: SecuritySessionStatus
}

export type SecurityActivityType =
    | "login"
    | "settings"
    | "api_key"
    | "password"
    | "session"
    | "two_factor"

export interface SecurityActivity {
    id: string
    businessId: string
    type: SecurityActivityType
    action: string
    time: string
    ipAddress: string
    location: string
}
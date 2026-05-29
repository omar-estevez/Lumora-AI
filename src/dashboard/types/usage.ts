import type { LucideProps } from "lucide-react"
import type { ForwardRefExoticComponent } from "react"

export interface UsageMetric {
    id: string
    label: string
    used: number
    limit: number
    unit?: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>
}

export interface BusinessUsage {
    businessId: string
    plan: "starter" | "growth" | "scale"
    metrics: UsageMetric[]
}
import type { LeadStatus, LeadTemperature } from "@/admin/types/lead"
import type { ChannelType } from "@/admin/types/channel"
import { Button } from "@/components/ui/button"

export interface LeadAdvancedFilters {
    status: "all" | LeadStatus
    source: "all" | ChannelType
    minScore: number
    minValue: number
}

interface LeadFiltersPanelProps {
    open: boolean
    filters: LeadAdvancedFilters
    onChange: (filters: LeadAdvancedFilters) => void
    onReset: () => void
}

const statusOptions: { label: string; value: "all" | LeadStatus }[] = [
    { label: "All Statuses", value: "all" },
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Follow Up", value: "follow_up" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
]

const sourceOptions: { label: string; value: "all" | ChannelType }[] = [
    { label: "All Sources", value: "all" },
    { label: "WhatsApp", value: "whatsapp" },
    { label: "SMS", value: "sms" },
    { label: "Web Chat", value: "webchat" },
    { label: "Voice AI", value: "voice" },
    { label: "Email", value: "email" },
]

export const defaultLeadAdvancedFilters: LeadAdvancedFilters = {
    status: "all",
    source: "all",
    minScore: 0,
    minValue: 0,
}

export const LeadFiltersPanel = ({
    open,
    filters,
    onChange,
    onReset,
}: LeadFiltersPanelProps) => {
    if (!open) return null

    return (
        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h4 className="font-semibold">Advanced Filters</h4>
                    <p className="text-sm text-muted-foreground">
                        Narrow leads by source, status, score, and value.
                    </p>
                </div>

                <Button variant="ghost" size="sm" onClick={onReset}>
                    Reset
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div>
                    <label className="mb-2 block text-sm font-medium">Status</label>
                    <select
                        value={filters.status}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                status: event.target.value as LeadAdvancedFilters["status"],
                            })
                        }
                        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Source</label>
                    <select
                        value={filters.source}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                source: event.target.value as LeadAdvancedFilters["source"],
                            })
                        }
                        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                        {sourceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Min AI Score: {filters.minScore}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.minScore}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                minScore: Number(event.target.value),
                            })
                        }
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Min Value</label>
                    <input
                        type="number"
                        value={filters.minValue}
                        onChange={(event) =>
                            onChange({
                                ...filters,
                                minValue: Number(event.target.value),
                            })
                        }
                        className="w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                </div>
            </div>
        </div>
    )
}

export default LeadFiltersPanel
import { useMemo, useState } from "react"
import { currentBusinessId, mockLeads } from "@/admin/data/mock"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Flame,
    TrendingUp,
    DollarSign,
    Brain,
    Filter,
    Plus,
    Snowflake,
    MoreVertical,
    Eye,
    UserCheck,
    CalendarPlus,
    CheckCircle,
    Trash2,
} from "lucide-react"
import type { Lead, LeadTemperature } from "@/admin/types/lead"
import LeadFiltersPanel, { defaultLeadAdvancedFilters, type LeadAdvancedFilters } from "./filter-panel/LeadFiltersPanel"
import NewLeadModal from "./create-lead/NewLeadModal"
import ViewLeadModal from "./view-lead/ViewLeadModal"

export const LeadsPage = () => {
    const [temperatureFilter, setTemperatureFilter] = useState<"all" | LeadTemperature>("all")
    const [highScoreOnly, setHighScoreOnly] = useState(false)
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const [isNewLeadOpen, setIsNewLeadOpen] = useState(false)
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [isViewLeadOpen, setIsViewLeadOpen] = useState(false)

    const [leads, setLeads] = useState<Lead[]>(
        mockLeads.filter((item) => item.businessId === currentBusinessId)
    )

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [advancedFilters, setAdvancedFilters] =
        useState<LeadAdvancedFilters>(defaultLeadAdvancedFilters)

    const filteredLeads = useMemo(() => {
        return leads.filter((lead) => {
            const matchesTemperature =
                temperatureFilter === "all" || lead.temperature === temperatureFilter

            const matchesScore = !highScoreOnly || lead.aiScore >= 70

            const matchesAdvancedStatus =
                advancedFilters.status === "all" || lead.status === advancedFilters.status

            const matchesAdvancedSource =
                advancedFilters.source === "all" || lead.source === advancedFilters.source

            const matchesAdvancedScore = lead.aiScore >= advancedFilters.minScore

            const matchesAdvancedValue = lead.value >= advancedFilters.minValue

            return (
                matchesTemperature &&
                matchesScore &&
                matchesAdvancedStatus &&
                matchesAdvancedSource &&
                matchesAdvancedScore &&
                matchesAdvancedValue
            )
        })
    }, [leads, temperatureFilter, highScoreOnly, advancedFilters])

    const totalLeads = leads.length
    const hotLeads = leads.filter((lead) => lead.temperature === "hot").length
    const warmLeads = leads.filter((lead) => lead.temperature === "warm").length
    const totalValue = leads.reduce((total, lead) => total + lead.value, 0)

    const getTemperatureIcon = (temperature: LeadTemperature) => {
        if (temperature === "hot") return <Flame className="w-3 h-3" />
        if (temperature === "warm") return <TrendingUp className="w-3 h-3" />
        return <Snowflake className="w-3 h-3" />
    }

    const getTemperatureClass = (temperature: LeadTemperature) => {
        if (temperature === "hot") return "bg-red-500/20 text-red-400 border-red-500/30"
        if (temperature === "warm") return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return "bg-emerald-400"
        if (score >= 50) return "bg-amber-400"
        return "bg-red-400"
    }

    const formatSource = (source: string) => {
        if (source === "webchat") return "Web Chat"
        if (source === "whatsapp") return "WhatsApp"
        if (source === "sms") return "SMS"
        if (source === "voice") return "Voice AI"
        if (source === "email") return "Email"
        return source
    }

    const handleAction = (action: string, lead: Lead) => {
        console.log(`${action}:`, lead)
        setOpenMenuId(null)
    }

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="p-5 border-border/50">
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-3xl font-bold mt-1">{totalLeads}</p>
                </Card>

                <Card className="p-5 border-border/50 bg-linear-to-r from-red-500/5 to-transparent">
                    <div className="flex items-center gap-2 mb-1">
                        <Flame className="w-4 h-4 text-red-400" />
                        <p className="text-sm text-muted-foreground">Hot Leads</p>
                    </div>
                    <p className="text-3xl font-bold text-red-400">{hotLeads}</p>
                </Card>

                <Card className="p-5 border-border/50 bg-linear-to-r from-amber-500/5 to-transparent">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        <p className="text-sm text-muted-foreground">Warm Leads</p>
                    </div>
                    <p className="text-3xl font-bold text-amber-400">{warmLeads}</p>
                </Card>

                <Card className="p-5 border-border/50 bg-linear-to-r from-emerald-500/5 to-transparent">
                    <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Pipeline Value</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">
                        ${totalValue.toLocaleString()}
                    </p>
                </Card>
            </div>

            {/* Leads Table */}
            <Card className="border-border/50 overflow-visible">
                <div className="p-4 border-b border-border/50 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="font-semibold">Lead Management</h3>
                        <p className="text-sm text-muted-foreground">
                            Track, qualify, and convert AI-captured leads.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {[
                            { id: "all", label: "All" },
                            { id: "hot", label: "Hot" },
                            { id: "warm", label: "Warm" },
                            { id: "cold", label: "Cold" },
                        ].map((filter) => (
                            <Button
                                key={filter.id}
                                variant={temperatureFilter === filter.id ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => setTemperatureFilter(filter.id as "all" | LeadTemperature)}
                                className={temperatureFilter === filter.id ? "border-primary text-primary" : ""}
                            >
                                {filter.label}
                            </Button>
                        ))}

                        <Button
                            variant={highScoreOnly ? "default" : "outline"}
                            size="sm"
                            onClick={() => setHighScoreOnly((current) => !current)}
                        >
                            <Brain className="w-4 h-4 mr-2" />
                            AI Score
                        </Button>

                        <Button
                            variant={showAdvancedFilters ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowAdvancedFilters((current) => !current)}
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </Button>

                        <Button
                            size="sm"
                            onClick={() => setIsNewLeadOpen(true)}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Lead
                        </Button>
                    </div>
                </div>

                <div className="px-4 pb-4">
                    <LeadFiltersPanel
                        open={showAdvancedFilters}
                        filters={advancedFilters}
                        onChange={setAdvancedFilters}
                        onReset={() => setAdvancedFilters(defaultLeadAdvancedFilters)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-sm text-muted-foreground border-b border-border/50">
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Contact</th>
                                <th className="text-left p-4">Source</th>
                                <th className="text-left p-4">Temperature</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">AI Score</th>
                                <th className="text-left p-4">Value</th>
                                <th className="text-left p-4">Created</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border/50">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="p-10 text-center">
                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                                            <Brain className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <h3 className="font-semibold">No leads found</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Try changing the lead temperature or AI score filter.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-secondary/30">
                                        <td className="p-4 font-medium">{lead.name}</td>

                                        <td className="p-4">
                                            <p className="text-sm">{lead.email}</p>
                                            <p className="text-xs text-muted-foreground">{lead.phone}</p>
                                        </td>

                                        <td className="p-4">
                                            <span className="text-sm">{formatSource(lead.source)}</span>
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full border flex items-center gap-1 w-fit capitalize ${getTemperatureClass(
                                                    lead.temperature
                                                )}`}
                                            >
                                                {getTemperatureIcon(lead.temperature)}
                                                {lead.temperature}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className="px-2 py-1 text-xs rounded-full bg-secondary/50 border border-border/50 capitalize">
                                                {lead.status.replace("_", " ")}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${getScoreColor(lead.aiScore)}`}
                                                        style={{ width: `${lead.aiScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium">{lead.aiScore}%</span>
                                            </div>
                                        </td>

                                        <td className="p-4 font-medium text-emerald-400">
                                            ${lead.value.toLocaleString()}
                                        </td>

                                        <td className="p-4 text-muted-foreground">{lead.createdAt}</td>

                                        <td className="p-4 text-right">
                                            <div className="relative flex justify-end">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        setOpenMenuId(openMenuId === lead.id ? null : lead.id)
                                                    }
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>

                                                {openMenuId === lead.id && (
                                                    <div className="absolute right-0 top-9 z-50 w-48 rounded-lg border border-border/60 bg-background shadow-xl overflow-hidden">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedLead(lead)
                                                                setIsViewLeadOpen(true)
                                                                setOpenMenuId(null)
                                                            }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                        >
                                                            <Eye className="w-4 h-4 text-primary" />
                                                            View Lead
                                                        </button>

                                                        <button
                                                            onClick={() => handleAction("Contact Lead", lead)}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                        >
                                                            <UserCheck className="w-4 h-4 text-emerald-400" />
                                                            Contact Lead
                                                        </button>

                                                        <button
                                                            onClick={() => handleAction("Create Booking", lead)}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                        >
                                                            <CalendarPlus className="w-4 h-4 text-blue-400" />
                                                            Create Booking
                                                        </button>

                                                        <button
                                                            onClick={() => handleAction("Mark as Won", lead)}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                        >
                                                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                            Mark as Won
                                                        </button>

                                                        <button
                                                            onClick={() => handleAction("Delete Lead", lead)}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <NewLeadModal
                open={isNewLeadOpen}
                businessId={currentBusinessId}
                onClose={() => setIsNewLeadOpen(false)}
                onCreate={(newLead) => {
                    setLeads((current) => [newLead, ...current])
                }}
            />

            <ViewLeadModal
                open={isViewLeadOpen}
                lead={selectedLead}
                onClose={() => {
                    setIsViewLeadOpen(false)
                    setSelectedLead(null)
                }}
                onContactLead={(lead) => {
                    console.log("Contact lead:", lead)
                }}
                onCreateBooking={(lead) => {
                    console.log("Create booking:", lead)
                }}
                onMarkWon={(lead) => {
                    setLeads((current) =>
                        current.map((item) =>
                            item.id === lead.id ? { ...item, status: "won" } : item
                        )
                    )
                    setIsViewLeadOpen(false)
                    setSelectedLead(null)
                }}
            />
        </div>
    )
}

export default LeadsPage
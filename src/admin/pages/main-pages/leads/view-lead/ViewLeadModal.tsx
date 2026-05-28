import {
    X,
    Mail,
    Phone,
    DollarSign,
    Brain,
    CalendarPlus,
    UserCheck,
    CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Lead } from "@/admin/types/lead"

interface ViewLeadModalProps {
    open: boolean
    lead: Lead | null
    onClose: () => void
    onCreateBooking?: (lead: Lead) => void
    onContactLead?: (lead: Lead) => void
    onMarkWon?: (lead: Lead) => void
}

export const ViewLeadModal = ({
    open,
    lead,
    onClose,
    onCreateBooking,
    onContactLead,
    onMarkWon,
}: ViewLeadModalProps) => {
    if (!open || !lead) return null

    const getTemperatureClass = () => {
        if (lead.temperature === "hot") {
            return "bg-red-500/20 text-red-400 border-red-500/30"
        }

        if (lead.temperature === "warm") {
            return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        }

        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }

    const getScoreColor = () => {
        if (lead.aiScore >= 80) return "bg-emerald-400"
        if (lead.aiScore >= 50) return "bg-amber-400"
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div>
                        <h2 className="text-xl font-bold">{lead.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            Lead details and AI qualification summary.
                        </p>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-5 p-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Temperature</p>
                            <span
                                className={`mt-2 inline-flex rounded-full border px-2 py-1 text-xs capitalize ${getTemperatureClass()}`}
                            >
                                {lead.temperature}
                            </span>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="mt-2 text-sm font-medium capitalize">
                                {lead.status.replace("_", " ")}
                            </p>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Source</p>
                            <p className="mt-2 text-sm font-medium">
                                {formatSource(lead.source)}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                        <p className="mb-3 text-xs text-muted-foreground">Contact</p>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span className="text-sm">{lead.email}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span className="text-sm">{lead.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <Brain className="h-4 w-4 text-primary" />
                                <p className="text-sm font-medium">AI Score</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full rounded-full ${getScoreColor()}`}
                                        style={{ width: `${lead.aiScore}%` }}
                                    />
                                </div>

                                <span className="text-sm font-semibold">{lead.aiScore}%</span>
                            </div>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-emerald-400" />
                                <p className="text-sm font-medium">Estimated Value</p>
                            </div>

                            <p className="text-2xl font-bold text-emerald-400">
                                ${lead.value.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <p className="mb-1 text-sm font-medium text-primary">
                            AI Recommendation
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {lead.temperature === "hot"
                                ? "This lead is highly likely to convert. Contact quickly and offer available booking slots."
                                : lead.temperature === "warm"
                                    ? "This lead needs follow-up. Send a helpful message with pricing or a limited-time offer."
                                    : "This lead has low intent. Keep it in the pipeline and follow up later with a soft offer."}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border/60 p-5">
                    <Button variant="outline" onClick={() => onContactLead?.(lead)}>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Contact Lead
                    </Button>

                    <Button variant="outline" onClick={() => onCreateBooking?.(lead)}>
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Create Booking
                    </Button>

                    <Button className="bg-primary hover:bg-primary/90" onClick={() => onMarkWon?.(lead)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Won
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ViewLeadModal
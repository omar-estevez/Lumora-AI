import { X, FileText, Play, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { VoiceCall } from "@/admin/types/voice"

interface ViewVoiceCallModalProps {
    open: boolean
    call: VoiceCall | null
    onClose: () => void
}

export const ViewVoiceCallModal = ({
    open,
    call,
    onClose,
}: ViewVoiceCallModalProps) => {
    if (!open || !call) return null

    const statusClass =
        call.status === "completed"
            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
            : "bg-red-500/20 text-red-400 border-red-500/30"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div>
                        <h2 className="text-xl font-bold">{call.customer}</h2>
                        <p className="text-sm text-muted-foreground">{call.phone}</p>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-5 p-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Status</p>
                            <span
                                className={`mt-2 inline-flex rounded-full border px-2 py-1 text-xs capitalize ${statusClass}`}
                            >
                                {call.status}
                            </span>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="mt-2 text-lg font-bold">{call.duration}</p>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Time</p>
                            <p className="mt-2 text-sm font-medium">{call.time}</p>
                        </div>
                    </div>

                    {call.aiSummary && (
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <Brain className="h-4 w-4 text-primary" />
                                <p className="font-medium text-primary">AI Summary</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{call.aiSummary}</p>
                        </div>
                    )}

                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <p className="font-medium">Transcript</p>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            {call.transcriptText || "No transcript available for this call."}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-border/60 p-5">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>

                    <Button className="bg-primary hover:bg-primary/90">
                        <Play className="mr-2 h-4 w-4" />
                        Play Recording
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ViewVoiceCallModal
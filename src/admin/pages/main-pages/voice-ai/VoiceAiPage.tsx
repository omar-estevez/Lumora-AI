import { currentBusinessId, mockVoiceCalls } from "@/admin/data/mock"
import type { VoiceCall, VoiceCallStatus } from "@/admin/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Volume2, Radio, PhoneCall, PhoneOff, Timer, ThumbsUp, FileText, Play, Brain, Meh, ThumbsDown } from "lucide-react"
import { useMemo, useState } from "react"
import ViewVoiceCallModal from "./view-voice-call/ViewVoiceCallModal"
import { ToggleButton } from "@/admin/components/commons/ToggleButton"

export const VoiceAiPage = () => {

    const [statusFilter, setStatusFilter] = useState<"all" | VoiceCallStatus>("all")
    const [selectedCall, setSelectedCall] = useState<VoiceCall | null>(null)
    const [isViewCallOpen, setIsViewCallOpen] = useState(false)

    const [automaticTranscription, setAutomaticTranscription] = useState(true)
    const [sentimentAnalysis, setSentimentAnalysis] = useState(true)
    const [callRecording, setCallRecording] = useState(true)

    const calls = mockVoiceCalls.filter(
        (call) => call.businessId === currentBusinessId
    )

    const filteredCalls = useMemo(() => {
        return calls.filter((call) => {
            return statusFilter === "all" || call.status === statusFilter
        })
    }, [calls, statusFilter])

    const answeredCalls = calls.filter((call) => call.status === "completed").length
    const missedCalls = calls.filter((call) => call.status === "missed").length

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "positive": return <ThumbsUp className="w-4 h-4 text-emerald-400" />
            case "negative": return <ThumbsDown className="w-4 h-4 text-red-400" />
            default: return <Meh className="w-4 h-4 text-amber-400" />
        }
    }
    return (
        <div className="space-y-6">
            {/* Voice AI Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-purple-500/10 via-primary/10 to-cyan-500/10 border border-primary/20 p-6">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                                <Volume2 className="w-8 h-8 text-white" />
                            </div>
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse flex items-center justify-center">
                                <Radio className="w-2 h-2 text-white" />
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Voice AI</h2>
                            <p className="text-muted-foreground">Advanced AI voice assistant</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center px-4 py-2 rounded-xl bg-background/50 backdrop-blur">
                            <p className="text-2xl font-bold text-emerald-400">0</p>
                            <p className="text-xs text-muted-foreground">Active Calls</p>
                        </div>
                        <div className="text-center px-4 py-2 rounded-xl bg-background/50 backdrop-blur">
                            <p className="text-2xl font-bold">89</p>
                            <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                        <div className="text-center px-4 py-2 rounded-xl bg-background/50 backdrop-blur">
                            <p className="text-2xl font-bold text-primary">96%</p>
                            <p className="text-xs text-muted-foreground">AI Resolution</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="p-5 border-border/50 bg-linear-to-r from-emerald-500/5 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                        <PhoneCall className="w-5 h-5 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Answered</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">{answeredCalls}</p>
                </Card>
                <Card className="p-5 border-border/50 bg-linear-to-r from-red-500/5 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                        <PhoneOff className="w-5 h-5 text-red-400" />
                        <p className="text-sm text-muted-foreground">Missed</p>
                    </div>
                    <p className="text-3xl font-bold text-red-400">{missedCalls}</p>
                </Card>
                <Card className="p-5 border-border/50 bg-linear-to-r from-blue-500/5 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                        <Timer className="w-5 h-5 text-blue-400" />
                        <p className="text-sm text-muted-foreground">Avg. Duration</p>
                    </div>
                    <p className="text-3xl font-bold">2:34</p>
                </Card>
                <Card className="p-5 border-border/50 bg-linear-to-r from-purple-500/5 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                        <ThumbsUp className="w-5 h-5 text-purple-400" />
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                    </div>
                    <p className="text-3xl font-bold text-purple-400">94%</p>
                </Card>
            </div>

            {/* Call Log with AI Analysis */}
            <Card className="border-border/50">
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <h3 className="font-semibold">AI Call Log</h3>
                    <div className="flex items-center gap-2">
                        {[
                            { id: "all", label: "All" },
                            { id: "completed", label: "Completed" },
                            { id: "missed", label: "Missed" },
                            { id: "failed", label: "Failed" },
                        ].map((filter) => (
                            <Button
                                key={filter.id}
                                variant={statusFilter === filter.id ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => setStatusFilter(filter.id as "all" | VoiceCallStatus)}
                                className={statusFilter === filter.id ? "border-primary text-primary" : ""}
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="divide-y divide-border/50">
                    {filteredCalls.map((call) => (
                        <div key={call.id} className="p-4 hover:bg-secondary/30 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${call.status === "completed" ? "bg-emerald-500/20" : "bg-red-500/20"
                                        }`}>
                                        {call.status === "completed" ? (
                                            <PhoneCall className="w-6 h-6 text-emerald-400" />
                                        ) : (
                                            <PhoneOff className="w-6 h-6 text-red-400" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">{call.customer}</p>
                                        <p className="text-sm text-muted-foreground">{call.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="font-medium">{call.duration}</p>
                                        <p className="text-xs text-muted-foreground">{call.time}</p>
                                    </div>
                                    {call.sentiment && (
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/50">
                                            {getSentimentIcon(call.sentiment)}
                                        </div>
                                    )}
                                    <span className={`px-2 py-1 text-xs rounded-full ${call.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                                        }`}>
                                        {call.status === "completed" ? "Completed" : "Missed"}
                                    </span>
                                    {call.transcript && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedCall(call)
                                                setIsViewCallOpen(true)
                                            }}
                                        >
                                            <FileText className="w-4 h-4" />
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedCall(call)
                                            setIsViewCallOpen(true)
                                        }}
                                    >
                                        <Play className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            {call.aiSummary && (
                                <div className="mt-3 ml-16 p-2 rounded-lg bg-linear-to-r from-purple-500/5 to-cyan-500/5 border border-border/50">
                                    <div className="flex items-center gap-1 text-xs text-primary mb-1">
                                        <Brain className="w-3 h-3" />
                                        <span>AI Summary</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{call.aiSummary}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Voice AI Settings */}
            <Card className="border-border/50">
                <div className="p-4 border-b border-border/50">
                    <h3 className="font-semibold">Voice AI Settings</h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Assistant Voice</p>
                            <p className="text-sm text-muted-foreground">Select the voice for calls</p>
                        </div>
                        <select className="bg-secondary px-4 py-2 rounded-lg border border-border/50">
                            <option>Sofia (Spanish - Natural)</option>
                            <option>Carlos (Spanish - Professional)</option>
                            <option>Emma (English - Friendly)</option>
                            <option>James (English - Business)</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Automatic Transcription</p>
                            <p className="text-sm text-muted-foreground">Transcribe all calls with AI</p>
                        </div>
                        <ToggleButton
                            enabled={automaticTranscription}
                            onClick={() => setAutomaticTranscription((current) => !current)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Sentiment Analysis</p>
                            <p className="text-sm text-muted-foreground">Detect emotions in real time</p>
                        </div>
                        <ToggleButton
                            enabled={sentimentAnalysis}
                            onClick={() => setSentimentAnalysis((current) => !current)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Call Recording</p>
                            <p className="text-sm text-muted-foreground">Save audio recordings</p>
                        </div>
                        <ToggleButton
                            enabled={callRecording}
                            onClick={() => setCallRecording((current) => !current)}
                        />
                    </div>
                </div>
            </Card>

            <ViewVoiceCallModal
                open={isViewCallOpen}
                call={selectedCall}
                onClose={() => {
                    setIsViewCallOpen(false)
                    setSelectedCall(null)
                }}
            />
        </div>
    )
}

export default VoiceAiPage;
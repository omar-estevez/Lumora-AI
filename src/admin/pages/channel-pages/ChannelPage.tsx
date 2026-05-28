import { useMemo, useState } from "react"
import { Navigate, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Bot,
    Clock,
    MessageCircle,
    Send,
    Settings,
    Zap,
} from "lucide-react"
import ConfigureChannelModal from "./configure-channel/ConfigureChannelModal"
import { ToggleButton } from "@/admin/components/commons/ToggleButton"

type ChannelId = "whatsapp" | "sms" | "webchat" | "email"

interface ChannelConfig {
    name: string
    description: string
    color: string
    stats: {
        messagesToday: number
        responseRate: string
        averageTime: string
        conversions: number
    }
    templates: {
        welcome: string
        followUp: string
        confirmation: string
    }
}

const channelConfigs: Record<ChannelId, ChannelConfig> = {
    whatsapp: {
        name: "WhatsApp",
        description: "Manage WhatsApp conversations, auto replies, and AI booking flows.",
        color: "text-emerald-400",
        stats: {
            messagesToday: 432,
            responseRate: "98.5%",
            averageTime: "1.2s",
            conversions: 67,
        },
        templates: {
            welcome: "Hi! Thanks for contacting us. How can we help you today?",
            followUp: "Just following up. Would you like to schedule your appointment?",
            confirmation: "Your booking is confirmed. We’ll send you a reminder before your appointment.",
        },
    },
    sms: {
        name: "SMS",
        description: "Manage text message automation, reminders, and lead follow-ups.",
        color: "text-blue-400",
        stats: {
            messagesToday: 218,
            responseRate: "94.2%",
            averageTime: "1.8s",
            conversions: 34,
        },
        templates: {
            welcome: "Thanks for reaching out. What service are you interested in?",
            followUp: "Hi, are you still interested in booking your service?",
            confirmation: "Your appointment has been confirmed. Reply STOP to opt out.",
        },
    },
    webchat: {
        name: "Web Chat",
        description: "Manage website chat automation and visitor lead capture.",
        color: "text-purple-400",
        stats: {
            messagesToday: 156,
            responseRate: "96.8%",
            averageTime: "0.9s",
            conversions: 42,
        },
        templates: {
            welcome: "Welcome! I’m Lumora AI. How can I help you today?",
            followUp: "Would you like me to help you book an appointment?",
            confirmation: "Great, your request has been sent. Our team will follow up shortly.",
        },
    },
    email: {
        name: "Email",
        description: "Manage email automation, replies, and customer follow-up sequences.",
        color: "text-red-400",
        stats: {
            messagesToday: 89,
            responseRate: "91.4%",
            averageTime: "4.5s",
            conversions: 18,
        },
        templates: {
            welcome: "Thank you for contacting us. We received your message.",
            followUp: "We wanted to follow up regarding your recent inquiry.",
            confirmation: "Your appointment details have been confirmed.",
        },
    },
}

export const ChannelPage = () => {
    const { channel } = useParams()
    const [isConfigureOpen, setIsConfigureOpen] = useState(false)

    const [channelActive, setChannelActive] = useState(true)
    const [autoReply, setAutoReply] = useState(true)
    const [afterHoursReply, setAfterHoursReply] = useState(false)
    const [leadCapture, setLeadCapture] = useState(true)

    const currentChannel = channel as ChannelId

    const config = useMemo(() => {
        if (!currentChannel || !channelConfigs[currentChannel]) return null
        return channelConfigs[currentChannel]
    }, [currentChannel])

    if (!config) {
        return <Navigate to="/dashboard/channels/whatsapp" replace />
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">{config.name}</h2>

                        <span
                            className={`rounded-full border px-2 py-1 text-xs ${channelActive
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                : "border-border bg-secondary/40 text-muted-foreground"
                                }`}
                        >
                            {channelActive ? "Connected" : "Disabled"}
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground">{config.description}</p>
                </div>

                <Button
                    size="sm"
                    onClick={() => setIsConfigureOpen(true)}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Channel
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="p-5 border-border/50">
                    <div className="mb-2 flex items-center gap-2">
                        <MessageCircle className={`h-4 w-4 ${config.color}`} />
                        <p className="text-sm text-muted-foreground">Messages Today</p>
                    </div>
                    <p className="text-3xl font-bold">{config.stats.messagesToday}</p>
                </Card>

                <Card className="p-5 border-border/50">
                    <div className="mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Response Rate</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">
                        {config.stats.responseRate}
                    </p>
                </Card>

                <Card className="p-5 border-border/50">
                    <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Average Time</p>
                    </div>
                    <p className="text-3xl font-bold">{config.stats.averageTime}</p>
                </Card>

                <Card className="p-5 border-border/50">
                    <div className="mb-2 flex items-center gap-2">
                        <Bot className="h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Conversions</p>
                    </div>
                    <p className="text-3xl font-bold">{config.stats.conversions}</p>
                </Card>
            </div>

            {/* Configuration */}
            <Card className="border-border/50">
                <div className="border-b border-border/50 p-4">
                    <h3 className="font-semibold">{config.name} Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                        Control how Lumora AI handles this channel.
                    </p>
                </div>

                <div className="divide-y divide-border/50">
                    <div className="flex items-center justify-between p-4">
                        <div>
                            <p className="font-medium">Channel Active</p>
                            <p className="text-sm text-muted-foreground">
                                Receive and respond to customer messages.
                            </p>
                        </div>

                        <ToggleButton
                            enabled={channelActive}
                            onClick={() => setChannelActive((current) => !current)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div>
                            <p className="font-medium">AI Auto Reply</p>
                            <p className="text-sm text-muted-foreground">
                                Let Lumora AI respond automatically.
                            </p>
                        </div>

                        <ToggleButton
                            enabled={autoReply}
                            onClick={() => setAutoReply((current) => !current)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div>
                            <p className="font-medium">After-Hours Reply</p>
                            <p className="text-sm text-muted-foreground">
                                Send automatic replies outside business hours.
                            </p>
                        </div>

                        <ToggleButton
                            enabled={afterHoursReply}
                            onClick={() => setAfterHoursReply((current) => !current)}
                        />
                    </div>

                    <div className="flex items-center justify-between p-4">
                        <div>
                            <p className="font-medium">Lead Capture</p>
                            <p className="text-sm text-muted-foreground">
                                Capture name, phone, service interest, and booking intent.
                            </p>
                        </div>

                        <ToggleButton
                            enabled={leadCapture}
                            onClick={() => setLeadCapture((current) => !current)}
                        />
                    </div>
                </div>
            </Card>

            {/* AI Behavior + Templates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="border-border/50">
                    <div className="border-b border-border/50 p-4">
                        <h3 className="font-semibold">AI Behavior</h3>
                        <p className="text-sm text-muted-foreground">
                            Define how the AI should communicate in this channel.
                        </p>
                    </div>

                    <div className="space-y-4 p-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Tone</label>
                            <select className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary">
                                <option>Friendly</option>
                                <option>Professional</option>
                                <option>Sales-focused</option>
                                <option>Luxury</option>
                                <option>Casual</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Main Goal</label>
                            <select className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary">
                                <option>Capture leads and book appointments</option>
                                <option>Answer questions</option>
                                <option>Send quotes</option>
                                <option>Recover lost leads</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Response Style
                            </label>
                            <textarea
                                rows={4}
                                defaultValue="Short, clear, friendly, and focused on helping the customer book an appointment."
                                className="w-full resize-none rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </Card>

                <Card className="border-border/50">
                    <div className="border-b border-border/50 p-4">
                        <h3 className="font-semibold">Message Templates</h3>
                        <p className="text-sm text-muted-foreground">
                            Default messages used by Lumora AI.
                        </p>
                    </div>

                    <div className="space-y-4 p-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Welcome Message
                            </label>
                            <textarea
                                rows={2}
                                defaultValue={config.templates.welcome}
                                className="w-full resize-none rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Follow-up Message
                            </label>
                            <textarea
                                rows={2}
                                defaultValue={config.templates.followUp}
                                className="w-full resize-none rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Booking Confirmation
                            </label>
                            <textarea
                                rows={2}
                                defaultValue={config.templates.confirmation}
                                className="w-full resize-none rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Test Message */}
            <Card className="border-border/50">
                <div className="border-b border-border/50 p-4">
                    <h3 className="font-semibold">Test {config.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        Send a test message to preview how Lumora AI responds.
                    </p>
                </div>

                <div className="flex flex-col gap-3 p-4 md:flex-row">
                    <input
                        placeholder="Type a test customer message..."
                        className="flex-1 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                    />

                    <Button className="bg-primary hover:bg-primary/90">
                        <Send className="mr-2 h-4 w-4" />
                        Send Test
                    </Button>
                </div>
            </Card>

            <ConfigureChannelModal
                open={isConfigureOpen}
                channelName={config.name}
                onClose={() => setIsConfigureOpen(false)}
            />
        </div>
    )
}

export default ChannelPage
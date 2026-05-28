import { useState } from "react"
import { X, PlugZap, Save, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Integration } from "@/admin/types/integration"

interface IntegrationModalProps {
    open: boolean
    integration: Integration | null
    onClose: () => void
    onConnect: (integration: Integration) => void
    onDisconnect: (integration: Integration) => void
}

export const IntegrationModal = ({
    open,
    integration,
    onClose,
    onConnect,
    onDisconnect,
}: IntegrationModalProps) => {
    const [apiKey, setApiKey] = useState("")
    const [webhookUrl, setWebhookUrl] = useState("")

    if (!open || !integration) return null

    const isConnected = integration.status === "connected"
    const isUpgradeRequired = integration.status === "upgrade_required"

    const handleConnect = () => {
        onConnect(integration)
        onClose()
    }

    const handleDisconnect = () => {
        onDisconnect(integration)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <PlugZap className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">{integration.name}</h2>
                            <p className="text-sm text-muted-foreground">
                                Configure this integration for your business.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4 p-5">
                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                        <p className="font-medium">{integration.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {integration.description}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                            <span className="rounded-full bg-secondary/50 px-2 py-1 text-xs capitalize text-muted-foreground">
                                {integration.category}
                            </span>

                            <span
                                className={`rounded-full px-2 py-1 text-xs capitalize ${isConnected
                                        ? "bg-emerald-500/20 text-emerald-400"
                                        : isUpgradeRequired
                                            ? "bg-amber-500/20 text-amber-400"
                                            : "bg-primary/20 text-primary"
                                    }`}
                            >
                                {integration.status.replace("_", " ")}
                            </span>
                        </div>
                    </div>

                    {isUpgradeRequired ? (
                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                            <p className="font-medium text-amber-400">Upgrade required</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                This integration is available on the Scale plan.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    API Key / Access Token
                                </label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        value={apiKey}
                                        onChange={(event) => setApiKey(event.target.value)}
                                        placeholder="sk_live_..."
                                        className="w-full rounded-lg border border-border/60 bg-secondary/30 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Webhook URL
                                </label>
                                <input
                                    value={webhookUrl}
                                    onChange={(event) => setWebhookUrl(event.target.value)}
                                    placeholder="https://api.lumora.ai/webhooks/provider"
                                    className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                                />
                            </div>

                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                                <p className="text-sm text-muted-foreground">
                                    This is a front-end mock. Later, this configuration should be
                                    encrypted and stored securely in Supabase.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-border/60 p-5">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    {isUpgradeRequired ? (
                        <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>
                            Upgrade to Scale
                        </Button>
                    ) : isConnected ? (
                        <>
                            <Button
                                variant="outline"
                                className="text-red-400 hover:text-red-300"
                                onClick={handleDisconnect}
                            >
                                Disconnect
                            </Button>

                            <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <Button className="bg-primary hover:bg-primary/90" onClick={handleConnect}>
                            <PlugZap className="mr-2 h-4 w-4" />
                            Connect
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default IntegrationModal
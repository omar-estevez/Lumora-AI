import { X, Settings, PlugZap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConfigureChannelModalProps {
    open: boolean
    channelName: string
    onClose: () => void
}

export const ConfigureChannelModal = ({
    open,
    channelName,
    onClose,
}: ConfigureChannelModalProps) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <Settings className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Configure {channelName}</h2>
                            <p className="text-sm text-muted-foreground">
                                Connect and manage this communication channel.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4 p-5">
                    <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <PlugZap className="h-4 w-4 text-primary" />
                            <p className="font-medium">Connection Setup</p>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            In the real version, this is where the client connects their{" "}
                            {channelName} account, phone number, API key, webhook, or provider.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Business Number / Sender
                            </label>
                            <input
                                placeholder="+1 (555) 123-4567"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Provider
                            </label>
                            <select className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary">
                                <option>Twilio</option>
                                <option>Meta WhatsApp API</option>
                                <option>SendGrid</option>
                                <option>Custom Webhook</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Webhook URL
                            </label>
                            <input
                                placeholder="https://api.lumora.ai/webhooks/channel"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-border/60 p-5">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>
                        Save Configuration
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConfigureChannelModal
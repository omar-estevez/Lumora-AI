import { useState } from "react"
import { KeyRound, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type {
    ApiKey,
    ApiKeyEnvironment,
    ApiKeyPermission,
} from "@/admin/types/apiKey"

interface ApiKeyModalProps {
    open: boolean
    businessId: string
    onClose: () => void
    onCreate: (apiKey: ApiKey) => void
}

const permissionOptions: { label: string; value: ApiKeyPermission }[] = [
    { label: "Read Leads", value: "read:leads" },
    { label: "Write Leads", value: "write:leads" },
    { label: "Read Conversations", value: "read:conversations" },
    { label: "Write Conversations", value: "write:conversations" },
    { label: "Read Bookings", value: "read:bookings" },
    { label: "Write Bookings", value: "write:bookings" },
    { label: "Read Analytics", value: "read:analytics" },
]

export const ApiKeyModal = ({
    open,
    businessId,
    onClose,
    onCreate,
}: ApiKeyModalProps) => {
    const [name, setName] = useState("")
    const [environment, setEnvironment] = useState<ApiKeyEnvironment>("test")
    const [permissions, setPermissions] = useState<ApiKeyPermission[]>([
        "read:leads",
    ])

    if (!open) return null

    const togglePermission = (permission: ApiKeyPermission) => {
        setPermissions((current) => {
            if (current.includes(permission)) {
                return current.filter((item) => item !== permission)
            }

            return [...current, permission]
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!name.trim() || permissions.length === 0) return

        const prefix = environment === "live" ? "sk_live" : "sk_test"

        const newApiKey: ApiKey = {
            id: `key_${Date.now()}`,
            businessId,
            name,
            key: `${prefix}_${Date.now().toString(36)}...${Math.random()
                .toString(36)
                .slice(2, 8)}`,
            environment,
            status: "active",
            permissions,
            createdAt: "Just now",
            lastUsed: "Never",
        }

        onCreate(newApiKey)
        setName("")
        setEnvironment("test")
        setPermissions(["read:leads"])
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <KeyRound className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">New API Key</h2>
                            <p className="text-sm text-muted-foreground">
                                Create a key for external apps or custom integrations.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Key Name</label>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Example: Website Integration"
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Environment
                        </label>

                        <div className="flex gap-2">
                            {[
                                { label: "Test", value: "test" },
                                { label: "Live", value: "live" },
                            ].map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() =>
                                        setEnvironment(item.value as ApiKeyEnvironment)
                                    }
                                    className={`rounded-lg border px-4 py-2 text-sm ${environment === item.value
                                            ? "border-primary bg-primary/20 text-primary"
                                            : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-primary"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Permissions
                        </label>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {permissionOptions.map((permission) => {
                                const selected = permissions.includes(permission.value)

                                return (
                                    <button
                                        key={permission.value}
                                        type="button"
                                        onClick={() => togglePermission(permission.value)}
                                        className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${selected
                                                ? "border-primary bg-primary/20 text-primary"
                                                : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-primary"
                                            }`}
                                    >
                                        {permission.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                        <p className="text-sm text-muted-foreground">
                            API keys give access to your Lumora data. Only create keys for
                            trusted systems.
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-border/60 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={!name.trim() || permissions.length === 0}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Key
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApiKeyModal
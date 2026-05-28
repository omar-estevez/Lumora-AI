import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Plus,
    Trash2,
    Copy,
    Eye,
    EyeOff,
    AlertCircle,
    KeyRound,
    ShieldCheck,
    Activity,
} from "lucide-react"

import { currentBusinessId, mockApiKeys } from "@/admin/data/mock"
import type { ApiKey } from "@/admin/types/apiKey"
import ApiKeyModal from "./api-key-modal/ApiKeyModal"

export const ApiKeysPage = () => {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>(
        mockApiKeys.filter((item) => item.businessId === currentBusinessId)
    )

    const [visibleKeyIds, setVisibleKeyIds] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const activeKeys = apiKeys.filter((key) => key.status === "active").length
    const liveKeys = apiKeys.filter((key) => key.environment === "live").length
    const testKeys = apiKeys.filter((key) => key.environment === "test").length

    const toggleKeyVisibility = (keyId: string) => {
        setVisibleKeyIds((current) => {
            if (current.includes(keyId)) {
                return current.filter((id) => id !== keyId)
            }

            return [...current, keyId]
        })
    }

    const maskKey = (key: string) => {
        const [prefix] = key.split("_").slice(0, 2)
        const visibleStart = key.slice(0, 8)
        const visibleEnd = key.slice(-6)

        return `${visibleStart}••••••••••••${visibleEnd}`
    }

    const copyKey = (key: string) => {
        navigator.clipboard.writeText(key)
    }

    const revokeKey = (keyId: string) => {
        setApiKeys((current) =>
            current.map((key) =>
                key.id === keyId ? { ...key, status: "revoked" } : key
            )
        )
    }

    const deleteKey = (keyId: string) => {
        setApiKeys((current) => current.filter((key) => key.id !== keyId))
    }

    const getEnvironmentClass = (environment: ApiKey["environment"]) => {
        if (environment === "live") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }

    const getStatusClass = (status: ApiKey["status"]) => {
        if (status === "active") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        return "bg-red-500/20 text-red-400 border-red-500/30"
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">API Keys</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage keys used by external systems to access Lumora securely.
                    </p>
                </div>

                <Button
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Key
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <KeyRound className="h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Active Keys</p>
                    </div>
                    <p className="text-3xl font-bold">{activeKeys}</p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Live Keys</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">{liveKeys}</p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-400" />
                        <p className="text-sm text-muted-foreground">Test Keys</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-400">{testKeys}</p>
                </Card>
            </div>

            {/* API Keys List */}
            <Card className="border-border/50 overflow-hidden">
                <div className="divide-y divide-border/50">
                    {apiKeys.map((apiKey) => {
                        const isVisible = visibleKeyIds.includes(apiKey.id)

                        return (
                            <div
                                key={apiKey.id}
                                className="p-5 hover:bg-secondary/30 transition-colors"
                            >
                                <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-semibold">{apiKey.name}</p>

                                            <span
                                                className={`rounded-full border px-2 py-1 text-xs capitalize ${getEnvironmentClass(
                                                    apiKey.environment
                                                )}`}
                                            >
                                                {apiKey.environment}
                                            </span>

                                            <span
                                                className={`rounded-full border px-2 py-1 text-xs capitalize ${getStatusClass(
                                                    apiKey.status
                                                )}`}
                                            >
                                                {apiKey.status}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Created: {apiKey.createdAt} | Last used:{" "}
                                            {apiKey.lastUsed}
                                        </p>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => revokeKey(apiKey.id)}
                                        disabled={apiKey.status === "revoked"}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Revoke
                                    </Button>
                                </div>

                                <div className="mb-3 flex items-center gap-2">
                                    <code className="flex-1 rounded-lg bg-secondary px-3 py-2 font-mono text-sm">
                                        {isVisible ? apiKey.key : maskKey(apiKey.key)}
                                    </code>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => copyKey(apiKey.key)}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleKeyVisibility(apiKey.id)}
                                    >
                                        {isVisible ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteKey(apiKey.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {apiKey.permissions.map((permission) => (
                                        <span
                                            key={permission}
                                            className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                                        >
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>

            {/* Security Notice */}
            <Card className="border-border/50 p-6">
                <div className="flex items-start gap-4">
                    <AlertCircle className="h-6 w-6 shrink-0 text-yellow-500" />

                    <div>
                        <p className="mb-1 font-medium">Keep your API keys secure</p>
                        <p className="text-sm text-muted-foreground">
                            Never share your API keys publicly. If you believe a key has been
                            compromised, revoke it immediately and create a new one.
                        </p>
                    </div>
                </div>
            </Card>

            <ApiKeyModal
                open={isModalOpen}
                businessId={currentBusinessId}
                onClose={() => setIsModalOpen(false)}
                onCreate={(newKey) => {
                    setApiKeys((current) => [newKey, ...current])
                }}
            />
        </div>
    )
}

export default ApiKeysPage
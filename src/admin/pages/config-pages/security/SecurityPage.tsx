import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    AlertTriangle,
    Clock,
    KeyRound,
    Laptop,
    LockKeyhole,
    LogIn,
    LogOut,
    Shield,
    ShieldCheck,
    Smartphone,
} from "lucide-react"

import {
    currentBusinessId,
    mockSecurityActivities,
    mockSecuritySessions,
} from "@/admin/data/mock"
import type { SecuritySession } from "@/admin/types/security"
import SecurityActionModal from "./security-action-modal/SecurityActionModal"

export const SecurityPage = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [sessions, setSessions] = useState<SecuritySession[]>(
        mockSecuritySessions.filter((item) => item.businessId === currentBusinessId)
    )

    const [modalType, setModalType] = useState<"2fa" | "password" | null>(null)
    const [savedMessage, setSavedMessage] = useState("")

    const activities = mockSecurityActivities.filter(
        (item) => item.businessId === currentBusinessId
    )

    const activeSessions = sessions.length
    const currentSession = sessions.find((item) => item.status === "current")
    const lastLogin = activities.find((item) => item.type === "login")

    const showSavedMessage = (message: string) => {
        setSavedMessage(message)

        window.setTimeout(() => {
            setSavedMessage("")
        }, 2500)
    }

    const closeSession = (sessionId: string) => {
        setSessions((current) =>
            current.filter((session) => session.id !== sessionId)
        )
    }

    const closeAllOtherSessions = () => {
        setSessions((current) =>
            current.filter((session) => session.status === "current")
        )
    }

    const getDeviceIcon = (device: string) => {
        const lowerDevice = device.toLowerCase()

        if (
            lowerDevice.includes("iphone") ||
            lowerDevice.includes("android") ||
            lowerDevice.includes("phone")
        ) {
            return Smartphone
        }

        return Laptop
    }

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "login":
                return LogIn
            case "settings":
                return Shield
            case "api_key":
                return KeyRound
            case "password":
                return LockKeyhole
            default:
                return Clock
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Security</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage account protection, active sessions, and security activity.
                    </p>
                </div>

                {savedMessage && (
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
                        {savedMessage}
                    </span>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Security Status</p>
                    </div>

                    <p className="text-3xl font-bold text-emerald-400">
                        {twoFactorEnabled ? "Strong" : "Good"}
                    </p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <Laptop className="h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Active Sessions</p>
                    </div>

                    <p className="text-3xl font-bold">{activeSessions}</p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <LogIn className="h-4 w-4 text-blue-400" />
                        <p className="text-sm text-muted-foreground">Last Login</p>
                    </div>

                    <p className="text-3xl font-bold text-blue-400">
                        {lastLogin?.time || "N/A"}
                    </p>
                </Card>
            </div>

            {/* Authentication */}
            <Card className="border-border/50">
                <div className="border-b border-border/50 p-4">
                    <h3 className="font-semibold">Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                        Protect access to this workspace.
                    </p>
                </div>

                <div className="space-y-4 p-4">
                    <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-secondary/10 p-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-medium">Two-Factor Authentication</p>

                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs ${twoFactorEnabled
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-amber-500/20 text-amber-400"
                                            }`}
                                    >
                                        {twoFactorEnabled ? "Enabled" : "Recommended"}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Add an extra layer of security to your account.
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setModalType("2fa")}
                        >
                            {twoFactorEnabled ? "Manage" : "Configure"}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-secondary/10 p-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <LockKeyhole className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="font-medium">Password</p>
                                <p className="text-sm text-muted-foreground">
                                    Last updated: 30 days ago
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setModalType("password")}
                        >
                            Change Password
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Active Sessions */}
            <Card className="border-border/50">
                <div className="flex flex-col gap-3 border-b border-border/50 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="font-semibold">Active Sessions</h3>
                        <p className="text-sm text-muted-foreground">
                            Devices currently signed into this account.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={closeAllOtherSessions}
                        disabled={sessions.length <= 1}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out other sessions
                    </Button>
                </div>

                <div className="divide-y divide-border/50">
                    {sessions.map((session) => {
                        const DeviceIcon = getDeviceIcon(session.device)
                        const isCurrentSession = session.status === "current"

                        return (
                            <div
                                key={session.id}
                                className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <DeviceIcon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-medium">
                                                {session.browser} - {session.device}
                                            </p>

                                            {isCurrentSession && (
                                                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">
                                                    Current session
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            {session.location} · {session.ipAddress} ·{" "}
                                            {session.lastActive}
                                        </p>
                                    </div>
                                </div>

                                {isCurrentSession ? (
                                    <span className="text-sm text-emerald-400">
                                        Active now
                                    </span>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => closeSession(session.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Sign out
                                    </Button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </Card>

            {/* Activity History */}
            <Card className="border-border/50">
                <div className="border-b border-border/50 p-4">
                    <h3 className="font-semibold">Security Activity</h3>
                    <p className="text-sm text-muted-foreground">
                        Recent security events on this workspace.
                    </p>
                </div>

                <div className="divide-y divide-border/50">
                    {activities.map((activity) => {
                        const ActivityIcon = getActivityIcon(activity.type)

                        return (
                            <div key={activity.id} className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/40 text-primary">
                                        <ActivityIcon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="font-medium">{activity.action}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.time} · {activity.location} · IP:{" "}
                                            {activity.ipAddress}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>

            {/* Security Notice */}
            <Card className="border-amber-500/20 bg-amber-500/5 p-5">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-400" />

                    <div>
                        <p className="font-medium text-amber-400">
                            Keep your account secure
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Enable 2FA, review active sessions regularly, and sign out any
                            device you do not recognize.
                        </p>
                    </div>
                </div>
            </Card>

            <SecurityActionModal
                open={modalType !== null}
                type={modalType}
                onClose={() => setModalType(null)}
                onConfirm={() => {
                    if (modalType === "2fa") {
                        setTwoFactorEnabled(true)
                        showSavedMessage("Two-factor authentication enabled")
                    }

                    if (modalType === "password") {
                        showSavedMessage("Password updated")
                    }
                }}
            />
        </div>
    )
}

export default SecurityPage
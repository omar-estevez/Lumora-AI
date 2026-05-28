import { useState } from "react"
import { LockKeyhole, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SecurityActionModalProps {
    open: boolean
    type: "2fa" | "password" | null
    onClose: () => void
    onConfirm: () => void
}

export const SecurityActionModal = ({
    open,
    type,
    onClose,
    onConfirm,
}: SecurityActionModalProps) => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    if (!open || !type) return null

    const isPassword = type === "password"

    const title = isPassword
        ? "Change Password"
        : "Configure Two-Factor Authentication"

    const description = isPassword
        ? "Update your password to keep your account secure."
        : "Add an extra layer of protection to your Lumora account."

    const Icon = isPassword ? LockKeyhole : ShieldCheck

    const handleConfirm = () => {
        onConfirm()
        setCurrentPassword("")
        setNewPassword("")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <Icon className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">{title}</h2>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4 p-5">
                    {isPassword ? (
                        <>
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.target.value)}
                                    placeholder="Enter current password"
                                    className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                            <p className="font-medium text-primary">
                                Two-factor authentication mock
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Later with Supabase, this will open the real 2FA setup flow.
                                For now, this button only enables 2FA visually.
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 border-t border-border/60 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            onClick={handleConfirm}
                            disabled={
                                isPassword &&
                                (!currentPassword.trim() || !newPassword.trim())
                            }
                            className="bg-primary hover:bg-primary/90"
                        >
                            {isPassword ? "Change Password" : "Enable 2FA"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecurityActionModal
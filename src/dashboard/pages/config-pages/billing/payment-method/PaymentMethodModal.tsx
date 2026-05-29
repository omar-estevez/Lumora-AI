import { useState } from "react"
import { CreditCard, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentMethodModalProps {
    open: boolean
    onClose: () => void
}

export const PaymentMethodModal = ({ open, onClose }: PaymentMethodModalProps) => {
    const [cardNumber, setCardNumber] = useState("")
    const [expiration, setExpiration] = useState("")
    const [cvc, setCvc] = useState("")

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <CreditCard className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Change Payment Method</h2>
                            <p className="text-sm text-muted-foreground">
                                Update the card used for your subscription.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4 p-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Card Number</label>
                        <input
                            value={cardNumber}
                            onChange={(event) => setCardNumber(event.target.value)}
                            placeholder="4242 4242 4242 4242"
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Expiration</label>
                            <input
                                value={expiration}
                                onChange={(event) => setExpiration(event.target.value)}
                                placeholder="12/28"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">CVC</label>
                            <input
                                value={cvc}
                                onChange={(event) => setCvc(event.target.value)}
                                placeholder="123"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <p className="text-sm text-muted-foreground">
                            This is a front-end mock. Later this should connect to Stripe Billing or your payment provider.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-border/60 p-5">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>
                        Save Payment Method
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethodModal
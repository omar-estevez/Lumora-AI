import { X, Check, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockPlans } from "@/shared/data/mock"
import type { PlanId } from "@/shared/types/plan"

interface ChangePlanModalProps {
    open: boolean
    currentPlan: PlanId
    onClose: () => void
    onChangePlan: (plan: PlanId) => void
}

export const ChangePlanModal = ({
    open,
    currentPlan,
    onClose,
    onChangePlan,
}: ChangePlanModalProps) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-5xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div>
                        <h2 className="text-xl font-bold">Change Plan</h2>
                        <p className="text-sm text-muted-foreground">
                            Choose the plan that best fits your business needs.
                        </p>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
                    {mockPlans.map((plan) => {
                        const isCurrent = plan.id === currentPlan

                        return (
                            <div
                                key={plan.id}
                                className={`rounded-2xl border p-5 ${isCurrent
                                        ? "border-primary bg-primary/10"
                                        : "border-border/60 bg-secondary/20"
                                    }`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {plan.description}
                                        </p>
                                    </div>

                                    {plan.popular && (
                                        <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                                            Popular
                                        </span>
                                    )}
                                </div>

                                <div className="mb-5">
                                    <span className="text-3xl font-bold">${plan.price}</span>
                                    <span className="text-sm text-muted-foreground">/month</span>
                                </div>

                                <div className="mb-5 space-y-2">
                                    {plan.features.slice(0, 6).map((feature) => (
                                        <div key={feature} className="flex items-center gap-2 text-sm">
                                            <Check className="h-4 w-4 text-primary" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    disabled={isCurrent}
                                    onClick={() => {
                                        onChangePlan(plan.id)
                                        onClose()
                                    }}
                                    className="w-full bg-primary hover:bg-primary/90"
                                    variant={isCurrent ? "outline" : "default"}
                                >
                                    {isCurrent ? (
                                        "Current Plan"
                                    ) : (
                                        <>
                                            <Crown className="mr-2 h-4 w-4" />
                                            Choose {plan.name}
                                        </>
                                    )}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ChangePlanModal
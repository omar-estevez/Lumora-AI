import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Crown,
    CreditCard,
    Download,
    RefreshCw,
    AlertTriangle,
} from "lucide-react"

import { mockPlans } from "@/shared/data/mock"
import { mockUsage } from "@/admin/data/mock"
import type { PlanId } from "@/shared/types/plan"
import ChangePlanModal from "./change-plan/ChangePlanModal"
import PaymentMethodModal from "./payment-method/PaymentMethodModal"

const premiumFeatures = [
    "Unlimited API",
    "White-label",
    "Priority Support 24/7",
    "Multiple Locations",
    "Custom AI Voices",
]

const invoiceHistory = [
    {
        id: "inv_001",
        date: "Jan 15, 2024",
        amount: 149,
        status: "Paid",
    },
    {
        id: "inv_002",
        date: "Dec 15, 2023",
        amount: 149,
        status: "Paid",
    },
    {
        id: "inv_003",
        date: "Nov 15, 2023",
        amount: 149,
        status: "Paid",
    },
]

export const BillingPage = () => {
    const [currentPlanId, setCurrentPlanId] = useState<PlanId>("growth")
    const [isChangePlanOpen, setIsChangePlanOpen] = useState(false)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

    const currentPlan = mockPlans.find((plan) => plan.id === currentPlanId)
    const scalePlan = mockPlans.find((plan) => plan.id === "scale")

    if (!currentPlan) return null

    const usageMetrics = mockUsage.metrics

    const getUsagePercentage = (used: number, limit: number) => {
        return Math.min((used / limit) * 100, 100)
    }

    const getUsageColor = (used: number, limit: number) => {
        const percentage = getUsagePercentage(used, limit)

        if (percentage >= 85) return "bg-amber-400"
        if (percentage >= 95) return "bg-red-400"

        return "bg-primary"
    }

    const handleDownloadInvoice = (invoiceId: string) => {
        console.log("Download invoice:", invoiceId)
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Billing</h2>

            {/* Current Plan */}
            <Card className="border-border/50 overflow-hidden bg-linear-to-r from-primary/10 to-accent/5">
                <div className="p-6">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">Current Plan</p>

                                <span className="rounded-full bg-primary/20 px-2 py-1 text-xs text-primary">
                                    Active
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold">{currentPlan.name}</h3>

                            <div className="mt-4 flex items-end gap-1">
                                <span className="text-4xl font-bold">
                                    ${currentPlan.price}
                                </span>
                                <span className="mb-1 text-sm text-muted-foreground">
                                    /month
                                </span>
                            </div>

                            <p className="mt-4 text-sm text-muted-foreground">
                                Your next payment is on February 15, 2024.
                            </p>

                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                <Button
                                    onClick={() => setIsChangePlanOpen(true)}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    Change Plan
                                </Button>

                                <Button
                                    variant="ghost"
                                    className="text-red-400 hover:text-red-300"
                                >
                                    Cancel Subscription
                                </Button>
                            </div>
                        </div>

                        <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                            <Crown className="h-10 w-10 text-primary" />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Monthly Usage */}
            <Card className="border-border/50">
                <div className="flex items-center justify-between border-b border-border/50 p-4">
                    <div>
                        <h3 className="font-semibold">Monthly Usage</h3>
                        <p className="text-sm text-muted-foreground">
                            Track your current plan limits and usage.
                        </p>
                    </div>

                    <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">
                    {usageMetrics.slice(0, 3).map((metric) => {
                        const percentage = getUsagePercentage(metric.used, metric.limit)

                        return (
                            <div key={metric.id} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        {metric.label}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {Math.round(percentage)}% used
                                    </p>
                                </div>

                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-bold">
                                        {metric.used.toLocaleString()}
                                        {metric.unit ? ` ${metric.unit}` : ""}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        / {metric.limit.toLocaleString()}
                                        {metric.unit ? ` ${metric.unit}` : ""}
                                    </p>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full rounded-full ${getUsageColor(
                                            metric.used,
                                            metric.limit
                                        )}`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 gap-5 border-t border-border/50 p-5 md:grid-cols-3">
                    {usageMetrics.slice(3).map((metric) => {
                        const percentage = getUsagePercentage(metric.used, metric.limit)

                        return (
                            <div key={metric.id} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        {metric.label}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {Math.round(percentage)}% used
                                    </p>
                                </div>

                                <div className="flex items-end justify-between">
                                    <p className="text-xl font-bold">
                                        {metric.used.toLocaleString()}
                                        {metric.unit ? ` ${metric.unit}` : ""}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        / {metric.limit.toLocaleString()}
                                        {metric.unit ? ` ${metric.unit}` : ""}
                                    </p>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full rounded-full ${getUsageColor(
                                            metric.used,
                                            metric.limit
                                        )}`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>

            {/* Locked Premium Features */}
            {currentPlanId !== "scale" && (
                <Card className="border-border/50">
                    <div className="border-b border-border/50 p-4">
                        <h3 className="font-semibold">Locked Premium Features</h3>
                        <p className="text-sm text-muted-foreground">
                            Upgrade to Scale to unlock advanced automation and enterprise
                            capabilities.
                        </p>
                    </div>

                    <div className="space-y-3 p-5">
                        {premiumFeatures.map((feature) => (
                            <div
                                key={feature}
                                className="flex items-center justify-between rounded-xl bg-secondary/20 px-4 py-3"
                            >
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                                    <span className="font-medium">{feature}</span>
                                </div>

                                <span className="text-xs font-medium text-amber-400">
                                    Scale
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-border/50 p-5">
                        <Button
                            onClick={() => setIsChangePlanOpen(true)}
                            className="w-full bg-primary hover:bg-primary/90"
                        >
                            <Crown className="mr-2 h-4 w-4" />
                            Upgrade to {scalePlan?.name || "Scale"}
                        </Button>
                    </div>
                </Card>
            )}

            {/* Payment Method */}
            <Card className="border-border/50">
                <div className="border-b border-border/50 p-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage the card used for your Lumora subscription.
                    </p>
                </div>

                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/40">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setIsPaymentModalOpen(true)}
                    >
                        Change
                    </Button>
                </div>
            </Card>

            {/* Invoice History */}
            <Card className="border-border/50">
                <div className="border-b border-border/50 p-4">
                    <h3 className="font-semibold">Invoice History</h3>
                    <p className="text-sm text-muted-foreground">
                        Download previous invoices and payment records.
                    </p>
                </div>

                <div className="divide-y divide-border/50">
                    {invoiceHistory.map((invoice) => (
                        <div
                            key={invoice.id}
                            className="flex items-center justify-between p-5"
                        >
                            <div>
                                <p className="font-medium">{invoice.date}</p>
                                <p className="text-sm text-muted-foreground">
                                    ${invoice.amount.toFixed(2)}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-emerald-400">
                                    {invoice.status}
                                </span>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDownloadInvoice(invoice.id)}
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <ChangePlanModal
                open={isChangePlanOpen}
                currentPlan={currentPlanId}
                onClose={() => setIsChangePlanOpen(false)}
                onChangePlan={setCurrentPlanId}
            />

            <PaymentMethodModal
                open={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
            />
        </div>
    )
}

export default BillingPage
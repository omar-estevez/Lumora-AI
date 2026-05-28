import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Bell,
    Mail,
    MessageSquareText,
    MonitorSmartphone,
    Search,
    ToggleLeft,
    ToggleRight,
    Save,
    BellRing,
    MailCheck,
    Smartphone,
} from "lucide-react"

import { currentBusinessId, mockNotifications } from "@/admin/data/mock"
import type {
    NotificationCategory,
    NotificationChannel,
    NotificationPreference,
} from "@/admin/types/notification"

const categoryFilters: { label: string; value: "all" | NotificationCategory }[] =
    [
        { label: "All", value: "all" },
        { label: "Conversations", value: "conversations" },
        { label: "Bookings", value: "bookings" },
        { label: "Leads", value: "leads" },
        { label: "Voice", value: "voice" },
        { label: "Billing", value: "billing" },
        { label: "System", value: "system" },
    ]

export const NotificationPage = () => {
    const [notifications, setNotifications] = useState<NotificationPreference[]>(
        mockNotifications.filter((item) => item.businessId === currentBusinessId)
    )

    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] =
        useState<"all" | NotificationCategory>("all")
    const [savedMessage, setSavedMessage] = useState("")

    const filteredNotifications = useMemo(() => {
        return notifications.filter((notification) => {
            const matchesSearch =
                notification.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                notification.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())

            const matchesCategory =
                categoryFilter === "all" || notification.category === categoryFilter

            return matchesSearch && matchesCategory
        })
    }, [notifications, searchTerm, categoryFilter])

    const emailEnabled = notifications.filter((item) => item.email).length
    const pushEnabled = notifications.filter((item) => item.push).length
    const smsEnabled = notifications.filter((item) => item.sms).length

    const toggleNotification = (
        notificationId: string,
        channel: NotificationChannel
    ) => {
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === notificationId
                    ? {
                        ...notification,
                        [channel]: !notification[channel],
                    }
                    : notification
            )
        )
    }

    const enableAllForChannel = (channel: NotificationChannel) => {
        setNotifications((current) =>
            current.map((notification) => ({
                ...notification,
                [channel]: true,
            }))
        )
    }

    const disableAllForChannel = (channel: NotificationChannel) => {
        setNotifications((current) =>
            current.map((notification) => ({
                ...notification,
                [channel]: false,
            }))
        )
    }

    const showSavedMessage = () => {
        setSavedMessage("Notification settings saved")

        window.setTimeout(() => {
            setSavedMessage("")
        }, 2500)
    }

    const getCategoryLabel = (category: NotificationCategory) => {
        return category.charAt(0).toUpperCase() + category.slice(1)
    }

    const toggleButton = (
        enabled: boolean,
        onClick: () => void,
        label: string
    ) => (
        <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            aria-label={label}
            className="mx-auto"
        >
            {enabled ? (
                <ToggleRight className="h-7 w-7 text-primary" />
            ) : (
                <ToggleLeft className="h-7 w-7 text-muted-foreground" />
            )}
        </Button>
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Notifications</h2>
                    <p className="text-sm text-muted-foreground">
                        Choose how your team gets alerted about messages, bookings, leads,
                        calls, and system events.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {savedMessage && (
                        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
                            {savedMessage}
                        </span>
                    )}

                    <Button
                        size="sm"
                        onClick={showSavedMessage}
                        className="bg-primary hover:bg-primary/90"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <MailCheck className="h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">Email Alerts</p>
                    </div>
                    <p className="text-3xl font-bold">{emailEnabled}</p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <BellRing className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm text-muted-foreground">Push Alerts</p>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">{pushEnabled}</p>
                </Card>

                <Card className="border-border/50 p-5">
                    <div className="mb-1 flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-blue-400" />
                        <p className="text-sm text-muted-foreground">SMS Alerts</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-400">{smsEnabled}</p>
                </Card>
            </div>

            {/* Filters */}
            <Card className="border-border/50 p-4">
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search notification events..."
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {categoryFilters.map((filter) => (
                            <Button
                                key={filter.value}
                                variant={
                                    categoryFilter === filter.value ? "outline" : "ghost"
                                }
                                size="sm"
                                onClick={() => setCategoryFilter(filter.value)}
                                className={
                                    categoryFilter === filter.value
                                        ? "border-primary text-primary"
                                        : ""
                                }
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Channel Controls */}
            <Card className="border-border/50 p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-border/50 bg-secondary/10 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <p className="font-medium">Email</p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => enableAllForChannel("email")}
                            >
                                Enable all
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => disableAllForChannel("email")}
                            >
                                Disable all
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border/50 bg-secondary/10 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <MonitorSmartphone className="h-4 w-4 text-emerald-400" />
                            <p className="font-medium">Push</p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => enableAllForChannel("push")}
                            >
                                Enable all
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => disableAllForChannel("push")}
                            >
                                Disable all
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border/50 bg-secondary/10 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <MessageSquareText className="h-4 w-4 text-blue-400" />
                            <p className="font-medium">SMS</p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => enableAllForChannel("sms")}
                            >
                                Enable all
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => disableAllForChannel("sms")}
                            >
                                Disable all
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Notifications Table */}
            <Card className="border-border/50 overflow-hidden">
                <div className="hidden border-b border-border/50 p-4 md:grid md:grid-cols-[1fr_120px_120px_120px] md:gap-4">
                    <span className="text-sm font-medium text-muted-foreground">
                        Event
                    </span>
                    <span className="text-center text-sm font-medium text-muted-foreground">
                        Email
                    </span>
                    <span className="text-center text-sm font-medium text-muted-foreground">
                        Push
                    </span>
                    <span className="text-center text-sm font-medium text-muted-foreground">
                        SMS
                    </span>
                </div>

                <div className="divide-y divide-border/50">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <h3 className="font-semibold">No notifications found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing the search or category filter.
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="grid grid-cols-1 gap-4 p-4 hover:bg-secondary/30 md:grid-cols-[1fr_120px_120px_120px] md:items-center"
                            >
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-medium">{notification.event}</p>

                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                            {getCategoryLabel(notification.category)}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {notification.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between md:block">
                                    <span className="text-sm text-muted-foreground md:hidden">
                                        Email
                                    </span>
                                    {toggleButton(notification.email, () =>
                                        toggleNotification(notification.id, "email"),
                                        `Toggle email for ${notification.event}`
                                    )}
                                </div>

                                <div className="flex items-center justify-between md:block">
                                    <span className="text-sm text-muted-foreground md:hidden">
                                        Push
                                    </span>
                                    {toggleButton(notification.push, () =>
                                        toggleNotification(notification.id, "push"),
                                        `Toggle push for ${notification.event}`
                                    )}
                                </div>

                                <div className="flex items-center justify-between md:block">
                                    <span className="text-sm text-muted-foreground md:hidden">
                                        SMS
                                    </span>
                                    {toggleButton(notification.sms, () =>
                                        toggleNotification(notification.id, "sms"),
                                        `Toggle SMS for ${notification.event}`
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>

            {/* Notice */}
            <Card className="border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 h-5 w-5 text-primary" />

                    <div>
                        <p className="font-medium">Notification delivery</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Email and push notifications are included in all plans. SMS
                            alerts may use message credits depending on the customer’s plan.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default NotificationPage
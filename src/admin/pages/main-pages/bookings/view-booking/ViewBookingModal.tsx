import {
    X,
    Calendar,
    Clock,
    DollarSign,
    MessageCircle,
    CheckCircle,
    XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Booking } from "@/admin/types/booking"

interface ViewBookingModalProps {
    open: boolean
    booking: Booking | null
    onClose: () => void
    onMarkCompleted?: (booking: Booking) => void
    onCancelBooking?: (booking: Booking) => void
}

export const ViewBookingModal = ({
    open,
    booking,
    onClose,
    onMarkCompleted,
    onCancelBooking,
}: ViewBookingModalProps) => {
    if (!open || !booking) return null

    const formatChannel = (channel: string) => {
        if (channel === "webchat") return "Web Chat"
        if (channel === "whatsapp") return "WhatsApp"
        if (channel === "sms") return "SMS"
        if (channel === "voice") return "Voice AI"
        if (channel === "email") return "Email"
        return channel
    }

    const getStatusClass = () => {
        if (booking.status === "confirmed") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        if (booking.status === "pending") {
            return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        }

        if (booking.status === "completed") {
            return "bg-blue-500/20 text-blue-400 border-blue-500/30"
        }

        return "bg-red-500/20 text-red-400 border-red-500/30"
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div>
                        <h2 className="text-xl font-bold">{booking.customerName}</h2>
                        <p className="text-sm text-muted-foreground">
                            Booking details and appointment information.
                        </p>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-5 p-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Service</p>
                            <p className="mt-2 text-sm font-medium">{booking.serviceName}</p>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Status</p>
                            <span
                                className={`mt-2 inline-flex rounded-full border px-2 py-1 text-xs capitalize ${getStatusClass()}`}
                            >
                                {booking.status}
                            </span>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <p className="text-xs text-muted-foreground">Channel</p>
                            <p className="mt-2 text-sm font-medium">
                                {formatChannel(booking.channel)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <p className="text-sm font-medium">Date</p>
                            </div>
                            <p className="text-lg font-bold">{booking.date}</p>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <p className="text-sm font-medium">Time</p>
                            </div>
                            <p className="text-lg font-bold">{booking.time}</p>
                        </div>

                        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-emerald-400" />
                                <p className="text-sm font-medium">Price</p>
                            </div>
                            <p className="text-lg font-bold text-emerald-400">
                                ${booking.price.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-primary" />
                            <p className="text-sm font-medium text-primary">
                                AI Booking Note
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            This booking was captured from {formatChannel(booking.channel)}.
                            Lumora can send reminders, confirmation messages, and follow-ups
                            based on the booking rules configured for this business.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border/60 p-5">
                    <Button variant="outline" onClick={() => onCancelBooking?.(booking)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Booking
                    </Button>

                    <Button
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => onMarkCompleted?.(booking)}
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ViewBookingModal
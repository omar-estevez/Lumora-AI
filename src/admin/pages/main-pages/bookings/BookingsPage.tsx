import { useMemo, useState } from "react"
import { currentBusinessId, mockBookings } from "@/admin/data/mock"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Calendar,
    Plus,
    MoreVertical,
    Eye,
    CheckCircle,
    XCircle,
    Trash2,
} from "lucide-react"
import type { Booking, BookingStatus } from "@/admin/types/booking"
import NewBookingModal from "./new-booking/NewBookingModal"
import ViewBookingModal from "./view-booking/ViewBookingModal"

export const BookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>(
        mockBookings.filter((item) => item.businessId === currentBusinessId)
    )

    const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all")
    const [calendarView, setCalendarView] = useState<"today" | "week" | "month">("today")

    const [isNewBookingOpen, setIsNewBookingOpen] = useState(false)
    const [isViewBookingOpen, setIsViewBookingOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)

    const filteredBookings = useMemo(() => {
        return bookings.filter((booking) => {
            return statusFilter === "all" || booking.status === statusFilter
        })
    }, [bookings, statusFilter])

    const bookingsToday = bookings.filter((booking) => booking.date === "Today").length
    const bookingsThisWeek = bookings.length
    const confirmedBookings = bookings.filter(
        (booking) => booking.status === "confirmed"
    ).length
    const pendingBookings = bookings.filter(
        (booking) => booking.status === "pending"
    ).length

    const getStatusClass = (status: BookingStatus) => {
        if (status === "confirmed") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        if (status === "pending") {
            return "bg-amber-500/20 text-amber-400 border-amber-500/30"
        }

        if (status === "completed") {
            return "bg-blue-500/20 text-blue-400 border-blue-500/30"
        }

        return "bg-red-500/20 text-red-400 border-red-500/30"
    }

    const formatStatus = (status: BookingStatus) => {
        return status.charAt(0).toUpperCase() + status.slice(1)
    }

    const updateBookingStatus = (booking: Booking, status: BookingStatus) => {
        setBookings((current) =>
            current.map((item) =>
                item.id === booking.id ? { ...item, status } : item
            )
        )
        setOpenMenuId(null)
    }

    const deleteBooking = (booking: Booking) => {
        setBookings((current) => current.filter((item) => item.id !== booking.id))
        setOpenMenuId(null)
    }

    const openViewBooking = (booking: Booking) => {
        setSelectedBooking(booking)
        setIsViewBookingOpen(true)
        setOpenMenuId(null)
    }

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="p-5 border-border/50">
                    <p className="text-sm text-muted-foreground">Bookings Today</p>
                    <p className="text-3xl font-bold mt-1">{bookingsToday}</p>
                </Card>

                <Card className="p-5 border-border/50">
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-3xl font-bold mt-1">{bookingsThisWeek}</p>
                </Card>

                <Card className="p-5 border-border/50 bg-linear-to-r from-emerald-500/5 to-transparent">
                    <p className="text-sm text-muted-foreground">Confirmed</p>
                    <p className="text-3xl font-bold mt-1 text-emerald-400">
                        {confirmedBookings}
                    </p>
                </Card>

                <Card className="p-5 border-border/50 bg-linear-to-r from-amber-500/5 to-transparent">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-3xl font-bold mt-1 text-amber-400">
                        {pendingBookings}
                    </p>
                </Card>
            </div>

            {/* Calendar Placeholder */}
            <Card className="border-border/50">
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">Booking Calendar</h3>
                        <p className="text-sm text-muted-foreground">
                            Preview bookings by day, week, or month.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {[
                            { id: "today", label: "Today" },
                            { id: "week", label: "Week" },
                            { id: "month", label: "Month" },
                        ].map((view) => (
                            <Button
                                key={view.id}
                                variant={calendarView === view.id ? "outline" : "ghost"}
                                size="sm"
                                onClick={() =>
                                    setCalendarView(view.id as "today" | "week" | "month")
                                }
                                className={calendarView === view.id ? "border-primary text-primary" : ""}
                            >
                                {view.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="p-8 text-center text-muted-foreground">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="font-medium capitalize">{calendarView} calendar view</p>
                    <p className="text-sm">
                        Google Calendar integration will sync bookings automatically.
                    </p>
                </div>
            </Card>

            {/* Upcoming Bookings */}
            <Card className="border-border/50 overflow-visible">
                <div className="p-4 border-b border-border/50 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="font-semibold">Upcoming Bookings</h3>
                        <p className="text-sm text-muted-foreground">
                            Manage appointments created manually or captured by AI.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {[
                            { id: "all", label: "All" },
                            { id: "confirmed", label: "Confirmed" },
                            { id: "pending", label: "Pending" },
                            { id: "completed", label: "Completed" },
                            { id: "cancelled", label: "Cancelled" },
                        ].map((filter) => (
                            <Button
                                key={filter.id}
                                variant={statusFilter === filter.id ? "outline" : "ghost"}
                                size="sm"
                                onClick={() =>
                                    setStatusFilter(filter.id as "all" | BookingStatus)
                                }
                                className={statusFilter === filter.id ? "border-primary text-primary" : ""}
                            >
                                {filter.label}
                            </Button>
                        ))}

                        <Button
                            size="sm"
                            onClick={() => setIsNewBookingOpen(true)}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Booking
                        </Button>
                    </div>
                </div>

                <div className="divide-y divide-border/50">
                    {filteredBookings.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold">No bookings found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing the status filter or create a new booking.
                            </p>
                        </div>
                    ) : (
                        filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>

                                    <div>
                                        <p className="font-medium">{booking.customerName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.serviceName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="font-medium">{booking.date}</p>
                                        <p className="text-sm text-muted-foreground">{booking.time}</p>
                                    </div>

                                    <span className="font-medium text-emerald-400">
                                        ${booking.price.toLocaleString()}
                                    </span>

                                    <span
                                        className={`px-2 py-1 text-xs rounded-full border capitalize ${getStatusClass(
                                            booking.status
                                        )}`}
                                    >
                                        {formatStatus(booking.status)}
                                    </span>

                                    <div className="relative">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                setOpenMenuId(openMenuId === booking.id ? null : booking.id)
                                            }
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>

                                        {openMenuId === booking.id && (
                                            <div className="absolute right-0 top-9 z-50 w-48 rounded-lg border border-border/60 bg-background shadow-xl overflow-hidden">
                                                <button
                                                    onClick={() => openViewBooking(booking)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4 text-primary" />
                                                    View Booking
                                                </button>

                                                <button
                                                    onClick={() => updateBookingStatus(booking, "completed")}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                >
                                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                    Mark Completed
                                                </button>

                                                <button
                                                    onClick={() => updateBookingStatus(booking, "cancelled")}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                                                >
                                                    <XCircle className="w-4 h-4 text-red-400" />
                                                    Cancel Booking
                                                </button>

                                                <button
                                                    onClick={() => deleteBooking(booking)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>

            <NewBookingModal
                open={isNewBookingOpen}
                businessId={currentBusinessId}
                onClose={() => setIsNewBookingOpen(false)}
                onCreate={(newBooking) => {
                    setBookings((current) => [newBooking, ...current])
                }}
            />

            <ViewBookingModal
                open={isViewBookingOpen}
                booking={selectedBooking}
                onClose={() => {
                    setIsViewBookingOpen(false)
                    setSelectedBooking(null)
                }}
                onMarkCompleted={(booking) => {
                    updateBookingStatus(booking, "completed")
                    setIsViewBookingOpen(false)
                    setSelectedBooking(null)
                }}
                onCancelBooking={(booking) => {
                    updateBookingStatus(booking, "cancelled")
                    setIsViewBookingOpen(false)
                    setSelectedBooking(null)
                }}
            />
        </div>
    )
}

export default BookingsPage
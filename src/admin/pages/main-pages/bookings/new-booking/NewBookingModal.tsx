import { useState } from "react"
import { X, Plus, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Booking, BookingStatus } from "@/admin/types/booking"
import type { ChannelType } from "@/admin/types/channel"

interface NewBookingModalProps {
    open: boolean
    businessId: string
    onClose: () => void
    onCreate: (booking: Booking) => void
}

const statusOptions: { label: string; value: BookingStatus }[] = [
    { label: "Confirmed", value: "confirmed" },
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Completed", value: "completed" },
]

const channelOptions: { label: string; value: ChannelType }[] = [
    { label: "WhatsApp", value: "whatsapp" },
    { label: "SMS", value: "sms" },
    { label: "Web Chat", value: "webchat" },
    { label: "Voice AI", value: "voice" },
    { label: "Email", value: "email" },
]

export const NewBookingModal = ({
    open,
    businessId,
    onClose,
    onCreate,
}: NewBookingModalProps) => {
    const [customerName, setCustomerName] = useState("")
    const [serviceName, setServiceName] = useState("")
    const [date, setDate] = useState("Today")
    const [time, setTime] = useState("2:00 PM")
    const [price, setPrice] = useState(149)
    const [status, setStatus] = useState<BookingStatus>("confirmed")
    const [channel, setChannel] = useState<ChannelType>("whatsapp")

    if (!open) return null

    const resetForm = () => {
        setCustomerName("")
        setServiceName("")
        setDate("Today")
        setTime("2:00 PM")
        setPrice(149)
        setStatus("confirmed")
        setChannel("whatsapp")
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!customerName.trim() || !serviceName.trim() || !date.trim() || !time.trim()) {
            return
        }

        const newBooking: Booking = {
            id: `book_${Date.now()}`,
            businessId,
            customerName,
            serviceName,
            date,
            time,
            price,
            status,
            channel,
        }

        onCreate(newBooking)
        resetForm()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background shadow-2xl">
                <div className="flex items-start justify-between border-b border-border/60 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                            <CalendarPlus className="h-5 w-5 text-primary-foreground" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">New Booking</h2>
                            <p className="text-sm text-muted-foreground">
                                Add a new customer booking manually.
                            </p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Customer Name</label>
                            <input
                                value={customerName}
                                onChange={(event) => setCustomerName(event.target.value)}
                                placeholder="Pedro Hernandez"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Service</label>
                            <input
                                value={serviceName}
                                onChange={(event) => setServiceName(event.target.value)}
                                placeholder="Full Detail"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Date</label>
                            <input
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                placeholder="Today, Tomorrow, May 28"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Time</label>
                            <input
                                value={time}
                                onChange={(event) => setTime(event.target.value)}
                                placeholder="2:00 PM"
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(event) => setPrice(Number(event.target.value))}
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Status</label>
                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value as BookingStatus)}
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">Source Channel</label>
                            <select
                                value={channel}
                                onChange={(event) => setChannel(event.target.value as ChannelType)}
                                className="w-full rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-sm outline-none focus:border-primary"
                            >
                                {channelOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                !customerName.trim() ||
                                !serviceName.trim() ||
                                !date.trim() ||
                                !time.trim()
                            }
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Booking
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewBookingModal
import type { Booking } from "@/admin/types/booking"
import { currentBusinessId } from "./mockBusiness"

export const mockBookings: Booking[] = [
    {
        id: "book_001",
        businessId: currentBusinessId,
        customerName: "Pedro Hernandez",
        serviceName: "Full Detail",
        date: "Today",
        time: "2:00 PM",
        price: 149,
        status: "confirmed",
        channel: "whatsapp",
    },
    {
        id: "book_002",
        businessId: currentBusinessId,
        customerName: "Sofia Torres",
        serviceName: "Express Wash",
        date: "Today",
        time: "4:30 PM",
        price: 29,
        status: "confirmed",
        channel: "sms",
    },
    {
        id: "book_003",
        businessId: currentBusinessId,
        customerName: "Diego Ramirez",
        serviceName: "Polish and Wax",
        date: "Tomorrow",
        time: "10:00 AM",
        price: 199,
        status: "pending",
        channel: "webchat",
    },
    {
        id: "book_004",
        businessId: currentBusinessId,
        customerName: "Elena Morales",
        serviceName: "Interior Cleaning",
        date: "Tomorrow",
        time: "2:00 PM",
        price: 79,
        status: "confirmed",
        channel: "whatsapp",
    },
]
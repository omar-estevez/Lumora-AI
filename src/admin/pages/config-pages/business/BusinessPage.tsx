import { useState } from "react"
import { BusinessProfile } from "./business-profile/BusinessProfile"
import type { BusinessDay, BusinessFaq, BusinessService, EscalationRuleKey } from "@/admin/types"
import { ServicesPricing } from "./services-pricing/ServicesPricing"
import { BusinessHours } from "./business-hours/BusinessHours"
import { AiAssistant } from "./ai-assistant/AiAssistant"
import { BusinessFaqs } from "./business-faqs/BusinessFaqs"
import { BookingRules } from "./booking-rules/BookingRules"
import { EscalationRules } from "./escalation-rules/EscalationRules"

const defaultServices: BusinessService[] = [
    {
        id: "service_001",
        name: "Full Detail",
        description: "Complete interior and exterior detail.",
        price: 149,
        durationMinutes: 150,
    },
]

const defaultFaqs: BusinessFaq[] = [
    {
        id: "faq_001",
        question: "Do you go to the customer’s location?",
        answer:
            "Yes, we provide mobile detailing in Houston and surrounding areas.",
    },
    {
        id: "faq_002",
        question: "What payment methods do you accept?",
        answer: "We accept cash, Zelle, and card payments.",
    },
]

const defaultHours: BusinessDay[] = [
    { day: "Monday", open: "09:00", close: "18:00", enabled: true },
    { day: "Tuesday", open: "09:00", close: "18:00", enabled: true },
    { day: "Wednesday", open: "09:00", close: "18:00", enabled: true },
    { day: "Thursday", open: "09:00", close: "18:00", enabled: true },
    { day: "Friday", open: "09:00", close: "18:00", enabled: true },
    { day: "Saturday", open: "09:00", close: "18:00", enabled: true },
    { day: "Sunday", open: "09:00", close: "18:00", enabled: false },
]

export const BusinessPage = () => {
    const [businessProfile, setBusinessProfile] = useState({
        businessName: "AutoPro Detailing",
        industry: "Auto Detailing",
        address: "1234 street rd, LA, Cali, 75123",
        email: "info@autopro.com",
        phone: "+1 555-123-4567",
        website: "https://www.autopro-detailing.com",
    })

    const [services, setServices] = useState<BusinessService[]>(defaultServices)
    const [newService, setNewService] = useState({
        name: "",
        description: "",
        price: "",
        durationMinutes: "",
    })

    const [businessHours, setBusinessHours] =
        useState<BusinessDay[]>(defaultHours)

    const [aiAssistant, setAiAssistant] = useState({
        name: "Sofia",
        tone: "Friendly",
        goal: "Capture leads and book appointments",
        language: "English",
        responseStyle: "Short, clear, sales-focused",
        instructions:
            "Always greet customers politely. Ask what service they need, what vehicle they have, and their preferred date/time. If the customer asks for pricing, provide starting prices and offer to book an appointment. If the customer sounds upset, escalate to a human.",
    })

    const [faqs, setFaqs] = useState<BusinessFaq[]>(defaultFaqs)
    const [newFaq, setNewFaq] = useState({
        question: "",
        answer: "",
    })

    const [bookingRules, setBookingRules] = useState({
        minimumNotice: "1 hour",
        bufferTime: "15 minutes",
        requireDeposit: "Yes",
        bookingLink: "https://calendly.com/your-business/booking",
    })

    const [escalationRules, setEscalationRules] = useState<
        Record<EscalationRuleKey, boolean>
    >({
        refund: true,
        angry: true,
        customPricing: true,
        human: true,
        lowConfidence: true,
    })

    const [escalationContact, setEscalationContact] = useState({
        phone: "+1 (346) 555-1234",
        email: "owner@business.com",
    })

    const [savedMessage, setSavedMessage] = useState("")

    const showSavedMessage = (message: string) => {
        setSavedMessage(message)

        window.setTimeout(() => {
            setSavedMessage("")
        }, 2500)
    }

    const addService = () => {
        if (
            !newService.name.trim() ||
            !newService.description.trim() ||
            !newService.price ||
            !newService.durationMinutes
        ) {
            return
        }

        const service: BusinessService = {
            id: `service_${Date.now()}`,
            name: newService.name,
            description: newService.description,
            price: Number(newService.price),
            durationMinutes: Number(newService.durationMinutes),
        }

        setServices((current) => [service, ...current])
        setNewService({
            name: "",
            description: "",
            price: "",
            durationMinutes: "",
        })
    }

    const deleteService = (serviceId: string) => {
        setServices((current) =>
            current.filter((service) => service.id !== serviceId)
        )
    }

    const updateBusinessHour = (
        day: string,
        field: keyof Omit<BusinessDay, "day">,
        value: string | boolean
    ) => {
        setBusinessHours((current) =>
            current.map((item) =>
                item.day === day ? { ...item, [field]: value } : item
            )
        )
    }

    const addFaq = () => {
        if (!newFaq.question.trim() || !newFaq.answer.trim()) return

        const faq: BusinessFaq = {
            id: `faq_${Date.now()}`,
            question: newFaq.question,
            answer: newFaq.answer,
        }

        setFaqs((current) => [faq, ...current])
        setNewFaq({
            question: "",
            answer: "",
        })
    }

    const deleteFaq = (faqId: string) => {
        setFaqs((current) => current.filter((faq) => faq.id !== faqId))
    }

    const toggleEscalationRule = (rule: EscalationRuleKey) => {
        setEscalationRules((current) => ({
            ...current,
            [rule]: !current[rule],
        }))
    }

    const inputClass =
        "w-full rounded-lg border border-border/50 bg-secondary/50 px-4 py-3 text-sm outline-none focus:border-primary"

    const smallSelectClass =
        "rounded-lg border border-border/50 bg-secondary px-4 py-2 text-sm outline-none focus:border-primary"

    const sectionHeader = (
        icon: React.ReactNode,
        title: string,
        description?: string
    ) => (
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {icon}
            </div>

            <div>
                <h3 className="font-semibold">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Business Settings</h2>
                    <p className="text-sm text-muted-foreground">
                        Configure the business information Lumora uses to answer customers,
                        book appointments, and escalate cases.
                    </p>
                </div>

                {savedMessage && (
                    <span className="fixed right-5 top-1/16 rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
                        {savedMessage}
                    </span>
                )}
            </div>

            {/* General Information */}
            <BusinessProfile businessProfile={businessProfile} setBusinessProfile={setBusinessProfile} inputClass={inputClass} sectionHeader={sectionHeader} showSavedMessage={showSavedMessage} />

            {/* Services */}
            <ServicesPricing sectionHeader={sectionHeader} services={services} deleteService={deleteService} newService={newService} setNewService={setNewService} inputClass={inputClass} addService={addService} />

            {/* Business Hours */}
            <BusinessHours sectionHeader={sectionHeader} businessHours={businessHours} updateBusinessHour={updateBusinessHour} />

            {/* AI Assistant */}
            <AiAssistant sectionHeader={sectionHeader} aiAssistant={aiAssistant} setAiAssistant={setAiAssistant} inputClass={inputClass} smallSelectClass={smallSelectClass} showSavedMessage={showSavedMessage} />

            {/* FAQs */}
            <BusinessFaqs sectionHeader={sectionHeader} faqs={faqs} deleteFaq={deleteFaq} newFaq={newFaq} setNewFaq={setNewFaq} inputClass={inputClass} addFaq={addFaq} />

            {/* Booking Rules */}
            <BookingRules sectionHeader={sectionHeader} inputClass={inputClass} smallSelectClass={smallSelectClass} showSavedMessage={showSavedMessage} bookingRules={bookingRules} setBookingRules={setBookingRules} />

            {/* Escalation Rules */}
            <EscalationRules sectionHeader={sectionHeader} inputClass={inputClass} showSavedMessage={showSavedMessage} escalationContact={escalationContact} setEscalationContact={setEscalationContact} escalationRules={escalationRules} toggleEscalationRule={toggleEscalationRule} />
        </div>
    )
}

export default BusinessPage
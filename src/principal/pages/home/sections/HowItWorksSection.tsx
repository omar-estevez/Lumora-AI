import { motion } from "framer-motion"
import { MessageSquare, Bot, Calendar, Clock } from "lucide-react"

const steps = [
    {
        number: "01",
        title: "Customer Messages",
        description: "A customer reaches out via WhatsApp, SMS, or phone call with a question or booking request.",
        icon: MessageSquare
    },
    {
        number: "02",
        title: "AI Responds Instantly",
        description: "Our AI understands the context, answers questions accurately, and guides the conversation naturally.",
        icon: Bot
    },
    {
        number: "03",
        title: "Booking Created",
        description: "Appointments are scheduled automatically, synced to your calendar, and confirmations are sent.",
        icon: Calendar
    }
]

export const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="py-20 lg:py-32 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Simple Process</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        How It Works
                    </h2>
                    <p className="text-lg text-muted-foreground text-pretty">
                        From customer inquiry to booked appointment in seconds—all automated.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-linear-to-r from-primary/50 to-transparent z-0" />
                            )}
                            <div className="relative z-10 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent mb-6 glow">
                                    <step.icon className="w-8 h-8 text-primary-foreground" />
                                </div>
                                <div className="text-sm text-primary font-mono mb-2">{step.number}</div>
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground text-pretty">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { MessageSquare, MessageCircle, Phone, Calendar, Users, Zap, BarChart3, Shield, Sparkles } from "lucide-react"

const features = [
    {
        icon: MessageSquare,
        title: "AI Chat",
        description: "Intelligent conversations that understand context and provide accurate, helpful responses to customer inquiries."
    },
    {
        icon: MessageCircle,
        title: "WhatsApp AI",
        description: "Automated WhatsApp responses with rich media support, quick replies, and seamless conversation flows."
    },
    {
        icon: Phone,
        title: "Voice AI",
        description: "Natural-sounding voice calls that handle inquiries, take messages, and route important calls to you."
    },
    {
        icon: Calendar,
        title: "Automated Booking",
        description: "Smart scheduling that syncs with your calendar, handles rescheduling, and sends automatic reminders."
    },
    {
        icon: Users,
        title: "Lead Capture",
        description: "Never lose a potential customer. Capture contact info, preferences, and inquiry details automatically."
    },
    {
        icon: Zap,
        title: "Smart Follow-Ups",
        description: "Automated follow-up sequences that nurture leads and re-engage customers at the perfect time."
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Real-time insights into conversations, conversions, peak hours, and customer satisfaction metrics."
    },
    {
        icon: Shield,
        title: "CRM Integration",
        description: "Seamlessly connect with your existing tools. Sync contacts, notes, and conversation history automatically."
    },
]

export const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Powerful Features</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Everything You Need to
                        <br />
                        <span className="text-gradient">Automate Customer Service</span>
                    </h2>
                    <p className="text-lg text-muted-foreground text-pretty">
                        A complete AI-powered communication platform designed specifically for local businesses.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="group h-full glass hover:bg-card/80 transition-all duration-300 border-border/50 hover:border-primary/30 p-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

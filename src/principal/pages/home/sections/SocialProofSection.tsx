import { motion } from 'framer-motion'
import { Car, Home, Stethoscope, Trees, Truck, UtensilsCrossed } from 'lucide-react'

const logos = [
    { name: "AutoPro", icon: Car },
    { name: "SpeedTow", icon: Truck },
    { name: "RoofMaster", icon: Home },
    { name: "GreenScape", icon: Trees },
    { name: "HealthFirst", icon: Stethoscope },
    { name: "TasteBite", icon: UtensilsCrossed },
]

const stats = [
    { value: "500K+", label: "Messages Handled" },
    { value: "98.7%", label: "Response Rate" },
    { value: "24/7", label: "Availability" },
    { value: "2.3s", label: "Avg Response Time" },
]

export const SocialProofSection = () => {
    return (
        <section className="py-20 lg:py-32 border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">Trusted by Local Businesses</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
                        {logos.map((logo, index) => (
                            <motion.div
                                key={logo.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                            >
                                <logo.icon className="w-5 h-5" />
                                <span className="font-semibold">{logo.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl lg:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

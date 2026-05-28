import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Car, Truck, Home, Trees, Stethoscope, UtensilsCrossed, Star } from "lucide-react"

const industries = [
    { name: "Auto Detailing", description: "Mobile detailers and car wash services", icon: Car },
    { name: "Towing Services", description: "Emergency towing and roadside assistance", icon: Truck },
    { name: "Roofing", description: "Roofing contractors and repair services", icon: Home },
    { name: "Landscaping", description: "Lawn care and landscaping companies", icon: Trees },
    { name: "Medical Clinics", description: "Dental, chiropractic, and health clinics", icon: Stethoscope },
    { name: "Restaurants", description: "Reservations and takeout orders", icon: UtensilsCrossed },
]

export const IndustriesSection = () => {
    return (
        <section id="industries" className="py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Built For You</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Perfect for
                        <span className="text-gradient"> Local Businesses</span>
                    </h2>
                    <p className="text-lg text-muted-foreground text-pretty">
                        Pre-configured for your industry with customized responses and booking flows.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={industry.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group glass hover:bg-card/80 transition-all duration-300 border-border/50 hover:border-primary/30 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <industry.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{industry.name}</h3>
                                        <p className="text-sm text-muted-foreground">{industry.description}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

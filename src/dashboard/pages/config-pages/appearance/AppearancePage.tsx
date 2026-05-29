import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Moon, ToggleRight } from "lucide-react"

export const AppearancePage = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Appearance</h2>

            <Card className="border-border/50">
                <div className="p-4 border-b border-border/50">
                    <h3 className="font-semibold">Theme</h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Moon className="w-5 h-5" />
                            <div>
                                <p className="font-medium">Dark Mode</p>
                                <p className="text-sm text-muted-foreground">Use dark theme</p>
                            </div>
                        </div>
                        <Button variant="ghost">
                            <ToggleRight className="w-8 h-8 text-primary" />
                        </Button>
                    </div>
                </div>
            </Card>

            <Card className="border-border/50">
                <div className="p-4 border-b border-border/50">
                    <h3 className="font-semibold">Brand Color</h3>
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-4">
                        {["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"].map((color) => (
                            <button
                                key={color}
                                className="w-10 h-10 rounded-full border-2 border-transparent hover:border-foreground/50 transition-colors"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default AppearancePage;

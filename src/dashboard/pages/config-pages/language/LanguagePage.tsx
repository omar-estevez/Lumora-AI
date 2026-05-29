import { Card } from "@/components/ui/card"

export const LanguagePage = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Language and Region</h2>

            <Card className="border-border/50">
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Interface Language</p>
                            <p className="text-sm text-muted-foreground">Dashboard language</p>
                        </div>
                        <select className="bg-secondary px-4 py-2 rounded-lg border border-border/50">
                            <option>Spanish</option>
                            <option>English</option>
                            <option>Portuguese</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Bot Language</p>
                            <p className="text-sm text-muted-foreground">Automatic response language</p>
                        </div>
                        <select className="bg-secondary px-4 py-2 rounded-lg border border-border/50">
                            <option>Spanish</option>
                            <option>English</option>
                            <option>Multilingual (Auto-detect)</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Time Zone</p>
                            <p className="text-sm text-muted-foreground">For schedules and reports</p>
                        </div>
                        <select className="bg-secondary px-4 py-2 rounded-lg border border-border/50">
                            <option>America/New_York (EST)</option>
                            <option>America/Los_Angeles (PST)</option>
                            <option>America/Mexico_City (CST)</option>
                        </select>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default LanguagePage;
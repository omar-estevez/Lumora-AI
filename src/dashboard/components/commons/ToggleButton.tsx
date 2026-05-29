import { Button } from "@/components/ui/button"
import { ToggleRight, ToggleLeft } from "lucide-react"

interface ToggleProps {
    enabled: boolean
    onClick: () => void
}

export const ToggleButton = ({
    enabled,
    onClick,
}: ToggleProps) => {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            className={enabled ? "text-primary" : "text-muted-foreground"}
        >
            {enabled ? (
                <ToggleRight className="h-8 w-8" />
            ) : (
                <ToggleLeft className="h-8 w-8" />
            )}
        </Button>
    )
}
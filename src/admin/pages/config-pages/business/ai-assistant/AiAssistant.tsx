import type { AiAssistantType } from "@/admin/types";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Save } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface AiAssistantProps {
    sectionHeader: (
        icon: ReactNode,
        title: string,
        description?: string
    ) => ReactNode;
    aiAssistant: AiAssistantType;
    setAiAssistant: Dispatch<SetStateAction<AiAssistantType>>;
    inputClass: string;
    smallSelectClass: string;
    showSavedMessage: (message: string) => void;
}
export const AiAssistant = ({ sectionHeader, aiAssistant, setAiAssistant, inputClass, smallSelectClass, showSavedMessage }: AiAssistantProps) => {

    return (
        <Card className="border-border/50">
            <div className="border-b border-border/50 p-4">
                {sectionHeader(
                    <Brain className="h-5 w-5" />,
                    "AI Assistant",
                    "Define how Lumora should speak and act with customers."
                )}
            </div>

            <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            AI Assistant Name
                        </label>
                        <input
                            value={aiAssistant.name}
                            onChange={(event) =>
                                setAiAssistant({
                                    ...aiAssistant,
                                    name: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Tone</label>
                        <select
                            value={aiAssistant.tone}
                            onChange={(event) =>
                                setAiAssistant({
                                    ...aiAssistant,
                                    tone: event.target.value,
                                })
                            }
                            className={smallSelectClass}
                        >
                            <option>Friendly</option>
                            <option>Professional</option>
                            <option>Sales-focused</option>
                            <option>Luxury</option>
                            <option>Casual</option>
                            <option>Bilingual</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Main Goal
                        </label>
                        <input
                            value={aiAssistant.goal}
                            onChange={(event) =>
                                setAiAssistant({
                                    ...aiAssistant,
                                    goal: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Language
                        </label>
                        <select
                            value={aiAssistant.language}
                            onChange={(event) =>
                                setAiAssistant({
                                    ...aiAssistant,
                                    language: event.target.value,
                                })
                            }
                            className={smallSelectClass}
                        >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>Bilingual</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Response Style
                    </label>
                    <input
                        value={aiAssistant.responseStyle}
                        onChange={(event) =>
                            setAiAssistant({
                                ...aiAssistant,
                                responseStyle: event.target.value,
                            })
                        }
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Tell Lumora how the AI should respond to customers
                    </label>
                    <textarea
                        rows={4}
                        value={aiAssistant.instructions}
                        onChange={(event) =>
                            setAiAssistant({
                                ...aiAssistant,
                                instructions: event.target.value,
                            })
                        }
                        className={`${inputClass} resize-none`}
                    />
                </div>

                <Button
                    onClick={() => showSavedMessage("AI assistant settings saved")}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </Card>
    )
}

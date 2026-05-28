import type { EscalationContactTypes, EscalationRuleKey } from "@/admin/types";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Save, ShieldAlert, ToggleLeft, ToggleRight } from "lucide-react"
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface EscalationRulesProps {
    sectionHeader: (
        icon: ReactNode,
        title: string,
        description?: string
    ) => ReactNode;
    inputClass: string;
    showSavedMessage: (message: string) => void;
    escalationContact: EscalationContactTypes;
    setEscalationContact: Dispatch<SetStateAction<EscalationContactTypes>>;
    escalationRules: Record<EscalationRuleKey, boolean>;
    toggleEscalationRule: (rule: EscalationRuleKey) => void;
}

export const EscalationRules = ({ sectionHeader, inputClass, showSavedMessage, escalationContact, setEscalationContact, escalationRules, toggleEscalationRule }: EscalationRulesProps) => {
    return (
        <Card className="border-border/50">
            <div className="border-b border-border/50 p-4">
                {sectionHeader(
                    <ShieldAlert className="h-5 w-5" />,
                    "Escalation Rules",
                    "Decide when the AI should send the conversation to a human."
                )}
            </div>

            <div className="space-y-4 p-4">
                {[
                    {
                        key: "refund",
                        label: "Customer asks for refund",
                    },
                    {
                        key: "angry",
                        label: "Customer is angry",
                    },
                    {
                        key: "customPricing",
                        label: "Customer requests custom pricing",
                    },
                    {
                        key: "human",
                        label: "Customer wants to speak with a person",
                    },
                    {
                        key: "lowConfidence",
                        label: "AI confidence is below 70%",
                    },
                ].map((rule) => (
                    <div
                        key={rule.key}
                        className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/10 p-3"
                    >
                        <div>
                            <p className="font-medium">{rule.label}</p>
                            <p className="text-xs text-muted-foreground">
                                {escalationRules[rule.key as EscalationRuleKey]
                                    ? "Enabled"
                                    : "Disabled"}
                            </p>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                toggleEscalationRule(rule.key as EscalationRuleKey)
                            }
                        >
                            {escalationRules[rule.key as EscalationRuleKey] ? (
                                <ToggleRight className="h-7 w-7 text-primary" />
                            ) : (
                                <ToggleLeft className="h-7 w-7 text-muted-foreground" />
                            )}
                        </Button>
                    </div>
                ))}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Escalation Phone Number
                        </label>
                        <input
                            type="tel"
                            value={escalationContact.phone}
                            onChange={(event) =>
                                setEscalationContact({
                                    ...escalationContact,
                                    phone: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Escalation Email
                        </label>
                        <input
                            type="email"
                            value={escalationContact.email}
                            onChange={(event) =>
                                setEscalationContact({
                                    ...escalationContact,
                                    email: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>
                </div>

                <Button
                    onClick={() => showSavedMessage("Escalation settings saved")}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </Card>
    )
}

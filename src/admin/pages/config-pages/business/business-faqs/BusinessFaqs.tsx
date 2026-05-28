import type { BusinessFaq, BusinessNewFaq } from "@/admin/types";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Plus, CircleQuestionMark } from "lucide-react"
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface FaqsProps {
    sectionHeader: (
        icon: ReactNode,
        title: string,
        description?: string
    ) => ReactNode;
    faqs: BusinessFaq[];
    deleteFaq: (faqId: string) => void;
    newFaq: BusinessNewFaq;
    setNewFaq: Dispatch<SetStateAction<BusinessNewFaq>>;
    inputClass: string;
    addFaq: () => void;
}

export const BusinessFaqs = ({ sectionHeader, faqs, deleteFaq, newFaq, setNewFaq, inputClass, addFaq }: FaqsProps) => {
    return (
        <Card className="border-border/50">
            <div className="border-b border-border/50 p-4">
                {sectionHeader(
                    <CircleQuestionMark className="h-5 w-5" />,
                    "FAQs",
                    "Common questions the AI can answer automatically."
                )}
            </div>

            <div className="space-y-4 p-4">
                {faqs.map((faq) => (
                    <div
                        key={faq.id}
                        className="rounded-lg border border-border/50 bg-linear-to-r from-primary/5 to-accent/5 p-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="mb-1 flex items-center gap-2 text-primary">
                                    <CircleQuestionMark className="h-4 w-4" />
                                    <p className="font-medium">{faq.question}</p>
                                </div>

                                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteFaq(faq.id)}
                                className="text-red-400 hover:text-red-300"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
                    <h4 className="mb-4 font-semibold">Add New Question</h4>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Question
                            </label>
                            <input
                                value={newFaq.question}
                                onChange={(event) =>
                                    setNewFaq({
                                        ...newFaq,
                                        question: event.target.value,
                                    })
                                }
                                placeholder="Example: Do you offer same-day service?"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Answer
                            </label>
                            <textarea
                                rows={3}
                                value={newFaq.answer}
                                onChange={(event) =>
                                    setNewFaq({
                                        ...newFaq,
                                        answer: event.target.value,
                                    })
                                }
                                placeholder="Write the answer customers should receive."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <Button
                            onClick={addFaq}
                            disabled={!newFaq.question.trim() || !newFaq.answer.trim()}
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Question
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

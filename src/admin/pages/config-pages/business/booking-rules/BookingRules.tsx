import type { BusinessBookingTypes } from "@/admin/types";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CalendarClock, Save } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface BookingRulesProps {
    sectionHeader: (
        icon: ReactNode,
        title: string,
        description?: string
    ) => ReactNode;
    inputClass: string;
    smallSelectClass: string;
    showSavedMessage: (message: string) => void;
    bookingRules: BusinessBookingTypes;
    setBookingRules: Dispatch<SetStateAction<BusinessBookingTypes>>;
}

export const BookingRules = ({ sectionHeader, inputClass, smallSelectClass, showSavedMessage, bookingRules, setBookingRules }: BookingRulesProps) => {
    return (
        <Card className="border-border/50">
            <div className="border-b border-border/50 p-4">
                {sectionHeader(
                    <CalendarClock className="h-5 w-5" />,
                    "Booking Rules",
                    "Control how appointments are scheduled."
                )}
            </div>

            <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Minimum Notice
                        </label>
                        <select
                            value={bookingRules.minimumNotice}
                            onChange={(event) =>
                                setBookingRules({
                                    ...bookingRules,
                                    minimumNotice: event.target.value,
                                })
                            }
                            className={smallSelectClass}
                        >
                            <option>1 hour</option>
                            <option>2 hours</option>
                            <option>3 hours</option>
                            <option>24 hours</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Buffer Time
                        </label>
                        <select
                            value={bookingRules.bufferTime}
                            onChange={(event) =>
                                setBookingRules({
                                    ...bookingRules,
                                    bufferTime: event.target.value,
                                })
                            }
                            className={smallSelectClass}
                        >
                            <option>15 minutes</option>
                            <option>30 minutes</option>
                            <option>60 minutes</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Require Deposit
                        </label>
                        <select
                            value={bookingRules.requireDeposit}
                            onChange={(event) =>
                                setBookingRules({
                                    ...bookingRules,
                                    requireDeposit: event.target.value,
                                })
                            }
                            className={smallSelectClass}
                        >
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Booking Link
                        </label>
                        <input
                            value={bookingRules.bookingLink}
                            onChange={(event) =>
                                setBookingRules({
                                    ...bookingRules,
                                    bookingLink: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>
                </div>

                <Button
                    onClick={() => showSavedMessage("Booking rules saved")}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </Card>
    )
}

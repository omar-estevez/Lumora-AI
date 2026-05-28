import type { BusinessProfileType } from '@/admin/types';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BriefcaseBusiness, Save } from 'lucide-react'
import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface ProfileProps {
    businessProfile: BusinessProfileType;
    setBusinessProfile: Dispatch<SetStateAction<BusinessProfileType>>;
    inputClass: string;
    sectionHeader: (
        icon: ReactNode,
        title: string,
        description?: string
    ) => ReactNode;
    showSavedMessage: (message: string) => void;
}

export const BusinessProfile = ({ businessProfile, setBusinessProfile, inputClass, sectionHeader, showSavedMessage }: ProfileProps) => {

    return (
        <Card className="border-border/50">
            <div className="border-b border-border/50 p-4">
                {sectionHeader(
                    <BriefcaseBusiness className="h-5 w-5" />,
                    "General Information",
                    "Basic information about the business."
                )}
            </div>

            <div className="space-y-4 p-4">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Business Name
                    </label>
                    <input
                        value={businessProfile.businessName}
                        onChange={(event) =>
                            setBusinessProfile({
                                ...businessProfile,
                                businessName: event.target.value,
                            })
                        }
                        className={inputClass}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Industry
                        </label>
                        <input
                            value={businessProfile.industry}
                            onChange={(event) =>
                                setBusinessProfile({
                                    ...businessProfile,
                                    industry: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Business Address
                        </label>
                        <input
                            value={businessProfile.address}
                            onChange={(event) =>
                                setBusinessProfile({
                                    ...businessProfile,
                                    address: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={businessProfile.email}
                            onChange={(event) =>
                                setBusinessProfile({
                                    ...businessProfile,
                                    email: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Phone</label>
                        <input
                            type="tel"
                            value={businessProfile.phone}
                            onChange={(event) =>
                                setBusinessProfile({
                                    ...businessProfile,
                                    phone: event.target.value,
                                })
                            }
                            className={inputClass}
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">Website</label>
                    <input
                        value={businessProfile.website}
                        onChange={(event) =>
                            setBusinessProfile({
                                ...businessProfile,
                                website: event.target.value,
                            })
                        }
                        className={inputClass}
                    />
                </div>

                <Button
                    onClick={() => showSavedMessage("Business profile saved")}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </Card>
    )
}

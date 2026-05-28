import type { BusinessNewService, BusinessService } from "@/admin/types";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Toolbox, Trash2 } from "lucide-react"
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface ServicesProps {
    sectionHeader: (
        icon: ReactNode,
        title: string,
        description?: string
    ) => ReactNode;
    services: BusinessService[];
    deleteService: (serviceId: string) => void;
    newService: BusinessNewService;
    setNewService: Dispatch<SetStateAction<BusinessNewService>>;
    inputClass: string;
    addService: () => void;
}

export const ServicesPricing = ({ sectionHeader, services, deleteService, newService, setNewService, inputClass, addService }: ServicesProps) => {

    return (
        <Card className="border-border/50">
            <div className="border-b border-border/50 p-4">
                {sectionHeader(
                    <Toolbox className="h-5 w-5" />,
                    "Services & Pricing",
                    "Services the AI can quote and recommend."
                )}
            </div>

            <div className="space-y-4 p-4">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="relative rounded-lg border border-border/50 bg-linear-to-r from-primary/5 to-accent/5 p-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="mb-1 flex items-center gap-2 text-primary">
                                    <Toolbox className="h-4 w-4" />
                                    <p className="font-semibold">{service.name}</p>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {service.description}
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Price: ${service.price} / Duration:{" "}
                                    {service.durationMinutes} min
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteService(service.id)}
                                className="text-red-400 hover:text-red-300"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="rounded-xl border border-border/50 bg-secondary/20 p-4">
                    <h4 className="mb-4 font-semibold">Add New Service</h4>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Service Name
                            </label>
                            <input
                                value={newService.name}
                                onChange={(event) =>
                                    setNewService({
                                        ...newService,
                                        name: event.target.value,
                                    })
                                }
                                placeholder="Example: Interior Cleaning"
                                className={inputClass}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={newService.price}
                                    onChange={(event) =>
                                        setNewService({
                                            ...newService,
                                            price: event.target.value,
                                        })
                                    }
                                    placeholder="149"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Duration
                                </label>
                                <input
                                    type="number"
                                    value={newService.durationMinutes}
                                    onChange={(event) =>
                                        setNewService({
                                            ...newService,
                                            durationMinutes: event.target.value,
                                        })
                                    }
                                    placeholder="120"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Service Description
                            </label>
                            <textarea
                                rows={3}
                                value={newService.description}
                                onChange={(event) =>
                                    setNewService({
                                        ...newService,
                                        description: event.target.value,
                                    })
                                }
                                placeholder="Professional vehicle detailing service."
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <Button
                            onClick={addService}
                            disabled={
                                !newService.name.trim() ||
                                !newService.description.trim() ||
                                !newService.price ||
                                !newService.durationMinutes
                            }
                            className="bg-primary hover:bg-primary/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Service
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

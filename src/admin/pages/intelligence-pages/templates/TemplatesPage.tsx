import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Plus,
    FileText,
    Edit3,
    Copy,
    Trash2,
    Eye,
    Search,
} from "lucide-react"

import { currentBusinessId, mockTemplates } from "@/admin/data/mock"
import type {
    MessageTemplate,
    TemplateCategory,
    TemplateStatus,
} from "@/admin/types/template"
import TemplateModal from "./template-modal/TemplateModal"

const categoryFilters: { label: string; value: "all" | TemplateCategory }[] = [
    { label: "All", value: "all" },
    { label: "Welcome", value: "welcome" },
    { label: "Sales", value: "sales" },
    { label: "Booking", value: "booking" },
    { label: "Reminder", value: "reminder" },
    { label: "Follow-up", value: "follow_up" },
    { label: "Support", value: "support" },
]

const statusFilters: { label: string; value: "all" | TemplateStatus }[] = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Paused", value: "paused" },
]

export const TemplatesPage = () => {
    const [templates, setTemplates] = useState<MessageTemplate[]>(
        mockTemplates.filter((template) => template.businessId === currentBusinessId)
    )

    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] =
        useState<"all" | TemplateCategory>("all")
    const [activeStatus, setActiveStatus] =
        useState<"all" | TemplateStatus>("all")

    const [modalMode, setModalMode] =
        useState<"create" | "edit" | "view">("create")
    const [selectedTemplate, setSelectedTemplate] =
        useState<MessageTemplate | null>(null)
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)

    const filteredTemplates = useMemo(() => {
        return templates.filter((template) => {
            const matchesSearch =
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.content.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesCategory =
                activeCategory === "all" || template.category === activeCategory

            const matchesStatus =
                activeStatus === "all" || template.status === activeStatus

            return matchesSearch && matchesCategory && matchesStatus
        })
    }, [templates, searchTerm, activeCategory, activeStatus])

    const formatCategory = (category: TemplateCategory) => {
        if (category === "follow_up") return "Follow-up"

        return category.charAt(0).toUpperCase() + category.slice(1)
    }

    const getStatusClass = (status: TemplateStatus) => {
        if (status === "active") {
            return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }

        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    }

    const openCreateModal = () => {
        setSelectedTemplate(null)
        setModalMode("create")
        setIsTemplateModalOpen(true)
    }

    const openEditModal = (template: MessageTemplate) => {
        setSelectedTemplate(template)
        setModalMode("edit")
        setIsTemplateModalOpen(true)
    }

    const openViewModal = (template: MessageTemplate) => {
        setSelectedTemplate(template)
        setModalMode("view")
        setIsTemplateModalOpen(true)
    }

    const saveTemplate = (template: MessageTemplate) => {
        setTemplates((current) => {
            const exists = current.some((item) => item.id === template.id)

            if (exists) {
                return current.map((item) =>
                    item.id === template.id ? template : item
                )
            }

            return [template, ...current]
        })
    }

    const duplicateTemplate = (template: MessageTemplate) => {
        const duplicated: MessageTemplate = {
            ...template,
            id: `tpl_${Date.now()}`,
            name: `${template.name} Copy`,
            uses: 0,
            createdAt: "Just now",
        }

        setTemplates((current) => [duplicated, ...current])
    }

    const deleteTemplate = (templateId: string) => {
        setTemplates((current) =>
            current.filter((template) => template.id !== templateId)
        )
    }

    const toggleTemplateStatus = (template: MessageTemplate) => {
        setTemplates((current) =>
            current.map((item) =>
                item.id === template.id
                    ? {
                        ...item,
                        status: item.status === "active" ? "paused" : "active",
                    }
                    : item
            )
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Message Templates</h2>
                    <p className="text-sm text-muted-foreground">
                        Create reusable AI messages for sales, bookings, reminders, and follow-ups.
                    </p>
                </div>

                <Button
                    size="sm"
                    onClick={openCreateModal}
                    className="bg-primary hover:bg-primary/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Template
                </Button>
            </div>

            {/* Filters */}
            <Card className="border-border/50 p-4">
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search templates..."
                            className="w-full rounded-lg border border-border/60 bg-secondary/30 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {categoryFilters.map((filter) => (
                            <Button
                                key={filter.value}
                                variant={activeCategory === filter.value ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => setActiveCategory(filter.value)}
                                className={
                                    activeCategory === filter.value
                                        ? "border-primary text-primary"
                                        : ""
                                }
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {statusFilters.map((filter) => (
                            <Button
                                key={filter.value}
                                variant={activeStatus === filter.value ? "outline" : "ghost"}
                                size="sm"
                                onClick={() => setActiveStatus(filter.value)}
                                className={
                                    activeStatus === filter.value
                                        ? "border-primary text-primary"
                                        : ""
                                }
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Templates List */}
            <Card className="border-border/50 overflow-hidden">
                <div className="divide-y divide-border/50">
                    {filteredTemplates.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/40">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <h3 className="font-semibold">No templates found</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing the search, category, or status filters.
                            </p>
                        </div>
                    ) : (
                        filteredTemplates.map((template) => (
                            <div
                                key={template.id}
                                className="p-4 hover:bg-secondary/30 transition-colors"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="font-semibold">{template.name}</p>

                                                <span className="rounded-full border border-border/50 bg-secondary/40 px-2 py-0.5 text-xs text-muted-foreground">
                                                    {formatCategory(template.category)}
                                                </span>
                                            </div>

                                            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                                                {template.content}
                                            </p>

                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {template.channels.map((channel) => (
                                                    <span
                                                        key={channel}
                                                        className="rounded-full bg-primary/10 px-2 py-0.5 text-xs capitalize text-primary"
                                                    >
                                                        {channel === "webchat" ? "Web Chat" : channel}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                                        <div className="text-right">
                                            <p className="text-sm font-medium">
                                                {template.uses.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">uses</p>
                                        </div>

                                        <button
                                            onClick={() => toggleTemplateStatus(template)}
                                            className={`rounded-full border px-2 py-1 text-xs capitalize ${getStatusClass(
                                                template.status
                                            )}`}
                                        >
                                            {template.status}
                                        </button>

                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openViewModal(template)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditModal(template)}
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => duplicateTemplate(template)}
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteTemplate(template.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>

            <TemplateModal
                open={isTemplateModalOpen}
                businessId={currentBusinessId}
                mode={modalMode}
                template={selectedTemplate}
                onClose={() => {
                    setIsTemplateModalOpen(false)
                    setSelectedTemplate(null)
                }}
                onSave={saveTemplate}
            />
        </div>
    )
}

export default TemplatesPage
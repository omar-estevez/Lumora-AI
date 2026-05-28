import { useState } from "react"
import { NavLink } from "react-router"
import {
    Home,
    MessageSquare,
    Phone,
    Calendar,
    Users,
    BarChart3,
    Brain,
    Workflow,
    FileText,
    MessageCircle,
    Smartphone,
    Globe,
    Mail,
    Webhook,
    Plug,
    Key,
    Building2,
    UserCog,
    CreditCard,
    Shield,
    BellRing,
    Bot,
    ChevronDown,
    Plus,
    Sparkles,
    Crown,
    LogOut,
} from "lucide-react"

interface SidebarProps {
    sidebarCollapsed: boolean
    sidebarOpen: boolean
    onCloseSidebar?: () => void
}

type Workspace = {
    id: string
    name: string
    plan: string
    logo: string
}

type NavItem = {
    id: string
    label: string
    path: string
    icon: React.ElementType
    badge?: number | string | null
    status?: "active" | "inactive" | "upgrade"
}

const workspaces: Workspace[] = [
    {
        id: "ws_001",
        name: "AutoPro Detailing",
        plan: "Growth",
        logo: "AP",
    },
    {
        id: "ws_002",
        name: "QuickTow Services",
        plan: "Starter",
        logo: "QT",
    },
    {
        id: "ws_003",
        name: "Elite Roofing Co",
        plan: "Scale",
        logo: "ER",
    },
]

const mainNavItems: NavItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: Home,
    },
    {
        id: "conversations",
        label: "Conversations",
        path: "/dashboard/conversations",
        icon: MessageSquare,
        badge: 12,
    },
    {
        id: "voice",
        label: "Voice AI",
        path: "/dashboard/voice",
        icon: Phone,
    },
    {
        id: "bookings",
        label: "Bookings",
        path: "/dashboard/bookings",
        icon: Calendar,
        badge: 4,
    },
    {
        id: "leads",
        label: "Leads",
        path: "/dashboard/leads",
        icon: Users,
        badge: 8,
    },
    {
        id: "analytics",
        label: "Analytics",
        path: "/dashboard/analytics",
        icon: BarChart3,
    },
]

const intelligenceNavItems: NavItem[] = [
    {
        id: "ai-activity",
        label: "AI Activity",
        path: "/dashboard/ai-activity",
        icon: Brain,
        badge: "Live",
    },
    {
        id: "flows",
        label: "AI Flows",
        path: "/dashboard/flows",
        icon: Workflow,
    },
    {
        id: "templates",
        label: "Templates",
        path: "/dashboard/templates",
        icon: FileText,
    },
]

const channelNavItems: NavItem[] = [
    {
        id: "whatsapp",
        label: "WhatsApp",
        path: "/dashboard/channels/whatsapp",
        icon: MessageCircle,
        status: "active",
    },
    {
        id: "sms",
        label: "SMS",
        path: "/dashboard/channels/sms",
        icon: Smartphone,
        status: "active",
    },
    {
        id: "webchat",
        label: "Web Chat",
        path: "/dashboard/channels/webchat",
        icon: Globe,
        status: "active",
    },
    {
        id: "email",
        label: "Email",
        path: "/dashboard/channels/email",
        icon: Mail,
        status: "inactive",
    },
]

const integrationNavItems: NavItem[] = [
    {
        id: "webhooks",
        label: "Webhooks",
        path: "/dashboard/webhooks",
        icon: Webhook,
    },
    {
        id: "integrations",
        label: "Integrations",
        path: "/dashboard/integrations",
        icon: Plug,
    },
    {
        id: "api",
        label: "API Keys",
        path: "/dashboard/api",
        icon: Key,
    },
]

const configurationNavItems: NavItem[] = [
    {
        id: "business",
        label: "Business",
        path: "/dashboard/business",
        icon: Building2,
    },
    {
        id: "team",
        label: "Team",
        path: "/dashboard/team",
        icon: UserCog,
    },
    {
        id: "billing",
        label: "Billing",
        path: "/dashboard/billing",
        icon: CreditCard,
    },
    {
        id: "security",
        label: "Security",
        path: "/dashboard/security",
        icon: Shield,
    },
    {
        id: "notifications",
        label: "Notifications",
        path: "/dashboard/notifications",
        icon: BellRing,
    },
]

const sections = [
    {
        title: "Main",
        items: mainNavItems,
    },
    {
        title: "Intelligence",
        icon: Sparkles,
        items: intelligenceNavItems,
    },
    {
        title: "Channels",
        items: channelNavItems,
    },
    {
        title: "Integrations",
        items: integrationNavItems,
    },
    {
        title: "Configuration",
        items: configurationNavItems,
    },
]

const getStatusDotClass = (status?: NavItem["status"]) => {
    if (status === "active") return "bg-emerald-400"
    if (status === "upgrade") return "bg-amber-400"
    if (status === "inactive") return "bg-muted-foreground"
    return ""
}

export const Sidebar = ({
    sidebarCollapsed,
    sidebarOpen,
    onCloseSidebar,
}: SidebarProps) => {
    const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false)
    const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(
        workspaces[0]
    )

    const sidebarWidth = sidebarCollapsed ? "lg:w-20" : "lg:w-72"

    const renderNavItem = (item: NavItem) => {
        const Icon = item.icon

        return (
            <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/dashboard"}
                title={sidebarCollapsed ? item.label : undefined}
                onClick={onCloseSidebar}
                className={({ isActive }) =>
                    [
                        "group flex w-full items-center rounded-xl px-3 py-2.5 text-sm transition-all",
                        sidebarCollapsed ? "justify-center" : "justify-between",
                        isActive
                            ? "bg-primary/20 text-primary shadow-[inset_0_0_0_1px_rgba(56,189,248,0.25)]"
                            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                    ].join(" ")
                }
            >
                <div className="flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" />

                    {!sidebarCollapsed && (
                        <span className="truncate font-medium">{item.label}</span>
                    )}
                </div>

                {!sidebarCollapsed && (
                    <div className="flex shrink-0 items-center gap-2">
                        {item.badge && (
                            <span
                                className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${typeof item.badge === "number"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-emerald-500/20 text-emerald-400"
                                    }`}
                            >
                                {item.badge}
                            </span>
                        )}

                        {item.status && (
                            <span
                                className={`h-2 w-2 rounded-full ${getStatusDotClass(
                                    item.status
                                )}`}
                            />
                        )}
                    </div>
                )}
            </NavLink>
        )
    }

    return (
        <>
            {sidebarOpen && (
                <button
                    className="fixed inset-0 z-30 bg-black/60 lg:hidden"
                    onClick={onCloseSidebar}
                    aria-label="Close sidebar"
                />
            )}

            <aside
                className={[
                    "fixed left-0 top-0 bottom-0 z-40 w-72 border-r border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-300",
                    sidebarWidth,
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                ].join(" ")}
            >
                <div className="flex h-full flex-col">
                    {/* Logo + Workspace */}
                    <div className="border-b border-border/50 p-3">
                        <div
                            className={`mb-3 flex items-center ${sidebarCollapsed ? "justify-center" : "gap-2"
                                }`}
                        >
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-r from-primary to-accent">
                                <Bot className="h-5 w-5 text-white" />
                                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </div>

                            {!sidebarCollapsed && (
                                <span className="text-xl font-bold tracking-tight">
                                    Lumora
                                </span>
                            )}
                        </div>

                        {!sidebarCollapsed && (
                            <div className="relative">
                                <button
                                    onClick={() => setWorkspaceMenuOpen((current) => !current)}
                                    className="flex w-full items-center justify-between rounded-xl bg-secondary/50 p-2.5 transition-colors hover:bg-secondary"
                                >
                                    <div className="flex min-w-0 items-center gap-2">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-xs font-semibold text-primary">
                                            {currentWorkspace.logo}
                                        </div>

                                        <div className="min-w-0 text-left">
                                            <p className="truncate text-sm font-semibold">
                                                {currentWorkspace.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {currentWorkspace.plan}
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronDown
                                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${workspaceMenuOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {workspaceMenuOpen && (
                                    <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-border/50 bg-background p-1 shadow-xl">
                                        {workspaces.map((workspace) => (
                                            <button
                                                key={workspace.id}
                                                onClick={() => {
                                                    setCurrentWorkspace(workspace)
                                                    setWorkspaceMenuOpen(false)
                                                }}
                                                className={`flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors hover:bg-secondary ${workspace.id === currentWorkspace.id
                                                    ? "bg-primary/10"
                                                    : ""
                                                    }`}
                                            >
                                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-xs font-semibold text-primary">
                                                    {workspace.logo}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {workspace.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {workspace.plan}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}

                                        <div className="mt-1 border-t border-border/50 pt-1">
                                            <button className="flex w-full items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                                                <Plus className="h-4 w-4" />
                                                Add Workspace
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="sidebar-scroll flex-1 overflow-y-auto px-2 py-4">
                        <div className="space-y-5">
                            {sections.map((section) => {
                                const SectionIcon = section.icon

                                return (
                                    <div key={section.title}>
                                        {!sidebarCollapsed && (
                                            <div className="mb-2 flex items-center gap-1 px-3">
                                                {SectionIcon && (
                                                    <SectionIcon className="h-3 w-3 text-primary" />
                                                )}
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                    {section.title}
                                                </p>
                                            </div>
                                        )}

                                        <div className="space-y-1">
                                            {section.items.map(renderNavItem)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </nav>

                    {/* Plan Card */}
                    {!sidebarCollapsed && (
                        <div className="border-t border-border/50 p-3">
                            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3">
                                <div className="mb-2 flex items-center gap-2">
                                    <Crown className="h-4 w-4 text-amber-400" />
                                    <p className="font-semibold">Growth Plan</p>
                                </div>

                                <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                                    Unlock AI voice and more premium functions.
                                </p>

                                <button className="cursor-pointer w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                                    Upgrade Plan
                                </button>
                            </div>
                        </div>
                    )}

                    {/* User */}
                    <div className="border-t border-border/50 p-3">
                        <div
                            className={`flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"
                                }`}
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                                    <span className="text-sm font-semibold">JD</span>
                                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-400" />
                                </div>

                                {!sidebarCollapsed && (
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">
                                            Juan Delgado
                                        </p>
                                        <p className="text-xs text-muted-foreground">Owner</p>
                                    </div>
                                )}
                            </div>

                            {!sidebarCollapsed && (
                                <button className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                                    <LogOut className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
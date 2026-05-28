import { Button } from "@/components/ui/button"
import {
    Menu,
    Search,
    RefreshCw,
    Bell,
    HelpCircle,
    X,
    MessageSquare,
    Users,
    Calendar,
    Phone,
    ArrowRight,
    BookOpen,
    LifeBuoy,
    Keyboard,
} from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router"

interface HeaderProps {
    sidebarCollapsed: boolean
    sidebarOpen: boolean
    setSidebarCollapsed: Dispatch<SetStateAction<boolean>>
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

type SearchItem = {
    id: string
    title: string
    description: string
    type: "conversation" | "lead" | "booking" | "voice" | "page"
    path: string
}

const searchItems: SearchItem[] = [
    {
        id: "search_001",
        title: "Maria Garcia",
        description: "Conversation · Schedule appointment",
        type: "conversation",
        path: "/dashboard/conversations",
    },
    {
        id: "search_002",
        title: "Carlos Rodriguez",
        description: "Lead · Price inquiry",
        type: "lead",
        path: "/dashboard/leads",
    },
    {
        id: "search_003",
        title: "Pedro Hernandez",
        description: "Booking · Today 2:00 PM",
        type: "booking",
        path: "/dashboard/bookings",
    },
    {
        id: "search_004",
        title: "Gabriel Torres",
        description: "Voice AI call · Completed",
        type: "voice",
        path: "/dashboard/voice",
    },
    {
        id: "search_005",
        title: "Business Settings",
        description: "Configure AI, services, FAQs, and rules",
        type: "page",
        path: "/dashboard/business",
    },
    {
        id: "search_006",
        title: "AI Flows",
        description: "Manage automations",
        type: "page",
        path: "/dashboard/flows",
    },
]

const notifications = [
    {
        id: "notif_001",
        title: "New lead captured",
        description: "Ana Martinez was added from Web Chat.",
        time: "2 min ago",
        unread: true,
    },
    {
        id: "notif_002",
        title: "Booking confirmed",
        description: "Pedro Hernandez confirmed Full Detail.",
        time: "12 min ago",
        unread: true,
    },
    {
        id: "notif_003",
        title: "AI escalation required",
        description: "Juan Lopez wants to cancel a booking.",
        time: "1 hour ago",
        unread: false,
    },
]

const getSearchIcon = (type: SearchItem["type"]) => {
    if (type === "conversation") return MessageSquare
    if (type === "lead") return Users
    if (type === "booking") return Calendar
    if (type === "voice") return Phone
    return Search
}

export const Header = ({
    setSidebarCollapsed,
    setSidebarOpen,
    sidebarOpen,
    sidebarCollapsed,
}: HeaderProps) => {
    const navigate = useNavigate()

    const [searchOpen, setSearchOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [refreshing, setRefreshing] = useState(false)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const [helpOpen, setHelpOpen] = useState(false)
    const [notificationList, setNotificationList] = useState(notifications)

    const notificationRef = useRef<HTMLDivElement | null>(null)
    const helpRef = useRef<HTMLDivElement | null>(null)
    const searchInputRef = useRef<HTMLInputElement | null>(null)

    const unreadCount = notificationList.filter((item) => item.unread).length

    const filteredSearchItems = useMemo(() => {
        if (!searchValue.trim()) return searchItems

        return searchItems.filter((item) => {
            const query = searchValue.toLowerCase()

            return (
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.type.toLowerCase().includes(query)
            )
        })
    }, [searchValue])

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            const isSearchShortcut = (event.metaKey || event.ctrlKey) && event.key === "k"

            if (isSearchShortcut) {
                event.preventDefault()
                setSearchOpen(true)
            }

            if (event.key === "Escape") {
                setSearchOpen(false)
                setNotificationsOpen(false)
                setHelpOpen(false)
            }
        }

        window.addEventListener("keydown", handleShortcut)

        return () => window.removeEventListener("keydown", handleShortcut)
    }, [])

    useEffect(() => {
        if (searchOpen) {
            window.setTimeout(() => {
                searchInputRef.current?.focus()
            }, 50)
        }
    }, [searchOpen])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node

            if (notificationRef.current && !notificationRef.current.contains(target)) {
                setNotificationsOpen(false)
            }

            if (helpRef.current && !helpRef.current.contains(target)) {
                setHelpOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleRefresh = () => {
        setRefreshing(true)

        window.setTimeout(() => {
            setRefreshing(false)
        }, 900)
    }

    const openSearchResult = (item: SearchItem) => {
        navigate(item.path)
        setSearchOpen(false)
        setSearchValue("")
    }

    const markAllNotificationsRead = () => {
        setNotificationList((current) =>
            current.map((item) => ({
                ...item,
                unread: false,
            }))
        )
    }

    return (
        <>
            <header className="sticky top-0 z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="flex h-14 items-center justify-between px-4 lg:px-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Open sidebar"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden lg:flex"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            aria-label="Collapse sidebar"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <button
                            onClick={() => setSearchOpen(true)}
                            className="relative hidden w-72 items-center rounded-lg border border-border/50 bg-secondary/50 py-2 pl-10 pr-14 text-left text-sm text-muted-foreground outline-none transition-colors hover:border-primary/60 sm:flex"
                        >
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            Search conversations, leads...
                            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                ⌘K
                            </kbd>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="sm:hidden"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Open search"
                        >
                            <Search className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRefresh}
                            aria-label="Refresh dashboard"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${refreshing ? "animate-spin text-primary" : ""}`}
                            />
                        </Button>

                        <div className="relative" ref={notificationRef}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="relative"
                                onClick={() => {
                                    setNotificationsOpen((current) => !current)
                                    setHelpOpen(false)
                                }}
                                aria-label="Open notifications"
                            >
                                <Bell className="h-4 w-4" />

                                {unreadCount > 0 && (
                                    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                                        {unreadCount}
                                    </span>
                                )}
                            </Button>

                            {notificationsOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-xl border border-border/50 bg-background shadow-xl">
                                    <div className="flex items-center justify-between border-b border-border/50 p-3">
                                        <div>
                                            <p className="font-semibold">Notifications</p>
                                            <p className="text-xs text-muted-foreground">
                                                {unreadCount} unread alerts
                                            </p>
                                        </div>

                                        <Button variant="ghost" size="sm" onClick={markAllNotificationsRead}>
                                            Mark all read
                                        </Button>
                                    </div>

                                    <div className="max-h-80 overflow-y-auto">
                                        {notificationList.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="border-b border-border/50 p-3 last:border-b-0 hover:bg-secondary/30"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span
                                                        className={`mt-1 h-2 w-2 rounded-full ${notification.unread
                                                                ? "bg-primary"
                                                                : "bg-muted-foreground/40"
                                                            }`}
                                                    />

                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium">
                                                            {notification.title}
                                                        </p>
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {notification.description}
                                                        </p>
                                                        <p className="mt-2 text-xs text-muted-foreground">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-border/50 p-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-center"
                                            onClick={() => {
                                                navigate("/dashboard/notifications")
                                                setNotificationsOpen(false)
                                            }}
                                        >
                                            Notification settings
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative" ref={helpRef}>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setHelpOpen((current) => !current)
                                    setNotificationsOpen(false)
                                }}
                                aria-label="Open help"
                            >
                                <HelpCircle className="h-4 w-4" />
                            </Button>

                            {helpOpen && (
                                <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-xl border border-border/50 bg-background shadow-xl">
                                    <div className="border-b border-border/50 p-3">
                                        <p className="font-semibold">Help Center</p>
                                        <p className="text-xs text-muted-foreground">
                                            Quick support and resources.
                                        </p>
                                    </div>

                                    <div className="p-2">
                                        <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-secondary/40">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                            <div>
                                                <p className="text-sm font-medium">Documentation</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Learn how Lumora works.
                                                </p>
                                            </div>
                                        </button>

                                        <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-secondary/40">
                                            <LifeBuoy className="h-4 w-4 text-primary" />
                                            <div>
                                                <p className="text-sm font-medium">Contact Support</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Get help from the Lumora team.
                                                </p>
                                            </div>
                                        </button>

                                        <button className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-secondary/40">
                                            <Keyboard className="h-4 w-4 text-primary" />
                                            <div>
                                                <p className="text-sm font-medium">Shortcuts</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Press ⌘K or Ctrl+K to search.
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {searchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl">
                        <div className="flex items-center gap-3 border-b border-border/60 p-4">
                            <Search className="h-5 w-5 text-muted-foreground" />

                            <input
                                ref={searchInputRef}
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                placeholder="Search conversations, leads, bookings, pages..."
                                className="flex-1 bg-transparent text-sm outline-none"
                            />

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSearchOpen(false)
                                    setSearchValue("")
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="max-h-[420px] overflow-y-auto p-2">
                            {filteredSearchItems.length === 0 ? (
                                <div className="p-10 text-center">
                                    <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                                    <p className="font-medium">No results found</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Try searching for a customer, lead, booking, or page.
                                    </p>
                                </div>
                            ) : (
                                filteredSearchItems.map((item) => {
                                    const Icon = getSearchIcon(item.type)

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => openSearchResult(item)}
                                            className="flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-secondary/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <div>
                                                    <p className="font-medium">{item.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        </button>
                                    )
                                })
                            )}
                        </div>

                        <div className="flex items-center justify-between border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
                            <span>Press ESC to close</span>
                            <span>
                                {filteredSearchItems.length} result
                                {filteredSearchItems.length === 1 ? "" : "s"}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
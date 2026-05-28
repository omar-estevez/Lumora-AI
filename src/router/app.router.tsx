import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/principal/layouts/MainLayout";
import { FormLayout } from "@/principal/layouts/FormLayout";
import { DashLayout } from "@/admin/layouts/DashLayout";
import { HomePage } from "@/principal/pages/home/HomePage";
import { MainPage } from "@/admin/pages/main-pages/main/MainPage";
import {
    ActivityPage,
    AnalyticsPage,
    ApiKeysPage,
    AppearancePage,
    BillingPage,
    BookingsPage,
    BusinessPage,
    ChannelPage,
    ContactPage,
    ConversationPage,
    FlowsPage,
    ForgotPasswordPage,
    IntegrationsPage,
    LanguagePage,
    LeadsPage,
    LoginPage,
    NotificationPage,
    PrivacyPage,
    RegisterPage,
    SecurityPage,
    SecurityPageDash,
    TeamPage,
    TemplatesPage,
    TermsPage,
    VoiceAiPage,
    WebhooksPage
} from "./routes/lazy-pages";


export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/contact',
                element: <ContactPage />
            }
        ]
    },
    {
        path: '/',
        element: <FormLayout />,
        children: [
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/forgot-password',
                element: <ForgotPasswordPage />
            },
            {
                path: '/privacy',
                element: <PrivacyPage />
            },
            {
                path: '/terms',
                element: <TermsPage />
            },
            {
                path: '/security',
                element: <SecurityPage />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashLayout />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: 'conversations',
                element: <ConversationPage />
            },
            {
                path: 'voice',
                element: <VoiceAiPage />
            },
            {
                path: 'bookings',
                element: <BookingsPage />
            },
            {
                path: 'leads',
                element: <LeadsPage />
            },
            {
                path: 'analytics',
                element: <AnalyticsPage />
            },
            {
                path: 'ai-activity',
                element: <ActivityPage />
            },
            {
                path: 'flows',
                element: <FlowsPage />
            },
            {
                path: 'templates',
                element: <TemplatesPage />
            },
            {
                path: 'channels/:channel',
                element: <ChannelPage />
            },
            {
                path: 'webhooks',
                element: <WebhooksPage />
            },
            {
                path: 'integrations',
                element: <IntegrationsPage />
            },
            {
                path: 'api',
                element: <ApiKeysPage />
            },
            {
                path: 'business',
                element: <BusinessPage />
            },
            {
                path: 'team',
                element: <TeamPage />
            },
            {
                path: 'billing',
                element: <BillingPage />
            },
            {
                path: 'security',
                element: <SecurityPageDash />
            },
            {
                path: 'notifications',
                element: <NotificationPage />
            },
            {
                path: 'appearance',
                element: <AppearancePage />
            },
            {
                path: 'language',
                element: <LanguagePage />
            }
        ]
    }
])

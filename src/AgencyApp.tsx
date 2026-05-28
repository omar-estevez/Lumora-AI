import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"

export const AgencyApp = () => {
    return (
        <>
            <RouterProvider router={appRouter} />
        </>
    )
}
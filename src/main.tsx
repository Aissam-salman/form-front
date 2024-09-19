import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@/components/provider/theme-provider.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "@/page/login.page.tsx";
import {SignupPage} from "@/page/signup.page.tsx";
import CandidatePage from "@/page/candidate.page.tsx";
import ForgotPage from "@/page/forgot.page.tsx";
import DashboardAdminPage from "@/page/dashboard-admin.page.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/forgot-password",
        element: <ForgotPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/candidate/:candidateId",
        element: <CandidatePage />
    },
    {
        path: "/admin",
        element: <DashboardAdminPage />
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
                <RouterProvider router={router} />
      </ThemeProvider>
  </StrictMode>,
)

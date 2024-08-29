import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "@/page/login.page.tsx";
import {SignupPage} from "@/page/signup.page.tsx";
import CandidatePage from "@/page/candidate.page.tsx";
import ForgotPage from "@/page/forgot.page.tsx";


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

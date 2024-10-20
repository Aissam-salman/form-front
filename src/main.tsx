import  {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@/components/provider/theme-provider.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "@/page/login.page.tsx";
import {SignupPage} from "@/page/signup.page.tsx";
import CandidatePage from "@/page/candidate.page.tsx";
import DashboardAdminPage from "@/page/dashboard-admin.page.tsx";
import CandidateDetailsPage from "@/page/candidate-details.page.tsx";
import NewFormPage from './page/new-form.page.tsx';
import PrepaCompetencePage from "@/page/prepa-competence.page.tsx";
import ResetPassword from './components/ResetPassword.tsx';
import ForgotPassword from './components/ForgotPassword.tsx';
import ClassDetailsPage from "@/page/class-details.page.tsx";
import CenterPage from '@/page/center.page.tsx';
import CenterDetailsPage from '@/page/center-details.page.tsx';


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
        element: <ForgotPassword />
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
    },
    {
        path: "/former/:formerId",
        element: <h1>Former page</h1>
    },
    {
        path: "/candidate/details/:candidateId",
        element: <CandidateDetailsPage />
    },
    {
        path: "/center/:centerId",
        element: <CenterPage />
    },
    {
        path: "/centers/details/:centerId",
        element: <CenterDetailsPage />
    },
    {
        path: "/forms.new",
        element: <NewFormPage />
    },
    {
        path: "/forms/prepa-competence",
        element: <PrepaCompetencePage />
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword />
    },
    {
        path: "/classes/details/:classId",
        element: <ClassDetailsPage />
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

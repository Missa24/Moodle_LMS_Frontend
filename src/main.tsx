import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import {
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";


const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>

          <App />
        </QueryClientProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
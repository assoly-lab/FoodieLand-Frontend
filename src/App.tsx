import { AppRoutes } from "@/routes"
import { BrowserRouter } from "react-router"
import { Toaster } from "sonner"
import { AuthProvider } from "@/providers/AuthProvider/AuthProvider"


function App() {

  return (
      <main className="w-full min-h-screen">
        <BrowserRouter>
          <AuthProvider>
            <Toaster position="bottom-right" expand={false} richColors closeButton />
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </main>
  )
}

export default App

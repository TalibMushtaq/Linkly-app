import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { HomePage } from "./pages/homepage";
import { SigninForm } from "./pages/signin";
import { SignupForm } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import SharedPage from "./pages/shared";
import PublicSharePage from "./pages/share";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const API_URL = "http://localhost:5000/api";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-right" />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Private: manage your own share link */}
        <Route
          path="/shared"
          element={
            <ProtectedRoute>
              <SharedPage />
            </ProtectedRoute>
          }
        />

        {/* Public: anyone can view shared content */}
        <Route path="/share/:shareId" element={<PublicSharePage />} />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
              404 Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

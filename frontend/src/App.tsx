import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { HomePage } from "./pages/homepage";
import { SigninForm } from "./pages/signin";
import { SignupForm } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
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

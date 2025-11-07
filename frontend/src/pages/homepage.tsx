import { HeroIcon } from "../assets/icons/heroIcon";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 🌐 Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
        <div className="flex items-center gap-2">
          <HeroIcon className="text-purple-700 w-8 h-8" />
          <h1 className="text-3xl font-semibold text-gray-800">linkly</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="Secondary"
            size="lg"
            text="Sign In"
            onClick={() => navigate("/signin")}
          />
          <Button
            variant="Primary"
            size="lg"
            text="Sign Up"
            onClick={() => navigate("/signup")}
          />
        </div>
      </nav>

      {/* 🏠 Main Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center">
        <HeroIcon className="text-purple-700 w-16 h-16 mb-6" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-purple-700">linkly</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mb-8">
          Simplify your workflow and manage your links effortlessly. Get started
          today by creating your free account.
        </p>

        <div className="flex gap-4">
          <Button
            variant="Primary"
            size="lg"
            text="Get Started"
            onClick={() => navigate("/signup")}
          />
          <Button
            variant="Secondary"
            size="lg"
            text="Sign In"
            onClick={() => navigate("/signin")}
          />
        </div>
      </main>

      {/* ⚙️ Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} linkly. All rights reserved.
      </footer>
    </div>
  );
};

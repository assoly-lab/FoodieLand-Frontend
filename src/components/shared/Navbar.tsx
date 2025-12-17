import { useEffect, useState } from "react";
import { Menu, X, BarChart3, FolderOpen, UtensilsCrossed } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useCategory } from "@/hooks/useCategory";
import useRecipe from "@/hooks/useRecipe";
import { useDashboard } from "@/hooks/useDashboard";
import { useAuth } from "@/hooks/useAuth";
import AuthorAvatar from "../ui/AuthorAvatar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { categories } = useCategory();
  const { recipes } = useRecipe();
  const location = useLocation();
  const { handleSetActiveSection, activeSection } = useDashboard();
  const isDashboard = location.pathname?.startsWith("/dashboard");
  const { user, isAuthenticated } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/categories", label: "Categories" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav className="w-full bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 md:px-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          <div className="shrink-0">
            <a href="/" className="shrink-0">
              <p className="text-3xl font-lobster text-gray-900">
                Foodieland
                <span className="text-3xl font-lobster text-orange-500">.</span>
              </p>
            </a>
          </div>
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-900 hover:text-orange-500 font-medium transition-colors font-inter"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-8 md:gap-12">
            {!isAuthenticated && (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors group"
                  title="Admin Dashboard"
                >
                  <span className="text-sm font-inter text-gray-900 group-hover:text-orange-500 font-medium transition-colors">
                    Login
                  </span>
                </Link>
                <Link
                  to="/signup"
                  className="hidden bg-orange-500 text-white py-3 px-4 rounded-xl hover:bg-orange-600 transition-colors text-center font-medium md:inline-block"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {isAuthenticated && user && (
              <AuthorAvatar authorName={user.name} avatarUrl={user.avatar} />
            )}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors z-60"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
              ) : (
                <Menu className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 h-full w-72 md:w-96 bg-background z-40 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-24 md:pt-32 px-6">
            {isDashboard ? (
              <>
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      handleSetActiveSection("categories");
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeSection === "categories"
                        ? "bg-orange-500 text-white"
                        : "text-foreground hover:bg-slate-50"
                    }`}
                  >
                    <FolderOpen className="h-5 w-5" />
                    <span className="font-medium">Categories</span>
                    <span
                      className={`ml-auto text-sm ${activeSection === "categories" ? "bg-white/20" : "bg-slate-200"} px-2 py-0.5 rounded-full`}
                    >
                      {categories?.length ?? 0}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleSetActiveSection("recipes");
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeSection === "recipes"
                        ? "bg-orange-500 text-white"
                        : "text-foreground hover:bg-slate-50"
                    }`}
                  >
                    <UtensilsCrossed className="h-5 w-5" />
                    <span className="font-medium">Recipes</span>
                    <span
                      className={`ml-auto text-sm ${activeSection === "recipes" ? "bg-white/20" : "bg-slate-200"} px-2 py-0.5 rounded-full`}
                    >
                      {recipes?.length ?? 0}
                    </span>
                  </button>
                </nav>
                <div className="mt-auto pb-8">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-foreground hover:text-hero hover:bg-orange-50 transition-colors py-3 px-4 rounded-xl"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Back to Home</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <nav className="flex flex-col gap-2 border-b-border/40 my-4">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-black hover:text-orange-500 transition-colors py-3 px-4 rounded-xl font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/recipes"
                    onClick={() => setIsOpen(false)}
                    className="text-black hover:text-orange-500 transition-colors py-3 px-4 rounded-xl"
                  >
                    Recipes
                  </Link>
                  <Link
                    to="/categories"
                    onClick={() => setIsOpen(false)}
                    className="text-black hover:text-orange-500 transition-colors py-3 px-4 rounded-xl"
                  >
                    Categories
                  </Link>
                  <div className="pb-8">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-foreground hover:bg-slate-50 transition-colors py-3 px-4 rounded-xl"
                    >
                      Dashboard
                    </Link>
                  </div>
                </nav>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-black hover:text-orange-500 transition-colors py-3 px-4 rounded-xl font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-orange-500 text-white py-3 px-4 rounded-xl hover:bg-orange-600 transition-colors text-center font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

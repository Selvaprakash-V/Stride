import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Code2,
  User,
  Terminal,
  Activity,
  CreditCard
} from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  const { user } = useUser();
  const location = useLocation();

  const navLinks = [
    { name: "Problems", path: "/problems", icon: Code2 },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Plans", path: "/plans", icon: CreditCard },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative glass-card px-8 py-3 border-white/5 flex items-center justify-between shadow-glow h-16">
          <div className="absolute inset-0 noise-overlay rounded-3xl" />

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-10 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/40 blur-md rounded-lg scale-75 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative size-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg border border-white/10 group-hover:rotate-12 transition-all duration-500">
                <Terminal className="size-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white leading-none tracking-tighter">STRIDE</span>
              <span className="text-[8px] font-bold text-primary tracking-[.4em] uppercase leading-relaxed">Code Platform</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-4 relative z-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    group relative px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300
                    ${isActive ? "text-white" : "text-white/40 hover:text-white/70"}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <link.icon className={`size-4 transition-colors ${isActive ? "text-primary" : "group-hover:text-primary"}`} />
                    <span>{link.name}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl -z-10"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-6 relative z-10">
            <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 bg-black/40 border border-white/5 rounded-full backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Activity className="size-3 text-easy animate-pulse" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Network Secure</span>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            <SignedIn>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end mr-2">
                  <span className="text-xs font-black text-white leading-none">{user?.firstName}</span>
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">Developer</span>
                </div>
                <div className="p-1 rounded-full border-2 border-primary/20 hover:border-primary/50 transition-colors shadow-lg shadow-primary/10">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "size-8",
                        userButtonTrigger: "focus:shadow-none"
                      }
                    }}
                  />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

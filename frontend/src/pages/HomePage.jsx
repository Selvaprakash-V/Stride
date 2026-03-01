import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-[#061020] via-[#07122a] to-[#0b1630] mesh-bg">
      {/* NAVBAR */}
      <nav className="bg-base-100/6 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link to={'/'} className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Stride
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
            </div>
          </Link>

          {/* AUTH BTN */}
          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-2xl hover:shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2 btn-3d">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-30"><div className="noise-overlay" /></div>
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          {/* decorative blobs + particles behind content */}
          <div className="sky" aria-hidden>
            <div className="nebula" />
            {/* static stars placed with inline styles for variety */}
            <span className="star" style={{left:'8%', top:'12%', animationDelay:'0.2s'}} />
            <span className="star small" style={{left:'18%', top:'30%', animationDelay:'0.6s'}} />
            <span className="star dim" style={{left:'28%', top:'8%', animationDelay:'1.1s'}} />
            <span className="star" style={{left:'42%', top:'20%', animationDelay:'0.8s'}} />
            <span className="star small" style={{left:'60%', top:'6%', animationDelay:'1.6s'}} />
            <span className="star" style={{left:'72%', top:'40%', animationDelay:'0.1s'}} />
            <span className="star dim" style={{left:'85%', top:'18%', animationDelay:'1.9s'}} />
            {/* shooting stars with staggered delays */}
            <span className="shooting-star" style={{left:'-10%', top:'10%', animation:'shoot 3s linear 1s infinite'}} />
            <span className="shooting-star" style={{left:'-30%', top:'20%', animation:'shoot 4.4s linear 4s infinite'}} />
            <span className="shooting-star" style={{left:'-20%', top:'5%', animation:'shoot 3.6s linear 6s infinite'}} />
          </div>
          <div className="colorful-blob blob-a" aria-hidden />
          <div className="colorful-blob blob-b" aria-hidden />
          <div className="particles-overlay" aria-hidden />
          {/* LEFT CONTENT */}
          <motion.div className="space-y-8" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
            <div className="badge badge-lg badge-primary card-hover pop-in glint-btn">
              Real-time Collaboration
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="text-gradient neon-text">Code Together,</span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>

            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              The ultimate platform for collaborative coding interviews and pair programming.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline card-hover pop-in" style={{background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'}}>
                <CheckIcon className="size-4 text-success" />
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline card-hover pop-in" style={{background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'}}>
                <CheckIcon className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline card-hover pop-in" style={{background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'}}>
                <CheckIcon className="size-4 text-success" />
                Multi-Language
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <motion.button whileHover={{scale:1.03}} className="btn btn-primary btn-lg btn-3d glint-btn">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </motion.button>
              </SignInButton>

              <motion.button whileHover={{scale:1.03}} className="btn btn-outline btn-lg btn-3d glint-btn">
                <VideoIcon className="size-5" />
                Watch Demo
              </motion.button>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-2xl pop-in">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:0.12, duration:0.8}} className="flex items-center justify-center relative">
            <motion.img
              src="/hero.png"
              alt="CodeCollab Platform"
              className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100"
              whileHover={{ scale: 1.03, rotate: 0.5 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div style={{position:'absolute', right:24, bottom:24, width:120, height:120, borderRadius:20, background:'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(16,185,129,0.12))', boxShadow:'0 10px 40px rgba(124,58,237,0.06)'}} aria-hidden />
          </motion.div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during interviews
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple language support
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;

import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  Database,
  Globe,
  Shield,
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

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-base text-base-content/70 max-w-2xl mx-auto mt-3">Create a session, invite a peer, and collaborate in real-time — video, code, and feedback all in one place. No setup required.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div className="card bg-base-100 shadow-xl p-6 text-center pop-in" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}}>
            <div className="mx-auto mb-4 size-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <ZapIcon className="size-8 text-primary" />
            </div>
            <h3 className="font-bold">Instant Rooms</h3>
            <p className="text-base-content/70 mt-2">Spin up a coding room in seconds and start pairing — no installs, browser-based editor and video.</p>
          </motion.div>

          <motion.div className="card bg-base-100 shadow-xl p-6 text-center pop-in" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} transition={{delay:0.08}} viewport={{once:true}}>
            <div className="mx-auto mb-4 size-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Code2Icon className="size-8 text-primary" />
            </div>
            <h3 className="font-bold">Collaborative Editor</h3>
            <p className="text-base-content/70 mt-2">Live shared code cursor, language-aware editor and instant run/submit feedback via integrated runner.</p>
          </motion.div>

          <motion.div className="card bg-base-100 shadow-xl p-6 text-center pop-in" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} transition={{delay:0.16}} viewport={{once:true}}>
            <div className="mx-auto mb-4 size-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <VideoIcon className="size-8 text-primary" />
            </div>
            <h3 className="font-bold">Live Video & Feedback</h3>
            <p className="text-base-content/70 mt-2">Built-in HD video with recording, chat and session summaries so you can review and improve after each session.</p>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Loved by Developers</h2>
          <p className="text-base text-base-content/70 max-w-2xl mx-auto mt-3">Short testimonials from early users and interviewers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.blockquote className="card bg-base-100 shadow-lg p-6" initial={{opacity:0, y:6}} whileInView={{opacity:1, y:0}} viewport={{once:true}}>
            <p className="text-base-content/80">"Stride made our interviews faster and gave candidates a frictionless experience. The built-in editor is a joy to use."</p>
            <footer className="mt-4 flex items-center gap-3">
              <div className="avatar"><div className="w-12 rounded-full bg-primary text-primary-content flex items-center justify-center">JS</div></div>
              <div>
                <div className="font-bold">J. Smith</div>
                <div className="text-sm text-base-content/60">Engineering Manager</div>
              </div>
            </footer>
          </motion.blockquote>

          <motion.blockquote className="card bg-base-100 shadow-lg p-6" initial={{opacity:0, y:6}} whileInView={{opacity:1, y:0}} transition={{delay:0.06}} viewport={{once:true}}>
            <p className="text-base-content/80">"I practiced mock interviews with friends and improved dramatically — the feedback tools are fantastic."</p>
            <footer className="mt-4 flex items-center gap-3">
              <div className="avatar"><div className="w-12 rounded-full bg-secondary text-secondary-content flex items-center justify-center">AM</div></div>
              <div>
                <div className="font-bold">A. Morgan</div>
                <div className="text-sm text-base-content/60">Software Engineer</div>
              </div>
            </footer>
          </motion.blockquote>

          <motion.blockquote className="card bg-base-100 shadow-lg p-6" initial={{opacity:0, y:6}} whileInView={{opacity:1, y:0}} transition={{delay:0.12}} viewport={{once:true}}>
            <p className="text-base-content/80">"The platform is stable, fast, and the UX keeps the focus on solving problems together — 5 stars."</p>
            <footer className="mt-4 flex items-center gap-3">
              <div className="avatar"><div className="w-12 rounded-full bg-accent text-accent-content flex items-center justify-center">RK</div></div>
              <div>
                <div className="font-bold">R. Khan</div>
                <div className="text-sm text-base-content/60">Interview Coach</div>
              </div>
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* PUBLIC CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Try Stride — no account required</h3>
            <p className="text-base-content/70 mt-2">Open a demo room and explore the editor, video, and run features without signing up.</p>
          </div>

          <div className="flex gap-4">
            <a href="/problems" className="btn btn-primary btn-lg glint-btn">Explore Problems</a>
            <SignInButton mode="modal"><button className="btn btn-outline btn-lg">Sign In</button></SignInButton>
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 neon-text">Pricing that scales with you</h2>
          <p className="text-center text-slate-300 max-w-2xl mx-auto mb-8">Flexible plans for individuals, teams, and enterprises — start free and grow.</p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="pricing-card bg-gradient-to-br from-indigo-900 to-indigo-800/60 border border-indigo-700/40 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold">Starter</span>
                <span className="text-2xl font-extrabold">Free</span>
              </div>
              <p className="text-sm text-slate-300 mb-4">Perfect for learning and individual practice — includes public sessions and problems.</p>
              <ul className="space-y-2 text-slate-200 text-sm mb-4">
                <li>Community sessions</li>
                <li>Basic editor & terminal</li>
              </ul>
              <button className="btn btn-primary btn-3d glint-btn w-full">Get started — it's free</button>
            </div>

            <div className="pricing-card bg-gradient-to-br from-rose-900 to-rose-800/60 border border-rose-700/40 shadow-2xl transform scale-105">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold">Pro</span>
                <span className="text-2xl font-extrabold">$12/mo</span>
              </div>
              <p className="text-sm text-slate-300 mb-4">Everything for focused pair-programming and private sessions with advanced tooling.</p>
              <ul className="space-y-2 text-slate-200 text-sm mb-4">
                <li>Private sessions</li>
                <li>Session recording & playback</li>
                <li>Priority support</li>
              </ul>
              <button className="btn btn-secondary btn-3d glint-btn w-full">Upgrade to Pro</button>
            </div>

            <div className="pricing-card bg-gradient-to-br from-emerald-900 to-emerald-800/60 border border-emerald-700/40 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold">Enterprise</span>
                <span className="text-2xl font-extrabold">Custom</span>
              </div>
              <p className="text-sm text-slate-300 mb-4">SAML, SSO, dedicated instances, and priority SLA for large teams.</p>
              <ul className="space-y-2 text-slate-200 text-sm mb-4">
                <li>Single sign-on</li>
                <li>Audit logs</li>
                <li>Dedicated support</li>
              </ul>
              <button className="btn btn-accent btn-3d glint-btn w-full">Contact Sales</button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Integrations */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 className="text-2xl font-bold text-center mb-6">Integrations & tooling</h3>
          <p className="text-center text-slate-300 mb-8">Connect Stride with the tools your team already uses.</p>

          <div className="integrations">
            <div className="integration-logo"><Database className="h-6 w-6 text-slate-100" /><span className="sr-only">Database</span></div>
            <div className="integration-logo"><Globe className="h-6 w-6 text-slate-100" /><span className="sr-only">Cloud</span></div>
            <div className="integration-logo"><Shield className="h-6 w-6 text-slate-100" /><span className="sr-only">Security</span></div>
            <div className="integration-logo"><ZapIcon className="h-6 w-6 text-slate-100" /></div>
            <div className="integration-logo"><Code2Icon className="h-6 w-6 text-slate-100" /></div>
            <div className="integration-logo"><VideoIcon className="h-6 w-6 text-slate-100" /></div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 neon-text">Frequently asked questions</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <details className="faq-item bg-slate-900/40 border border-slate-700/30">
              <summary className="font-semibold cursor-pointer p-2">Is Stride free to use?</summary>
              <p className="mt-2 text-slate-300 p-2">Yes — the Starter plan is free. Pro unlocks private sessions and extra features.</p>
            </details>

            <details className="faq-item bg-slate-900/40 border border-slate-700/30">
              <summary className="font-semibold cursor-pointer p-2">Can I record sessions?</summary>
              <p className="mt-2 text-slate-300 p-2">Recording and playback are available on Pro and Enterprise plans.</p>
            </details>

            <details className="faq-item bg-slate-900/40 border border-slate-700/30">
              <summary className="font-semibold cursor-pointer p-2">Do you provide SSO?</summary>
              <p className="mt-2 text-slate-300 p-2">Yes — SAML/SSO and enterprise features are available for Enterprise customers.</p>
            </details>

            <details className="faq-item bg-slate-900/40 border border-slate-700/30">
              <summary className="font-semibold cursor-pointer p-2">How secure is my code?</summary>
              <p className="mt-2 text-slate-300 p-2">We use secure transports, encryption at rest, and regular audits for enterprise customers.</p>
            </details>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="site-footer mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 items-start">
            <div>
              <h4 className="text-xl font-bold">Stride</h4>
              <p className="text-slate-300 mt-2">Collaborative coding, reimagined — run public demos, private interviews, and learning sessions.</p>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Company</h5>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Follow</h5>
              <div className="flex gap-3">
                <a className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 text-white">GH</a>
                <a className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 text-white">TW</a>
                <a className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 text-white">LN</a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-700/30 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
            <div>© {new Date().getFullYear()} Stride — All rights reserved.</div>
            <div className="mt-3 md:mt-0">Terms · Privacy · Status</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default HomePage;

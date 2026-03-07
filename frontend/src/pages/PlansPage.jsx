import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckIcon,
  XIcon,
  SparklesIcon,
  ArrowLeftIcon,
  ZapIcon,
  ShieldCheckIcon,
  StarIcon,
  ChevronRightIcon,
} from "lucide-react";
import { userApi } from "../api/users";
import toast from "react-hot-toast";

/* ─── Plan definitions ─────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Great for students & learners",
    price: "Free",
    priceNote: "Forever free, no card needed",
    cta: "Get started free",
    gradient: "from-indigo-900 to-indigo-800/60",
    ring: "ring-indigo-500",
    icon: ZapIcon,
    iconColor: "#818cf8",
    features: [
      "Public coding sessions",
      "Basic Monaco editor",
      "Community leaderboard",
      "3 languages supported",
      "Session history (7 days)",
    ],
    missing: [
      "Private sessions",
      "Session recording",
      "Priority support",
      "SSO / SAML",
      "Audit logs",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Perfect for job-seekers & pairs",
    price: "$12",
    priceNote: "per month, billed monthly",
    cta: "Upgrade to Pro",
    popular: true,
    gradient: "from-rose-900 to-rose-800/60",
    ring: "ring-rose-500",
    icon: StarIcon,
    iconColor: "#fb7185",
    features: [
      "Everything in Starter",
      "Unlimited private sessions",
      "Session recording & playback",
      "Priority email support",
      "20+ languages supported",
      "Session history (90 days)",
    ],
    missing: ["SSO / SAML", "Audit logs", "Dedicated SLA"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For teams & hiring companies",
    price: "Custom",
    priceNote: "Contact us for pricing",
    cta: "Contact Sales",
    gradient: "from-emerald-900 to-emerald-800/60",
    ring: "ring-emerald-500",
    icon: ShieldCheckIcon,
    iconColor: "#34d399",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated instance",
      "Audit logs & compliance",
      "Custom integrations",
      "Dedicated SLA & support",
    ],
    missing: [],
  },
];

/* ─── Full comparison rows ─────────────────────────────────────────────────── */
const COMPARE_ROWS = [
  { label: "Public sessions",   starter: true,       pro: true,    enterprise: true      },
  { label: "Private sessions",  starter: false,      pro: true,    enterprise: true      },
  { label: "Session recording", starter: false,      pro: true,    enterprise: true      },
  { label: "Video call",        starter: true,       pro: true,    enterprise: true      },
  { label: "Languages",         starter: "3",        pro: "20+",   enterprise: "All"     },
  { label: "Session history",   starter: "7 days",   pro: "90 days", enterprise: "Unlimited" },
  { label: "Priority support",  starter: false,      pro: true,    enterprise: true      },
  { label: "SSO / SAML",        starter: false,      pro: false,   enterprise: true      },
  { label: "Audit logs",        starter: false,      pro: false,   enterprise: true      },
  { label: "Dedicated SLA",     starter: false,      pro: false,   enterprise: true      },
];

function Cell({ val }) {
  if (val === true)  return <CheckIcon className="h-5 w-5 text-emerald-400 mx-auto" />;
  if (val === false) return <XIcon className="h-5 w-5 text-slate-600 mx-auto" />;
  return <span className="text-slate-300 text-sm">{val}</span>;
}

export default function PlansPage() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.getSubscription();
        setSubscription(res.subscription);
      } catch {
        // not fatal
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSubscribe(plan) {
    if (plan.id === "enterprise") {
      window.location.href = "mailto:sales@stride.dev?subject=Enterprise%20Inquiry";
      return;
    }
    setProcessing(true);
    try {
      const paymentToken = plan.id === "starter" ? null : "test-token-123";
      await userApi.subscribe({ plan: plan.id, paymentToken });
      toast.success(`You're now on the ${plan.name} plan!`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Subscription failed");
    } finally {
      setProcessing(false);
    }
  }

  const isCurrentPlan = (id) =>
    subscription?.plan === id && subscription?.status === "active";

  return (
    <div className="min-h-screen code-grid-bg">
      {/* TOP NAV */}
      <nav className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm gap-2 text-white/60 hover:text-white">
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </button>
        <Link to="/" className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-primary" />
          <span className="font-black text-lg bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Stride
          </span>
        </Link>
        <span className="ml-auto text-slate-500 text-sm font-mono">
          {subscription?.plan
            ? `plan: ${subscription.plan} · ${subscription.status}`
            : "no active plan"}
        </span>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
            Pick your plan
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Compare every feature side-by-side. Click{" "}
            <span className="text-slate-200 font-semibold">See full details</span> on any
            card to explore what{"'"}s included, then subscribe instantly.
          </p>
        </motion.div>

        {/* PLAN CARDS */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {PLANS.map((plan, i) => {
              const Icon = plan.icon;
              const current = isCurrentPlan(plan.id);
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`relative flex flex-col rounded-2xl bg-gradient-to-br ${plan.gradient} border ${
                    current
                      ? `ring-2 ${plan.ring} border-transparent`
                      : plan.popular
                      ? "border-rose-500/30"
                      : "border-white/6"
                  } p-6 ${
                    plan.popular
                      ? "plan-popular-glow scale-[1.03]"
                      : plan.id === "starter"
                      ? "plan-starter-glow"
                      : "plan-enterprise-glow"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                      style={{ background: 'linear-gradient(90deg,#fb7185,#f97316)', boxShadow: '0 4px 22px rgba(251,113,133,0.4)' }}>
                      ✦ Most Popular
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="size-11 rounded-xl flex items-center justify-center border border-white/10"
                      style={{ background: `${plan.iconColor}18`, boxShadow: `0 0 20px ${plan.iconColor}22` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: plan.iconColor }} />
                    </div>
                    <div>
                      <div className="font-black text-lg tracking-tight">{plan.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{plan.tagline}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-5 border-b border-white/8">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className="text-slate-400 text-xs ml-2 font-mono">{plan.priceNote}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                        <CheckIcon className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                    {plan.missing?.slice(0, 2).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-500 line-through">
                        <XIcon className="h-4 w-4 text-slate-600 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      className={`btn btn-3d glint-btn w-full font-bold ${
                        plan.id === "starter" ? "btn-outline border-indigo-500/40 hover:border-indigo-400" : plan.id === "pro" ? "btn-primary" : "btn-accent"
                      }`}
                      disabled={processing || current}
                      onClick={() => handleSubscribe(plan)}
                    >
                      {current ? (
                        <span className="flex items-center gap-2"><CheckIcon className="h-4 w-4" /> Current plan</span>
                      ) : plan.cta}
                    </button>
                    <button
                      className="btn btn-ghost btn-sm gap-1 text-slate-400 hover:text-white"
                      onClick={() => setSelectedPlan(plan)}
                    >
                      See full details <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* COMPARISON TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Full feature comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/6 code-grid-bg shadow-2xl">
            <table className="w-full text-sm backdrop-blur-sm">
              <thead>
                <tr className="border-b border-white/6 text-center bg-[#0d1117]/60">
                  <th className="py-4 px-6 text-left text-slate-400 w-1/3 font-mono text-xs uppercase tracking-wider">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="py-4 px-6">
                      <button
                        className="font-bold text-white hover:text-primary transition-colors"
                        onClick={() => setSelectedPlan(p)}
                      >
                        {p.name}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                  >
                    <td className="py-3 px-6 text-slate-300">{row.label}</td>
                    <td className="py-3 px-6 text-center"><Cell val={row.starter} /></td>
                    <td className="py-3 px-6 text-center"><Cell val={row.pro} /></td>
                    <td className="py-3 px-6 text-center"><Cell val={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* DETAIL DRAWER */}
      <AnimatePresence>
        {selectedPlan && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedPlan(null)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#071228] border-l border-white/5 z-50 flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* Drawer header */}
              <div
                className={`p-6 bg-gradient-to-br ${selectedPlan.gradient} border-b border-white/5`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = selectedPlan.icon;
                      return (
                        <Icon className="h-6 w-6" style={{ color: selectedPlan.iconColor }} />
                      );
                    })()}
                    <h2 className="text-2xl font-extrabold">{selectedPlan.name}</h2>
                    {selectedPlan.popular && (
                      <span className="badge badge-sm bg-rose-500 text-white border-0">
                        Popular
                      </span>
                    )}
                  </div>
                  <button
                    className="btn btn-ghost btn-sm btn-circle"
                    onClick={() => setSelectedPlan(null)}
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-slate-300 text-sm">{selectedPlan.tagline}</p>
                <div className="mt-3">
                  <span className="text-4xl font-black">{selectedPlan.price}</span>
                  <span className="text-slate-400 text-xs ml-2">{selectedPlan.priceNote}</span>
                </div>
              </div>

              {/* Features */}
              <div className="p-6 flex-1">
                <h3 className="font-bold mb-3 text-slate-200">What{"'"}s included</h3>
                <ul className="space-y-3 mb-8">
                  {selectedPlan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-200">
                      <CheckIcon className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                {selectedPlan.missing?.length > 0 && (
                  <>
                    <h3 className="font-bold mb-3 text-slate-500">Not included</h3>
                    <ul className="space-y-2">
                      {selectedPlan.missing.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-slate-500 line-through"
                        >
                          <XIcon className="h-4 w-4 shrink-0 mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              {/* CTA */}
              <div className="p-6 border-t border-white/5 flex flex-col gap-3">
                <button
                  className={`btn btn-3d w-full ${
                    selectedPlan.id === "pro" ? "btn-primary" : selectedPlan.id === "enterprise" ? "btn-accent" : "btn-outline"
                  }`}
                  disabled={processing || isCurrentPlan(selectedPlan.id)}
                  onClick={() => {
                    setSelectedPlan(null);
                    handleSubscribe(selectedPlan);
                  }}
                >
                  {isCurrentPlan(selectedPlan.id)
                    ? "Current plan ✓"
                    : selectedPlan.cta}
                </button>
                <button
                  className="btn btn-ghost w-full text-slate-400"
                  onClick={() => setSelectedPlan(null)}
                >
                  Close
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    bullets: ['Community sessions', 'Basic editor & terminal', 'Public problems'],
    details: 'Starter is perfect for learners. You can join public rooms, practice problems and explore Stride without billing.'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12/mo',
    bullets: ['Private sessions', 'Session recording & playback', 'Priority support', 'Team collaboration features'],
    details: 'Pro unlocks private sessions, recording and advanced collaboration tools suited for interview prep and small teams.'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    bullets: ['SSO / SAML', 'Dedicated instances', 'Audit logs', 'Dedicated support & SLA'],
    details: 'Enterprise offers SSO, dedicated deployments, compliance features and a service-level agreement for large organizations.'
  }
]

export default function PlanCompare(){
  const [open, setOpen] = useState(null)

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Compare Plans</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">Choose a plan that fits your workflow — hover or click a plan to see full details.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map(plan => (
          <motion.div key={plan.id} whileHover={{ scale: 1.03 }} className="plan-card bg-base-100 card-hover p-6 border" onClick={()=>setOpen(plan)}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="text-sm text-slate-400">{plan.price}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Popular</div>
              </div>
            </div>

            <ul className="text-sm text-slate-200 space-y-2 mb-4">
              {plan.bullets.map((b,i)=> (
                <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary"/> {b}</li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <button className="btn btn-outline btn-sm" onClick={(e)=>{e.stopPropagation(); setOpen(plan)}}>View details</button>
              <button className="btn btn-primary btn-sm" onClick={(e)=>{e.stopPropagation(); alert('Subscribe flow placeholder for '+plan.name)}}>Choose <ArrowRight className="h-4 w-4 inline-block ml-1"/></button>
            </div>
          </motion.div>
        ))}
      </div>

      {open && (
        <div className="plan-modal fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setOpen(null)} />
          <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-base-100 p-6 rounded-lg shadow-2xl z-10 max-w-2xl w-full">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">{open.name} — {open.price}</h3>
                <p className="text-sm text-slate-400 mt-2">{open.details}</p>
              </div>
              <button className="btn btn-ghost" onClick={()=>setOpen(null)}><X className="h-5 w-5"/></button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Included</h4>
              <ul className="space-y-2">
                {open.bullets.map((b,i)=> (
                  <li key={i} className="flex items-center gap-3"><Check className="h-4 w-4 text-primary"/> {b}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button className="btn btn-outline" onClick={()=>setOpen(null)}>Close</button>
              <button className="btn btn-primary" onClick={()=>{alert('Proceed to subscribe to '+open.name)}}>Subscribe</button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

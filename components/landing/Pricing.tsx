"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    desc: "Perfect for small businesses just getting started with AI automation.",
    badge: null,
    color: "#3b82f6",
    features: [
      "Up to 1,000 conversations/mo",
      "1 WhatsApp number",
      "Instagram + Facebook inbox",
      "AI auto-replies",
      "Lead capture",
      "Email notifications",
      "Basic analytics",
      "2 team members",
    ],
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    desc: "For growing teams that need full omnichannel automation and advanced AI.",
    badge: "Most Popular",
    color: "#8b5cf6",
    features: [
      "Up to 10,000 conversations/mo",
      "3 WhatsApp numbers",
      "All channels + Web Chat",
      "AI voice agent (500 min/mo)",
      "Appointment booking",
      "AI knowledge base (10 docs)",
      "Workflow automation (25 flows)",
      "Advanced analytics + heatmaps",
      "Google Sheets / CRM sync",
      "10 team members",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large teams needing unlimited scale, custom integrations, and SLAs.",
    badge: "Best Value",
    color: "#10b981",
    features: [
      "Unlimited conversations",
      "Unlimited WhatsApp numbers",
      "All channels",
      "Unlimited AI voice agent",
      "Custom AI training",
      "Unlimited knowledge base",
      "Unlimited automations",
      "Custom analytics & reporting",
      "Dedicated account manager",
      "SLA & priority support",
      "SSO & advanced permissions",
      "API access",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge badge-purple" style={{ marginBottom: 18, display: "inline-flex" }}>
              Pricing
            </span>
            <h2 style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(30px, 5vw, 50px)",
              fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0ff", marginBottom: 14,
            }}>
              Start free. Scale as you{" "}
              <span className="gradient-text">grow</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(240,240,255,0.5)" }}>
              No hidden fees. Cancel anytime. 14-day free trial on all plans.
            </p>
          </motion.div>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: plan.badge === "Most Popular"
                  ? `linear-gradient(145deg, rgba(${plan.name === "Growth" ? "40,20,80" : "15,15,35"},0.95), rgba(10,10,25,0.98))`
                  : "linear-gradient(145deg, rgba(15,15,35,0.9), rgba(10,10,25,0.95))",
                border: plan.badge === "Most Popular"
                  ? `1px solid ${plan.color}45`
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: 32,
                position: "relative",
                boxShadow: plan.badge === "Most Popular"
                  ? `0 20px 60px ${plan.color}20`
                  : "none",
              }}
            >
              {plan.badge && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  padding: "4px 16px", borderRadius: 99,
                  background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                  fontSize: 11, fontWeight: 700, color: "white",
                  boxShadow: `0 4px 16px ${plan.color}40`,
                  whiteSpace: "nowrap",
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: plan.color, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {plan.name}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
                  <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 44, fontWeight: 800, color: "#f0f0ff", letterSpacing: "-0.04em" }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 15, color: "rgba(240,240,255,0.4)", fontWeight: 500 }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: 14, color: "rgba(240,240,255,0.5)", lineHeight: 1.6 }}>{plan.desc}</p>
              </div>

              <Link
                href="/dashboard"
                className={plan.badge === "Most Popular" ? "btn-primary" : "btn-secondary"}
                style={{ width: "100%", justifyContent: "center", marginBottom: 28, display: "flex" }}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                <ArrowRight size={15} />
              </Link>

              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: plan.color + "20",
                      border: `1px solid ${plan.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <Check size={10} color={plan.color} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 13.5, color: "rgba(240,240,255,0.6)", lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 40, fontSize: 13.5, color: "rgba(240,240,255,0.3)" }}
        >
          All plans include 14-day free trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}

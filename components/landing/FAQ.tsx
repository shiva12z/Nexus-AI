"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to set up NexusAI?",
    a: "Most customers are live within 15 minutes. You connect your channels, upload your knowledge base, and the AI starts handling conversations immediately. No coding or technical expertise required.",
  },
  {
    q: "Does NexusAI work with my existing WhatsApp Business account?",
    a: "Yes! NexusAI connects directly via the official WhatsApp Business API. We support both standard WhatsApp Business accounts and the Cloud API for higher volume businesses.",
  },
  {
    q: "Can I take over a conversation from the AI?",
    a: "Absolutely. With one click in the Unified Inbox, you can take over any conversation and switch from AI to human mode. You can also set rules for automatic escalation based on keywords or sentiment.",
  },
  {
    q: "How accurate is the AI? What if it gives wrong answers?",
    a: "The AI answers based solely on your knowledge base, so it stays on-topic. You can review all AI responses in the dashboard and flag incorrect ones to retrain the model.",
  },
  {
    q: "What happens when someone asks something the AI doesn't know?",
    a: "The AI gracefully acknowledges it can't answer and routes the conversation to a human agent or collects contact info to follow up. You set the fallback behavior.",
  },
  {
    q: "Is my data secure? Do you use customer conversations to train your model?",
    a: "Your data is encrypted at rest and in transit. We do NOT use your customer data to train any shared AI models. Your knowledge base and conversation data are private to your workspace.",
  },
  {
    q: "Can I connect multiple businesses or brands?",
    a: "Yes. Enterprise plans support multiple workspaces with separate AI configurations, branding, and team members.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — every plan comes with a 14-day free trial. No credit card required. You get full access to all features during the trial.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, padding: "20px 0", background: "none", border: "none", cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 15.5, fontWeight: 600, color: "#f0f0ff", lineHeight: 1.4 }}>{q}</span>
        <ChevronDown
          size={18}
          color="rgba(240,240,255,0.4)"
          style={{ flexShrink: 0, transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ fontSize: 14.5, color: "rgba(240,240,255,0.55)", lineHeight: 1.75, paddingBottom: 20 }}>
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge badge-blue" style={{ marginBottom: 18, display: "inline-flex" }}>FAQ</span>
            <h2 style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(28px, 5vw, 46px)",
              fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0ff", marginBottom: 14,
            }}>
              Everything you need to{" "}
              <span className="gradient-text">know</span>
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(145deg, rgba(15,15,35,0.9), rgba(10,10,25,0.95))",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "0 32px",
          }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

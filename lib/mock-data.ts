// ============================================================
// NexusAI — Mock Data
// ============================================================

export const mockConversations = [
  {
    id: "c1", channel: "whatsapp", name: "Sofia Martinez", avatar: "SM",
    avatarColor: "#25D366", lastMessage: "Hi, I'd like to book an appointment for tomorrow",
    time: "2m ago", unread: 2, status: "active", aiHandled: true,
    messages: [
      { id: "m1", role: "user", text: "Hi, I'd like to book an appointment for tomorrow", time: "10:42 AM" },
      { id: "m2", role: "ai", text: "Hello Sofia! I'd be happy to help you book an appointment. We have slots available at 10:00 AM, 2:00 PM, and 4:30 PM tomorrow. Which works best for you?", time: "10:42 AM" },
      { id: "m3", role: "user", text: "2 PM works great!", time: "10:43 AM" },
      { id: "m4", role: "ai", text: "Perfect! I've booked your appointment for tomorrow at 2:00 PM. You'll receive a confirmation SMS shortly. Is there anything else I can help you with?", time: "10:43 AM" },
    ]
  },
  {
    id: "c2", channel: "instagram", name: "Jake Thompson", avatar: "JT",
    avatarColor: "#E1306C", lastMessage: "Do you ship internationally?", time: "8m ago",
    unread: 1, status: "active", aiHandled: true,
    messages: [
      { id: "m1", role: "user", text: "Do you ship internationally?", time: "10:35 AM" },
      { id: "m2", role: "ai", text: "Yes, we do ship internationally to 40+ countries! Shipping typically takes 7-14 business days. Would you like more details about shipping costs to your country?", time: "10:35 AM" },
    ]
  },
  {
    id: "c3", channel: "facebook", name: "Emma Wilson", avatar: "EW",
    avatarColor: "#1877F2", lastMessage: "What are your business hours?", time: "15m ago",
    unread: 0, status: "resolved", aiHandled: true,
    messages: [
      { id: "m1", role: "user", text: "What are your business hours?", time: "10:25 AM" },
      { id: "m2", role: "ai", text: "We're open Monday–Friday 9 AM to 6 PM, and Saturday 10 AM to 4 PM. We're closed on Sundays. Is there something specific I can help you with today?", time: "10:25 AM" },
      { id: "m3", role: "user", text: "Thanks! That's all I needed.", time: "10:26 AM" },
      { id: "m4", role: "ai", text: "You're welcome! Have a great day 😊", time: "10:26 AM" },
    ]
  },
  {
    id: "c4", channel: "webchat", name: "Raj Patel", avatar: "RP",
    avatarColor: "#8b5cf6", lastMessage: "I need help with my order #4521", time: "22m ago",
    unread: 3, status: "human", aiHandled: false,
    messages: [
      { id: "m1", role: "user", text: "I need help with my order #4521", time: "10:18 AM" },
      { id: "m2", role: "ai", text: "I can see order #4521 — it's currently in transit and expected to arrive by Thursday. Is there anything specific you need help with?", time: "10:18 AM" },
      { id: "m3", role: "user", text: "It's been 3 weeks, I want a refund!", time: "10:19 AM" },
      { id: "m4", role: "system", text: "AI handed off to human agent", time: "10:19 AM" },
    ]
  },
  {
    id: "c5", channel: "whatsapp", name: "Lena Kim", avatar: "LK",
    avatarColor: "#25D366", lastMessage: "Can I get a price quote?", time: "1h ago",
    unread: 0, status: "active", aiHandled: true,
    messages: [
      { id: "m1", role: "user", text: "Can I get a price quote?", time: "09:40 AM" },
      { id: "m2", role: "ai", text: "Of course! Our pricing starts at $49/month for the Starter plan. Could you tell me more about your needs so I can give you the most accurate quote?", time: "09:40 AM" },
    ]
  },
  {
    id: "c6", channel: "instagram", name: "Carlos Ruiz", avatar: "CR",
    avatarColor: "#E1306C", lastMessage: "Amazing product, just ordered!", time: "2h ago",
    unread: 0, status: "resolved", aiHandled: true,
    messages: [
      { id: "m1", role: "user", text: "Amazing product, just ordered!", time: "08:30 AM" },
      { id: "m2", role: "ai", text: "Thank you so much Carlos! 🎉 We're thrilled you're excited. You'll receive an email confirmation shortly.", time: "08:30 AM" },
    ]
  },
];

export const mockLeads = [
  { id: "l1", name: "Sofia Martinez",   channel: "WhatsApp",  intent: "Booking",   email: "sofia@example.com",   phone: "+1 555 0101", status: "qualified",   score: 92, assignedTo: "Sarah K.", tags: ["hot", "vip"] },
  { id: "l2", name: "Jake Thompson",    channel: "Instagram", intent: "Purchase",  email: "jake@example.com",    phone: "+1 555 0102", status: "contacted",   score: 78, assignedTo: "Mike R.", tags: ["warm"] },
  { id: "l3", name: "Emma Wilson",      channel: "Facebook",  intent: "Support",   email: "emma@example.com",    phone: "+1 555 0103", status: "new",         score: 45, assignedTo: "Unassigned", tags: [] },
  { id: "l4", name: "Raj Patel",        channel: "Web Chat",  intent: "Refund",    email: "raj@example.com",     phone: "+1 555 0104", status: "escalated",   score: 30, assignedTo: "Sarah K.", tags: ["urgent"] },
  { id: "l5", name: "Lena Kim",         channel: "WhatsApp",  intent: "Pricing",   email: "lena@example.com",    phone: "+1 555 0105", status: "qualified",   score: 85, assignedTo: "Mike R.", tags: ["warm", "enterprise"] },
  { id: "l6", name: "Carlos Ruiz",      channel: "Instagram", intent: "Purchase",  email: "carlos@example.com",  phone: "+1 555 0106", status: "converted",   score: 95, assignedTo: "Sarah K.", tags: ["converted"] },
  { id: "l7", name: "Priya Sharma",     channel: "WhatsApp",  intent: "Booking",   email: "priya@example.com",   phone: "+1 555 0107", status: "qualified",   score: 88, assignedTo: "Mike R.", tags: ["hot"] },
  { id: "l8", name: "Tom Anderson",     channel: "Facebook",  intent: "Info",      email: "tom@example.com",     phone: "+1 555 0108", status: "new",         score: 55, assignedTo: "Unassigned", tags: [] },
  { id: "l9", name: "Nina Patel",       channel: "Web Chat",  intent: "Purchase",  email: "nina@example.com",    phone: "+1 555 0109", status: "contacted",   score: 72, assignedTo: "Sarah K.", tags: ["warm"] },
  { id: "l10", name: "James Liu",       channel: "Instagram", intent: "Pricing",   email: "james@example.com",   phone: "+1 555 0110", status: "qualified",   score: 81, assignedTo: "Mike R.", tags: ["enterprise"] },
];

export const mockTeamMembers = [
  { id: "t1", name: "Sarah Kim",       role: "Admin",        email: "sarah@nexusai.com",   avatar: "SK", status: "online",  conversations: 12, resolved: 89, responseTime: "1.2m", channels: ["WhatsApp", "Instagram"] },
  { id: "t2", name: "Mike Rodriguez",  role: "Agent",        email: "mike@nexusai.com",    avatar: "MR", status: "online",  conversations: 8,  resolved: 64, responseTime: "2.1m", channels: ["Facebook", "Web Chat"] },
  { id: "t3", name: "Anna Chen",       role: "Agent",        email: "anna@nexusai.com",    avatar: "AC", status: "away",    conversations: 5,  resolved: 41, responseTime: "3.4m", channels: ["WhatsApp"] },
  { id: "t4", name: "David Park",      role: "Supervisor",   email: "david@nexusai.com",   avatar: "DP", status: "offline", conversations: 0,  resolved: 120, responseTime: "1.8m", channels: ["All"] },
];

export const mockBookings = [
  { id: "b1", name: "Sofia Martinez",  date: "2026-05-25", time: "2:00 PM",  type: "Consultation",  channel: "WhatsApp", status: "confirmed", agent: "Sarah K." },
  { id: "b2", name: "Priya Sharma",    date: "2026-05-25", time: "3:30 PM",  type: "Demo Call",     channel: "WhatsApp", status: "confirmed", agent: "Mike R." },
  { id: "b3", name: "James Liu",       date: "2026-05-26", time: "10:00 AM", type: "Onboarding",    channel: "Instagram", status: "pending",  agent: "Anna C." },
  { id: "b4", name: "Nina Patel",      date: "2026-05-26", time: "2:00 PM",  type: "Support Call",  channel: "Web Chat", status: "confirmed", agent: "Sarah K." },
  { id: "b5", name: "Carlos Ruiz",     date: "2026-05-27", time: "11:00 AM", type: "Consultation",  channel: "Instagram", status: "confirmed", agent: "Mike R." },
  { id: "b6", name: "Tom Anderson",    date: "2026-05-28", time: "4:00 PM",  type: "Demo Call",     channel: "Facebook", status: "pending",   agent: "Unassigned" },
];

export const mockNotifications = [
  { id: "n1", type: "lead",    title: "New lead from Instagram",        desc: "Jake Thompson showed purchase intent",     time: "2m ago",  read: false, icon: "user-plus" },
  { id: "n2", type: "booking", title: "AI booked a meeting",            desc: "Sofia Martinez — tomorrow 2:00 PM",        time: "5m ago",  read: false, icon: "calendar" },
  { id: "n3", type: "human",   title: "Human intervention required",    desc: "Raj Patel is requesting refund support",   time: "12m ago", read: false, icon: "alert-triangle" },
  { id: "n4", type: "ai",      title: "AI resolved support query",      desc: "Emma Wilson — business hours question",    time: "25m ago", read: true,  icon: "bot" },
  { id: "n5", type: "lead",    title: "New WhatsApp lead captured",     desc: "Lena Kim — pricing inquiry",               time: "1h ago",  read: true,  icon: "user-plus" },
  { id: "n6", type: "booking", title: "Meeting cancelled",              desc: "David Park cancelled 3:00 PM slot",        time: "2h ago",  read: true,  icon: "calendar-x" },
];

export const mockKnowledgeItems = [
  { id: "k1", title: "Business Hours & Locations",     type: "faq",     chunks: 4,  status: "trained", updatedAt: "2 days ago" },
  { id: "k2", title: "Product Catalog 2026",           type: "pdf",     chunks: 48, status: "trained", updatedAt: "5 days ago" },
  { id: "k3", title: "Refund & Return Policy",         type: "faq",     chunks: 8,  status: "trained", updatedAt: "1 week ago" },
  { id: "k4", title: "Pricing & Plans",                type: "web",     chunks: 12, status: "trained", updatedAt: "3 days ago" },
  { id: "k5", title: "Shipping Information",           type: "faq",     chunks: 6,  status: "training", updatedAt: "Just now" },
  { id: "k6", title: "Product User Manual v3.2",       type: "pdf",     chunks: 92, status: "pending", updatedAt: "—" },
];

// ---- Chart data ----
export const msgVolumeData = [
  { day: "Mon", whatsapp: 42, instagram: 28, facebook: 19, webchat: 15 },
  { day: "Tue", whatsapp: 58, instagram: 35, facebook: 22, webchat: 18 },
  { day: "Wed", whatsapp: 51, instagram: 41, facebook: 17, webchat: 24 },
  { day: "Thu", whatsapp: 67, instagram: 38, facebook: 29, webchat: 21 },
  { day: "Fri", whatsapp: 74, instagram: 52, facebook: 31, webchat: 28 },
  { day: "Sat", whatsapp: 48, instagram: 64, facebook: 24, webchat: 16 },
  { day: "Sun", whatsapp: 35, instagram: 58, facebook: 18, webchat: 12 },
];

export const leadConversionData = [
  { month: "Jan", leads: 120, converted: 38 },
  { month: "Feb", leads: 145, converted: 52 },
  { month: "Mar", leads: 168, converted: 61 },
  { month: "Apr", leads: 192, converted: 74 },
  { month: "May", leads: 221, converted: 89 },
];

export const channelData = [
  { name: "WhatsApp",  value: 38, color: "#25D366" },
  { name: "Instagram", value: 27, color: "#E1306C" },
  { name: "Facebook",  value: 18, color: "#1877F2" },
  { name: "Web Chat",  value: 17, color: "#8b5cf6" },
];

export const responseTimeData = [
  { hour: "6am",  time: 4.2 }, { hour: "8am",  time: 1.8 },
  { hour: "10am", time: 1.1 }, { hour: "12pm", time: 1.5 },
  { hour: "2pm",  time: 1.2 }, { hour: "4pm",  time: 0.9 },
  { hour: "6pm",  time: 1.4 }, { hour: "8pm",  time: 2.1 },
  { hour: "10pm", time: 3.5 },
];

export const activityFeed = [
  { id: "a1", type: "lead",    text: "New Instagram lead — Jake Thompson",        time: "just now",  icon: "instagram" },
  { id: "a2", type: "booking", text: "WhatsApp booking created — Sofia 2:00 PM",  time: "2m ago",    icon: "calendar" },
  { id: "a3", type: "ai",      text: "AI resolved support query — Emma Wilson",   time: "5m ago",    icon: "bot" },
  { id: "a4", type: "lead",    text: "New WhatsApp lead — Lena Kim",              time: "12m ago",   icon: "whatsapp" },
  { id: "a5", type: "human",   text: "Human takeover — Raj Patel (refund)",       time: "18m ago",   icon: "alert" },
  { id: "a6", type: "booking", text: "AI booked meeting — Priya Sharma 3:30 PM", time: "25m ago",   icon: "calendar" },
  { id: "a7", type: "ai",      text: "AI closed conversation — Carlos Ruiz",      time: "1h ago",    icon: "bot" },
];

export const mockStats = {
  totalConversations: 1284,
  leadsCapture: 348,
  aiResponseRate: 94.2,
  bookingsToday: 12,
  revenuePotential: 48500,
  avgResponseTime: 1.4,
  resolvedToday: 89,
  satisfactionScore: 4.8,
};

export const mockCallLog = [
  { id: "v1", name: "David Park",    phone: "+1 555 0201", duration: "4:32", sentiment: "positive", summary: "Asked about enterprise pricing. Interested in annual plan.", date: "Today, 11:20 AM",  status: "completed" },
  { id: "v2", name: "Maria Santos",  phone: "+1 555 0202", duration: "2:18", sentiment: "neutral",  summary: "Inquired about integration with Salesforce.", date: "Today, 10:05 AM",   status: "completed" },
  { id: "v3", name: "Ben Wright",    phone: "+1 555 0203", duration: "1:45", sentiment: "negative", summary: "Complaint about delayed delivery. Escalated to support.", date: "Yesterday, 3:30 PM", status: "escalated" },
  { id: "v4", name: "Aisha Nkosi",   phone: "+1 555 0204", duration: "6:10", sentiment: "positive", summary: "Product demo — very interested, ready to upgrade.", date: "Yesterday, 1:15 PM", status: "completed" },
];

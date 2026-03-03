# 🚀 AgenticFlow Mobile: B2B AI Agent Workspace

**A functional MVP demonstrating mobile-first agentic workflows for B2B decision-makers.**

🔗 **[Live Demo → b2b-mobile-agent.vercel.app](https://b2b-mobile-agent.vercel.app/)**

---

## 📋 Executive Summary

AgenticFlow Mobile is a working prototype that showcases how AI agents should behave on a 6-inch screen — not as chatbots, but as **action-oriented copilots** that render approvals, charts, and workflows directly in a conversational feed.

This MVP was built to demonstrate deep expertise in:

- **AI-native UX patterns** — Generative UI that goes beyond text bubbles
- **Agentic system design** — Configurable, autonomous AI agents with real task histories
- **Rapid prototyping at velocity** — From zero to deployed MVP with OpenAI + Supabase in days, not months
- **Mobile-first B2B thinking** — Solving for the executive on the go, not the analyst at a desk

---

## 🔍 The Problem Discovery

### B2B leaders are stuck at their desks — but business doesn't wait.

When a sales leader needs a pipeline summary before walking into a meeting, or when a VP needs to approve a $200K marketing budget from an airport lounge, today's tools fail them:

| Pain Point | Impact |
|---|---|
| 📱 **Desktop ports crammed onto mobile** | Too many taps, complex navigation, high abandonment |
| 💬 **AI chatbots return walls of text** | Unreadable on a 6-inch screen, zero actionability |
| ⏳ **Workflows stall without approvals** | Hours of delay because the decision-maker isn't at their laptop |
| 🔀 **Context-switching between apps** | Slack → CRM → Sheets → Email — productivity collapse |

**The insight:** Mobile B2B users don't need *information*. They need **unblocked decisions in under 15 seconds.**

---

## 💡 The Product Solution: Generative UI

AgenticFlow Mobile moves past the standard "chat bubble" paradigm into **Action-Oriented Generative UI** — a core design principle where the AI doesn't just *respond*, it **renders the right interface** for the task at hand.

### How it works in practice:

| User Intent | Traditional Chatbot | AgenticFlow Mobile |
|---|---|---|
| "Approve the Q3 budget" | Returns a paragraph of text | Renders a native **Approve / Reject** card |
| "Show pipeline velocity" | Dumps a data table | Generates a **mini-chart** inline in the feed |
| "Run the daily standup report" | "Here's a summary..." | Executes a **multi-step agentic workflow** with live progress |
| Opens the app cold | Blank screen, cursor blinking | **Contextual zero-state** suggesting pending agent tasks |

### Three core UX principles:

1. **🎯 Action-Oriented Generative UI** — Every agent response is a renderable component, not a string. Approval cards, charts, and status feeds are generated natively in the chat.

2. **🎙️ Voice-First Input** — Designed for users who are walking, commuting, or between meetings. Voice dictation is a first-class input method (roadmap).

3. **🧠 Contextual Zero-State** — The app proactively surfaces the right agents and pending tasks based on time-of-day and workflow state. No blank screens.

---

## 📊 Product Strategy & Success Metrics

This MVP is measured not by vanity metrics, but by **how effectively it accelerates business operations**.

### Primary KPIs:

| Metric | Definition | Target |
|---|---|---|
| ⚡ **Task Velocity** | Reduction in avg. time-to-approval for agentic workflows | From hours → **< 15 min** |
| 📲 **Agent Executions / Session** | Number of agent interactions per mobile session | **> 2 per session** |
| 🔁 **D7 / D30 Retention** | Mobile retention rate, segmented by voice vs. text users | Track adoption curves |
| 🎯 **Zero-State Engagement** | % of sessions where users act on a proactive suggestion | **> 40%** |

### Strategic bets validated by this MVP:

- **Bet 1:** B2B users will prefer *generated UI components* over text responses on mobile → validated by the agentic workflow card pattern
- **Bet 2:** Configurable no-code agents can be managed effectively from a phone → validated by the full agent CRUD (create, configure, pause, delete)
- **Bet 3:** Speed-to-insight matters more than depth-of-insight on mobile → validated by concise, card-based AI responses

---

## 🏗️ Technical Architecture & Trade-offs

Every technology choice was made through the lens of **speed to market** and **outcome per engineering hour**.

| Layer | Technology | PM Rationale |
|---|---|---|
| **Frontend** | Next.js 13, React, TypeScript | Server components for fast initial load; type safety reduces bugs in rapid iteration |
| **Styling** | Tailwind CSS | Utility-first = faster UI iteration than component libraries; pixel-perfect mobile control |
| **AI Engine** | OpenAI API (GPT-4o-mini) | Best cost/quality ratio for conversational AI; streaming-ready for future UX upgrades |
| **Database** | Supabase (Postgres + Auth) | Instant setup, row-level security, real-time subscriptions — zero backend boilerplate |
| **Deployment** | Vercel | Git-push deploys, edge network, perfect Next.js integration — zero DevOps overhead |

### Key trade-offs made:

- **Client-side state vs. server persistence** — Agent configurations are client-side in this MVP for speed. Production would persist to Supabase with optimistic updates.
- **GPT-4o-mini vs. GPT-4o** — Chose the smaller model for cost efficiency and latency. The UX pattern matters more than model power at the prototype stage.
- **No auth in MVP** — Deliberately scoped out to focus on the core agentic UX. Production would use Supabase Auth with RLS policies.

---

## 🛠️ Local Development

```bash
git clone https://github.com/aurimas13/web_application.git
cd web_application
npm install
npm run dev
```

Create a `.env.local` file:

```env
OPENAI_API_KEY=your-openai-api-key
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📄 License

MIT

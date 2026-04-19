# 🚀 Agentic Mobile — B2B AI Agent Workspace

**Mobile-first AI agent workspace that turns walls of text into actionable UI — approvals, charts, and live workflows on a 6-inch screen.**

🔗 **[Live Demo → agentic.aurimas.io](https://agentic.aurimas.io)** &nbsp;|&nbsp; [← Back to aurimas.io](https://aurimas.io)

---

## 📋 Executive Summary

Agentic Mobile is a functional MVP built to demonstrate expertise in **AI-native UX patterns**, **agentic system design**, and **rapid prototyping** for B2B mobile users.

The core thesis: B2B decision-makers need to unblock workflows from their phone — but today's mobile AI tools just dump text. This prototype proves that **Generative UI** (rendering approval cards, charts, and live workflow progress directly in a conversational feed) is the right pattern for mobile-first B2B.

**Built in days, not months** — from zero to deployed MVP with OpenAI, Supabase, and Vercel.

---

## 🔍 The Problem

### B2B leaders are desk-bound — but business doesn't wait.

| Pain Point | Impact |
|---|---|
| 📱 **Desktop UIs crammed onto mobile** | Too many taps, complex navigation, high abandonment |
| 💬 **AI chatbots return walls of text** | Unreadable on a 6-inch screen, zero actionability |
| ⏳ **Workflows stall without approvals** | Hours of delay because the decision-maker isn't at their laptop |
| 🔀 **Context-switching between apps** | Slack → CRM → Sheets → Email — productivity collapse |

**The insight:** Mobile B2B users don't need *information*. They need **unblocked decisions in under 15 seconds.**

---

## 💡 The Solution: Action-Oriented Generative UI

Instead of text replies, the AI **renders the right interface** for each task:

| User Intent | Traditional Chatbot | Agentic Mobile |
|---|---|---|
| "Approve the Q3 budget" | Returns a paragraph of text | Renders a native **Approve / Reject** card |
| "Show pipeline velocity" | Dumps a data table | Generates a **mini-chart** inline in the feed |
| "Run the daily standup report" | "Here's a summary…" | Executes a **multi-step agentic workflow** with live progress |
| Opens the app cold | Blank screen, cursor blinking | **Contextual zero-state** suggesting pending tasks |

### Three core UX principles:

1. **🎯 Generative UI** — Every agent response is a renderable component, not a string
2. **🎙️ Voice-First Input** — Designed for users on the move (roadmap)
3. **🧠 Contextual Zero-State** — Proactive suggestions based on time and workflow state

---

## 📊 Key Metrics & Outcomes

| Metric | Target |
|---|---|
| ⚡ **Task Velocity** | Time-to-approval: hours → **< 15 min** |
| 📲 **Agent Executions / Session** | **> 2 per mobile session** |
| 🎯 **Zero-State Engagement** | **> 40%** of sessions act on proactive suggestions |
| 🔁 **D7 / D30 Retention** | Track voice vs. text adoption curves |

### Strategic bets validated:

- **Bet 1:** B2B users prefer *generated UI components* over text on mobile → validated by agentic workflow card pattern
- **Bet 2:** No-code agents can be managed from a phone → validated by full agent CRUD (create, configure, pause, delete)
- **Bet 3:** Speed-to-insight > depth-of-insight on mobile → validated by concise card-based responses

---

## 🏗️ Tech Stack & Trade-offs

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | Next.js 13 · React · TypeScript | Fast initial load, type-safe rapid iteration |
| **Styling** | Tailwind CSS | Pixel-perfect mobile control, faster than component libs |
| **AI** | OpenAI API (GPT-4o-mini) | Best cost/quality ratio; streaming-ready |
| **Database** | Supabase (Postgres) | Instant setup, RLS, real-time — zero backend boilerplate |
| **Deploy** | Vercel | Git-push deploys, edge network, zero DevOps |

### Trade-offs made deliberately:

- **Client-side state** in this MVP for speed → production would persist to Supabase with optimistic updates
- **GPT-4o-mini over GPT-4o** → UX pattern matters more than model power at prototype stage
- **No auth** → scoped out to focus on core agentic UX; production would use Supabase Auth + RLS

---

## 🛠️ Local Development

```bash
git clone https://github.com/aurimas13/web_application.git
cd web_application
npm install
npm run dev
```

Create `.env.local`:

```env
OPENAI_API_KEY=your-openai-api-key
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📄 License

MIT

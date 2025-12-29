# KanakMeghaPortfolio 🚀

An AI-powered, dynamic portfolio built with **Next.js 15** and **React 19**. This isn't just a static resume; it's a live-synced platform that uses Large Language Models (LLMs) to tell the story of my code.

---

## 🌟 For Everyone (Non-Developers)
**What is this?** This is my digital home. Unlike traditional portfolios that get outdated the moment they are published, this site stays "fresh" by talking directly to my GitHub account. 

**Key Features:**
* **AI Storyteller:** A built-in assistant that knows my projects and can answer questions about my journey.
* **Live Sync:** If I push a new project to GitHub, it appears here automatically.
* **Interactive Design:** A sleek, dark-mode-first interface designed for smooth navigation and readability.

---

## 🛠 For Developers (Technical Deep-Dive)

### 1. The Architecture
This project is built on the **Next.js App Router** and utilizes a hybrid rendering strategy to maximize performance while maintaining dynamic capabilities.

#### Dynamic Data Fetching (GitHub API)
Instead of a static `data.ts` file, the project uses an asynchronous service layer to fetch repository metadata.
* **Concept:** Data Decoupling.
* **Implementation:** Server-side fetching of repository names, descriptions, and tech stacks to prevent client-side API key exposure.

#### AI Integration (RAG-lite)
The "AI Storyteller" uses a **Retrieval-Augmented Generation (RAG)** pattern.
* **Context Injection:** Live project data is serialized into JSON and injected into the LLM system prompt.
* **Persona Engineering:** The assistant is constrained to a concise, "Enthusiastic Storyteller" persona, avoiding markdown overhead for a natural chat experience.

#### Advanced React 19 Patterns
* **Hydration Management:** Implemented a `mounted` state guard pattern to resolve server/client mismatches caused by browser-specific APIs and dynamic data.
* **Server Actions:** Secure communication between the chat UI and the AI inference endpoints, keeping API keys hidden from the client-side bundle.

---

### 🧩 Challenges & Solutions

| Issue | Technical Solution | Engineering Concept |
| :--- | :--- | :--- |
| **Hydration Mismatch** | Used `useEffect` with a `mounted` state to delay rendering of environment-specific components. | **Request-Response Lifecycle** |
| **Dependency Conflicts** | Resolved React 19 / Shadcn UI conflicts by re-mapping internal library APIs (e.g., `react-day-picker`). | **Dependency Management** |
| **AI Verbosity** | Optimized system prompts to enforce conciseness and remove markdown formatting noise. | **Prompt Engineering** |

---

## 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router), React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Lucide React, Shadcn UI
* **Backend/AI:** Server Actions, HuggingFace Inference API
* **Deployment

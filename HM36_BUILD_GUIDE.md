# HM36 Skill Swap Ecosystem: Detailed Project Build Guide

## Overview
The HM36 Skill Swap Board is a decentralized, peer-to-peer knowledge exchange platform. It operates on a bartering system where users trade skills without financial transactions, utilizing algorithmic matching to pair complementary learning goals.

### Expected Outcomes
1. **Dynamic Profile**: Users can list skills they offer and skills they want to learn, complete with proficiency tags.
2. **Match-Suggestions Feed**: An algorithmically curated feed suggesting compatible swap partners based on the "Double Coincidence of Wants".
3. **Swap Request Flow**: A state-managed interaction flow from discovery to execution (pending, accepted, scheduled, active session).

---

## Core Technology Stack (2025 Architecture)
- **Frontend**: Next.js 15 (React 19, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security)
- **Real-time Logic**: Socket.io / WebSockets (Supabase Realtime)
- **State Management**: Zustand
- **Deployment**: Vercel / Docker

---

## 10-Phase Implementation Roadmap

### Phase 1: Environmental Scaffolding and Core Setup
*   **Next.js Init**: Scaffold the application using `npx create-next-app@latest` with the App Router.
*   **Supabase Next.js integration**: Setup `@supabase/ssr` to handle cookie-based authentication required for RSC.
*   **Environment**: Setup `.env.local` for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Phase 2: Database Modeling and RLS Policies (Supabase)
*   **Schema**: Establish relational tables (`profiles`, `skills_master`, `offered_skills`, `wanted_skills`, `swap_requests`).
*   **Security**: Enable PostgreSQL Row Level Security (RLS) to ensure privacy between peers.
*   **Search**: Enable `pg_trgm` extension for fuzzy-string taxonomy searching.

### Phase 3: Authentication and State-Managed Middleware
*   **Auth UI**: Implement sign-in and sign-up flows using Supabase Auth.
*   **Middleware**: Create Next.js `middleware.ts` to protect private routes (`/dashboard`, `/matches`, `/messenger`).
*   **Session Refresh**: Use `@supabase/ssr` to maintain active JWTs on the server.

### Phase 4: Profile and Taxonomy Management UI
*   **Taxonomy Engine**: Build a multi-select component to categorize skills by Domain, Category, and Tag.
*   **Proficiency Scale**: Implement selection mechanism for proficiency levels (Foundational to Strategic).
*   **Onboarding Flow**: Ensure a guaranteed setup where a user must define at least one "Teach" and one "Learn" skill.

### Phase 5: Engineering the Reciprocal Matching Engine
*   **Similarity Logic**: Create PostgreSQL RPC functions that compute compatibility scores based on skill overlap and proficiency distance.
*   **Server Actions**: Fetch the top recommendations using Next.js Server Actions to serve the `MatchFeed` component directly on the server.
*   **Data Caching**: Implement `revalidateTag` to efficiently update match suggestions.

### Phase 6: Swap Request State Machine and Dashboard
*   **Request Initiation**: Map the interactions to the `swap_requests` table (PENDING status).
*   **Notifications**: Tie Supabase Realtime to the UI to push instant match request alerts.
*   **Dashboard**: Unify Active Swaps, Pending Requests, and Completed Sessions in one view.

### Phase 7: Real-time Communication and Chat Architecture
*   **Channel Generation**: Map unique chat channels to accepted `swap_requests`.
*   **Live Persistence**: Use Supabase Realtime/Socket.io to deliver instant messages and persist them to PostgreSQL.
*   **Rich Features**: Integrate read receipts and typing indicators.

### Phase 8: Integrating the Virtual Classroom Tools
*   **Dynamic Routes**: Build out `/session/[id]` for active collaborations.
*   **WebRTC Video**: Integrate `simple-peer` or a managed API (like Daily.co) for the peer-to-peer video streams.
*   **Shared Workspace**: Integrate collaborative elements like Monaco Editor for pair-programming and Excalidraw for whiteboarding.

### Phase 9: Feedback, Rating, and Reputation Systems
*   **Review Flow**: Trigger automated review forms post-session.
*   **Reputation Engine**: Aggregate user scores via background database functions.
*   **Token Ecosystem**: Credit successful verifications to build accountability and platform authority.

### Phase 10: DevOps, Quality Assurance, and Deployment
*   **Testing**: Implement Playwright/Cypress end-to-end tests for the critical Swap Request flow.
*   **CI/CD**: Connect GitHub Actions to automate checks before deploying directly to Vercel edge networks.
*   **Observability**: Integrate Sentry for frontend telemetry and Supabase dashboard tools for database queries.
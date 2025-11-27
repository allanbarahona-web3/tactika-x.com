# 🏪 **Barmentech Commerce SaaS**
**Multi-industry modular platform for eCommerce, CRM, invoicing and business automations.**

Barmentech Commerce is a **multi-tenant business platform** designed to let companies sell, communicate and operate using **a single modular backend**, where each tenant activates only the modules they need.

Unlike typical CMS or web templates, Barmentech provides:

- **Real multi-tenancy architecture (RLS + AI-ready workflows)**
- **Omnichannel CRM with API integrations and real-time messaging**
- **Storefront modules customizable by domain, theme and logo**
- **Workflow automation via APIs, webhooks, and messaging triggers**
- **Enterprise-grade security (JWT+JTI, RLS, rate limiting)**

📌 **One backend, multiple business applications.**
Each tenant becomes its own independent platform with different capabilities.

---

## 🧩 **Platform Modules**
📦 **eCommerce**  
- Storefront with custom domains, logos and themes  
- Tenant-isolated cart, checkout, catalog and users  
- Ready for digital or physical products  

💬 **Omnichannel CRM**  
- WebSocket real-time messaging  
- WhatsApp / Telegram / email integrations (via APIs & webhooks)  
- Contact profiles, history, funnels, analytics   

📜 **Invoicing & Billing**  
- Digital receipts & ledger for orders  
- Billing rules per tenant and automation  
- Ready for integrations with payment providers  

🤖 **Business Automations**  
- Webhook-based triggers from external systems    
- Event-driven payments + delivery flows  
- Triggers for CRM, Storefront or Billing  

---

## 🏗 **Business Architecture**
| Component | Role |
|-----------|------|
| **Core SaaS Engine** | Multi-tenant logic, auth, modules, isolation |
| **Tenant Storefronts** | Modular commerce with custom domains |
| **Omnichannel CRM** | Real-time messaging + customer operations |
| **Invoicing Layer** | Orders ledger, billing, receipts |
| **Automations Hub** | Webhooks, background jobs and workflow orchestration |

🔐 **Each tenant has its own users, domain, products, orders, settings, contacts and data rules.**

---

## 🛠 **Tech Architecture (High-Level)**
> Stack: **NestJS + PostgreSQL (RLS) + Next.js App Router + Stripe + Docker**

┌────────────── Storefront (Next.js) ───────────────┐
│ Auth • Cart • Checkout • Admin • Custom Themes │
└──────────────────────────┬────────────────────────┘
↓
┌──────────────────── Backend (NestJS) ─────────────┐
│ Modules: Commerce • CRM • Billing • Automations │
│ RLS + Auth + JTI + Rate Limit + DTO Validation │
└──────────────────────┬────────────────────────────┘
↓
PostgreSQL + Row-Level Security (RLS)


---

## 🔐 **Security & Isolation**
✔ PostgreSQL **Row-Level Security (32+ policies)**  
✔ JWT with **JTI revocation**  
✔ Rate limiting + CORS rules  
✔ Role-based access control (admin, customer, super admin)  
✔ Domain-to-tenant routing with middleware + guards  
✔ Strict tenant isolation in every service  

---

## 🚀 **Project Status**
🔧 **Backend — Production-Ready (85%+)**
- NestJS + Prisma  
- Multi-tenancy + Host extraction  
- RLS Policies across all modules  
- Auth + JTI + Rate limiting  
- 32+ endpoints shipped  
- Tests in progress  

🛒 **Storefront — Functional (App Router)**
- Multi-tenant UI + Themes  
- Cart + Checkout flow  
- Admin panel with products, media, payments  
- Auth modal + context + reusable hooks  

💬 **CRM & Automations — Architecture Complete**
- WebSockets + gateway  
- WhatsApp API + Telegram ready  
- Automation layer planned around events, queues and webhooks 
---

## 📦 **Module Activation (Tenant-Based)**

Tenant 1 → Storefront + Billing
Tenant 2 → CRM + Automations
Tenant 3 → Storefront + CRM + Billing + Automations


📌 **This makes the platform scalable as a SaaS business**, not just an eCommerce template.

---

## 📁 **Project Structure**

<details>
<summary><b>Backend (NestJS + Prisma) — click to expand</b></summary>



api/
├── src/
│ ├── common/ # Decorators, guards, interceptors
│ ├── modules/ # Commerce, CRM, Billing, Automations
│ ├── prisma/ # ORM & migrations
│ ├── app.module.ts
│ └── main.ts
└── prisma/
├── schema.prisma
├── enable-rls.sql
└── seed.ts


</details>

<details>
<summary><b>Frontend (Next.js App Router) — click to expand</b></summary>



app/
├── (storefront)/ # Public store per tenant
├── (tenant-admin)/ # Admin Panel
├── components/ # Shared UI + modals + hooks
├── lib/ # API config + helpers + tenant utils
└── middleware.ts # Multi-tenant domain handling


</details>

---

## 🧪 **Tests**
> Tests cover security rules, RLS policies, domain isolation and business flows.

- Backend: **Jest + Supertest**  
- Frontend: **Vitest + Playwright**  
- Payment testing via **Stripe CLI & Paypal Sandbox & Crypto**

---

## 🚧 **Roadmap**

### Phase 1 — Finishing Commerce & Billing
- Complete checkout & order tracking  
- Stripe + PayPal + Crypto payments  
- Email + receipt automation  

### Phase 2 — CRM Release
- Webhooks + smart routing  
- Full WhatsApp/Telegram/Instagram/Tiktok/Emails/etc flows  
- Chat assignment + analytics  

### Phase 3 — Automations Hub
- Business rules engine  
- Workflow automation via APIs, webhooks, and messaging triggers
- API marketplace for modules  

---

## 📌 **License & Contact**
This project is currently **not open for contributions.**  
Business inquiries: *(add your email or LinkedIn link here)*

Nov27/2025
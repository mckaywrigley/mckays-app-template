# RFQ-to-Order Platform – Product Requirements Document (PRD)

_Last updated: {{DATE}}_

---

## 1. Purpose & Vision
A single-tenant web platform that enables mechanical part buyers to upload 3-D STEP files, specify part requirements, and receive rapid quotations from administrators (manufacturing team).  Accepted quotes convert automatically into production orders that both parties can track in real-time until completion.

**Why now?** Small-batch, quick-turn manufacturers lack a lightweight, transparent portal for RFQ → Quote → Order → Production without resorting to email chains or heavyweight ERP systems.

---

## 2. Goals & Non-Goals
### Goals
1. Allow authenticated users to submit RFQs with STEP file(s), production drawings, and structured specs.
2. Provide administrators with a queue to review RFQs and send back quotes (price, lead-time, notes).
3. Let users accept or reject quotes.  • Reject ➜ RFQ & files deleted.  • Accept ➜ becomes an **Order**.
4. Order lifecycle management (Admin can update status: _Queued → Production → QA → Shipped_).  Status changes notify users (email + in-app toast).
5. Self-service dashboard for both roles:  RFQs, Quotes, Orders, Status timeline.

### Non-Goals
* Integrated payment processing (handled offline for v1).
* Multi-tenant (single organisation only for v1).
* Fine-grained role hierarchies beyond _user_ and _admin_.

---

## 3. Personas & User Stories
| Persona | Story | Priority |
|---------|-------|----------|
| Buyer/User | _"I want to drag-and-drop my STEP + PDF drawing, enter material & quantity, and get a quote within hours."_ | P0 |
| Admin | _"I need a dashboard showing new RFQs, preview the CAD & drawing, then reply with price and lead-time."_ | P0 |
| Buyer/User | _"I want to accept the quote and know exactly when production starts and ships."_ | P0 |
| Admin | _"When a quote is accepted I want to convert it to an order and update status through production."_ | P0 |

---

## 4. Functional Requirements
### 4.1 Authentication  (already present via Clerk)
* Users sign-up / sign-in.
* Admin account flag **`isAdmin`** in users table or Clerk metadata.

### 4.2 RFQ Submission
* Form fields:
  * File upload – STEP (\.step|\.stp) **required**;  multiple allowed  ➜ stored in Supabase Storage `rfq/{rfqId}/`.
  * Drawing upload – PDF/DXF (optional).
  * Quantity (int), Material (string), Finish (string), Tolerance (string), Notes (text).
* Server Action `createRFQ()` → creates record **`rfqs`** table status=`pending_quote`.
* Email / in-app notification sent to Admin.

### 4.3 Quote Management
* Admin UI to list `pending_quote` RFQs.
* View file previews (use third-party STEP viewer or simple download).
* Form to input `price`, `currency`, `leadTimeDays`, `expiresAt`, `adminNotes`.
* Action `sendQuote(rfqId)` → writes to **`quotes`** table (1-to-1 with RFQ) status=`waiting_user` and emails user.

### 4.4 Quote Decision (User)
* Dashboard card with quote details + **Accept** / **Reject** buttons.
* Accept ➜ `quotes.status=accepted`, create **`orders`** record derived from RFQ, link files, initial `orderStatus=queued`.
* Reject ➜ delete RFQ + files (storage cleanup)  OR mark `rfq.status=rejected` then scheduled deletion (configurable).

### 4.5 Order Tracking
* Order timeline component reflecting status enum:
  * _queued → production → qa → shipped → completed_
* Admin can update via dropdown; user sees read-only.
* Status change triggers email + in-app notification.

### 4.6 Notifications
* Use Clerk email templates (or Postmark) for: RFQ receipt, Quote sent, Quote accepted/rejected, Order status updates.
* Toast notifications inside app via existing Sonner component.

---

## 5. Data Model (Drizzle ORM)
```mermaid
erDiagram
    users ||--o{ rfqs : "submitted_by"
    rfqs ||--|| quotes : "has"
    rfqs ||--|| orders : "becomes"

    users {
      text id PK
      text email
      bool is_admin
    }
    rfqs {
      uuid id PK
      text user_id FK
      json specs
      text step_folder_path
      text drawing_path
      enum status // pending_quote | rejected | converted
      timestamptz created_at
    }
    quotes {
      uuid id PK
      uuid rfq_id FK
      numeric price
      text currency
      int lead_time_days
      timestamptz expires_at
      enum status // waiting_user | accepted | rejected
      timestamptz created_at
    }
    orders {
      uuid id PK
      uuid rfq_id FK
      enum status // queued | production | qa | shipped | completed
      timestamptz created_at
    }
```

---

## 6. API & Server Actions
* `/actions/rfqs.ts` – `createRFQ`, `listRFQsByUser`, `deleteRFQ` …
* `/actions/quotes.ts` – `sendQuote`, `acceptQuote`, `rejectQuote` …
* `/actions/orders.ts` – `updateOrderStatus`, `listOrdersByUser` …

All actions secured with Clerk `currentUser()` & `isAdmin` checks.

---

## 7. UI / Navigation Additions
* Public routes remain the same.
* Authenticated area expands:
  * `/dashboard/rfqs` (table + "New RFQ" button).
  * `/dashboard/quotes` (pending decisions).
  * `/dashboard/orders` (status tracking).
* Admin‐only sidebar section:
  * `/admin/rfqs`
  * `/admin/orders`

---

## 8. Milestones & Phases
| Phase | Scope | Target |
|-------|-------|--------|
| 1     | Data model, RFQ create UI, admin RFQ list | +2 weeks |
| 2     | Quote flow (admin send, user accept/reject) | +2 weeks |
| 3     | Order tracking & notifications | +3 weeks |
| 4     | Polish, permissions hardening, docs | +1 week |

---

## 9. Risks & Mitigations
* **Large file uploads** – Use Supabase Storage Signed URLs + ~100 MB limits.
* **STEP preview** – fallback to download link if viewer fails.
* **Quote SLA** – add cron to mark expired quotes.

---

## 10. Open Questions
1. Exact maximum file size?
2. Currency support multi-currency or single?
3. Delete vs archive rejected RFQs – retention policy?

---

## 11. References
* This repo – Next.js 15 SaaS template (auth, UI).
* Supabase Storage docs – secure uploads.
* Drizzle ORM docs – migrations. 
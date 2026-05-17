# Semi-Autonomous Outbound Engine Blueprint

## 1) Operating Constraints (Codex/Cline Environment)

- Assume **no direct browser access** unless a browser automation tool is explicitly connected.
- Default to least privilege and safe operations.
- If browser automation is unavailable, produce:
  - runnable task queues,
  - operator checklists,
  - data-entry templates,
  - and message drafts (instead of pretending actions happened).

## 2) ICP and Positioning

### Primary geography
- Coimbatore, Tamil Nadu, India.

### Target segments
- Coaching institutes
- Tuition centers
- Jersey stores
- Fashion/apparel brands
- Football boot sellers
- Sneaker stores
- Real estate agencies
- Builders/promoters
- Property consultants

### Outcome-first positioning language
Use:
- Reduce missed enquiries
- Reply faster to customers
- Avoid losing leads in WhatsApp chats
- Organize all enquiries in one place
- Simplify follow-ups

Avoid:
- AI agency
- CRM company
- automation platform
- technical stack talk

## 3) System Architecture (Agent + Human-in-the-loop)

### A. Lead Discovery Worker
Input: niche + location keywords.
Output: candidate businesses with source links.

### B. Lead Intelligence Worker
Input: candidate profile/page.
Output: inferred operating pain signals and qualification features.

### C. Qualification Worker
Input: structured signals.
Output: lead score + reason codes + priority tier.

### D. Personalization + Messaging Worker
Input: lead summary + pain signals.
Output: short outreach variants aligned to observed operations.

### E. Inbox/Reply Classifier Worker
Input: incoming replies.
Output: intent class + next action.

### F. Daily Content Worker
Input: objections + recurring pain themes.
Output: short-form content ideas/posts focused on operations.

### G. Orchestrator
- Schedules workers,
- enforces rate limits,
- writes to CRM-like datastore,
- pushes only qualified/high-intent leads to user.

## 4) Data Model (Minimal)

## leads table
- `lead_id`
- `business_name`
- `niche`
- `city`
- `source_type` (instagram/maps/facebook/website/directory)
- `source_url`
- `contact_channels` (whatsapp/instagram/phone/form)
- `last_post_date`
- `activity_score`
- `manual_dependency_score`
- `chaos_score`
- `demand_score`
- `ability_to_pay_score`
- `qualification_score`
- `tier` (A/B/C)
- `status` (new/contacted/replied/escalated/disqualified)
- `owner_notes`

## outreach_log table
- `outreach_id`
- `lead_id`
- `channel`
- `message_variant`
- `sent_at`
- `reply_received`
- `reply_text`
- `intent_class`
- `escalated` (boolean)

## experiments table
- `experiment_id`
- `niche`
- `angle`
- `message_template`
- `sample_size`
- `reply_rate`
- `positive_rate`
- `meeting_rate`

## 5) Lead Discovery Queries (Operator + Automation Friendly)

Use combinations of:
- `"coaching centre coimbatore instagram"`
- `"tuition center coimbatore whatsapp"`
- `"jersey store coimbatore"`
- `"football boots coimbatore"`
- `"sneaker store coimbatore instagram"`
- `"real estate agency coimbatore"`
- `"builders coimbatore whatsapp"`
- `"property consultant coimbatore"`

Instagram discovery patterns:
- bio includes: `DM`, `WhatsApp`, `Call now`, `Book site visit`, `For admissions`
- captions include: `limited seats`, `new batch`, `launch`, `offer`, `EMI`, `contact us`

Google Maps/local profile patterns:
- active photos/posts/reviews
- direct call/WhatsApp preference
- enquiry-heavy categories

## 6) Signal Framework (Operational Pain Inference)

Assign binary/weighted signals:

### Demand signals
- frequent offers/campaigns
- regular inbound CTA usage
- multiple products/courses/properties

### Manual communication dependency signals
- strong “DM/WhatsApp for details” dependence
- no clear structured pre-qualification flow
- repeated questions in comments

### Chaos/fragmentation signals
- multiple contact endpoints without routing
- delayed or inconsistent public response patterns
- no clear follow-up mechanism indicated

### Opportunity signals
- clear inbound volume potential
- non-enterprise operations
- likely staff overload during peak enquiry windows

## 7) Qualification Scoring (0-100)

`qualification_score =`
- `0.30 * demand_score`
- `+ 0.30 * manual_dependency_score`
- `+ 0.20 * chaos_score`
- `+ 0.10 * response_probability_score`
- `+ 0.10 * ability_to_pay_score`

Disqualify fast if:
- enterprise-sized brand with optimized funnel,
- explicit advanced CRM/automation stack,
- no visible inbound/demand activity.

Tiering:
- **Tier A**: 75+
- **Tier B**: 55-74
- **Tier C**: <55

## 8) Personalization Generator Rules

Produce 1-2 operational observations only; keep grounded and non-accusatory.

Templates:
- “Looks like many enquiries are being handled manually on WhatsApp.”
- “It seems customer chats may be split across DMs and calls.”
- “You’re likely spending team time on repetitive enquiry replies.”
- “Follow-ups may be hard to track during busy periods.”

## 9) Outreach Message Bank (Short, Human, Low-pressure)

### Initial message variant A
“Hi {{name}}, noticed you’re getting solid enquiry activity. If useful, I can share a simple way to reduce missed WhatsApp/DM leads and help your team reply faster. Open to a quick chat?”

### Variant B
“Hey {{name}}, quick one — many {{niche}} teams lose leads when chats pile up. We help organize incoming enquiries and reduce response delay. Want a short overview?”

### Variant C
“Hi {{name}}, saw your page and promotions. If enquiry handling is getting heavy, I can show a practical setup to reduce manual follow-up effort. Should I send details?”

Follow-up (48h):
“Just checking if this is relevant right now. Happy to share a 3-step approach to reduce missed enquiries without adding extra workload.”

## 10) Reply Classification + Escalation Logic

Classes:
- `interested`
- `high_intent`
- `asking_questions`
- `maybe_later`
- `not_interested`

Heuristics:
- **high_intent**: asks pricing, demo, meeting time, implementation timeline.
- **interested**: positive curiosity without logistics.
- **asking_questions**: clarification-first responses.
- **maybe_later**: timing objections.
- **not_interested**: explicit decline.

Escalate to user only when:
- class in `{interested, high_intent}`
- OR message includes pricing/demo/meeting requests.

## 11) Playbooks by Browser Availability

### If browser automation is available (Playwright/browser-use)
- Run scripted discovery sessions by niche.
- Extract profile metadata and CTA text.
- Capture response-time clues and posting recency.
- Push structured records into datastore.

### If browser automation is not available
- Generate operator mission packets:
  - 25 leads/day target list template,
  - exact search strings,
  - profile review checklist,
  - copy-paste outreach queue,
  - reply tagging sheet.
- The system remains truthful: “queued for operator execution.”

## 12) Daily Content Engine

Produce 3 short ideas/day by niche.

Themes:
- missed leads from delayed replies,
- WhatsApp chaos during peak enquiry windows,
- repetitive Q&A draining staff time,
- follow-up leakage from scattered chats.

Format:
- Hook (pain)
- 1 practical observation
- 1 simple fix angle
- CTA: “Want the checklist?”

## 13) Feedback Loop and Continuous Optimization

Track weekly:
- reply rate by niche,
- positive intent rate,
- meeting conversion rate,
- top objections,
- top personalization lines,
- best-performing opening lines.

Optimization cycle:
1. Remove low-signal sources.
2. Tighten scoring weights by conversion.
3. Rewrite weak outreach variants.
4. Double down on best niche-angle pairs.

## 14) 14-Day Execution Plan

### Days 1-3
- Build lead schema + scoring sheet.
- Launch discovery for 3 niches (Coimbatore).
- Collect first 150 leads.

### Days 4-6
- Score and tier all leads.
- Send outreach to Tier A + top Tier B.
- Start reply tagging workflow.

### Days 7-9
- Analyze first response patterns.
- Improve message variants by niche.
- Add objection handling snippets.

### Days 10-12
- Increase daily volume with quality guardrails.
- Introduce second follow-up sequence.

### Days 13-14
- Consolidate winning playbook.
- Finalize “interested-leads-only” escalation feed for user.

## 15) Success Metrics

Primary:
- % of leads with valid contact channel,
- outreach reply rate,
- interested/high-intent rate,
- qualified meetings booked.

Operational:
- time spent per 100 leads,
- manual review load reduced,
- escalation precision (how many escalations are truly sales-ready).

---

This blueprint is designed so the outbound engine can operate safely in constrained Codex/Cline environments while still delivering consistent pipeline outcomes and only surfacing serious prospects.

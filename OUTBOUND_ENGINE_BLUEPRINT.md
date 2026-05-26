# Codex-Compatible Semi-Autonomous Outbound Engine

## 1) Purpose
Build a semi-autonomous outbound workflow that discovers and qualifies local businesses (primarily in Coimbatore, Tamil Nadu), identifies operational communication inefficiencies, sends personalized low-pressure outreach, and escalates only interested leads.

This blueprint is designed for **Codex/Cline-style agents with limited permissions** and optional browser tooling.

---

## 2) Operating Assumptions
- Agent may not have direct browser access.
- Agent may run in constrained sandbox environments.
- Agent should never claim a real-world action was completed unless tool output confirms it.
- If browser automation is unavailable, the agent should output operator-ready tasks, scripts, and queues.

---

## 3) ICP and Targeting
### Primary geography
- Coimbatore, Tamil Nadu, India

### Priority segments
- Coaching institutes
- Tuition centers
- Jersey stores
- Fashion/apparel brands
- Football boot sellers
- Sneaker stores
- Real estate agencies
- Builders/promoters
- Property consultants

### Exclusion
- Enterprises with mature sales ops
- Businesses with visible advanced CRM/marketing automation stacks
- Low-activity pages with no inbound signs

---

## 4) Positioning Guardrails
### Always position around
- Reducing missed enquiries
- Faster customer replies
- Organizing leads in one place
- Simplifying follow-ups
- Reducing manual WhatsApp burden

### Avoid language like
- "AI agency"
- "CRM company"
- "automation platform"
- Overly technical jargon

---

## 5) System Architecture
## A. Components
1. **Lead Discovery Module**
   - Source connectors: Instagram, Google Maps, local directories, websites, Facebook pages
   - Output: raw lead records

2. **Lead Intelligence Module**
   - Parses bios, CTA phrases, posting frequency, comment intent, response signals
   - Infers manual handling probability

3. **Qualification Engine**
   - Scores each lead for pain, demand, fit, and expected response
   - Buckets leads into Priority A/B/C

4. **Personalization Engine**
   - Generates 1–3 operational observations per lead
   - Produces outreach variables

5. **Outreach Engine**
   - Drafts message variants (DM/WhatsApp/email)
   - Schedules safe follow-up sequences

6. **Response Triage Engine**
   - Classifies inbound replies
   - Escalates only interested/high intent leads

7. **Content Engine**
   - Generates daily short-form content ideas tied to operational pain points

8. **Feedback & Optimization Engine**
   - Tracks outcomes and refines scoring, targeting, and message templates

---

## 6) Data Model (Suggested)
Use JSON or SQLite/Postgres table schema:

```json
{
  "lead_id": "uuid",
  "business_name": "",
  "segment": "tuition_center|jersey_store|real_estate|...",
  "city": "Coimbatore",
  "source": "instagram|maps|facebook|website|directory",
  "profile_url": "",
  "phone_or_whatsapp": "",
  "signals": {
    "active_posting": true,
    "whatsapp_cta": true,
    "dm_for_details": true,
    "promotion_frequency": "high|medium|low",
    "response_latency_hint": "fast|slow|unknown",
    "manual_tracking_hint": true,
    "fragmented_channels_hint": true
  },
  "inferred_pains": [
    "manual_reply_overload",
    "missed_followups",
    "scattered_enquiries"
  ],
  "qualification": {
    "demand_score": 0,
    "ops_chaos_score": 0,
    "manual_dependency_score": 0,
    "opportunity_score": 0,
    "response_probability_score": 0,
    "ability_to_pay_score": 0,
    "total": 0,
    "priority": "A|B|C"
  },
  "personalization": {
    "obs_1": "",
    "obs_2": "",
    "obs_3": ""
  },
  "outreach": {
    "channel": "instagram_dm|whatsapp|email",
    "message_v1": "",
    "message_v2": "",
    "status": "queued|sent|replied"
  },
  "response": {
    "latest_text": "",
    "class": "interested|maybe_later|not_interested|asking_questions|high_intent",
    "escalate": false
  },
  "timestamps": {
    "discovered_at": "",
    "last_contacted_at": "",
    "last_replied_at": ""
  }
}
```

---

## 7) Qualification Logic
Weighted score (0–100):
- Demand signals: 20%
- Operational chaos signals: 20%
- Manual communication dependency: 20%
- Automation opportunity (operational simplification fit): 15%
- Response probability: 15%
- Ability to pay: 10%

### Suggested thresholds
- **A (75+)**: Immediate outreach
- **B (55–74)**: Outreach after A queue
- **C (<55)**: Hold / nurture

### Strong positive signals
- Frequent promotions + WhatsApp CTA
- "DM/WhatsApp for price/details"
- Slow replies in comments
- Many repeated questions in comments
- Multiple channels with no clear enquiry flow

### Negative signals
- Immediate structured responses + robust booking funnel
- Enterprise branding with centralized contact center
- No inbound activity signs

---

## 8) Personalization Rules
Generate short operational observations grounded in visible signals.

Examples:
- "Looks like most enquiries are coming through WhatsApp and DMs, which can get hard to track as volume increases."
- "You’re actively promoting offers, so quick replies likely matter a lot for converting interested customers."
- "It seems follow-ups may be spread across chats, which can make some hot enquiries easy to miss."

Hard rules:
- No fake certainty
- No mention of "AI" unless lead asks directly
- Avoid technical stack language

---

## 9) Outreach System
## A. Message framework
1. Context opener (what was observed)
2. Pain statement (manual replies/missed enquiries)
3. Outcome statement (faster replies, better tracking)
4. Soft CTA (ask permission to share)

## B. Example cold DM templates
### Template 1 (general)
"Hey {{name}}, saw your page and noticed you’re getting regular enquiries. Quick thought — many teams lose leads when WhatsApp and DMs pile up. We help simplify that so replies are faster and follow-ups don’t get missed. Open to a quick 10-min chat?"

### Template 2 (education)
"Hi {{name}}, noticed your institute is actively promoting batches. Usually that brings lots of repetitive questions and follow-up load. We help teams reduce that manual effort and keep enquiries organized in one flow. Want me to share how this looks in practice?"

### Template 3 (retail/fashion)
"Hey {{name}}, your promotions look active. In stores like yours, enquiry chats often get scattered between DMs and WhatsApp, which can delay replies. We help tighten this so customers get faster responses and fewer leads slip. Should I send a quick breakdown?"

## C. Follow-up cadence
- Day 0: Initial message
- Day 2: Gentle bump with value point
- Day 5: Final low-pressure close loop

Stop sequence immediately on response.

---

## 10) Response Classification & Escalation
Classes:
- interested
- maybe later
- not interested
- asking questions
- high intent

### Escalate when
- interested/high intent
- asks pricing/demo/timeline
- requests call or meeting

### Do not escalate when
- polite decline
- no relevance
- no-response after full sequence

---

## 11) Browser-Aware Execution Modes
## Mode A: Browser automation available (Playwright/browser-use)
Agent can:
- Open profile pages and capture structured signals
- Extract CTA text and contact links
- Queue personalized drafts
- Log send/reply outcomes automatically

## Mode B: Browser automation unavailable
Agent must:
- Produce lead-research task sheets for human operator
- Output copy/paste outreach queue with personalization
- Maintain a triage sheet for replies
- Never claim messages were sent

---

## 12) Operator Workflow (No Browser)
Daily 90-minute cycle:
1. 30 min lead collection (30–50 leads)
2. 20 min qualification + scoring
3. 20 min personalized drafting
4. 10 min sending by operator
5. 10 min response triage updates

Deliverables generated by agent:
- `today_leads.csv`
- `priority_outreach_queue.csv`
- `followups_due.csv`
- `escalations_for_owner.csv`
- `objections_log.csv`

---

## 13) Content Engine (Daily)
Produce 3 short content ideas/day:
1. Missed enquiry loss
2. Reply speed as conversion lever
3. WhatsApp follow-up overload

Format:
- Hook
- 2–3 short points
- simple CTA

Example hook:
"Most local businesses don’t lose leads due to poor marketing — they lose them in delayed replies."

---

## 14) Feedback Loop & Optimization
Track weekly:
- Reply rate by segment
- Positive reply rate by message angle
- Escalation rate
- Call-booking rate
- Time-to-first-reply improvement (if client onboarded)

Optimize:
- Reweight qualification scores
- Drop low-performing segments
- Keep top-performing pain statements
- Refresh templates every 2 weeks

---

## 15) Practical Prompt Pack for Codex Agent
### A. Discovery prompt
"Find 25 Coimbatore {{segment}} businesses with active Instagram/Facebook presence and enquiry-heavy CTAs. Return structured records with observable signals only."

### B. Qualification prompt
"Score these leads (0–100) using demand, manual communication dependency, operational chaos, response probability, and ability to pay. Assign A/B/C priority and explain each score briefly."

### C. Personalization prompt
"Generate 2 non-technical operational observations per lead based strictly on visible signals. Avoid mentioning AI/CRM/automation platform terminology."

### D. Outreach prompt
"Draft 2 short conversational outreach messages per lead focused on reducing missed enquiries, faster replies, and organized follow-ups. Keep low-pressure tone."

### E. Triage prompt
"Classify responses into interested / maybe later / not interested / asking questions / high intent. Escalate only interested/high intent or explicit demo/pricing/meeting asks."

---

## 16) Success Criteria
The system is successful when it reliably:
- Sources relevant local leads
- Prioritizes businesses with visible communication inefficiencies
- Generates credible personalization
- Starts conversations consistently
- Reduces noise by escalating only serious prospects
- Improves conversion signal quality week-over-week

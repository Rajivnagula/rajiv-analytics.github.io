# Sai Rajiv | Business/Data Analyst Portfolio

**Chicago Area, IL** | **DePaul MS Information Systems (Nov 2025)**  
**Job-ready**: Business Analyst / Data Analyst | SQL/Excel/Power BI/UAT/Process Mapping

---

## 🏭 Project 1: Defect Recurrence & Release Risk Dashboard

### Business Problem
**Recurring defects across 10k tickets delay releases + increase rollback risk.**

**Stakeholder**: QA Lead + Release Manager  
**Objective**: Flag high-risk modules before v2.3 release

### SQL Analysis
```sql
-- Recurrence Rate = Repeats / Total per Module
SELECT 
    module, 
    COUNT(DISTINCT id) as total_tickets,
    COUNT(CASE WHEN repeat_flag = 'Y' THEN 1 END) as repeats,
    ROUND(COUNT(CASE WHEN repeat_flag = 'Y' THEN 1 END) * 100.0 / COUNT(DISTINCT id), 1) AS recurrence_rate_pct
FROM defects 
GROUP BY module 
ORDER BY recurrence_rate_pct DESC 
LIMIT 5;

Key Findings

| Module    | Total Tickets | Recurrence Rate | Priority    |
| --------- | ------------- | --------------- | ----------- |
| Auth      | 238           | 42.0%           | 🚨 Critical |
| Payments  | 156           | 31.4%           | 🚨 Critical |
| User      | 89            | 22.5%           | ⚠️ High     |
| Orders    | 67            | 14.9%           | Medium      |
| Inventory | 45            | 8.9%            | Low         |

Release v2.3: At Risk (15 criticals vs historical avg 8)

Business Impact
Auth/Payments: 73% of repeat critical defects

Cycle Time: +37% resolution time for recurring issues

Rollback Risk: Top 3 modules fixed → 30% risk reduction

Recommendation
1. DELAY v2.3 until Auth recurrence <25%
2. ADD UAT sprint for Auth/Payments (2 weeks)
3. RCA required for >30% modules before release
![Module Risk Chart](risk-chart.png)


📊 Project 2: Sales SLA Analysis (Power BI - Live 1/20)
Kaggle sales dataset → Backlog aging + SLA breach trends

Skills Demonstrated
✅ SQL (aggregation, window functions, CTEs)
✅ Excel (pivot tables, conditional formatting, charts)
✅ Business Analysis (requirements → insights → recommendations)
✅ UAT/Process Mapping (DePaul MS coursework)
✅ Stakeholder Communication (executive summaries)

Contact 
LinkedIn : https://www.linkedin.com/in/sairajiv/
Open to Business/Data Analyst roles - Chicago Area





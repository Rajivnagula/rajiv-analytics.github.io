-- Defect Recurrence Analysis (Sai Rajiv)
SELECT module, 
       COUNT(*) as total_tickets,
       COUNT(CASE WHEN repeat_flag='Y' THEN 1 END)::float / COUNT(*) * 100 as recurrence_pct
FROM defects 
GROUP BY module 
ORDER BY recurrence_pct DESC 
LIMIT 5;

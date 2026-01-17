-- Defect Recurrence by Module
-- Purpose: Identify modules with highest repeat-defect risk

SELECT
    module,
    COUNT(*) AS total_defects,
    SUM(CASE WHEN is_repeat = 1 THEN 1 ELSE 0 END) AS repeat_defects,
    ROUND(
        SUM(CASE WHEN is_repeat = 1 THEN 1 ELSE 0 END)::DECIMAL 
        / COUNT(*) * 100, 
        1
    ) AS recurrence_pct
FROM defect_tickets
GROUP BY module
ORDER BY recurrence_pct DESC;

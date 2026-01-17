SELECT
    module,
    COUNT(*) AS total,
    SUM(CASE WHEN is_repeat = 1 THEN 1 ELSE 0 END) AS repeats,
    ROUND(SUM(CASE WHEN is_repeat = 1 THEN 1 ELSE 0 END)::DECIMAL/COUNT(*)*100,1) AS recurrence_pct
FROM defect_tickets
GROUP BY module
ORDER BY recurrence_pct DESC;

import { Card } from './ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const KPIHeader = ({ kpis }) => {
  if (!kpis) return null;

  const kpiCards = [
    {
      label: 'Total Defects',
      value: kpis.total_defects,
      icon: AlertCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Aggregate count from sample dataset'
    },
    {
      label: 'Open Defects',
      value: kpis.open_defects,
      icon: AlertTriangle,
      color: 'text-severity-medium',
      bgColor: 'bg-severity-medium',
      description: 'Defects not yet resolved or closed'
    },
    {
      label: 'Critical Defects',
      value: kpis.critical_defects,
      icon: AlertTriangle,
      color: 'text-severity-critical',
      bgColor: 'bg-severity-critical',
      description: 'Highest severity classification'
    },
    {
      label: 'Defect Recurrence Rate',
      value: `${kpis.recurrence_rate}%`,
      icon: TrendingUp,
      color: kpis.recurrence_rate > 30 ? 'text-severity-high' : 'text-severity-low',
      bgColor: kpis.recurrence_rate > 30 ? 'bg-severity-high' : 'bg-severity-low',
      description: 'Percentage of defects recurring across releases (descriptive metric)'
    },
    {
      label: 'Avg Resolution Time',
      value: `${kpis.avg_resolution_time}d`,
      icon: Clock,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Mean time from creation to closure'
    },
    {
      label: 'Missing Required Fields',
      value: `${kpis.missing_required_fields_pct}%`,
      icon: AlertCircle,
      color: kpis.missing_required_fields_pct > 20 ? 'text-severity-critical' : 'text-severity-low',
      bgColor: kpis.missing_required_fields_pct > 20 ? 'bg-severity-critical' : 'bg-severity-low',
      description: 'Data completeness indicator for component and owner fields'
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card 
              key={index} 
              className="p-6 hover:shadow-card-hover transition-shadow duration-300 border border-border bg-card"
              title={kpi.description}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{kpi.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Metric definitions and thresholds were selected to mirror how product and QA teams prioritize defects during release planning.
      </p>
    </div>
  );
};

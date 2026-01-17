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
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Open Defects',
      value: kpis.open_defects,
      icon: AlertTriangle,
      color: 'text-severity-medium',
      bgColor: 'bg-severity-medium'
    },
    {
      label: 'Critical Defects',
      value: kpis.critical_defects,
      icon: AlertTriangle,
      color: 'text-severity-critical',
      bgColor: 'bg-severity-critical'
    },
    {
      label: 'Recurrence Rate',
      value: `${kpis.recurrence_rate}%`,
      icon: TrendingUp,
      color: kpis.recurrence_rate > 30 ? 'text-severity-high' : 'text-severity-low',
      bgColor: kpis.recurrence_rate > 30 ? 'bg-severity-high' : 'bg-severity-low'
    },
    {
      label: 'Avg Resolution Time',
      value: `${kpis.avg_resolution_time}d`,
      icon: Clock,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Missing Required Fields',
      value: `${kpis.missing_required_fields_pct}%`,
      icon: AlertCircle,
      color: kpis.missing_required_fields_pct > 20 ? 'text-severity-critical' : 'text-severity-low',
      bgColor: kpis.missing_required_fields_pct > 20 ? 'bg-severity-critical' : 'bg-severity-low'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card 
            key={index} 
            className="p-6 hover:shadow-card-hover transition-shadow duration-300 border border-border bg-card"
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
  );
};

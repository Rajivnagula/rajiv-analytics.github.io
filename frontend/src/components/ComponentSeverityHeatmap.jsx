import { Card } from './ui/card';
import { Target } from 'lucide-react';

export const ComponentSeverityHeatmap = ({ data }) => {
  const getSeverityColor = (count, max) => {
    const intensity = count / max;
    if (intensity > 0.7) return 'bg-severity-critical border-severity-critical text-severity-critical';
    if (intensity > 0.4) return 'bg-severity-high border-severity-high text-severity-high';
    if (intensity > 0.2) return 'bg-severity-medium border-severity-medium text-severity-medium';
    return 'bg-severity-low border-severity-low text-severity-low';
  };

  const maxTotal = Math.max(...data.map(d => d.critical + d.high + d.medium + d.low));

  return (
    <Card className="p-6 border border-border bg-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Component × Severity Heatmap</h2>
            <p className="text-sm text-muted-foreground mt-1">Defect distribution across components</p>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Component</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-severity-critical">Critical</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-severity-high">High</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-severity-medium">Medium</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-severity-low">Low</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const total = item.critical + item.high + item.medium + item.low;
              return (
                <tr 
                  key={index} 
                  className="border-b border-border hover:bg-accent/50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{item.component}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded border bg-severity-critical text-severity-critical font-semibold text-sm">
                      {item.critical}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded border bg-severity-high text-severity-high font-semibold text-sm">
                      {item.high}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded border bg-severity-medium text-severity-medium font-semibold text-sm">
                      {item.medium}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-8 rounded border bg-severity-low text-severity-low font-semibold text-sm">
                      {item.low}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center justify-center w-16 h-8 rounded border font-bold text-sm ${getSeverityColor(total, maxTotal)}`}>
                      {total}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Recommendation:</span> Resource planning discussions should account for components showing concentrated Critical and High severity defects. The product roadmap may need to include dedicated stabilization phases for these areas—entailing targeted code reviews, expanded unit test coverage, and architectural refactoring—before committing to aggressive feature expansion timelines in those same modules.
        </p>
      </div>
    </Card>
  );
};

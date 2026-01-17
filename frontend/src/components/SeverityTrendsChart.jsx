import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

export const SeverityTrendsChart = ({ data }) => {
  return (
    <Card className="p-6 border border-border bg-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Severity Trends Over Time</h2>
            <p className="text-sm text-muted-foreground mt-1">Monthly defect severity distribution</p>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="critical" 
              stroke="hsl(var(--severity-critical))" 
              strokeWidth={2}
              name="Critical"
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="high" 
              stroke="hsl(var(--severity-high))" 
              strokeWidth={2}
              name="High"
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="medium" 
              stroke="hsl(var(--severity-medium))" 
              strokeWidth={2}
              name="Medium"
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="low" 
              stroke="hsl(var(--severity-low))" 
              strokeWidth={2}
              name="Low"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Insight:</span> Track severity trends to identify quality improvements or degradation over release cycles.
        </p>
      </div>
    </Card>
  );
};

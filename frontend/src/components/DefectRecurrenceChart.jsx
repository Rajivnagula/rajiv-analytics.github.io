import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

export const DefectRecurrenceChart = ({ data }) => {
  const COLORS = [
    'hsl(220, 76%, 48%)',
    'hsl(270, 60%, 58%)',
    'hsl(142, 70%, 45%)',
    'hsl(36, 100%, 50%)',
    'hsl(0, 84%, 60%)'
  ];

  return (
    <Card className="p-6 border border-border bg-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Defect Recurrence Analysis</h2>
            <p className="text-sm text-muted-foreground mt-1">Top 10 recurring defect types</p>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="type" 
              angle={-45} 
              textAnchor="end" 
              height={80}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
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
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Recommendation:</span> Product leadership should prioritize engineering investment in addressing the top 3 recurring defect patterns. Specifically, the architectural contributors to Null Pointer Exceptions and Memory Leaks warrant dedicated sprint capacity, as recurrence at this frequency indicates underlying design issues rather than isolated implementation bugs. This allocation should be balanced against feature velocity commitments.
        </p>
      </div>
    </Card>
  );
};

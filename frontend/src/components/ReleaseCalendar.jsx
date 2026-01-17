import { Card } from './ui/card';
import { Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

export const ReleaseCalendar = ({ data }) => {
  return (
    <Card className="p-6 border border-border bg-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Release Calendar</h2>
            <p className="text-sm text-muted-foreground mt-1">Defect distribution by release version</p>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((release, index) => {
          const openPercentage = (release.open / release.total) * 100;
          const isHealthy = openPercentage < 30;
          
          return (
            <Card 
              key={index} 
              className="p-4 border border-border hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-foreground">{release.release}</h3>
                <Badge 
                  variant={isHealthy ? "outline" : "destructive"}
                  className="text-xs"
                >
                  {isHealthy ? 'Healthy' : 'At Risk'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Defects</span>
                  <span className="text-sm font-semibold text-foreground">{release.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Open</span>
                  <span className="text-sm font-semibold text-severity-medium">{release.open}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Closed</span>
                  <span className="text-sm font-semibold text-severity-low">{release.closed}</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-severity-low rounded-full transition-all duration-500"
                    style={{ width: `${((release.closed / release.total) * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {Math.round((release.closed / release.total) * 100)}% resolved
                </p>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Note:</span> This is a descriptive view of defects by release version. Releases with high open defect counts should be prioritized for stabilization.
        </p>
      </div>
    </Card>
  );
};

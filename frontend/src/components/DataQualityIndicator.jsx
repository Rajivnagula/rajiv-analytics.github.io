import { Card } from './ui/card';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from './ui/badge';

export const DataQualityIndicator = ({ quality }) => {
  if (!quality) return null;

  const missingComponentPct = (quality.missing_component / quality.total_records) * 100;
  const missingOwnerPct = (quality.missing_owner / quality.total_records) * 100;
  const missingDescriptionPct = (quality.missing_description / quality.total_records) * 100;
  
  const overallQuality = 100 - ((quality.missing_component + quality.missing_owner + quality.missing_description) / (quality.total_records * 3)) * 100;
  
  const getQualityStatus = (score) => {
    if (score >= 80) return { label: 'Good', color: 'text-quality-good', icon: CheckCircle };
    if (score >= 60) return { label: 'Fair', color: 'text-quality-warning', icon: AlertTriangle };
    return { label: 'Poor', color: 'text-quality-poor', icon: XCircle };
  };
  
  const status = getQualityStatus(overallQuality);
  const StatusIcon = status.icon;

  return (
    <Card className="p-6 border border-border bg-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Data Quality Report</h2>
          <p className="text-sm text-muted-foreground mt-1">Analysis of data completeness and consistency</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={`${status.color} px-4 py-2 text-sm font-semibold`}>
            <StatusIcon className="h-4 w-4 mr-2" />
            {status.label} Quality
          </Badge>
          <div className="text-right">
            <p className="text-3xl font-bold text-foreground">{Math.round(overallQuality)}%</p>
            <p className="text-xs text-muted-foreground">Overall Score</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Missing Component</span>
            <span className="text-sm font-bold text-foreground">{quality.missing_component}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-severity-high rounded-full"
              style={{ width: `${missingComponentPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{missingComponentPct.toFixed(1)}% of records</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Missing Owner</span>
            <span className="text-sm font-bold text-foreground">{quality.missing_owner}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-severity-high rounded-full"
              style={{ width: `${missingOwnerPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{missingOwnerPct.toFixed(1)}% of records</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Missing Description</span>
            <span className="text-sm font-bold text-foreground">{quality.missing_description}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-severity-medium rounded-full"
              style={{ width: `${missingDescriptionPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{missingDescriptionPct.toFixed(1)}% of records</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Recommendation:</span> Implement data validation rules and mandatory field checks to improve data quality. High missing field percentages can lead to inaccurate analytics.
        </p>
      </div>
    </Card>
  );
};

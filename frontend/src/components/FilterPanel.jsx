import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Filter, X } from 'lucide-react';

export const FilterPanel = ({ filters, onFilterChange, onReset }) => {
  return (
    <Card className="p-4 border border-border bg-card">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Filters:</span>
        </div>
        
        <Select value={filters.severity} onValueChange={(value) => onFilterChange('severity', value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filters.status} onValueChange={(value) => onFilterChange('status', value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onReset}
          className="ml-auto"
        >
          <X className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </Card>
  );
};

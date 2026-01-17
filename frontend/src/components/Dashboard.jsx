import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from './ui/card';
import { KPIHeader } from './KPIHeader';
import { DefectRecurrenceChart } from './DefectRecurrenceChart';
import { SeverityTrendsChart } from './SeverityTrendsChart';
import { ComponentSeverityHeatmap } from './ComponentSeverityHeatmap';
import { ReleaseCalendar } from './ReleaseCalendar';
import { DataQualityIndicator } from './DataQualityIndicator';
import { FilterPanel } from './FilterPanel';
import { Loader2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/defects/analytics`);
      setAnalytics(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold">{error}</p>
          <button 
            onClick={fetchAnalytics}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Defect Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-1">Analyst-led case study on defect recurrence, severity trends, and data quality for product teams.</p>
            </div>
            <button 
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors text-sm font-medium"
            >
              Reload Sample Dataset
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {/* KPIs */}
        <div className="mb-8 animate-fade-in">
          <KPIHeader kpis={analytics?.kpis} />
        </div>

        {/* Data Quality Indicator */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <DataQualityIndicator quality={analytics?.data_quality} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <DefectRecurrenceChart data={analytics?.recurrence_analysis || []} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <SeverityTrendsChart data={analytics?.severity_trends || []} />
          </div>
        </div>

        {/* Heatmap */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <ComponentSeverityHeatmap data={analytics?.component_severity_heatmap || []} />
        </div>

        {/* Release Calendar */}
        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <ReleaseCalendar data={analytics?.release_calendar || []} />
        </div>

        {/* Analyst Notes */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Analyst Notes</h2>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-primary font-semibold">•</span>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Data Quality Tradeoffs:</span> Analysis includes records with missing fields to reflect real operational data patterns. Filtering incomplete records would obscure systemic data collection issues that require process improvements.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-semibold">•</span>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Recurrence Methodology:</span> Defect recurrence is identified by title matching, which may undercount true recurrence if naming conventions are inconsistent. Recommend implementing defect fingerprinting for more accurate tracking.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-semibold">•</span>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Severity Distribution:</span> Current analysis treats all severity levels as reported without normalization. Inconsistent severity assignment across teams may affect trend accuracy and should be addressed through standardized triage guidelines.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

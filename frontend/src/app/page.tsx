import Link from "next/link";
import { ArrowRight, Compass, TestTube, ShieldCheck, BookOpen, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground rounded-2xl p-10 mb-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          {/* Subtle geometric pattern / ayurvedic motif abstraction */}
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
            <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="2" />
            <path d="M200 0 L200 400 M0 200 L400 200" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">
            Protect Ayurveda.<br />Navigate IP with confidence.
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl">
            IP-SAKTI Sahayak empowers traditional medicine practitioners, researchers, and legal professionals to protect and navigate intellectual property in Ayurveda.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/ask" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              <MessageSquare size={18} />
              Ask Sahayak
            </Link>
            <Link 
              href="/classifier" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors"
            >
              <TestTube size={18} />
              Classify a Formulation
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Flow Section */}
      <section className="mb-12">
        <h2 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-accent rounded-full inline-block"></span>
          The Sahayak Workflow
        </h2>
        <div className="flex items-center justify-between bg-card border border-border rounded-xl p-6 shadow-sm overflow-x-auto gap-4">
          <FlowStep step="1" label="ASK" active />
          <FlowArrow />
          <FlowStep step="2" label="CLASSIFY" />
          <FlowArrow />
          <FlowStep step="3" label="RETRIEVE" />
          <FlowArrow />
          <FlowStep step="4" label="EXPLAIN" />
          <FlowArrow />
          <FlowStep step="5" label="CITE" />
          <FlowArrow />
          <FlowStep step="6" label="ACT" />
        </div>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="text-xl font-heading font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
          Quick Access Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ToolCard 
            title="IP Navigator" 
            description="Visualize your intellectual property decision pathways."
            icon={<Compass className="text-chart-1" size={24} />}
            href="/navigator"
          />
          <ToolCard 
            title="Formulation Classifier" 
            description="Guided wizard for product categorization."
            icon={<TestTube className="text-chart-2" size={24} />}
            href="/classifier"
          />
          <ToolCard 
            title="ABS Compliance" 
            description="Step-by-step progress tracker for biodiversity."
            icon={<ShieldCheck className="text-chart-3" size={24} />}
            href="/compliance"
          />
          <ToolCard 
            title="TKDL & Prior Art" 
            description="Serious legal repository research workspace."
            icon={<BookOpen className="text-chart-4" size={24} />}
            href="/tkdl"
          />
        </div>
      </section>
    </div>
  );
}

function FlowStep({ step, label, active }: { step: string, label: string, active?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2 min-w-[80px]`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${active ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground'}`}>
        {step}
      </div>
      <span className={`text-xs font-semibold tracking-wider ${active ? 'text-primary' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}

function FlowArrow() {
  return <div className="h-px bg-border flex-1 min-w-[20px] mx-2"></div>;
}

function ToolCard({ title, description, icon, href }: { title: string, description: string, icon: React.ReactNode, href: string }) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card">
        <CardHeader className="pb-2">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
            {icon}
          </div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

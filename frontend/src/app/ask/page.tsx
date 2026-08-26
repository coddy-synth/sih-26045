"use client";

import { useState } from "react";
import { Mic, Paperclip, Send, Globe, Shield, ChevronRight, FileText, AlertTriangle, ExternalLink, User } from "lucide-react";

export default function AskSahayak() {
  const [jurisdiction, setJurisdiction] = useState<"india" | "intl">("india");
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };

  return (
    <div className="flex h-full gap-6">
      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-heading">Ask Sahayak</h1>
          
          {/* Extremely Visible Jurisdiction Selector */}
          <div className="flex bg-muted p-1 rounded-lg border border-border">
            <button 
              onClick={() => setJurisdiction("india")}
              className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-all ${
                jurisdiction === "india" 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield size={16} />
              India (AYUSH)
            </button>
            <button 
              onClick={() => setJurisdiction("intl")}
              className={`px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-all ${
                jurisdiction === "intl" 
                  ? "bg-secondary text-secondary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe size={16} />
              International
            </button>
          </div>
        </div>

        {/* Answer Experience */}
        <div className="flex-1 overflow-y-auto mb-6 pr-2">
          {!hasSearched && !isSearching ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <MessageSquare size={32} />
              </div>
              <h2 className="text-2xl font-heading mb-2">How can I assist your research today?</h2>
              <p className="text-muted-foreground mb-8">
                Ask about prior art, formulation compliance, TKDL references, or general IP strategy for traditional medicine.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 w-full">
                <SuggestionPill text="Check patentability of Neem & Turmeric mix" />
                <SuggestionPill text="What are ABS requirements in India?" />
                <SuggestionPill text="Find TKDL references for Ashwagandha" />
              </div>
            </div>
          ) : isSearching ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
              <p className="text-lg font-medium text-primary">Searching authoritative sources...</p>
              <p className="text-sm text-muted-foreground mt-2">Checking TKDL and applicable provisions.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Query */}
              <div className="bg-muted/50 p-4 rounded-xl inline-block max-w-[85%]">
                <p className="font-medium">{query}</p>
              </div>
              
              {/* AI Response Sections */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <Shield size={20} />
                  <h3 className="font-heading text-xl">Direct Answer</h3>
                </div>
                <p className="text-foreground leading-relaxed mb-6">
                  Based on the Biological Diversity Act, 2002 and the TKDL, the formulation involving Neem and Turmeric has significant prior art. It is generally not patentable in its traditional form under Section 3(p) of the Indian Patents Act, 1970, unless a synergistic effect demonstrating novelty and non-obviousness is proven.
                </p>
                
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Rationale & Framework</h4>
                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary mt-1"><ChevronRight size={16} /></span>
                      <span><strong>Section 3(p) of Patents Act:</strong> An invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not an invention.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary mt-1"><ChevronRight size={16} /></span>
                      <span><strong>TKDL Prior Art:</strong> Neem (Azadirachta indica) and Turmeric (Curcuma longa) are heavily documented in ancient texts for wound healing and antiseptic properties.</span>
                    </li>
                  </ul>
                </div>
                
                {/* Disclaimer */}
                <div className="mt-8 flex items-start gap-3 bg-accent/10 text-accent-foreground p-4 rounded-lg text-sm">
                  <AlertTriangle size={18} className="mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Disclaimer:</strong> The information provided by IP-SAKTI Sahayak is for informational and research purposes only and does not constitute formal legal advice. Always consult with a qualified IP attorney before filing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSearch} className="bg-card border border-border rounded-2xl p-2 shadow-md flex flex-col relative">
          <textarea 
            className="w-full bg-transparent border-none resize-none p-4 focus:outline-none min-h-[80px]"
            placeholder="Describe the formulation, paste a patent claim, or ask a legal question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSearch(e);
              }
            }}
          />
          <div className="flex items-center justify-between p-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Paperclip size={18} />
              </button>
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <Mic size={18} />
              </button>
            </div>
            <button 
              type="submit"
              disabled={!query.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <span>Ask Sahayak</span>
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Right Source/Citation Panel */}
      {hasSearched && (
        <div className="w-80 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden h-[calc(100vh-8rem)]">
          <div className="p-4 border-b border-border bg-muted/30">
            <h3 className="font-semibold flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              Sources & Citations
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <CitationCard 
              title="Indian Patents Act, 1970"
              section="Section 3(p) - Traditional Knowledge"
              confidence="High Match"
              url="#"
            />
            <CitationCard 
              title="TKDL Database"
              section="Ref: TKDL/AM/02/10"
              confidence="Direct Match"
              url="#"
            />
            <CitationCard 
              title="Biological Diversity Act, 2002"
              section="Section 3 - Access to Biological Resources"
              confidence="Relevant context"
              url="#"
            />
          </div>
          <div className="p-4 border-t border-border bg-muted/30">
            <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <User size={16} />
              Connect with IP Facilitator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SuggestionPill({ text }: { text: string }) {
  return (
    <button className="bg-card border border-border hover:border-primary text-sm px-4 py-2 rounded-full transition-colors shadow-sm text-foreground/80">
      {text}
    </button>
  );
}

function CitationCard({ title, section, confidence, url }: { title: string, section: string, confidence: string, url: string }) {
  return (
    <div className="p-3 border border-border rounded-lg bg-background hover:border-primary/40 cursor-pointer transition-colors group">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">{title}</h4>
        <ExternalLink size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
      </div>
      <p className="text-xs text-muted-foreground mb-2">{section}</p>
      <div className="inline-flex px-2 py-0.5 rounded text-[10px] font-medium bg-emerald/10 text-emerald">
        {confidence}
      </div>
    </div>
  );
}

// Temporary icon component for MessageSquare to avoid another import at the top
function MessageSquare({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}

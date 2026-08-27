export default function Why() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant pb-6">
        <div>
          <h1 className="text-3xl font-headline text-primary mb-2">Explainability & Reasoning</h1>
          <p className="text-on-surface-variant">Trace exactly how the AI reached its conclusions.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Chain of thought step */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">1</div>
            <div className="w-0.5 h-full bg-outline-variant my-2"></div>
          </div>
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-sm mb-4">
            <h3 className="font-semibold text-lg mb-2">Entity Resolution</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              The AI identified "Ashwagandha" and mapped it to its botanical name <i>Withania somnifera</i> to query international databases accurately.
            </p>
            <div className="bg-surface-container-low p-3 rounded-lg text-xs font-mono text-outline">
              [SYSTEM]: map_entity("Ashwagandha") -{'>'} "Withania somnifera" (Confidence: 0.99)
            </div>
          </div>
        </div>

        {/* Chain of thought step */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">2</div>
            <div className="w-0.5 h-full bg-outline-variant my-2"></div>
          </div>
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-sm mb-4">
            <h3 className="font-semibold text-lg mb-2">Database Querying</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Queried TKDL and WIPO Lex for formulations containing both <i>Withania somnifera</i> and <i>Curcuma longa</i>.
            </p>
            <div className="bg-surface-container-low p-3 rounded-lg text-xs font-mono text-outline">
              [SYSTEM]: query_tkdl(ingredients=["Withania somnifera", "Curcuma longa"]) -{'>'} 12 results found
            </div>
          </div>
        </div>

        {/* Chain of thought step */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">3</div>
          </div>
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Novelty Assessment</h3>
            <p className="text-sm text-on-surface-variant">
              Comparing the proposed therapeutic claims against the retrieved documents, the AI determined a high risk of prior art due to identical historical usage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

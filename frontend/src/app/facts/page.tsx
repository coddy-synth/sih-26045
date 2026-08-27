export default function Facts() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant pb-6">
        <div>
          <h1 className="text-3xl font-headline text-primary mb-2">Fact Verification</h1>
          <p className="text-on-surface-variant">Extract and verify key entities from your formulation.</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors">
          Run Extraction
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-on-surface">Input Text</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed p-4 bg-surface-container-low rounded-lg border border-outline-variant">
            A novel polyherbal formulation comprising standardized extracts of Withania somnifera (Ashwagandha) and Curcuma longa (Turmeric) intended for cognitive enhancement and stress reduction.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-on-surface">Extracted Entities</h3>
          <div className="space-y-3">
            <div className="flex items-start justify-between p-3 border border-outline-variant rounded-lg">
              <div>
                <p className="font-semibold text-sm">Withania somnifera</p>
                <p className="text-xs text-outline">Botanical Name</p>
              </div>
              <span className="bg-success-container text-on-success-container text-xs px-2 py-1 rounded font-semibold">Verified</span>
            </div>
            <div className="flex items-start justify-between p-3 border border-outline-variant rounded-lg">
              <div>
                <p className="font-semibold text-sm">Curcuma longa</p>
                <p className="text-xs text-outline">Botanical Name</p>
              </div>
              <span className="bg-success-container text-on-success-container text-xs px-2 py-1 rounded font-semibold">Verified</span>
            </div>
            <div className="flex items-start justify-between p-3 border border-outline-variant rounded-lg">
              <div>
                <p className="font-semibold text-sm">Cognitive enhancement</p>
                <p className="text-xs text-outline">Therapeutic Claim</p>
              </div>
              <span className="bg-tertiary-container text-on-tertiary-container text-xs px-2 py-1 rounded font-semibold">Flagged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

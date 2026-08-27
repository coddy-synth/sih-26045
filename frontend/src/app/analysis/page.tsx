export default function Analysis() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant pb-6">
        <div>
          <h1 className="text-3xl font-headline text-primary mb-2">Prior Art Analysis</h1>
          <p className="text-on-surface-variant">AI-generated novelty and compliance report.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-headline text-2xl">
            86%
          </div>
          <div>
            <h2 className="text-xl font-semibold">High Risk of Prior Art</h2>
            <p className="text-sm text-on-surface-variant">The formulation strongly overlaps with existing traditional knowledge.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-outline-variant rounded-xl bg-surface">
            <h3 className="font-semibold mb-2">TKDL Match Found</h3>
            <p className="text-sm text-on-surface-variant mb-3">
              A formulation combining Withania somnifera and Curcuma longa is documented in traditional Ayurvedic texts for general wellness and stress relief.
            </p>
            <div className="flex gap-2">
              <span className="text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">Source: TKDL-AYU-1029</span>
              <span className="text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">Charaka Samhita</span>
            </div>
          </div>

          <div className="p-4 border border-outline-variant rounded-xl bg-surface">
            <h3 className="font-semibold mb-2">Patent Overlap</h3>
            <p className="text-sm text-on-surface-variant mb-3">
              US Patent 9,101,568 covers a specific extraction method for these combined herbs, though the therapeutic claims differ slightly.
            </p>
            <div className="flex gap-2">
              <span className="text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">Source: USPTO</span>
              <span className="text-xs bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">Status: Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

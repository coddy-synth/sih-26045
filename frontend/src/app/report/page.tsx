import { FileDown, Printer, Share2 } from "lucide-react";

export default function Report() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant pb-6">
        <div>
          <h1 className="text-3xl font-headline text-primary mb-2">Final Case Report</h1>
          <p className="text-on-surface-variant">Comprehensive summary for legal review.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors">
            <Printer size={16} /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors">
            <Share2 size={16} /> Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors">
            <FileDown size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="bg-surface-bright border border-outline-variant p-10 rounded-xl shadow-sm space-y-8">
        <div className="text-center border-b border-outline-variant pb-8">
          <h2 className="text-2xl font-headline text-primary mb-2">IP-SAKTI Prior Art Assessment Report</h2>
          <p className="text-on-surface-variant text-sm">Generated on October 12, 2024</p>
        </div>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-on-surface uppercase tracking-wide border-b border-outline-variant pb-2">1. Executive Summary</h3>
          <p className="text-on-surface-variant leading-relaxed text-sm">
            The proposed formulation comprising Ashwagandha (Withania somnifera) and Turmeric (Curcuma longa) exhibits a <strong>high risk of prior art (86% overlap)</strong>. Traditional knowledge databases and existing patent literature document the use of these botanicals in combination for similar therapeutic indications.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-on-surface uppercase tracking-wide border-b border-outline-variant pb-2">2. Entity Extraction</h3>
          <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-2">
            <li><strong>Botanical 1:</strong> Withania somnifera (Verified)</li>
            <li><strong>Botanical 2:</strong> Curcuma longa (Verified)</li>
            <li><strong>Indication:</strong> Cognitive enhancement, stress reduction</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold text-on-surface uppercase tracking-wide border-b border-outline-variant pb-2">3. Key Citations</h3>
          <div className="space-y-3">
            <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded text-sm">
              <strong className="block mb-1">TKDL-AYU-1029 (Charaka Samhita)</strong>
              Describes the preparation of a decoction utilizing both herbs for "Balya" (strengthening) and "Rasayana" (rejuvenation).
            </div>
            <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded text-sm">
              <strong className="block mb-1">US Patent 9,101,568</strong>
              "Synergistic composition for cognitive health comprising curcuminoids and withanolides." (Status: Active)
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

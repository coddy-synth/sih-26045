export default function Overview() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant pb-6">
        <div>
          <h1 className="text-3xl font-headline text-primary mb-2">Project Overview</h1>
          <p className="text-on-surface-variant">General analytics and system status.</p>
        </div>
      </div>
      
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-on-surface">System Health</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-lg border border-outline-variant">
            <span className="font-medium">TKDL Integration</span>
            <span className="text-success font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span> Active
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-lg border border-outline-variant">
            <span className="font-medium">WIPO Lex Sync</span>
            <span className="text-success font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span> Active
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-lg border border-outline-variant">
            <span className="font-medium">Ayush Guidelines Database</span>
            <span className="text-tertiary font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span> Syncing (84%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

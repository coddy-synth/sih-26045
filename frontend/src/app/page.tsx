export default function Dashboard() {
  const recentCases = [
    { id: "CASE-001", title: "Ashwagandha Extract Formulation", status: "Active", date: "2024-10-12" },
    { id: "CASE-002", title: "Turmeric Curcumin Synthesis", status: "Review", date: "2024-10-11" },
    { id: "CASE-003", title: "Neem Oil Purification Method", status: "Completed", date: "2024-10-09" },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline text-primary mb-2">Welcome to IP-SAKTI Sahayak</h1>
        <p className="text-on-surface-variant">Navigate Ayurvedic intellectual property with AI-assisted confidence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Research Cards */}
        {[
          { title: "Prior Art Search", value: "14", label: "Queries this week" },
          { title: "Active Cases", value: "3", label: "Require attention" },
          { title: "Compliance Checks", value: "98%", label: "Accuracy rating" }
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-sm">
            <h3 className="text-sm font-semibold text-on-surface-variant mb-4 uppercase tracking-wide">{stat.title}</h3>
            <p className="text-4xl font-headline text-primary mb-1">{stat.value}</p>
            <p className="text-sm text-outline">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
          <h2 className="text-lg font-semibold text-on-surface">Recent Cases</h2>
          <button className="text-sm font-semibold text-primary hover:underline">View All</button>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant text-sm text-on-surface-variant">
                <th className="p-4 font-semibold">Case ID</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentCases.map((c) => (
                <tr key={c.id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors text-sm">
                  <td className="p-4 font-medium text-primary">{c.id}</td>
                  <td className="p-4 text-on-surface">{c.title}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-container text-on-primary-container">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-on-surface-variant">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

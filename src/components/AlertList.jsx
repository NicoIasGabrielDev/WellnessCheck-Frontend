const alerts = [
  {
    name: "João Silva",
    email: "joao@email.com",
    reason: "2 dias seguidos com humor baixo",
    days: ["Seg", "Ter"],
  },
  {
    name: "Ana Souza",
    email: "ana@email.com",
    reason: "Produtividade baixa 3 dias seguidos",
    days: ["Qua", "Qui", "Sex"],
  },
];

export default function AlertList() {
  return (
    <div className="bg-zinc-800 p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">🚨 Alertas da Semana</h2>

      {alerts.length === 0 ? (
        <p className="text-gray-400">Sem alertas recentes.</p>
      ) : (
        <ul className="space-y-4">
          {alerts.map((alert, i) => (
            <li key={i} className="bg-zinc-700 p-4 rounded-lg">
              <p className="font-semibold text-amber-400">{alert.name}</p>
              <p className="text-sm text-gray-300">{alert.email}</p>
              <p className="mt-2 text-sm text-red-400">{alert.reason}</p>
              <div className="mt-2 flex gap-2 text-sm text-white">
                {alert.days.map((d, j) => (
                  <span key={j} className="bg-zinc-600 px-2 py-1 rounded">
                    {d}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

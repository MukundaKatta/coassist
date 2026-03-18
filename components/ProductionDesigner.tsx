'use client';
import { useStore } from '@/lib/store';
import { Factory, Bot, CheckCircle } from 'lucide-react';
const stationColors: Record<string, string> = { assembly: '#3b82f6', inspection: '#f59e0b', packing: '#22c55e', material: '#a855f7' };

export default function ProductionDesigner() {
  const { productionLines } = useStore();
  const line = productionLines[0];
  if (!line) return <p className="text-gray-500">No production lines</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Production Line Designer</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"><p className="text-sm text-gray-400">Cycle Time</p><p className="text-3xl font-bold text-co-400">{line.cycleTime}s</p></div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"><p className="text-sm text-gray-400">Efficiency</p><p className="text-3xl font-bold text-green-400">{line.efficiency}%</p></div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"><p className="text-sm text-gray-400">Stations</p><p className="text-3xl font-bold text-purple-400">{line.stations.length}</p></div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="font-semibold text-sm mb-4">{line.name}</h3>
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          {line.stations.map((st, i) => (
            <div key={st.id} className="flex items-center gap-4">
              <div className="min-w-32 bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: stationColors[st.type] + '20' }}>
                  <Factory size={18} style={{ color: stationColors[st.type] }} />
                </div>
                <p className="font-medium text-sm">{st.name}</p>
                <p className="text-xs text-gray-500 capitalize">{st.type}</p>
                <p className="text-xs text-gray-400 mt-1">{st.cycleTime}s</p>
                {st.cobotAssigned && <div className="flex items-center justify-center gap-1 mt-2"><Bot size={12} className="text-co-400" /><span className="text-xs text-co-400">Cobot</span></div>}
              </div>
              {i < line.stations.length - 1 && <div className="text-gray-600">→</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

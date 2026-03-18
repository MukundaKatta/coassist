'use client';
import { useStore } from '@/lib/store';
import { Timer, TrendingDown, Zap } from 'lucide-react';

export default function CycleTimeOptimizer() {
  const { productionLines } = useStore();
  const line = productionLines[0];
  if (!line) return null;

  const bottleneck = [...line.stations].sort((a, b) => b.cycleTime - a.cycleTime)[0];
  const suggestions = [
    { action: 'Increase Assembly 1 speed', savings: '2.3s', impact: 'high' },
    { action: 'Optimize gripper approach path', savings: '1.1s', impact: 'medium' },
    { action: 'Pre-position material at Station 1', savings: '0.8s', impact: 'medium' },
    { action: 'Parallel inspection during packing', savings: '3.2s', impact: 'high' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Cycle Time Optimizer</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"><Timer size={18} className="text-co-400 mb-1" /><p className="text-2xl font-bold">{line.cycleTime}s</p><p className="text-xs text-gray-500">Current Cycle</p></div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"><TrendingDown size={18} className="text-green-400 mb-1" /><p className="text-2xl font-bold text-green-400">37.6s</p><p className="text-xs text-gray-500">Optimized Target</p></div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"><Zap size={18} className="text-yellow-400 mb-1" /><p className="text-2xl font-bold text-yellow-400">{bottleneck.name}</p><p className="text-xs text-gray-500">Bottleneck ({bottleneck.cycleTime}s)</p></div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"><p className="text-2xl font-bold text-co-400">7.4s</p><p className="text-xs text-gray-500">Potential Savings</p></div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
        <h3 className="font-semibold text-sm mb-3">Station Cycle Times</h3>
        <div className="space-y-3">
          {line.stations.map((st) => (
            <div key={st.id}>
              <div className="flex justify-between text-sm mb-1"><span>{st.name}</span><span className="text-co-400">{st.cycleTime}s</span></div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${st.id === bottleneck.id ? 'bg-red-500' : 'bg-co-500'}`}
                  style={{ width: `${(st.cycleTime / bottleneck.cycleTime) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
        <h3 className="font-semibold text-sm mb-3">Optimization Suggestions</h3>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <span className="text-sm">{s.action}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-green-400">-{s.savings}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${s.impact === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{s.impact}</span>
                <button className="px-3 py-1 bg-co-500/20 text-co-400 rounded text-xs">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

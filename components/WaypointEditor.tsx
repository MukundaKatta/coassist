'use client';
import { useState } from 'react';
import { useStore, Waypoint } from '@/lib/store';
import { MapPin, Plus, Trash2 } from 'lucide-react';

export default function WaypointEditor() {
  const { waypoints, setWaypoints } = useStore();
  const [selected, setSelected] = useState<Waypoint | null>(waypoints[0] || null);

  const updateWaypoint = (id: string, field: string, value: number) => {
    setWaypoints(waypoints.map((w) => w.id === id ? { ...w, [field]: value } : w));
    if (selected?.id === id) setSelected({ ...selected, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Waypoint Editor</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-co-500 rounded-lg text-sm"><Plus size={16} /> Add Waypoint</button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          {waypoints.map((w) => (
            <button key={w.id} onClick={() => setSelected(w)}
              className={`w-full text-left p-3 rounded-lg border ${selected?.id === w.id ? 'bg-co-500/20 border-co-500/30' : 'bg-gray-900/50 border-gray-800'}`}>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-co-400" /><span className="font-medium text-sm">{w.name}</span></div>
              <p className="text-xs text-gray-500 mt-1">({w.x}, {w.y}, {w.z}) @ {w.speed}%</p>
            </button>
          ))}
        </div>
        <div className="col-span-2">
          {selected ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">{selected.name}</h3>
              <div className="grid grid-cols-3 gap-4">
                {['x', 'y', 'z'].map((axis) => (
                  <div key={axis}>
                    <label className="text-xs text-gray-400 uppercase">{axis} (mm)</label>
                    <input type="number" value={(selected as any)[axis]}
                      onChange={(e) => updateWaypoint(selected.id, axis, parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm" />
                  </div>
                ))}
                {['rx', 'ry', 'rz'].map((axis) => (
                  <div key={axis}>
                    <label className="text-xs text-gray-400 uppercase">{axis} (deg)</label>
                    <input type="number" value={(selected as any)[axis]}
                      onChange={(e) => updateWaypoint(selected.id, axis, parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm" />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-xs text-gray-400">Speed (%)</label>
                <input type="range" min={1} max={100} value={selected.speed}
                  onChange={(e) => updateWaypoint(selected.id, 'speed', parseInt(e.target.value))}
                  className="w-full accent-co-500 mt-1" />
                <span className="text-xs text-co-400">{selected.speed}%</span>
              </div>
            </div>
          ) : <div className="flex items-center justify-center h-64 text-gray-500">Select a waypoint</div>}
        </div>
      </div>
    </div>
  );
}

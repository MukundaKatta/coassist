'use client';
import { useStore } from '@/lib/store';
import { Shield, Plus } from 'lucide-react';
const zoneColors: Record<string, string> = { restricted: '#ef4444', reduced_speed: '#eab308', collaborative: '#22c55e' };
export default function SafetyConfig() {
  const { safetyZones } = useStore();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Safety Zone Configurator</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-co-500 rounded-lg text-sm"><Plus size={16} /> Add Zone</button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <div className="relative bg-gray-800/30 rounded-lg" style={{ height: 400 }}>
            <svg className="w-full h-full" viewBox="-5 -5 10 10">
              {Array.from({ length: 11 }).map((_, i) => (<g key={i}><line x1={-5} y1={i-5} x2={5} y2={i-5} stroke="#1a1a2e" strokeWidth="0.02" /><line x1={i-5} y1={-5} x2={i-5} y2={5} stroke="#1a1a2e" strokeWidth="0.02" /></g>))}
              {safetyZones.map((z) => {
                const color = zoneColors[z.type];
                return z.shape === 'rect' ? (
                  <rect key={z.id} x={z.x} y={z.y} width={z.w} height={z.h} fill={color + '20'} stroke={color} strokeWidth={0.05} strokeDasharray={z.type === 'restricted' ? '0.15' : 'none'} rx={0.05} />
                ) : (
                  <circle key={z.id} cx={z.x} cy={z.y} r={z.w / 2} fill={color + '20'} stroke={color} strokeWidth={0.05} strokeDasharray={z.type === 'restricted' ? '0.15' : 'none'} />
                );
              })}
              {safetyZones.map((z) => (
                <text key={z.id + 'label'} x={z.shape === 'rect' ? z.x + z.w / 2 : z.x} y={z.shape === 'rect' ? z.y + z.h / 2 : z.y}
                  textAnchor="middle" dominantBaseline="middle" fill={zoneColors[z.type]} fontSize="0.3">{z.name}</text>
              ))}
              <circle cx={0} cy={0} r={0.15} fill="#3b82f6" /><text x={0} y={0.45} textAnchor="middle" fill="#3b82f6" fontSize="0.25">Cobot</text>
            </svg>
          </div>
        </div>
        <div className="space-y-3">
          {safetyZones.map((z) => (
            <div key={z.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: zoneColors[z.type] }} />
                <span className="font-medium text-sm">{z.name}</span>
              </div>
              <p className="text-xs text-gray-500 capitalize">{z.type.replace('_', ' ')} | {z.shape}</p>
            </div>
          ))}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
            <h4 className="text-sm font-semibold mb-2">Legend</h4>
            {Object.entries(zoneColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2 text-xs mb-1">
                <div className="w-2 h-2 rounded" style={{ backgroundColor: color }} />
                <span className="capitalize text-gray-400">{type.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

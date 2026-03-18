'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { mockBlocks, mockWaypoints, mockSafetyZones, mockProductionLines, mockMaintenanceTasks } from '@/lib/mock-data';
import { Blocks, MapPin, Shield, Factory, Timer, Wrench, ChevronRight } from 'lucide-react';
import VisualProgramming from '@/components/VisualProgramming';
import WaypointEditor from '@/components/WaypointEditor';
import SafetyConfig from '@/components/SafetyConfig';
import ProductionDesigner from '@/components/ProductionDesigner';
import CycleTimeOptimizer from '@/components/CycleTimeOptimizer';
import MaintenanceScheduler from '@/components/MaintenanceScheduler';

const tabs = [
  { id: 'program', label: 'Visual Programming', icon: Blocks },
  { id: 'waypoints', label: 'Waypoint Editor', icon: MapPin },
  { id: 'safety', label: 'Safety Zones', icon: Shield },
  { id: 'production', label: 'Production Line', icon: Factory },
  { id: 'cycle', label: 'Cycle Time', icon: Timer },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
];

export default function HomePage() {
  const { activeTab, setActiveTab, setBlocks, setWaypoints, setSafetyZones, setProductionLines, setMaintenanceTasks } = useStore();

  useEffect(() => {
    setBlocks(mockBlocks); setWaypoints(mockWaypoints); setSafetyZones(mockSafetyZones);
    setProductionLines(mockProductionLines); setMaintenanceTasks(mockMaintenanceTasks);
  }, [setBlocks, setWaypoints, setSafetyZones, setProductionLines, setMaintenanceTasks]);

  const render = () => {
    switch (activeTab) {
      case 'program': return <VisualProgramming />;
      case 'waypoints': return <WaypointEditor />;
      case 'safety': return <SafetyConfig />;
      case 'production': return <ProductionDesigner />;
      case 'cycle': return <CycleTimeOptimizer />;
      case 'maintenance': return <MaintenanceScheduler />;
      default: return <VisualProgramming />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-56 bg-gray-900/50 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-co-400 to-co-600 bg-clip-text text-transparent">CoAssist</h1>
          <p className="text-xs text-gray-500">Cobot Programming</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((t) => { const Icon = t.icon; return (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${activeTab === t.id ? 'bg-co-500/20 text-co-400 border border-co-500/30' : 'text-gray-400 hover:bg-gray-800/50'}`}>
              <Icon size={14} /><span className="flex-1 text-left">{t.label}</span>{activeTab === t.id && <ChevronRight size={12} />}
            </button>); })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">{render()}</main>
    </div>
  );
}

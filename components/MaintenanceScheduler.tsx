'use client';
import { useStore } from '@/lib/store';
import { Wrench, Clock, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';

const statusConfig: Record<string, { color: string; icon: any }> = {
  scheduled: { color: 'text-co-400 bg-co-500/10', icon: Calendar },
  overdue: { color: 'text-red-400 bg-red-500/10', icon: AlertTriangle },
  completed: { color: 'text-green-400 bg-green-500/10', icon: CheckCircle },
};
const prioColors: Record<string, string> = { low: 'text-gray-400 bg-gray-500/10', medium: 'text-yellow-400 bg-yellow-500/10', high: 'text-red-400 bg-red-500/10' };

export default function MaintenanceScheduler() {
  const { maintenanceTasks } = useStore();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Maintenance Scheduler</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4"><p className="text-sm text-gray-400">Scheduled</p><p className="text-3xl font-bold text-co-400">{maintenanceTasks.filter((t) => t.status === 'scheduled').length}</p></div>
        <div className="bg-gray-900/50 border border-red-500/20 rounded-xl p-4"><p className="text-sm text-red-400">Overdue</p><p className="text-3xl font-bold text-red-400">{maintenanceTasks.filter((t) => t.status === 'overdue').length}</p></div>
        <div className="bg-gray-900/50 border border-green-500/20 rounded-xl p-4"><p className="text-sm text-green-400">Completed</p><p className="text-3xl font-bold text-green-400">{maintenanceTasks.filter((t) => t.status === 'completed').length}</p></div>
      </div>
      <div className="space-y-3">
        {maintenanceTasks.sort((a, b) => {
          const order = { overdue: 0, scheduled: 1, completed: 2 };
          return order[a.status] - order[b.status];
        }).map((t) => {
          const config = statusConfig[t.status]; const Icon = config.icon;
          return (
            <div key={t.id} className={`bg-gray-900/50 border border-gray-800 rounded-xl p-4 ${t.status === 'completed' ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${config.color}`}><Icon size={18} /></div>
                  <div>
                    <h3 className="font-semibold text-sm">{t.component}</h3>
                    <div className="flex gap-3 text-xs text-gray-500 mt-1">
                      <span className="capitalize">{t.type}</span>
                      <span>Date: {t.scheduledDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${prioColors[t.priority]}`}>{t.priority}</span>
                  <span className={`text-xs px-2 py-0.5 rounded capitalize ${config.color}`}>{t.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

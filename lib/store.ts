import { create } from 'zustand';

export interface ProgramBlock { id: string; type: 'move' | 'wait' | 'grip' | 'release' | 'condition' | 'loop' | 'waypoint'; params: Record<string, any>; next: string | null; }
export interface Waypoint { id: string; name: string; x: number; y: number; z: number; rx: number; ry: number; rz: number; speed: number; }
export interface SafetyZone { id: string; name: string; type: 'restricted' | 'reduced_speed' | 'collaborative'; shape: 'rect' | 'circle'; x: number; y: number; w: number; h: number; }
export interface ProductionLine { id: string; name: string; stations: Station[]; cycleTime: number; efficiency: number; }
export interface Station { id: string; name: string; type: 'assembly' | 'inspection' | 'packing' | 'material'; x: number; y: number; cobotAssigned: boolean; cycleTime: number; }
export interface MaintenanceTask { id: string; component: string; type: 'preventive' | 'corrective'; scheduledDate: string; status: 'scheduled' | 'overdue' | 'completed'; priority: 'low' | 'medium' | 'high'; }

interface CoAssistState {
  activeTab: string;
  blocks: ProgramBlock[];
  waypoints: Waypoint[];
  safetyZones: SafetyZone[];
  productionLines: ProductionLine[];
  maintenanceTasks: MaintenanceTask[];
  setActiveTab: (t: string) => void;
  setBlocks: (b: ProgramBlock[]) => void;
  setWaypoints: (w: Waypoint[]) => void;
  setSafetyZones: (s: SafetyZone[]) => void;
  setProductionLines: (p: ProductionLine[]) => void;
  setMaintenanceTasks: (m: MaintenanceTask[]) => void;
}

export const useStore = create<CoAssistState>((set) => ({
  activeTab: 'program', blocks: [], waypoints: [], safetyZones: [], productionLines: [], maintenanceTasks: [],
  setActiveTab: (tab) => set({ activeTab: tab }),
  setBlocks: (blocks) => set({ blocks }),
  setWaypoints: (waypoints) => set({ waypoints }),
  setSafetyZones: (safetyZones) => set({ safetyZones }),
  setProductionLines: (productionLines) => set({ productionLines }),
  setMaintenanceTasks: (maintenanceTasks) => set({ maintenanceTasks }),
}));

import { ProgramBlock, Waypoint, SafetyZone, ProductionLine, MaintenanceTask } from './store';

export const mockBlocks: ProgramBlock[] = [
  { id: 'b1', type: 'move', params: { waypoint: 'Home', speed: 100 }, next: 'b2' },
  { id: 'b2', type: 'move', params: { waypoint: 'Pick Position', speed: 80 }, next: 'b3' },
  { id: 'b3', type: 'grip', params: { force: 50, width: 20 }, next: 'b4' },
  { id: 'b4', type: 'wait', params: { duration: 0.5 }, next: 'b5' },
  { id: 'b5', type: 'move', params: { waypoint: 'Place Position', speed: 60 }, next: 'b6' },
  { id: 'b6', type: 'release', params: {}, next: 'b7' },
  { id: 'b7', type: 'move', params: { waypoint: 'Home', speed: 100 }, next: null },
];

export const mockWaypoints: Waypoint[] = [
  { id: 'w1', name: 'Home', x: 0, y: 0, z: 500, rx: 0, ry: 0, rz: 0, speed: 100 },
  { id: 'w2', name: 'Pick Position', x: 300, y: -200, z: 100, rx: 0, ry: 180, rz: 0, speed: 80 },
  { id: 'w3', name: 'Place Position', x: -300, y: 200, z: 150, rx: 0, ry: 180, rz: 45, speed: 60 },
  { id: 'w4', name: 'Inspection Point', x: 0, y: 300, z: 300, rx: 30, ry: 0, rz: 0, speed: 50 },
  { id: 'w5', name: 'Tool Change', x: 400, y: 0, z: 400, rx: 0, ry: 90, rz: 0, speed: 40 },
];

export const mockSafetyZones: SafetyZone[] = [
  { id: 'sz1', name: 'Operator Area', type: 'collaborative', shape: 'rect', x: -2, y: -2, w: 4, h: 2 },
  { id: 'sz2', name: 'High Speed Zone', type: 'restricted', shape: 'circle', x: 0, y: 2, w: 1.5, h: 1.5 },
  { id: 'sz3', name: 'Material Feed', type: 'reduced_speed', shape: 'rect', x: 2, y: -1, w: 2, h: 3 },
];

export const mockProductionLines: ProductionLine[] = [
  { id: 'pl1', name: 'Assembly Line A', cycleTime: 45, efficiency: 87, stations: [
    { id: 'st1', name: 'Material Input', type: 'material', x: 0, y: 0, cobotAssigned: false, cycleTime: 10 },
    { id: 'st2', name: 'Assembly 1', type: 'assembly', x: 3, y: 0, cobotAssigned: true, cycleTime: 15 },
    { id: 'st3', name: 'Assembly 2', type: 'assembly', x: 6, y: 0, cobotAssigned: true, cycleTime: 12 },
    { id: 'st4', name: 'Inspection', type: 'inspection', x: 9, y: 0, cobotAssigned: false, cycleTime: 8 },
    { id: 'st5', name: 'Packing', type: 'packing', x: 12, y: 0, cobotAssigned: true, cycleTime: 10 },
  ]},
];

export const mockMaintenanceTasks: MaintenanceTask[] = [
  { id: 'mt1', component: 'Joint 1 Bearing', type: 'preventive', scheduledDate: '2024-04-15', status: 'scheduled', priority: 'medium' },
  { id: 'mt2', component: 'Gripper Pads', type: 'corrective', scheduledDate: '2024-04-03', status: 'overdue', priority: 'high' },
  { id: 'mt3', component: 'Cable Harness', type: 'preventive', scheduledDate: '2024-05-01', status: 'scheduled', priority: 'low' },
  { id: 'mt4', component: 'Safety Sensors', type: 'preventive', scheduledDate: '2024-03-28', status: 'completed', priority: 'high' },
  { id: 'mt5', component: 'Motor J3', type: 'corrective', scheduledDate: '2024-04-10', status: 'scheduled', priority: 'medium' },
];

'use client';

import { useStore, ProgramBlock } from '@/lib/store';
import { ArrowDown, Plus, Trash2, Play, GripVertical, Move, Clock, Grip, Unlock, RotateCcw, GitBranch } from 'lucide-react';

const blockConfig: Record<string, { color: string; icon: any; label: string }> = {
  move: { color: 'bg-co-500/20 border-co-500/30 text-co-400', icon: Move, label: 'Move' },
  wait: { color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400', icon: Clock, label: 'Wait' },
  grip: { color: 'bg-green-500/20 border-green-500/30 text-green-400', icon: Grip, label: 'Grip' },
  release: { color: 'bg-red-500/20 border-red-500/30 text-red-400', icon: Unlock, label: 'Release' },
  condition: { color: 'bg-purple-500/20 border-purple-500/30 text-purple-400', icon: GitBranch, label: 'If/Else' },
  loop: { color: 'bg-orange-500/20 border-orange-500/30 text-orange-400', icon: RotateCcw, label: 'Loop' },
  waypoint: { color: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400', icon: Move, label: 'Waypoint' },
};

export default function VisualProgramming() {
  const { blocks, setBlocks } = useStore();

  const addBlock = (type: ProgramBlock['type']) => {
    const newBlock: ProgramBlock = {
      id: `b${Date.now()}`, type, params: type === 'move' ? { waypoint: 'Home', speed: 100 } : type === 'wait' ? { duration: 1 } : type === 'grip' ? { force: 50 } : {},
      next: null,
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => setBlocks(blocks.filter((b) => b.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold">Visual Block Programming</h2><p className="text-sm text-gray-400">Drag-and-drop cobot programming</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-co-500 hover:bg-co-600 rounded-lg text-sm"><Play size={16} /> Run Program</button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Block palette */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-3">Block Palette</h3>
          <div className="space-y-2">
            {Object.entries(blockConfig).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <button key={type} onClick={() => addBlock(type as ProgramBlock['type'])}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${config.color}`}>
                  <Icon size={14} />{config.label}
                  <Plus size={12} className="ml-auto opacity-50" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Program flow */}
        <div className="col-span-2 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-4">Program Flow</h3>
          <div className="space-y-2">
            {blocks.map((block, i) => {
              const config = blockConfig[block.type];
              const Icon = config.icon;
              return (
                <div key={block.id}>
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${config.color}`}>
                    <GripVertical size={14} className="opacity-50 cursor-grab" />
                    <Icon size={16} />
                    <div className="flex-1">
                      <span className="font-medium text-sm">{config.label}</span>
                      <span className="text-xs ml-2 opacity-70">
                        {block.type === 'move' && `-> ${block.params.waypoint} @ ${block.params.speed}%`}
                        {block.type === 'wait' && `${block.params.duration}s`}
                        {block.type === 'grip' && `force: ${block.params.force}%`}
                      </span>
                    </div>
                    <button onClick={() => removeBlock(block.id)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                  </div>
                  {i < blocks.length - 1 && (
                    <div className="flex justify-center py-1"><ArrowDown size={16} className="text-gray-600" /></div>
                  )}
                </div>
              );
            })}
            {blocks.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <Blocks size={32} className="mx-auto mb-2 text-co-400" />
                <p className="text-sm">Add blocks from the palette to build your program</p>
              </div>
            )}
          </div>
        </div>

        {/* Properties */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-3">Program Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Blocks</span><span>{blocks.length}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Move Steps</span><span>{blocks.filter((b) => b.type === 'move').length}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Est. Cycle</span><span className="text-co-400">~4.5s</span></div>
          </div>
          <div className="mt-4 space-y-2">
            <button className="w-full px-3 py-2 bg-gray-800/50 rounded-lg text-xs text-gray-400 hover:text-white">Save Program</button>
            <button className="w-full px-3 py-2 bg-gray-800/50 rounded-lg text-xs text-gray-400 hover:text-white">Load Program</button>
            <button onClick={() => setBlocks([])} className="w-full px-3 py-2 bg-red-600/20 rounded-lg text-xs text-red-400 hover:text-red-300">Clear All</button>
          </div>
        </div>
      </div>
    </div>
  );
}

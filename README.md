# CoAssist

Visual programming platform for collaborative robot (cobot) task programming, safety configuration, and production line management.

<!-- Add screenshot here -->

## Features

- **Visual Programming** — Block-based programming interface for defining cobot task sequences
- **Waypoint Editor** — Set and manage robot movement waypoints with coordinates and parameters
- **Safety Zone Configuration** — Define and visualize safety zones and restricted areas
- **Production Line Designer** — Design and configure automated production line workflows
- **Cycle Time Optimizer** — Analyze and optimize task cycle times for throughput improvements
- **Maintenance Scheduler** — Schedule and track cobot maintenance tasks and intervals

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Charts:** Recharts
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project

### Installation

```bash
git clone <repo-url>
cd coassist
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── page.tsx              # Main application page
components/
├── VisualProgramming.tsx # Block-based programming
├── WaypointEditor.tsx    # Waypoint management
├── SafetyConfig.tsx      # Safety zone configuration
├── ProductionDesigner.tsx # Production line design
├── CycleTimeOptimizer.tsx # Cycle time analysis
└── MaintenanceScheduler.tsx # Maintenance tracking
lib/
├── store.ts              # Zustand state management
└── mock-data.ts          # Sample cobot data
```

## License

MIT

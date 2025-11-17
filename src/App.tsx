import { useState } from 'react';
import { DragDropGrid } from './components/DragDropGrid';
import type { GridItem } from './components/DragDropGrid';
import { ClockWidget, CounterWidget, NoteWidget, InfoWidget } from './components/widgets';
import './App.css';

function App() {
  const [gridItems, setGridItems] = useState<GridItem[]>([
    {
      id: 'clock',
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      component: <ClockWidget />,
    },
    {
      id: 'counter',
      x: 3,
      y: 0,
      w: 3,
      h: 2,
      component: <CounterWidget />,
    },
    {
      id: 'temperature',
      x: 6,
      y: 0,
      w: 3,
      h: 2,
      component: <InfoWidget title="Temperatura" value={23} unit="°C" icon="🌡️" color="#ff5722" />,
    },
    {
      id: 'humidity',
      x: 9,
      y: 0,
      w: 3,
      h: 2,
      component: <InfoWidget title="Umidità" value={65} unit="%" icon="💧" color="#2196f3" />,
    },
    {
      id: 'notes',
      x: 0,
      y: 2,
      w: 6,
      h: 3,
      component: <NoteWidget />,
    },
    {
      id: 'energy',
      x: 6,
      y: 2,
      w: 3,
      h: 3,
      component: <InfoWidget title="Consumo Energia" value={1.5} unit="kW" icon="⚡" color="#ffc107" />,
    },
    {
      id: 'battery',
      x: 9,
      y: 2,
      w: 3,
      h: 3,
      component: <InfoWidget title="Batteria" value={87} unit="%" icon="🔋" color="#4caf50" />,
    },
  ]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏠 Dashboard Drag & Drop</h1>
        <p>Trascina e ridimensiona i componenti per personalizzare la tua dashboard</p>
      </header>
      <main className="app-main">
        <DragDropGrid
          items={gridItems}
          cols={12}
          rowHeight={100}
          width={1200}
          onItemsChange={setGridItems}
        />
      </main>
    </div>
  );
}

export default App;

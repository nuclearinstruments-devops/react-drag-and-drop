# Esempi di Utilizzo

Questo documento fornisce esempi avanzati di come utilizzare il componente React Drag & Drop Grid.

## Esempio 1: Dashboard Base

```tsx
import React, { useState } from 'react';
import { DragDropGrid, ClockWidget, CounterWidget } from 'react-drag-and-drop-grid';
import type { GridItem } from 'react-drag-and-drop-grid';

function SimpleDashboard() {
  const [items, setItems] = useState<GridItem[]>([
    {
      id: 'clock',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      component: <ClockWidget />,
    },
    {
      id: 'counter',
      x: 4,
      y: 0,
      w: 4,
      h: 2,
      component: <CounterWidget />,
    },
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>La Mia Dashboard</h1>
      <DragDropGrid items={items} onItemsChange={setItems} />
    </div>
  );
}
```

## Esempio 2: Widget Personalizzato con Stato

```tsx
import React, { useState } from 'react';
import { Widget } from 'react-drag-and-drop-grid';

const TodoWidget = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <Widget title="Todo List" backgroundColor="#fff8e1">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Aggiungi task..."
            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button onClick={addTodo} style={{ padding: '8px 16px', borderRadius: '4px' }}>
            Aggiungi
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {todos.map((todo, index) => (
            <li key={index} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
};

export default TodoWidget;
```

## Esempio 3: Widget con Dati Esterni

```tsx
import React, { useState, useEffect } from 'react';
import { InfoWidget } from 'react-drag-and-drop-grid';

const WeatherWidget = () => {
  const [temperature, setTemperature] = useState<number>(0);

  useEffect(() => {
    // Simula chiamata API
    const fetchWeather = async () => {
      // In un'app reale, qui faresti una chiamata fetch() a un'API meteo
      const mockTemp = Math.floor(Math.random() * 15) + 15; // 15-30°C
      setTemperature(mockTemp);
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // Aggiorna ogni minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <InfoWidget
      title="Meteo"
      value={temperature}
      unit="°C"
      icon="🌤️"
      color="#ff9800"
    />
  );
};

export default WeatherWidget;
```

## Esempio 4: Dashboard Salvabile con LocalStorage

```tsx
import React, { useState, useEffect } from 'react';
import { DragDropGrid } from 'react-drag-and-drop-grid';
import type { GridItem } from 'react-drag-and-drop-grid';
import { ClockWidget, CounterWidget, NoteWidget } from 'react-drag-and-drop-grid';

function PersistentDashboard() {
  const defaultItems: GridItem[] = [
    { id: 'clock', x: 0, y: 0, w: 3, h: 2, component: <ClockWidget /> },
    { id: 'counter', x: 3, y: 0, w: 3, h: 2, component: <CounterWidget /> },
    { id: 'notes', x: 0, y: 2, w: 6, h: 3, component: <NoteWidget /> },
  ];

  const [items, setItems] = useState<GridItem[]>(() => {
    const saved = localStorage.getItem('dashboardLayout');
    if (saved) {
      const savedLayout = JSON.parse(saved);
      // Ricrea i componenti React dagli ID salvati
      return savedLayout.map((item: any) => ({
        ...item,
        component: getComponentById(item.id),
      }));
    }
    return defaultItems;
  });

  useEffect(() => {
    // Salva solo le posizioni, non i componenti React
    const layoutToSave = items.map(({ id, x, y, w, h }) => ({ id, x, y, w, h }));
    localStorage.setItem('dashboardLayout', JSON.stringify(layoutToSave));
  }, [items]);

  const handleReset = () => {
    localStorage.removeItem('dashboardLayout');
    setItems(defaultItems);
  };

  return (
    <div>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Dashboard Persistente</h1>
        <button onClick={handleReset}>Reset Layout</button>
      </div>
      <DragDropGrid items={items} onItemsChange={setItems} />
    </div>
  );
}

function getComponentById(id: string) {
  const componentMap: Record<string, React.ReactNode> = {
    clock: <ClockWidget />,
    counter: <CounterWidget />,
    notes: <NoteWidget />,
  };
  return componentMap[id] || <div>Unknown Component</div>;
}

export default PersistentDashboard;
```

## Esempio 5: Widget con Vincoli di Dimensione

```tsx
import { useState } from 'react';
import { DragDropGrid } from 'react-drag-and-drop-grid';
import type { GridItem } from 'react-drag-and-drop-grid';
import { Widget } from 'react-drag-and-drop-grid';

function ConstrainedDashboard() {
  const [items] = useState<GridItem[]>([
    {
      id: 'small-widget',
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      minW: 2,  // Larghezza minima
      minH: 2,  // Altezza minima
      maxW: 4,  // Larghezza massima
      maxH: 4,  // Altezza massima
      component: (
        <Widget title="Widget Piccolo" backgroundColor="#e1f5fe">
          <p>Questo widget ha dimensioni vincolate</p>
          <p>Min: 2x2, Max: 4x4</p>
        </Widget>
      ),
    },
    {
      id: 'fixed-width',
      x: 2,
      y: 0,
      w: 3,
      h: 2,
      minW: 3,
      maxW: 3,  // Larghezza fissa
      component: (
        <Widget title="Larghezza Fissa" backgroundColor="#f3e5f5">
          <p>Questo widget ha larghezza fissa di 3 unità</p>
        </Widget>
      ),
    },
  ]);

  return <DragDropGrid items={items} />;
}
```

## Esempio 6: Widget Grafico (con libreria di grafici)

```tsx
import React from 'react';
import { Widget } from 'react-drag-and-drop-grid';

// Esempio concettuale - richiede una libreria di grafici come recharts
const ChartWidget = () => {
  const data = [
    { name: 'Gen', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
  ];

  return (
    <Widget title="Vendite Mensili" backgroundColor="#e8eaf6">
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Qui inseriresti un componente grafico */}
        <div style={{ textAlign: 'center' }}>
          <p>Grafico vendite</p>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>€ 2,100</p>
          <p style={{ color: 'green' }}>↑ +15% rispetto al mese scorso</p>
        </div>
      </div>
    </Widget>
  );
};

export default ChartWidget;
```

## Esempio 7: Dashboard Responsiva

```tsx
import React, { useState, useEffect } from 'react';
import { DragDropGrid } from 'react-drag-and-drop-grid';
import type { GridItem } from 'react-drag-and-drop-grid';

function ResponsiveDashboard() {
  const [items] = useState<GridItem[]>([/* i tuoi items */]);
  const [gridWidth, setGridWidth] = useState(1200);
  const [cols, setCols] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth - 40; // padding
      setGridWidth(width);
      
      // Adatta il numero di colonne in base alla larghezza
      if (width < 768) {
        setCols(6);  // Mobile
      } else if (width < 1024) {
        setCols(8);  // Tablet
      } else {
        setCols(12); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DragDropGrid
      items={items}
      cols={cols}
      width={gridWidth}
      rowHeight={100}
    />
  );
}
```

## Tips & Tricks

### 1. Aggiornamento Dinamico dei Widget

Per aggiornare il contenuto di un widget specifico:

```tsx
const updateWidget = (id: string, newComponent: ReactNode) => {
  setItems(items.map(item => 
    item.id === id ? { ...item, component: newComponent } : item
  ));
};
```

### 2. Aggiunta/Rimozione Widget Runtime

```tsx
const addWidget = (newWidget: GridItem) => {
  setItems([...items, newWidget]);
};

const removeWidget = (id: string) => {
  setItems(items.filter(item => item.id !== id));
};
```

### 3. Disabilitare Drag/Resize per Widget Specifici

Questo richiede una modifica al componente DragDropGrid per supportare proprietà statiche per item.

### 4. Temi Personalizzati

```tsx
// Definisci un tema
const theme = {
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  headerBackground: 'rgba(0, 0, 0, 0.05)',
  textColor: '#333',
};

// Applica il tema ai widget
<Widget 
  title="Themed Widget" 
  backgroundColor={theme.cardBackground}
>
  <div style={{ color: theme.textColor }}>
    Contenuto tematizzato
  </div>
</Widget>
```

---

Per altri esempi e documentazione, consulta il [README.md](./README.md).

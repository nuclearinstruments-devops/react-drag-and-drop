import { useState } from 'react';
import { DragDropGrid, WidgetSidebar } from './components';
import type { GridItem, WidgetTemplate } from './components';
import { ClockWidget, CounterWidget, NoteWidget, InfoWidget } from './components/widgets';
import './App.css';

function App() {
  const [isEditMode, setIsEditMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Widget templates available in sidebar
  const availableWidgets: WidgetTemplate[] = [
    {
      id: 'clock-template',
      name: 'Orologio',
      icon: '🕐',
      description: 'Ora e data corrente',
      defaultSize: { w: 3, h: 2 },
      category: 'Tempo',
    },
    {
      id: 'counter-template',
      name: 'Contatore',
      icon: '🔢',
      description: 'Contatore interattivo',
      defaultSize: { w: 3, h: 2 },
      category: 'Utilità',
    },
    {
      id: 'notes-template',
      name: 'Note',
      icon: '📝',
      description: 'Area di testo per note',
      defaultSize: { w: 6, h: 3 },
      category: 'Utilità',
    },
    {
      id: 'temperature-template',
      name: 'Temperatura',
      icon: '🌡️',
      description: 'Sensore temperatura',
      defaultSize: { w: 3, h: 2 },
      category: 'Sensori',
    },
    {
      id: 'humidity-template',
      name: 'Umidità',
      icon: '💧',
      description: 'Sensore umidità',
      defaultSize: { w: 3, h: 2 },
      category: 'Sensori',
    },
    {
      id: 'energy-template',
      name: 'Energia',
      icon: '⚡',
      description: 'Consumo energetico',
      defaultSize: { w: 3, h: 3 },
      category: 'Sensori',
    },
    {
      id: 'battery-template',
      name: 'Batteria',
      icon: '🔋',
      description: 'Livello batteria',
      defaultSize: { w: 3, h: 2 },
      category: 'Sensori',
    },
  ];

  // Function to create widget component from template
  const createWidgetComponent = (templateId: string) => {
    switch (templateId) {
      case 'clock-template':
        return <ClockWidget />;
      case 'counter-template':
        return <CounterWidget />;
      case 'notes-template':
        return <NoteWidget />;
      case 'temperature-template':
        return <InfoWidget title="Temperatura" value={23} unit="°C" icon="🌡️" color="#ff5722" />;
      case 'humidity-template':
        return <InfoWidget title="Umidità" value={65} unit="%" icon="💧" color="#2196f3" />;
      case 'energy-template':
        return <InfoWidget title="Consumo Energia" value={1.5} unit="kW" icon="⚡" color="#ffc107" />;
      case 'battery-template':
        return <InfoWidget title="Batteria" value={87} unit="%" icon="🔋" color="#4caf50" />;
      default:
        return <div>Unknown Widget</div>;
    }
  };

  // Handle adding widget from sidebar (via click)
  const handleAddWidget = (widget: WidgetTemplate) => {
    const newId = `${widget.id}-${Date.now()}`;
    const newWidget: GridItem = {
      id: newId,
      x: 0,
      y: Infinity, // Will be placed at the bottom
      w: widget.defaultSize.w,
      h: widget.defaultSize.h,
      component: createWidgetComponent(widget.id),
    };
    setGridItems([...gridItems, newWidget]);
  };

  // Handle adding widget from sidebar (via drop)
  const handleAddWidgetFromDrop = (widgetId: string) => {
    const widget = availableWidgets.find(w => w.id === widgetId);
    if (!widget) return;
    
    const newId = `${widget.id}-${Date.now()}`;
    const newWidget: GridItem = {
      id: newId,
      x: 0,
      y: Infinity, // Will be placed at the bottom
      w: widget.defaultSize.w,
      h: widget.defaultSize.h,
      component: createWidgetComponent(widget.id),
    };
    setGridItems([...gridItems, newWidget]);
  };

  // Handle removing widget by dragging out
  const handleRemoveWidget = (widgetId: string) => {
    setGridItems(gridItems.filter(item => item.id !== widgetId));
  };

  // Handle saving to API (simulated)
  const handleSave = async (items: GridItem[]) => {
    console.log('Saving dashboard layout to API...', items);
    
    // Simulate API call
    try {
      // In a real app, you would make an API call here:
      // await fetch('/api/dashboard/layout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(items.map(({ id, x, y, w, h }) => ({ id, x, y, w, h }))),
      // });
      
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      console.log('✓ Layout saved successfully');
    } catch (error) {
      console.error('✗ Failed to save layout:', error);
      throw error;
    }
  };

  const handleItemsChange = (items: GridItem[]) => {
    setGridItems(items);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🏠 Dashboard Drag & Drop</h1>
            <p>Trascina e ridimensiona i componenti per personalizzare la tua dashboard</p>
          </div>
          <div className="header-controls">
            <button 
              className={`mode-toggle ${isEditMode ? 'edit' : 'view'}`}
              onClick={toggleEditMode}
            >
              {isEditMode ? '👁️ Modalità Vista' : '✏️ Modalità Modifica'}
            </button>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <div className="dashboard-layout">
          {isEditMode && (
            <aside className="sidebar">
              <WidgetSidebar
                widgets={availableWidgets}
                onAddWidget={handleAddWidget}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </aside>
          )}
          
          <div className="dashboard-content">
            <DragDropGrid
              items={gridItems}
              cols={12}
              rowHeight={100}
              width={isEditMode ? 1200 - 320 : 1200}
              onItemsChange={handleItemsChange}
              onSave={handleSave}
              onAddWidget={handleAddWidgetFromDrop}
              onRemoveWidget={handleRemoveWidget}
              compactType="vertical"
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

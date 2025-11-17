# React Drag & Drop Grid 🎯

Una griglia drag-and-drop personalizzabile per React, simile alla dashboard di Home Assistant. Permette di trascinare e ridimensionare componenti custom in posizioni specifiche.

![Dashboard Demo](https://github.com/user-attachments/assets/558d068a-6a27-4940-9bd2-94b6b5da9bc6)

## ✨ Caratteristiche

- 🎨 **Completamente personalizzabile**: Crea e aggiungi i tuoi widget personalizzati
- 🖱️ **Drag & Drop**: Trascina i componenti per riorganizzare il layout
- 📏 **Ridimensionabile**: Ridimensiona i widget secondo le tue esigenze
- 🎯 **Griglia flessibile**: Sistema a griglia con 12 colonne configurabili
- 📦 **Componente riutilizzabile**: Usa come pacchetto npm in qualsiasi progetto React
- 💅 **Widgets pronti all'uso**: Include widget di esempio (orologio, contatore, note, info)
- ⚡ **React 19**: Costruito con le ultime versioni di React e TypeScript
- 🎭 **TypeScript**: Completamente tipizzato per un'esperienza di sviluppo migliore

## 🚀 Installazione

```bash
npm install react-drag-and-drop-grid
# oppure
yarn add react-drag-and-drop-grid
```

## 📖 Utilizzo Base

```tsx
import { DragDropGrid, GridItem } from 'react-drag-and-drop-grid';
import { ClockWidget, CounterWidget } from 'react-drag-and-drop-grid';
import 'react-drag-and-drop-grid/styles.css';

function App() {
  const [items, setItems] = useState<GridItem[]>([
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
  ]);

  return (
    <DragDropGrid
      items={items}
      cols={12}
      rowHeight={100}
      width={1200}
      onItemsChange={setItems}
    />
  );
}
```

## 🎨 Widgets Disponibili

### ClockWidget
Un widget che mostra l'ora e la data corrente.

```tsx
import { ClockWidget } from 'react-drag-and-drop-grid';

<ClockWidget />
```

### CounterWidget
Un contatore con pulsanti +, -, e reset.

```tsx
import { CounterWidget } from 'react-drag-and-drop-grid';

<CounterWidget />
```

### NoteWidget
Un widget per prendere note con textarea.

```tsx
import { NoteWidget } from 'react-drag-and-drop-grid';

<NoteWidget />
```

### InfoWidget
Un widget personalizzabile per visualizzare informazioni con icona e valore.

```tsx
import { InfoWidget } from 'react-drag-and-drop-grid';

<InfoWidget 
  title="Temperatura" 
  value={23} 
  unit="°C" 
  icon="🌡️" 
  color="#ff5722" 
/>
```

## 🛠️ Creare Widget Personalizzati

Puoi facilmente creare i tuoi widget personalizzati:

```tsx
import { Widget } from 'react-drag-and-drop-grid';

const MyCustomWidget = () => {
  return (
    <Widget title="Il Mio Widget" backgroundColor="#e3f2fd">
      <div>
        {/* Il tuo contenuto personalizzato */}
        <p>Ciao, mondo!</p>
      </div>
    </Widget>
  );
};

// Usalo nella griglia
const items = [
  {
    id: 'custom',
    x: 0,
    y: 0,
    w: 4,
    h: 2,
    component: <MyCustomWidget />,
  }
];
```

## 🎛️ Props del DragDropGrid

| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `items` | `GridItem[]` | **richiesto** | Array di elementi da visualizzare nella griglia |
| `cols` | `number` | `12` | Numero di colonne nella griglia |
| `rowHeight` | `number` | `100` | Altezza di ogni riga in pixel |
| `width` | `number` | `1200` | Larghezza totale della griglia in pixel |
| `onLayoutChange` | `(layout: Layout[]) => void` | - | Callback chiamato quando il layout cambia |
| `onItemsChange` | `(items: GridItem[]) => void` | - | Callback chiamato quando gli items cambiano |
| `isDraggable` | `boolean` | `true` | Abilita/disabilita il drag |
| `isResizable` | `boolean` | `true` | Abilita/disabilita il resize |
| `className` | `string` | `''` | Classe CSS personalizzata |

## 📐 GridItem Interface

```typescript
interface GridItem {
  id: string;        // Identificatore unico
  x: number;         // Posizione X nella griglia (colonna)
  y: number;         // Posizione Y nella griglia (riga)
  w: number;         // Larghezza in unità di griglia
  h: number;         // Altezza in unità di griglia
  component: ReactNode;  // Il componente da renderizzare
  minW?: number;     // Larghezza minima (opzionale)
  minH?: number;     // Altezza minima (opzionale)
  maxW?: number;     // Larghezza massima (opzionale)
  maxH?: number;     // Altezza massima (opzionale)
}
```

## 🎯 Esempio Completo

Vedi il file `src/App.tsx` per un esempio completo con multipli widget che dimostrano:
- Drag and drop
- Ridimensionamento
- Widget interattivi
- Aggiornamenti in tempo reale
- Layout personalizzato

## 🔧 Sviluppo

```bash
# Clona il repository
git clone https://github.com/nuclearinstruments-devops/react-drag-and-drop.git

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Lint del codice
npm run lint
```

## 🏗️ Tecnologie Utilizzate

- **React 19** - Libreria UI
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **react-grid-layout** - Sistema di griglia drag-and-drop
- **CSS Modules** - Styling

## 📄 Licenza

MIT

## 🤝 Contributi

I contributi sono benvenuti! Sentiti libero di aprire issue o pull request.

## 🎬 Demo

![Drag and Drop in Action](https://github.com/user-attachments/assets/7216113d-c740-408c-bd5f-066d9f618a07)

La dashboard permette di:
- Trascinare i widget in qualsiasi posizione
- Ridimensionare i widget secondo necessità
- Interagire con i widget (contatore, note, etc.)
- Personalizzare completamente l'aspetto e il comportamento

---

Realizzato con ❤️ da Nuclear Instruments DevOps

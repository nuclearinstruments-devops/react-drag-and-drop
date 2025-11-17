import React, { useState } from 'react';
import type { ReactNode } from 'react';
import GridLayout from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import './DragDropGrid.css';

export interface GridItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  component: ReactNode;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

export interface DragDropGridProps {
  items: GridItem[];
  cols?: number;
  rowHeight?: number;
  width?: number;
  onLayoutChange?: (layout: Layout[]) => void;
  onItemsChange?: (items: GridItem[]) => void;
  isDraggable?: boolean;
  isResizable?: boolean;
  className?: string;
}

const DragDropGrid: React.FC<DragDropGridProps> = ({
  items,
  cols = 12,
  rowHeight = 100,
  width = 1200,
  onLayoutChange,
  onItemsChange,
  isDraggable = true,
  isResizable = true,
  className = '',
}) => {
  const [currentItems, setCurrentItems] = useState<GridItem[]>(items);

  // Convert GridItems to react-grid-layout Layout format
  const layout: Layout[] = currentItems.map((item) => ({
    i: item.id,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
    minW: item.minW,
    minH: item.minH,
    maxW: item.maxW,
    maxH: item.maxH,
  }));

  const handleLayoutChange = (newLayout: Layout[]) => {
    // Update items with new positions
    const updatedItems = currentItems.map((item) => {
      const layoutItem = newLayout.find((l) => l.i === item.id);
      if (layoutItem) {
        return {
          ...item,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      }
      return item;
    });

    setCurrentItems(updatedItems);

    if (onLayoutChange) {
      onLayoutChange(newLayout);
    }

    if (onItemsChange) {
      onItemsChange(updatedItems);
    }
  };

  return (
    <div className={`drag-drop-grid-container ${className}`}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={cols}
        rowHeight={rowHeight}
        width={width}
        onLayoutChange={handleLayoutChange}
        isDraggable={isDraggable}
        isResizable={isResizable}
        compactType={null}
        preventCollision={false}
      >
        {currentItems.map((item) => (
          <div key={item.id} className="grid-item">
            <div className="grid-item-content">{item.component}</div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default DragDropGrid;

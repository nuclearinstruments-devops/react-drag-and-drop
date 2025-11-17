import React, { useState, useEffect } from 'react';
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
  onSave?: (items: GridItem[]) => Promise<void>;
  isDraggable?: boolean;
  isResizable?: boolean;
  compactType?: 'vertical' | 'horizontal' | null;
  isEditMode?: boolean;
  className?: string;
}

const DragDropGrid: React.FC<DragDropGridProps> = ({
  items,
  cols = 12,
  rowHeight = 100,
  width = 1200,
  onLayoutChange,
  onItemsChange,
  onSave,
  isDraggable = true,
  isResizable = true,
  compactType = 'vertical',
  isEditMode = true,
  className = '',
}) => {
  const [currentItems, setCurrentItems] = useState<GridItem[]>(items);

  // Update items when props change
  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

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
    static: !isEditMode,
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

  const handleDragStop = async () => {
    if (onSave) {
      try {
        await onSave(currentItems);
      } catch (error) {
        console.error('Failed to save layout:', error);
      }
    }
  };

  const handleResizeStop = async () => {
    if (onSave) {
      try {
        await onSave(currentItems);
      } catch (error) {
        console.error('Failed to save layout:', error);
      }
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
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        isDraggable={isDraggable && isEditMode}
        isResizable={isResizable && isEditMode}
        compactType={compactType}
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

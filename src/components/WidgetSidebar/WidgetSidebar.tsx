import React, { useState } from 'react';
import './WidgetSidebar.css';

export interface WidgetTemplate {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultSize: { w: number; h: number };
  category?: string;
}

export interface WidgetSidebarProps {
  widgets: WidgetTemplate[];
  onAddWidget: (widget: WidgetTemplate) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const WidgetSidebar: React.FC<WidgetSidebarProps> = ({
  widgets,
  onAddWidget,
  searchTerm = '',
  onSearchChange,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setLocalSearchTerm(term);
    if (onSearchChange) {
      onSearchChange(term);
    }
  };

  const filteredWidgets = widgets.filter(
    (widget) =>
      widget.name.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      widget.description.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      (widget.category?.toLowerCase().includes(localSearchTerm.toLowerCase()) ?? false)
  );

  // Group widgets by category
  const categories = Array.from(new Set(filteredWidgets.map((w) => w.category || 'Altro')));

  return (
    <div className="widget-sidebar">
      <div className="sidebar-header">
        <h3>📦 Widget</h3>
        <p className="sidebar-subtitle">Trascina sulla dashboard</p>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Cerca widget..."
          value={localSearchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="sidebar-content">
        {categories.map((category) => {
          const categoryWidgets = filteredWidgets.filter(
            (w) => (w.category || 'Altro') === category
          );

          if (categoryWidgets.length === 0) return null;

          return (
            <div key={category} className="widget-category">
              <h4 className="category-title">{category}</h4>
              <div className="widget-list">
                {categoryWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="widget-card"
                    onClick={() => onAddWidget(widget)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('widgetId', widget.id);
                    }}
                  >
                    <div className="widget-icon">{widget.icon}</div>
                    <div className="widget-info">
                      <div className="widget-name">{widget.name}</div>
                      <div className="widget-description">{widget.description}</div>
                    </div>
                    <div className="widget-add-btn">+</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredWidgets.length === 0 && (
          <div className="no-widgets">
            <p>Nessun widget trovato</p>
            <p className="no-widgets-hint">Prova a modificare la ricerca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetSidebar;

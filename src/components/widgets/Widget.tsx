import React from 'react';
import './Widget.css';

export interface WidgetProps {
  title: string;
  children?: React.ReactNode;
  backgroundColor?: string;
}

const Widget: React.FC<WidgetProps> = ({ 
  title, 
  children, 
  backgroundColor = '#ffffff' 
}) => {
  return (
    <div className="widget" style={{ backgroundColor }}>
      <div className="widget-header">
        <h3>{title}</h3>
      </div>
      <div className="widget-body">
        {children}
      </div>
    </div>
  );
};

export default Widget;

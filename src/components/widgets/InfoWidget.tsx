import React from 'react';
import Widget from './Widget';
import './InfoWidget.css';

export interface InfoWidgetProps {
  title?: string;
  value: string | number;
  unit?: string;
  icon?: string;
  color?: string;
}

const InfoWidget: React.FC<InfoWidgetProps> = ({ 
  title = 'Info',
  value, 
  unit = '', 
  icon = '📊',
  color = '#4caf50'
}) => {
  return (
    <Widget title={title} backgroundColor="#e8f5e9">
      <div className="info-widget">
        <div className="info-icon">{icon}</div>
        <div className="info-value" style={{ color }}>
          {value}
          {unit && <span className="info-unit">{unit}</span>}
        </div>
      </div>
    </Widget>
  );
};

export default InfoWidget;

import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import './ClockWidget.css';

const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Widget title="Orologio" backgroundColor="#e3f2fd">
      <div className="clock-widget">
        <div className="clock-time">{formatTime(time)}</div>
        <div className="clock-date">{formatDate(time)}</div>
      </div>
    </Widget>
  );
};

export default ClockWidget;

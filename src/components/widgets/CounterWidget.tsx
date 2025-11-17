import React, { useState } from 'react';
import Widget from './Widget';
import './CounterWidget.css';

const CounterWidget: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <Widget title="Contatore" backgroundColor="#fff3e0">
      <div className="counter-widget">
        <div className="counter-display">{count}</div>
        <div className="counter-buttons">
          <button 
            className="counter-button decrement" 
            onClick={() => setCount(count - 1)}
          >
            -
          </button>
          <button 
            className="counter-button reset" 
            onClick={() => setCount(0)}
          >
            Reset
          </button>
          <button 
            className="counter-button increment" 
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
      </div>
    </Widget>
  );
};

export default CounterWidget;

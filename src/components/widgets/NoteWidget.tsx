import React, { useState } from 'react';
import Widget from './Widget';
import './NoteWidget.css';

const NoteWidget: React.FC = () => {
  const [note, setNote] = useState('Scrivi le tue note qui...');

  return (
    <Widget title="Note" backgroundColor="#f3e5f5">
      <div className="note-widget">
        <textarea
          className="note-textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Scrivi le tue note qui..."
        />
      </div>
    </Widget>
  );
};

export default NoteWidget;

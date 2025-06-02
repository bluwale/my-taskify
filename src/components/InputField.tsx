import React, { useRef, useState } from "react";
import "./styles.css";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent, estimatedTime: number, flair: 'work' | 'school' | 'personal') => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(30);
  const [selectedFlair, setSelectedFlair] = useState<'work' | 'school' | 'personal'>('personal');

  const handleSubmit = (e: React.FormEvent) => {
    const estimatedTimeInSeconds = estimatedMinutes * 60;
    handleAdd(e, estimatedTimeInSeconds, selectedFlair);
    inputRef.current?.blur();
    setEstimatedMinutes(30); // Reset to default
    setSelectedFlair('personal'); // Reset to default
  };

  return (
    <div className="input-container">
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a Task"
          value={todo}
          ref={inputRef}
          onChange={(e) => setTodo(e.target.value)}
          className="input_box"
        />
        <button type="submit" className="input_submit">
          GO
        </button>
      </form>
      
      <div className="task-settings">
        <div className="time-setting">
          <label htmlFor="estimated-time">Estimated time (minutes):</label>
          <input
            id="estimated-time"
            type="number"
            min="1"
            max="480"
            value={estimatedMinutes}
            onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
            className="time-input"
          />
        </div>
        
        <div className="flair-setting">
          <label>Category:</label>
          <div className="flair-buttons">
            <button
              type="button"
              className={`flair-btn work ${selectedFlair === 'work' ? 'active' : ''}`}
              onClick={() => setSelectedFlair('work')}
            >
              Work
            </button>
            <button
              type="button"
              className={`flair-btn school ${selectedFlair === 'school' ? 'active' : ''}`}
              onClick={() => setSelectedFlair('school')}
            >
              School
            </button>
            <button
              type="button"
              className={`flair-btn personal ${selectedFlair === 'personal' ? 'active' : ''}`}
              onClick={() => setSelectedFlair('personal')}
            >
              Personal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputField;
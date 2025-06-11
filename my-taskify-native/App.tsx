import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);
  const [dragSource, setDragSource] = useState<'active' | 'completed' | null>(null);

  const handleAdd = (e: React.FormEvent, estimatedTime: number, flair: 'work' | 'school' | 'personal') => {
    e.preventDefault();

    if (todo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        todo: todo.trim(), 
        isDone: false,
        estimatedTime: estimatedTime,
        elapsedTime: 0,
        isRunning: false,
        flair: flair
      }]);
      setTodo("");
    }
  };

  const onDragStart = (e: React.DragEvent, todo: Todo, sourceList: string) => {
    setDraggedTodo(todo);
    setDragSource(sourceList as 'active' | 'completed');
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent, targetList: 'active' | 'completed') => {
    e.preventDefault();
    
    if (!draggedTodo || !dragSource) return;

    // If dropping in the same list, do nothing
    if (dragSource === targetList) {
      setDraggedTodo(null);
      setDragSource(null);
      return;
    }

    // Remove from source list
    if (dragSource === 'active') {
      setTodos(prev => prev.filter(t => t.id !== draggedTodo.id));
    } else {
      setCompletedTodos(prev => prev.filter(t => t.id !== draggedTodo.id));
    }

    // Add to target list with updated status
    const updatedTodo = { ...draggedTodo, isDone: targetList === 'completed' };
    if (targetList === 'active') {
      setTodos(prev => [...prev, updatedTodo]);
    } else {
      setCompletedTodos(prev => [...prev, updatedTodo]);
    }

    // Clear drag state
    setDraggedTodo(null);
    setDragSource(null);
  };

  return (
    <div className="App">
      <span className="heading">Daily Task Manager</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        CompletedTodos={CompletedTodos}
        setCompletedTodos={setCompletedTodos}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
      />
    </div>
  );
};

export default App;
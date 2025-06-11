import React, { useState } from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
  onDragStart: (e: React.DragEvent, todo: Todo, sourceList: string) => void;
  onDrop: (e: React.DragEvent, targetList: 'active' | 'completed') => void;
  onDragOver: (e: React.DragEvent) => void;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
  onDragStart,
  onDrop,
  onDragOver,
}) => {
  const [dragOverActive, setDragOverActive] = useState(false);
  const [dragOverCompleted, setDragOverCompleted] = useState(false);

  return (
    <div className="container">
      <div
        className={`todos ${dragOverActive ? "dragactive" : ""}`}
        onDrop={(e) => {
          onDrop(e, 'active');
          setDragOverActive(false);
        }}
        onDragOver={(e) => {
          onDragOver(e);
          setDragOverActive(true);
        }}
        onDragLeave={() => setDragOverActive(false)}
      >
        <span className="todos_heading">Active Tasks</span>
        {todos?.map((todo, index) => (
          <SingleTodo
            key={todo.id}
            index={index}
            todos={todos}
            todo={todo}
            setTodos={setTodos}
            onDragStart={onDragStart}
            sourceList="active"
          />
        ))}
      </div>
      
      <div
        className={`todos ${dragOverCompleted ? "dragcomplete" : "remove"}`}
        onDrop={(e) => {
          onDrop(e, 'completed');
          setDragOverCompleted(false);
        }}
        onDragOver={(e) => {
          onDragOver(e);
          setDragOverCompleted(true);
        }}
        onDragLeave={() => setDragOverCompleted(false)}
      >
        <span className="todos_heading">Completed Tasks</span>
        {CompletedTodos?.map((todo, index) => (
          <SingleTodo
            key={todo.id}
            index={index}
            todos={CompletedTodos}
            todo={todo}
            setTodos={setCompletedTodos}
            onDragStart={onDragStart}
            sourceList="completed"
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";

interface SingleTodoProps {
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  onDragStart: (e: React.DragEvent, todo: Todo, sourceList: string) => void;
  sourceList: 'active' | 'completed';
}

const SingleTodo: React.FC<SingleTodoProps> = ({ 
  index, 
  todo, 
  todos, 
  setTodos, 
  onDragStart, 
  sourceList 
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (editTodo.trim()) {
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo.trim() } : todo))
      );
    }
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <form
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(e, todo, sourceList);
      }}
      onDragEnd={() => setIsDragging(false)}
      onSubmit={(e) => handleEdit(e, todo.id)}
      className={`todos_single ${isDragging ? "drag" : ""}`}
      style={{ 
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos_single--text"
          ref={inputRef}
          onBlur={() => {
            // Save changes when losing focus
            if (editTodo.trim() && editTodo.trim() !== todo.todo) {
              setTodos(
                todos.map((t) => (t.id === todo.id ? { ...t, todo: editTodo.trim() } : t))
              );
            }
            setEdit(false);
          }}
        />
      ) : todo.isDone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : (
        <span className="todos_single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
          title="Edit"
        >
          <AiFillEdit />
        </span>
        <span 
          className="icon" 
          onClick={() => handleDelete(todo.id)}
          title="Delete"
        >
          <AiFillDelete />
        </span>
        <span 
          className="icon" 
          onClick={() => handleDone(todo.id)}
          title={todo.isDone ? "Mark as incomplete" : "Mark as complete"}
        >
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
import React from 'react'
import { Todo } from '../model';
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './styles.css'


type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const SingleTodo = ({todo,todos, setTodos}: Props) => {
  
  /*function checks if todo is done or not and toggles the isDone property */
    const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  
    return (
    <form className="todos_single">
        {
            todo.isDone ? (
                <s className="todos_single--text">{todo.todo}</s>

            ):(
                <span className="todos_single--text">{todo.todo}</span>

            )
        }

            
        <div>
            <span className='icon'> 
                <AiFillEdit/>
            </span>
            <span className='icon'>
                <AiFillDelete/>
            </span>
            <span className='icon'> 
                <MdDone/>
            </span>
        </div>

    </form>
  )
}

export default SingleTodo
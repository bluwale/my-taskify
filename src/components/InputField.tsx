import React, { useRef } from 'react'
import "./styles.css";

interface InputFieldProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}


const InputField = ({todo, setTodo, handleAdd}:InputFieldProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

  
    return (
    <form className = 'input' onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur(); // Remove focus from input after adding task
            }}>
            
        <input
        ref={inputRef}
        type = 'input' 
        placeholder= 'enter a task'
        className='input_box'
        value={todo}
        onChange={
            (e) => setTodo(e.target.value)
        }
        />
        <button className='input_submit'>Go</button>
    </form>
  )
}

export default InputField
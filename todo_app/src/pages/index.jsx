import Image from 'next/image'
import { useState } from "react";
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodoList([...todoList, newTodo]);
      setNewTodo("");
    }
  };

  const removeTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setNewTodo(todoList[index]);
  };

  const updateTodo = () => {
    if (editingIndex !== -1 && newTodo.trim() !== "") {
      const updatedTodoList = [...todoList];
      updatedTodoList[editingIndex] = newTodo;
      setTodoList(updatedTodoList);
      setNewTodo("");
      setEditingIndex(-1);
    }
  };

  const cancelEditing = () => {
    setNewTodo("");
    setEditingIndex(-1);
  };
  return (
    <div className='mt-10 m-auto p-9 bg-parchment w-4/12 rounded-2xl'>
    <h1 className='text-2xl text-chamoisee mb-4 underline underline-offset-4'>Todo List</h1>
    <div>
      <input className='outline outline-1 outline-umber rounded-xl px-2 py-1 focus-text-chamoisee bg-parchment' type="text" value={newTodo} onChange={handleInputChange} />
      {editingIndex === -1 ? (
        <button className='py-1 px-3 ml-4 bg-tea text-white rounded-md' onClick={addTodo}>Add</button>
      ) : (
        <>
          <button className='py-1 px-3 ml-4 bg-tea text-white' onClick={updateTodo}>Update</button>
          <button className='py-1 px-3 ml-4 bg-tea text-white' onClick={cancelEditing}>Cancel</button>
        </>
      )}
    </div>
    <ul className='text-chamoisee mt-6 list-disc'>
      {todoList.map((todo, index) => (
        <li className='mb-5' key={index}>
          {index === editingIndex ? (
            <input className='bg-parchment' type="text" value={newTodo} onChange={handleInputChange} />
          ) : (
            todo
          )}
          {index === editingIndex ? (
            <>
              <button className='py-1 px-3 ml-4 bg-tea text-white' onClick={() => updateTodo(index)}>Save</button>
              <button className='py-1 px-3 ml-4 bg-tea text-white' onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <>
              <button className='py-1 px-3 ml-3 bg-tea text-white' onClick={() => startEditing(index)}>Edit</button>
              <button className='py-1 px-3 ml-2 bg-tea text-white' onClick={() => removeTodo(index)}>Remove</button>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
  )
}

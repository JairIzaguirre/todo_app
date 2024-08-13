"use client";

import { format } from 'date-fns';
import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([{ id: 1, text: 'Item 1', completed: false }]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-fixed bg-cover" style={{ backgroundImage: "url('/unsplash.background.jpg')" }}>
      <div className="bg-white bg-opacity-70 p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-center cursor-default bg-gray-200 rounded-3xl px-4 py-1 color-gray hover:scale-110 transition-all">
          <img className="object-cover rounded-full w-16 h-16 m-2" src="/profile.jpg" alt="codrkai" />
          <div className="w-full p-3">
            <p className="text-3xl text-gray-600">Cosas por hacer</p>
            <p className="text-sm">{format(new Date(), 'MMM d, yyyy')}</p>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V256h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
            </svg>
          </div>
          <input 
            type="text" 
            id="newTodo" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            className="block w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white" 
            placeholder="new todo item" 
          />
        </div>

        <ul className="block w-full pt-6">
          {tasks.map((task) => (
            <li key={task.id} className="w-full border-2 rounded-xl mt-2 hover:border-blue-300 flex items-center">
              <input 
                id={`task-${task.id}`} 
                type="checkbox" 
                className="w-6 h-6 m-3" 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id)} 
              />
              <label htmlFor={`task-${task.id}`} className={`flex-grow p-3 ${task.completed ? 'line-through' : ''}`}>{task.text}</label>
              <button 
                onClick={() => removeTask(task.id)} 
                className="w-7 h-7 m-2.5 rounded-full bg-red-700 text-gray-200 shadow-md hover:bg-red-500 hover:scale-105 flex items-center justify-center"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

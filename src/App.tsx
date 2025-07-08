import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Тестовое задание', completed: false },
    { id: 2, task: 'Прекрасный код', completed: true },
    { id: 3, task: 'Покрытие тестами', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      task: newTaskText,
      completed: false
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskText('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskText(e.target.value);
  }

  function clearCompleted() {
    setTasks(tasks.filter(el => !el.completed));
  }

  function handleTaskStatus(id: number) {
    setTasks(tasks.map(el =>
      el.id === id ? { ...el, completed: !el.completed } : el
    ));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });
  const remaining = tasks.filter(task => !task.completed).length

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTaskText}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:italic"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        <div className="flex items-center justify-between mb-4 text-sm">
          <span className='text-gray-400 text-sm'>{remaining} items left</span>
          <div className='flex gap-2'>
            <Button setFilter={setFilter} filter={filter} filterKey="all">All</Button>
            <Button setFilter={setFilter} filter={filter} filterKey="active">Active</Button>
            <Button setFilter={setFilter} filter={filter} filterKey="completed">Completed</Button>
          </div>
          <button
            onClick={clearCompleted}
            className="text-red-500 hover:underline px-2 py-1"
          >
            Clear Completed
          </button>
        </div>


        <div className="space-y-2">
          {filteredTasks.map((el) => (
            <div
              key={el.id}
              className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-400 rounded hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={el.completed}
                onChange={() => handleTaskStatus(el.id)}
                className="w-4 h-4"
              />
              <span
                className={`text-lg ${el.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
              >
                {el.task}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default App;

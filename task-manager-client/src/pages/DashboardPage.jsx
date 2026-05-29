import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getTasks, createTask, deleteTask, updateTask } from '../services/taskService';
import '../app.css';


export default function DashboardPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(
          user.token
        );

        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
  e.preventDefault();

  try {
    const newTask = await createTask(
      { title },
      user.token
    );

    setTasks([newTask, ...tasks]);

    setTitle('');
  } catch (error) {
    console.log(error);
  }
};

  const logout = () => {
    localStorage.removeItem('user');

    navigate('/');
  };

  const handleDeleteTask = async (
  taskId
) => {
  try {
    await deleteTask(
      taskId,
      user.token
    );

    setTasks(
      tasks.filter(
        (task) => task._id !== taskId
      )
    );
  } catch (error) {
    console.log(error);
  }
};

const handleToggleTask = async (
  task
) => {
  try {
    const updatedTask = await updateTask(
      task._id,
      {
        completed: !task.completed,
      },
      user.token
    );

    setTasks(
      tasks.map((t) =>
        t._id === updatedTask._id
          ? updatedTask
          : t
      )
    );
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <h2>Welcome {user?.name}</h2>

          <button
      className="logout-btn"
      onClick={logout}
    >
      Logout
    </button>

      <hr />

      <form onSubmit={handleCreateTask}>
  <input
    type="text"
    placeholder="Enter task"
    value={title}
    onChange={(e) =>
      setTitle(e.target.value)
    }
  />

  <button type="submit">
    Add Task
  </button>
</form>

<br />

      <h3>Your Tasks</h3>

 {tasks.length === 0 ? (
  <p>No tasks yet</p>
) : (
  tasks.map((task) => (
    <div
      key={task._id}
      className="task-card"
    >
      <div className="task-info">
        <p
          className={
            task.completed
              ? 'completed'
              : ''
          }
        >
          <strong>{task.title}</strong>
        </p>

        <p>
          Status:
          {task.completed
            ? ' Completed'
            : ' Pending'}
        </p>
      </div>

      <div className="task-actions">
        <button
          onClick={() =>
            handleToggleTask(task)
          }
        >
          {task.completed
            ? 'Undo'
            : 'Complete'}
        </button>

        <button
          onClick={() =>
            handleDeleteTask(task._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  ))
)}
    </div>
  );
}
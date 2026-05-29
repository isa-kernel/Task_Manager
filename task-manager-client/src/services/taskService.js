import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/tasks';

export const getTasks = async (token) => {
  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createTask = async (
  taskData,
  token
) => {
  const response = await axios.post(
    API_URL,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteTask = async (
  taskId,
  token
) => {
  const response = await axios.delete(
    `${API_URL}/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateTask = async (
  taskId,
  taskData,
  token
) => {
  const response = await axios.put(
    `${API_URL}/${taskId}`,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
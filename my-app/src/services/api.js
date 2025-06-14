import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

export const registerUser = (name, password) =>
  axios.post(`${BASE_URL}/auth/register`, { name, password });

export const loginUser = (name, password) =>
  axios.post(`${BASE_URL}/auth/login`, { name, password });

export const uploadFile = (file, userId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_id', userId);
  return axios.post(`${BASE_URL}/uploads/upload`, formData);
};

export const listFiles = (userId) =>
  axios.get(`${BASE_URL}/uploads/list/${userId}`);

export const deleteFile = (fileId) =>
  axios.delete(`${BASE_URL}/uploads/delete/${fileId}`);

export const downloadFile = (filename) => {
  window.open(`${BASE_URL}/uploads/download/${filename}`, '_blank');
};

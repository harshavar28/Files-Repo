import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { uploadFile, listFiles, deleteFile, downloadFile } from '../services/api';
import { useStore } from '../store';
import './Dashboard.css';

const Dashboard = () => {
  const { id } = useParams(); 
  const setUserId = useStore((state) => state.setUserId);
  const files = useStore((state) => state.files);
  const setFiles = useStore((state) => state.setFiles);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setUserId(id); 
    fetchFiles();
  }, [id]);

  const fetchFiles = async () => {
    try {
      const res = await listFiles(id);
      setFiles(res.data);
    } catch {
      alert('Failed to load files');
    }
  };

  const handleUpload = async () => {
    try {
      await uploadFile(file, id);
      fetchFiles();
    } catch {
      alert('Upload failed');
    }
  };

  return (
    <div className="dashboard">
    <h2>User Dashboard (ID: {id})</h2>
    <div className="upload-section">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    <ul className="file-list">
      {files.map((f) => (
        <li key={f.id}>
          <span>{f.filename}</span>
          <div>
            <button onClick={() => downloadFile(f.filename)}>Download</button>
            <button className="delete" onClick={() => deleteFile(f.id).then(fetchFiles)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default Dashboard;

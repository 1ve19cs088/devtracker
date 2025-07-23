import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const addTask = () => {
    if (!title.trim()) return;
    axios.post("http://localhost:5000/tasks", { title }).then(() => {
      setTasks([...tasks, { title, status: "todo" }]);
      setTitle("");
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>DevTracker Tasks</h1>
      <input
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, idx) => (
          <li key={idx}>
            <strong>{task.title}</strong> - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

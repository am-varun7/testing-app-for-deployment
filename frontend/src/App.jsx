import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const API = import.meta.env.VITE_API_URL;
  console.log("api url: ",API);

  const fetchNotes = async () => {
    const res = await axios.get(`${API}/api/notes`);
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!text.trim()) return;
    await axios.post(`${API}/api/notes`, { text });
    setText("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Notes App</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: 10 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note"
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div style={{ marginTop: 20 }}>
        {notes.map((note) => (
          <div key={note._id} style={{ padding: 12, border: "1px solid #ddd", marginTop: 10 }}>
            {note.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
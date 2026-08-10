import s from './App.module.css'
import React, { useEffect, useState } from "react";
import { api } from './constants/api'

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const carrega = async () => {
      try {
        const response = await api.get(`/character?page=${page}`);
        setCharacters(response.data.data);
      } catch {
        console.error("Deu ruim!!!")
      }
    };

    carrega();
  }, [page]);
  
  return (
    <div className={s.container}>
      <div className={s.header}>
        <label>Digite uma Página:</label>
        <input 
          min={1} 
          max={197} 
          type="number" 
          placeholder='1/197' 
          value={page} 
          onChange={(e) => setPage(parseInt(e.target.value) || 1)}
        />
      </div>
      
      <div className={s.grid}>
        {characters?.map((char) => (
            <div key={char._id} className={s.card}>
              <img src={char.imageUrl} alt={char.name} />
              <h3>{char.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
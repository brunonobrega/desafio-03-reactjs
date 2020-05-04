import React, { useState } from "react";
import api from './services/api.js';

import "./styles.css";
import { useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/brunonobrega/desafio-03-reactjs",
      title: "Desafio ReactJS",
      techs: [
        "ReactJS",
        "NodeJS",
      ],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepositories(
      repositories.filter((repository) => repository.id !== id)
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>{repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

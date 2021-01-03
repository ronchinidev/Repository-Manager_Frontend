// ============================================================================
// ROCKETSEAT Bootcamp GoStack
// Challenge 02: Project Manager - Frontend
// ============================================================================
// Revision History
//
// Revision     Author                Date             Description
// v01          LUCIANO RONCHINI      03/JAN/2021      First Release
// ============================================================================
// Reference
//
// Bootcamp GoStack Nível 1 "Front-end com ReactJS"
// ============================================================================

// ***************************** Initialization *******************************
import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
const [repositories, setRepositories] = useState([]);

useEffect(() => {
  api.get('repositories').then(response => {
    setRepositories(response.data);
  })
}, []);

// ******************************* Functions **********************************
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'https://github.com/ronchinidev/Repository-Manager',
      techs: ['NodeJS', 'ReactJS']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

// ******************************* Exibition **********************************
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

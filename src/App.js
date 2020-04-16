import React, { useState, useEffect } from 'react';

import './styles.css';

import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const repository = {
      title: 'My repo', 
      url: 'url', 
      techs: ['React', 'node']
    }

    const { data } = await api.post('/repositories', repository)
    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`)
  
    if (status === 204) {
      const repositoryItems = repositories.filter(el => el.id !== id)
      setRepositories(repositoryItems)
    }
  
  }

  useEffect(() => {
    async function getRepositories() {
      const { data } = await api.get('/repositories')
      console.log(data)
      setRepositories(data)
    }

    getRepositories()

  }, [])



  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(el => (
          <li key={el.id}>
            {el.title}
            <button onClick={() => handleRemoveRepository(el.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

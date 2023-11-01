import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find(user => user.id === userId);
    setEditedUser({ ...userToEdit });
  };

  const handleSaveUser = () => {
    fetch(`http://localhost:8000/users/${editingUserId}`, {
      method: 'PUT',
      body: JSON.stringify(editedUser),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        // Atualize o estado do usuário editado
        const updatedUsers = users.map(user => (user.id === editingUserId ? data : user));
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Erro ao salvar usuário:', error));

    // Limpe o estado de edição
    setEditingUserId(null);
    setEditedUser(null);
  };

  const handleCreateUser = () => {
    fetch('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        // Adicione o novo usuário à lista de usuários no estado
        setUsers([...users, data]);
        // Limpe o estado do novo usuário
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
      })
      .catch(error => console.error('Erro ao criar usuário:', error));
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {editingUserId === user.id ? (
              <div>
                <input
                  type="text"
                  value={editedUser.firstName}
                  onChange={e => setEditedUser({ ...editedUser, firstName: e.target.value })}
                />
                <input
                  type="text"
                  value={editedUser.lastName}
                  onChange={e => setEditedUser({ ...editedUser, lastName: e.target.value })}
                />
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={e => setEditedUser({ ...editedUser, email: e.target.value })}
                />
                <input
                  type="password"
                  value={editedUser.password}
                  onChange={e => setEditedUser({ ...editedUser, password: e.target.value })}
                />
                <button onClick={() => handleSaveUser()}>Salvar</button>
              </div>
            ) : (
              <>
                <div>
                  <strong>Nome:</strong> {user.firstName}
                </div>
                <div>
                  <strong>Sobrenome:</strong> {user.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <strong>Senha:</strong> {user.password}
                </div>
                <button onClick={() => handleEditUser(user.id)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Novo Usuário</h2>
        <input
          type="text"
          placeholder="Primeiro Nome"
          value={newUser.firstName}
          onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={newUser.lastName}
          onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={() => handleCreateUser()}>Criar Usuário</button>
      </div>
    </div>
  );
}

export default App;

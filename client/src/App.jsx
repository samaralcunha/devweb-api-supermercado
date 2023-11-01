import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nome: '',
    preco: '',
    categoria: '',
    quantidade: '',
    desconto: '',
  });

  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    const productToEdit = products.find(product => product.id === productId);
    setEditedProduct({ ...productToEdit });
  };

  const handleSaveProduct = () => {
    fetch(`http://localhost:8000/products/${editingProductId}`, {
      method: 'PUT',
      body: JSON.stringify(editedProduct),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        const updatedProducts = products.map(product => (product.id === editingProductId ? data : product));
        setProducts(updatedProducts);
        setEditingProductId(null);
        setEditedProduct(null);
      })
      .catch(error => console.error('Erro ao salvar produto:', error));
  };

  const handleCreateProduct = () => {
    fetch('http://localhost:8000/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);
        setNewProduct({
          nome: '',
          preco: '',
          categoria: '',
          quantidade: '',
          desconto: '',
        });
      })
      .catch(error => console.error('Erro ao criar produto:', error));
  };

  const handleDeleteProduct = (productId) => {
    fetch(`http://localhost:8000/products/${productId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
      })
      .catch(error => console.error('Erro ao excluir produto:', error));
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {editingProductId === product.id ? (
              <div>
                <input
                  type="text"
                  value={editedProduct.nome}
                  onChange={e => setEditedProduct({ ...editedProduct, nome: e.target.value })}
                />
                <input
                  type="text"
                  value={editedProduct.preco}
                  onChange={e => setEditedProduct({ ...editedProduct, preco: e.target.value })}
                />
                <input
                  type="text"
                  value={editedProduct.categoria}
                  onChange={e => setEditedProduct({ ...editedProduct, categoria: e.target.value })}
                />
                <input
                  type="number"
                  value={editedProduct.quantidade}
                  onChange={e => setEditedProduct({ ...editedProduct, quantidade: e.target.value })}
                />
                <input
                  type="number"
                  value={editedProduct.desconto}
                  onChange={e => setEditedProduct({ ...editedProduct, desconto: e.target.value })}
                />
                <button onClick={() => handleSaveProduct()}>Salvar</button>
              </div>
            ) : (
              <>
                <div>
                  <strong>Nome:</strong> {product.nome}
                </div>
                <div>
                  <strong>Preço:</strong> {product.preco}
                </div>
                <div>
                  <strong>Categoria:</strong> {product.categoria}
                </div>
                <div>
                  <strong>Quantidade:</strong> {product.quantidade}
                </div>
                <div>
                  <strong>Desconto:</strong> {product.desconto}
                </div>
                <button onClick={() => handleEditProduct(product.id)}>Editar</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h2>Novo Produto</h2>
        <input
          type="text"
          placeholder="Nome do produto:"
          value={newProduct.nome}
          onChange={e => setNewProduct({ ...newProduct, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Preço:"
          value={newProduct.preco}
          onChange={e => setNewProduct({ ...newProduct, preco: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoria:"
          value={newProduct.categoria}
          onChange={e => setNewProduct({ ...newProduct, categoria: e.target.value })}
        />
        <input
          type="text"
          placeholder="Quantidade:"
          value={newProduct.quantidade}
          onChange={e => setNewProduct({ ...newProduct, quantidade: e.target.value })}
        />
        <input
          type="text"
          placeholder="Desconto:"
          value={newProduct.desconto}
          onChange={e => setNewProduct({ ...newProduct, desconto: e.target.value })}
        />
        <button onClick={() => handleCreateProduct()}>Adicionar Produto</button>
      </div>
    </div>
  );
}

export default App;

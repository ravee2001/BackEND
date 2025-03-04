// src/App.js
import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'details', 'edit'
  const [currentBookId, setCurrentBookId] = useState(null);

  let content;
  switch (currentView) {
    case 'details':
      content = <BookDetails bookId={currentBookId} setEditing={() => setCurrentView('edit')} setCurrentBookId={setCurrentBookId} />;
      break;
    case 'edit':
      content = <BookForm bookId={currentBookId} setEditing={() => setCurrentView('list')} />;
      break;
    default:
      content = <BookList setCurrentBookId={(id) => { setCurrentBookId(id); setCurrentView('details'); }} />;
  }

  return (
    <div className="App">
      <h1>Books CRUD Application</h1>
      {content}
    </div>
  );
}

export default App;